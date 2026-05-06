# Supabase Integration Guide

Diese App ist vorbereitet für die vollständige Integration mit Supabase. Hier ist eine Anleitung, wie die Integration funktioniert.

## 🗄️ Datenstruktur

### Events (Key: `event:{id}`)
```typescript
{
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  attendees: number;
  max_attendees: number;
  image_urls?: string[];
  tags?: string[];
  is_sponsored: boolean;
  host_name: string;
  created_at: string;
  updated_at: string;
}
```

### Housing (Key: `housing:{id}`)
```typescript
{
  id: string;
  user_id: string;
  type: 'partner' | 'apartment';
  title: string;
  description: string;
  price: number;
  location: string;
  address?: string;
  size: string;
  available_phase: 'A-Phase' | 'B-Phase' | 'Both';
  features: string[];
  availability_months: string[];
  image_urls?: string[];
  match_score?: number;
  roommate_name?: string;
  created_at: string;
  updated_at: string;
}
```

### Marketplace Listings (Key: `listing:{id}`)
```typescript
{
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: 'SERVICE' | 'PHYSICAL' | 'DIGITAL';
  subcategory?: string;
  price: number;
  is_negotiable: boolean;
  is_free: boolean;
  status: 'ACTIVE' | 'PENDING' | 'SOLD' | 'ARCHIVED';
  location?: string;
  image_urls?: string[];
  created_at: string;
  updated_at: string;
}
```

## 🔌 API Endpoints

### Events
- `GET /make-server-be23ac2a/events` - Alle Events abrufen
- `GET /make-server-be23ac2a/events/:id` - Ein Event abrufen
- `POST /make-server-be23ac2a/events` - Neues Event erstellen
- `POST /make-server-be23ac2a/events/:id/join` - Event beitreten

### Housing
- `GET /make-server-be23ac2a/housing` - Alle Wohnungen abrufen
- `GET /make-server-be23ac2a/housing/:id` - Eine Wohnung abrufen
- `POST /make-server-be23ac2a/housing` - Neue Wohnung erstellen

### Marketplace
- `GET /make-server-be23ac2a/marketplace` - Alle Listings abrufen
- `POST /make-server-be23ac2a/marketplace` - Neues Listing erstellen

## 💻 Verwendung in der App

### 1. API Helper importieren
```typescript
import { eventsAPI, housingAPI, marketplaceAPI } from '/src/lib/api';
```

### 2. Daten abrufen
```typescript
// Events laden
const { data: events, error } = await eventsAPI.getAll();

// Housing laden
const { data: housing, error } = await housingAPI.getAll();

// Marketplace laden
const { data: listings, error } = await marketplaceAPI.getAll();
```

### 3. Daten erstellen
```typescript
// Event erstellen
const { data, error } = await eventsAPI.create({
  title: 'Volleyball am Neckar',
  description: 'Casual game for all levels',
  category: 'Sports',
  date: '2026-05-15',
  time: '18:00',
  location: 'Neckarwiese',
  max_attendees: 12,
  // ... weitere Felder
});
```

## 🔐 Authentifizierung

Die Authentifizierung erfolgt über Supabase Auth:
1. Benutzer registrieren sich mit ihrer DHBW-Email
2. Email-Verifizierung erforderlich
3. JWT Token wird automatisch in Requests eingefügt

## 📦 Datenspeicherung

### Aktuell: KV Store
- Verwendet Supabase KV Store (Key-Value Datenbank)
- Keine Schema-Migration erforderlich
- Schnell und einfach für Prototyping

### Optional: PostgreSQL Tabellen
Für Production kann man zu PostgreSQL-Tabellen migrieren:

```sql
-- Events Tabelle
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  attendees INTEGER DEFAULT 0,
  max_attendees INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Housing Tabelle
CREATE TABLE housing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  type TEXT CHECK (type IN ('partner', 'apartment')),
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  location TEXT NOT NULL,
  available_phase TEXT CHECK (available_phase IN ('A-Phase', 'B-Phase', 'Both')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🖼️ Bild-Upload

Für Bild-Uploads Supabase Storage verwenden:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseKey);

// Bild hochladen
const { data, error } = await supabase.storage
  .from('event-images')
  .upload(`${userId}/${eventId}/image.jpg`, file);

// Public URL abrufen
const { data: { publicUrl } } = supabase.storage
  .from('event-images')
  .getPublicUrl(data.path);
```

## 🚀 Deployment

1. Supabase Edge Functions sind bereits deployed
2. Frontend kann über Vercel/Netlify deployed werden
3. Umgebungsvariablen setzen:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

## 📝 Nächste Schritte

1. ✅ Event-Erstellung implementiert
2. ✅ Housing-Erstellung implementiert
3. ✅ Marketplace-Erstellung vorbereitet
4. ✅ Server-Endpoints erstellt
5. TODO: Authentifizierung mit DHBW-Email
6. TODO: Bild-Upload zu Supabase Storage
7. TODO: Echtzeit-Updates mit Supabase Subscriptions
8. TODO: Match-Algorithmus für Phase-Share

## 🔍 Debugging

Server-Logs anzeigen:
```bash
supabase functions logs make-server-be23ac2a
```

Lokales Testing:
```bash
supabase functions serve make-server-be23ac2a
```

## 📚 Weitere Ressourcen

- [Supabase Docs](https://supabase.com/docs)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
- [Storage Guide](https://supabase.com/docs/guides/storage)
