import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { MENU } from "../data/menu";
import { useAppStore } from "../store/useAppStore";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export function HomePage() {
  const user = useAppStore(s => s.user);
  const rewardsPoints = useAppStore(s => s.rewardsPoints);

  const newItems = MENU.filter(m => m.isNew);

  return (
    <div className="px-4 pb-24 pt-4">
      {/* Hero */}
      <Card className="relative overflow-hidden p-5">
        <div className="sunken-grain absolute inset-0" />
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
                style={{ borderColor: "rgba(var(--emerald),0.30)", background: "rgba(var(--emerald),0.06)" }}
              >
                <Sparkles size={14} style={{ color: "rgb(var(--orange))" }} />
                Campaign: Garden Week
              </div>
              <h1 className="mt-3 text-2xl font-semibold leading-tight">
                Coffee, but make it botanical.
              </h1>
              <p className="mt-2 text-sm" style={{ color: "rgb(var(--muted))" }}>
                Sunken Cafe is a mobile-first PWA demo. No backend yet. Real vibes anyway.
              </p>
            </div>

            <div className="grid h-14 w-14 place-items-center rounded-2xl"
              style={{ background: "rgba(var(--emerald),0.10)" }}
              aria-hidden
            >
              <span className="text-2xl">🪴</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link to="/menu" className="flex-1">
              <Button className="w-full">
                Browse menu <ArrowRight size={16} />
              </Button>
            </Link>

            <Link to="/rewards" className="flex-1">
              <Button variant="outline" className="w-full">
                <Gift size={16} style={{ color: "rgb(var(--orange))" }} />
                {user ? `${rewardsPoints} pts` : "Rewards"}
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* New Items */}
      <div className="mt-5 flex items-center justify-between">
        <h2 className="text-sm font-semibold">New items</h2>
        <Link to="/menu" className="text-xs underline" style={{ color: "rgb(var(--emerald))" }}>
          View all
        </Link>
      </div>

      <div className="mt-3 grid gap-3">
        {newItems.map(item => (
          <Card key={item.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-lg">{item.imageEmoji ?? "☕️"}</div>
                  <div className="font-semibold">{item.name}</div>
                  <Badge>NEW</Badge>
                </div>
                <p className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
                  {item.description}
                </p>
              </div>
              <Link to="/menu">
                <Button variant="outline" className="px-3">Add</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Updates */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold">Announcements</h2>
        <div className="mt-3 grid gap-3">
          <Card className="p-4">
            <div className="text-sm font-semibold">Now brewing: Saved custom drinks</div>
            <div className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
              Build a drink, save it, reorder it. Your future self will thank you.
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-semibold">PWA install tip</div>
            <div className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
              On mobile: “Add to Home Screen” for the full cafe-in-a-garden vibe.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
