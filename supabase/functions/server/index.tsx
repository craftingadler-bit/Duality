import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

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
    const events = await kv.getByPrefix("event:");
    return c.json({ success: true, data: events || [] });
  } catch (error) {
    console.error("Error fetching events:", error);
    // Return empty array on error to prevent frontend issues
    return c.json({ success: true, data: [] });
  }
});

// Get single event
app.get("/make-server-be23ac2a/events/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const event = await kv.get(`event:${id}`);

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
    const eventId = crypto.randomUUID();

    const event = {
      id: eventId,
      ...body,
      attendees: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await kv.set(`event:${eventId}`, event);

    return c.json({ success: true, data: event }, 201);
  } catch (error) {
    console.error("Error creating event:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Join event
app.post("/make-server-be23ac2a/events/:id/join", async (c) => {
  try {
    const id = c.req.param("id");
    const event = await kv.get(`event:${id}`);

    if (!event) {
      return c.json({ success: false, error: "Event not found" }, 404);
    }

    // Increment attendees
    event.attendees = (event.attendees || 0) + 1;
    event.updated_at = new Date().toISOString();

    await kv.set(`event:${id}`, event);

    return c.json({ success: true, data: event });
  } catch (error) {
    console.error("Error joining event:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= HOUSING ENDPOINTS =============

// Get all housing listings
app.get("/make-server-be23ac2a/housing", async (c) => {
  try {
    const housing = await kv.getByPrefix("housing:");
    return c.json({ success: true, data: housing || [] });
  } catch (error) {
    console.error("Error fetching housing:", error);
    // Return empty array on error to prevent frontend issues
    return c.json({ success: true, data: [] });
  }
});

// Get single housing listing
app.get("/make-server-be23ac2a/housing/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const housing = await kv.get(`housing:${id}`);

    if (!housing) {
      return c.json({ success: false, error: "Housing not found" }, 404);
    }

    return c.json({ success: true, data: housing });
  } catch (error) {
    console.error("Error fetching housing:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new housing listing
app.post("/make-server-be23ac2a/housing", async (c) => {
  try {
    const body = await c.req.json();
    const housingId = crypto.randomUUID();

    const housing = {
      id: housingId,
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await kv.set(`housing:${housingId}`, housing);

    return c.json({ success: true, data: housing }, 201);
  } catch (error) {
    console.error("Error creating housing:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ============= MARKETPLACE ENDPOINTS =============

// Get all marketplace listings
app.get("/make-server-be23ac2a/marketplace", async (c) => {
  try {
    const listings = await kv.getByPrefix("listing:");
    return c.json({ success: true, data: listings || [] });
  } catch (error) {
    console.error("Error fetching marketplace listings:", error);
    // Return empty array on error to prevent frontend issues
    return c.json({ success: true, data: [] });
  }
});

// Create new marketplace listing
app.post("/make-server-be23ac2a/marketplace", async (c) => {
  try {
    const body = await c.req.json();
    const listingId = crypto.randomUUID();

    const listing = {
      id: listingId,
      ...body,
      status: "ACTIVE",
      views_count: 0,
      favorites_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await kv.set(`listing:${listingId}`, listing);

    return c.json({ success: true, data: listing }, 201);
  } catch (error) {
    console.error("Error creating marketplace listing:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

Deno.serve(app.fetch);