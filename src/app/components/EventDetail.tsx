import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Users, Calendar, Clock, Share2, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isJoined, setIsJoined] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Volleyball at Neckarwiese',
      category: 'Sports',
      host: 'Max & Friends',
      hostAvatar: 'M',
      date: 'Tomorrow, 18:00',
      dateFormatted: 'April 21, 2026 at 18:00',
      location: 'Neckarwiese',
      locationDetail: 'Neckarwiese Park, 68163 Mannheim',
      attendees: 8,
      maxAttendees: 12,
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop',
      description: 'Casual volleyball game at the Neckarwiese! All skill levels are welcome. We usually play for 2-3 hours and then grab some drinks nearby. Bring your own water and sunscreen!',
      tags: ['Outdoor', 'Free', 'Beginner friendly'],
      sponsored: false,
      whatToBring: ['Sports clothes', 'Water bottle', 'Sunscreen'],
      attendeesList: ['Max K.', 'Sarah L.', 'Tom B.', 'Lisa M.', 'Anna S.', 'Felix W.', 'Julia R.', 'Ben T.']
    },
    {
      id: 2,
      title: 'Gaming Night @ Campus',
      category: 'Gaming',
      host: 'DHBW Esports Club',
      hostAvatar: 'E',
      date: 'Friday, 20:00',
      dateFormatted: 'April 24, 2026 at 20:00',
      location: 'Campus Building A',
      locationDetail: 'Room A.2.14, DHBW Mannheim',
      attendees: 15,
      maxAttendees: 20,
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
      description: 'Join us for an epic gaming night! We\'ll have a Mario Kart tournament with prizes, plus casual gaming stations for FIFA, Smash Bros, and more. Pizza and drinks included!',
      tags: ['Indoor', 'Free', 'Pizza included'],
      sponsored: true,
      whatToBring: ['Your own controller (optional)', 'Good vibes'],
      attendeesList: ['DHBW Esports', 'Max K.', 'Tom B.', 'Lisa M.', 'Sarah L.', '+10 more']
    },
    {
      id: 3,
      title: 'Ceramic Painting Workshop',
      category: 'Art',
      host: 'Creative Minds MA',
      hostAvatar: 'C',
      date: 'Saturday, 14:00',
      dateFormatted: 'April 25, 2026 at 14:00',
      location: 'Kunsthalle Mannheim',
      locationDetail: 'Friedrichsplatz 4, 68165 Mannheim',
      attendees: 5,
      maxAttendees: 10,
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop',
      description: 'Unleash your creativity! Professional ceramic artist will guide you through creating your own unique ceramic piece. All materials included, and you can take your artwork home after it\'s fired (pick up in 2 weeks).',
      tags: ['Creative', '€15', 'Materials included'],
      sponsored: true,
      whatToBring: ['Creativity', 'Apron or old clothes'],
      attendeesList: ['Anna S.', 'Julia R.', 'Sarah L.', 'Lisa M.', 'Emma K.']
    },
    {
      id: 4,
      title: 'Pub Crawl Mannheim',
      category: 'Party',
      host: 'Social Squad',
      hostAvatar: 'S',
      date: 'Saturday, 21:00',
      dateFormatted: 'April 25, 2026 at 21:00',
      location: 'Starting at Jungbusch',
      locationDetail: 'Meeting point: Hagestolz Bar, Jungbuschstraße',
      attendees: 24,
      maxAttendees: 30,
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=600&fit=crop',
      description: 'Explore Mannheim\'s best bars! We\'ll visit 5 different locations with special student deals at each stop. Great way to meet new people and discover the city\'s nightlife. Age 21+ only.',
      tags: ['Nightlife', '€10 entry', '21+'],
      sponsored: false,
      whatToBring: ['Student ID', 'Good mood', 'Valid ID (21+)'],
      attendeesList: ['Max K.', 'Tom B.', 'Sarah L.', 'Lisa M.', 'Felix W.', '+19 more']
    }
  ];

  const event = events.find(e => e.id === Number(id));

  if (!event) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-2">Event not found</h2>
          <button onClick={() => navigate('/events')} className="text-primary">
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleJoin = () => {
    setIsJoined(!isJoined);
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/events')}
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-lg truncate">{event.title}</h2>
          </div>
          <button className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-72 bg-muted">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        {event.sponsored && (
          <div className="absolute top-4 right-4 bg-accent text-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Sponsored
          </div>
        )}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {event.category}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Title & Host */}
        <div className="mb-6">
          <h1 className="text-3xl mb-3">{event.title}</h1>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-white text-lg">
              {event.hostAvatar}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hosted by</p>
              <p className="font-medium">{event.host}</p>
            </div>
          </div>
        </div>

        {/* Key Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
            <Calendar className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
              <p className="font-medium">{event.dateFormatted}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="font-medium">{event.locationDetail}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
            <Users className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Attendees</p>
              <p className="font-medium mb-2">{event.attendees}/{event.maxAttendees} going</p>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="mb-3">About this event</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{event.description}</p>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-secondary rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* What to Bring */}
        <div className="mb-6">
          <h3 className="mb-3">What to bring</h3>
          <div className="space-y-2">
            {event.whatToBring.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendees */}
        <div className="mb-6">
          <h3 className="mb-3">Who's going</h3>
          <div className="flex flex-wrap gap-2">
            {event.attendeesList.map((attendee, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                  {attendee[0]}
                </div>
                <span className="text-sm">{attendee}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-area-inset-bottom max-w-md mx-auto">
          <div className="flex gap-3">
            <button className="w-12 h-12 border-2 border-primary rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors">
              <Heart className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={handleJoin}
              className={`flex-1 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 ${
                isJoined
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {isJoined ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  You're going!
                </>
              ) : (
                <>
                  <Users className="w-5 h-5" />
                  Join Event
                </>
              )}
            </button>
          </div>
        </div>

        {/* Spacer for fixed button */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
