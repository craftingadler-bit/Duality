import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Users, Calendar, Share2, Heart, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabaseClient as supabase } from "../../lib/supabase";

export function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (id) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setEvent(data);
    } catch (error) {
      console.error('Error loading event details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!id || isJoined || !event) return;
    try {
      const newAttendeeCount = (event.attendees || 0) + 1;
      const { error } = await supabase
        .from('events')
        .update({ attendees: newAttendeeCount })
        .eq('id', id);

      if (error) throw error;
      setIsJoined(true);
      setEvent({ ...event, attendees: newAttendeeCount });
      alert('Erfolgreich angemeldet! 🎉');
    } catch (error: any) {
      console.error('Error joining event:', error);
      alert('Teilnahme fehlgeschlagen: ' + error.message);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleString('de-DE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + " Uhr";
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Lade Details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center px-6">
          <h2 className="text-2xl font-bold mb-2">Event nicht gefunden</h2>
          <button onClick={() => navigate('/events')} className="text-primary font-medium">Zurück zur Übersicht</button>
        </div>
      </div>
    );
  }

  return (
    // Änderung 1: h-full flex flex-col sorgt dafür, dass der Footer unten bleibt
    <div className="h-full flex flex-col bg-background">
      
      {/* Scrollbarer Inhaltsbereich */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/events')} className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h2 className="text-lg font-semibold truncate">{event.title}</h2>
            </div>
            <button className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-72 bg-muted">
          <img src={event.image_url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800'} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {event.category}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-4 text-foreground">{event.title}</h1>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                {event.creator_id?.[0] || 'G'}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Host</p>
                <p className="font-medium text-foreground">{event.creator_id || 'Gast'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-2xl shadow-sm">
              <Calendar className="w-6 h-6 text-primary shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground font-medium">Datum & Uhrzeit</p>
                <p className="text-foreground">{formatDate(event.event_date)}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-2xl shadow-sm">
              <MapPin className="w-6 h-6 text-primary shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground font-medium">Ort</p>
                <p className="text-foreground">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-2xl shadow-sm">
              <Users className="w-6 h-6 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium">Teilnehmer</p>
                <p className="text-foreground mb-2">{event.attendees || 0} von {event.max_attendees} Plätzen</p>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${Math.min(((event.attendees || 0) / event.max_attendees) * 100, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-foreground">Details</h3>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Änderung 2: Footer ist jetzt Teil des Flex-Layouts, nicht mehr fixed über das ganze Fenster */}
      <div className="bg-card/90 backdrop-blur-xl border-t border-border p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="max-w-md mx-auto flex gap-3">
          <button className="w-14 h-14 border-2 border-primary rounded-2xl flex items-center justify-center shrink-0 hover:bg-primary/5 transition-colors">
            <Heart className="w-6 h-6 text-primary" />
          </button>
          <button
            onClick={handleJoin}
            disabled={isJoined || (event.attendees >= event.max_attendees)}
            className={`flex-1 h-14 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              isJoined ? 'bg-green-500 text-white shadow-lg' : 'bg-primary text-white hover:bg-red-700 shadow-lg active:scale-95'
            }`}
          >
            {isJoined ? <><CheckCircle className="w-6 h-6" /> Angemeldet!</> : 'Jetzt teilnehmen'}
          </button>
        </div>
      </div>
    </div>
  );
}