import { useState } from "react";
import { useNavigate } from "react-router";
import { supabaseClient as supabase } from "../../lib/supabase";
import {
  ArrowLeft,
  Upload,
  X,
  Calendar,
  MapPin,
  Users,
  Clock,
  User,
} from "lucide-react";

export function CreateEventView() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [hostName, setHostName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const categories = [
    { id: "Sports", emoji: "⚽", color: "bg-green-500" },
    { id: "Gaming", emoji: "🎮", color: "bg-purple-500" },
    { id: "Party", emoji: "🎉", color: "bg-pink-500" },
    { id: "Art", emoji: "🎨", color: "bg-orange-500" },
    { id: "Study", emoji: "📚", color: "bg-blue-500" },
    { id: "Food", emoji: "🍕", color: "bg-yellow-500" },
  ];

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prev) => [
            ...prev,
            reader.result as string,
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!date || !time) {
      alert("Bitte Datum und Uhrzeit angeben.");
      return;
    }

    try {
      // ISO-Zeitstempel erzeugen
      const eventDateTime = new Date(
        `${date}T${time}`,
      ).toISOString();

      // DIREKTER INSERT über den Supabase Client (behebt den Syntax-Fehler)
      const { error } = await supabase.from("events").insert([
        {
          title,
          description,
          category,
          location,
          event_date: eventDateTime,
          max_attendees: parseInt(maxAttendees) || 0,
          image_url: images[0] || "",
          creator_id: hostName || "Anonymer Gast",
          attendees: 0,
        },
      ]);

      if (error) throw error;

      alert("Event erfolgreich erstellt! 🎉");
      navigate("/events");
    } catch (error: any) {
      console.error("Datenbank-Fehler:", error);
      alert(
        "Fehler beim Speichern: " +
          (error.message || "Unbekannter Fehler"),
      );
    }
  };

  const isStepValid = () => {
    if (step === 1)
      return (
        title.length >= 5 &&
        description.length >= 20 &&
        category &&
        hostName
      );
    if (step === 2)
      return date && time && location && maxAttendees;
    if (step === 3) return images.length > 0;
    return false;
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 lg:px-8 pt-12 lg:pt-8 pb-4 bg-white border-b border-border max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() =>
              step === 1
                ? navigate("/events")
                : setStep(step - 1)
            }
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Event erstellen
            </h2>
            <p className="text-sm text-muted-foreground">
              Schritt {step} von 3
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${
                s <= step ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-4xl mx-auto w-full">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Basis-Infos
            </h3>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Dein Name (Host)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="Wie heißt du?"
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:border-primary focus:outline-none bg-white text-black"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Event-Titel
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z.B. Volleyball am Neckarwiese"
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Beschreibung
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Was genau hast du geplant?"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none resize-none"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Kategorie
              </label>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      category === cat.id
                        ? `${cat.color} text-white border-transparent`
                        : "bg-secondary border-border text-foreground"
                    }`}
                  >
                    <div className="text-3xl mb-1">
                      {cat.emoji}
                    </div>
                    <div className="text-sm font-medium">
                      {cat.id}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Zeit & Ort
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Datum
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Uhrzeit
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Ort / Treffpunkt
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="z.B. Neckarwiese"
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Max. Teilnehmer
              </label>
              <input
                type="number"
                value={maxAttendees}
                onChange={(e) =>
                  setMaxAttendees(e.target.value)
                }
                placeholder="z.B. 20"
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">
              Event-Foto
            </h3>
            <input
              type="file"
              id="event-images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            {images.length === 0 ? (
              <label
                htmlFor="event-images"
                className="block w-full h-64 border-2 border-dashed border-border rounded-2xl hover:border-primary cursor-pointer"
              >
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <Upload className="w-8 h-8 text-muted-foreground mb-4" />
                  <h4 className="font-medium text-foreground mb-2">
                    Foto hochladen
                  </h4>
                </div>
              </label>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-xl overflow-hidden group border border-border"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 lg:px-8 py-4 border-t border-border bg-white max-w-4xl mx-auto w-full">
        <button
          onClick={() =>
            step < 3 ? setStep(step + 1) : handleSubmit()
          }
          disabled={!isStepValid()}
          className="w-full bg-primary hover:bg-red-700 text-white py-4 rounded-xl disabled:opacity-50 font-bold transition-all shadow-md active:scale-95"
        >
          {step < 3 ? "Weiter" : "Event jetzt erstellen"}
        </button>
      </div>
    </div>
  );
}