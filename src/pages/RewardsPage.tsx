import { Card } from "../components/ui/Card";
import { useAppStore } from "../store/useAppStore";
import { MENU } from "../data/menu";

export function RewardsPage() {
  const user = useAppStore(s => s.user);
  const points = useAppStore(s => s.rewardsPoints);

  const bestValue = [...MENU].sort((a,b) => b.points - a.points).slice(0,3);

  return (
    <div className="px-4 pb-24 pt-4">
      <h1 className="text-lg font-semibold">Rewards</h1>

      <Card className="mt-4 p-4">
        <div className="text-sm font-semibold">
          {user ? `${user.name}'s points` : "Your points"}
        </div>
        <div className="mt-2 text-3xl font-semibold" style={{ color: "rgb(var(--emerald))" }}>
          {points}
        </div>
        <div className="mt-2 text-sm" style={{ color: "rgb(var(--muted))" }}>
          Points are earned per item purchased (demo logic). Backend later.
        </div>
      </Card>

      <div className="mt-5 text-sm font-semibold">High-point picks</div>
      <div className="mt-3 grid gap-3">
        {bestValue.map(i => (
          <Card key={i.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{i.name}</div>
                <div className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>{i.description}</div>
              </div>
              <div className="text-sm font-semibold" style={{ color: "rgb(var(--orange))" }}>
                +{i.points} pts
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
