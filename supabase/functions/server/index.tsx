import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

// Supabase Client initialisieren
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseKey =
  Deno.env.get("SUPABASE_ANON_KEY") ??
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  "";
const supabase = createClient(supabaseUrl, supabaseKey);

const app = new Hono();

// Enable logger
app.use("*", logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-be23ac2a/health", (c) => {
  return c.json({ status: "ok" });
});

// ============= EVENTS ENDPOINTS =============

// Get all events
app.get("/make-server-be23ac2a/events", async (c) => {
  try {
    const { data: events, error } = await supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return c.json({ success: true, data: events || [] });
  } catch (error) {
    console.error("Error fetching events:", error);
    return c.json({ success: true, data: [] });
  }
});

// Get single event
app.get("/make-server-be23ac2a/events/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const { data: event, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!event) {
      return c.json({ success: false, error: "Event not found" }, 404);
    }

    return c.json({ success: true, data: event });
  } catch (error) {
    console.error("Error fetching event:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new event
app.post("/make-server-be23ac2a/events", async (c) => {
  try {
    const body = await c.req.json();
    
    const { data, error } = await supabase
      .from("events")
      .insert([{
        ...body,
        attendees: 0,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return c.json({ success: true, data }, 201);
  } catch (error) {
    console.error("Error creating event:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Join event (Inkrementiert Teilnehmer direkt in DB)
app.post("/make-server-be23ac2a/events/:id/join", async (c) => {
  try {
    const id = c.req.param("id");
    
    // Zuerst aktuellen Stand holen
    const { data: event, error: fetchError } = await supabase
      .from("events")
      .select("attendees")
      .eq("id", id)
      .single();

    if (fetchError || !event) throw new Error("Event not found");

    // Update ausführen
    const { data, error: updateError } = await supabase
      .from("events")
      .update({ attendees: (event.attendees || 0) + 1 })
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;
    return c.json({ success: true, data });
  } catch (error) {
    console.error("Error joining event:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= HOUSING ENDPOINTS =============

// Get all housing listings
app.get("/make-server-be23ac2a/housing", async (c) => {
  try {
    const { data: housing, error } = await supabase
      .from("housing")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return c.json({ success: true, data: housing || [] });
  } catch (error) {
    console.error("Error fetching housing:", error);
    return c.json({ success: true, data: [] });
  }
});

// Get single housing listing
app.get("/make-server-be23ac2a/housing/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const { data: listing, error } = await supabase
      .from("housing")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!listing) {
      return c.json({ success: false, error: "Housing not found" }, 404);
    }

    return c.json({ success: true, data: listing });
  } catch (error) {
    console.error("Error fetching housing listing:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new housing listing
app.post("/make-server-be23ac2a/housing", async (c) => {
  try {
    const body = await c.req.json();
    
    const { data, error } = await supabase
      .from("housing")
      .insert([{
        ...body,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return c.json({ success: true, data }, 201);
  } catch (error) {
    console.error("Error creating housing:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= MARKETPLACE ENDPOINTS =============

// Get all marketplace listings
app.get("/make-server-be23ac2a/marketplace", async (c) => {
  try {
    const { data: listings, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return c.json({ success: true, data: listings || [] });
  } catch (error) {
    console.error("Error fetching marketplace listings:", error);
    return c.json({ success: true, data: [] });
  }
});

// Create new marketplace listing
app.post("/make-server-be23ac2a/marketplace", async (c) => {
  try {
    const body = await c.req.json();
    
    const { data, error } = await supabase
      .from("listings")
      .insert([{
        ...body,
        status: "ACTIVE",
        views_count: 0,
        favorites_count: 0,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return c.json({ success: true, data }, 201);
  } catch (error) {
    console.error("Error creating marketplace listing:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

Deno.serve(app.fetch);