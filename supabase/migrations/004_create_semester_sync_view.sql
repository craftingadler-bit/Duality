-- Create function to determine current academic period
CREATE OR REPLACE FUNCTION get_current_academic_period()
RETURNS TEXT AS $$
DECLARE
  current_month INTEGER;
  result TEXT;
BEGIN
  current_month := EXTRACT(MONTH FROM CURRENT_DATE);

  -- Exam periods: February (Winter) and July (Summer)
  IF current_month = 2 OR current_month = 7 THEN
    result := 'EXAM_PHASE';
  -- September/October: Start of new semester
  ELSIF current_month IN (9, 10) THEN
    result := 'SEMESTER_START';
  -- December: Pre-Christmas shopping period
  ELSIF current_month = 12 THEN
    result := 'SEMESTER_END';
  ELSE
    result := 'REGULAR';
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql STABLE;

-- Create materialized view for semester-prioritized listings
CREATE MATERIALIZED VIEW IF NOT EXISTS semester_prioritized_listings AS
SELECT
  l.*,
  p.campus,
  p.reputation_score,

  -- Calculate priority score
  CASE
    -- Exam phase: Prioritize digital study materials
    WHEN get_current_academic_period() = 'EXAM_PHASE' AND l.category = 'DIGITAL' AND l.relevant_for_exam_phase = TRUE
      THEN 100
    WHEN get_current_academic_period() = 'EXAM_PHASE' AND l.category = 'SERVICE' AND l.subcategory = 'Tutoring'
      THEN 90

    -- Semester start: Prioritize physical items (books, furniture)
    WHEN get_current_academic_period() = 'SEMESTER_START' AND l.category = 'PHYSICAL'
      THEN 85

    -- Semester end: Prioritize selling items
    WHEN get_current_academic_period() = 'SEMESTER_END' AND l.category = 'PHYSICAL'
      THEN 80

    -- Default priority based on recency and views
    ELSE 50 + (l.views_count / 10) +
         CASE WHEN l.created_at > NOW() - INTERVAL '7 days' THEN 10 ELSE 0 END
  END AS priority_score,

  -- Color coding for frontend
  CASE l.category
    WHEN 'SERVICE' THEN '#3B82F6' -- Blue
    WHEN 'PHYSICAL' THEN '#F97316' -- Orange
    WHEN 'DIGITAL' THEN '#8B5CF6' -- Violet
  END AS category_color,

  get_current_academic_period() AS current_period

FROM listings l
JOIN profiles p ON l.user_id = p.id
WHERE l.status = 'ACTIVE'
  AND (l.expires_at IS NULL OR l.expires_at > NOW())
ORDER BY priority_score DESC, l.created_at DESC;

-- Create index on materialized view
CREATE INDEX idx_semester_listings_priority ON semester_prioritized_listings(priority_score DESC);
CREATE INDEX idx_semester_listings_category ON semester_prioritized_listings(category);
CREATE INDEX idx_semester_listings_campus ON semester_prioritized_listings(campus);

-- Create function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_semester_listings()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY semester_prioritized_listings;
END;
$$ LANGUAGE plpgsql;

-- Schedule automatic refresh (requires pg_cron extension)
-- Uncomment if pg_cron is enabled:
-- SELECT cron.schedule('refresh-semester-listings', '0 */6 * * *', 'SELECT refresh_semester_listings();');
