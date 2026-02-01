import { useSearchParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { money } from "../lib/storage";
import { useAppStore } from "../store/useAppStore";

export function OrdersPage() {
  const orders = useAppStore(s => s.orders);
  const reorder = useAppStore(s => s.reorder);

  const [params] = useSearchParams();
  const placed = params.get("placed");

  return (
    <div className="px-4 pb-24 pt-4">
      <h1 className="text-lg font-semibold">Orders</h1>

      {placed && (
        <Card className="mt-3 p-4">
          <div className="text-sm font-semibold" style={{ color: "rgb(var(--emerald))" }}>
            Order placed ✅
          </div>
          <div className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
            Order id: <span className="font-mono">{placed}</span>
          </div>
        </Card>
      )}

      {orders.length === 0 ? (
        <Card className="mt-4 p-4">
          <div className="text-sm font-semibold">No orders yet</div>
          <div className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
            Once you check out, your order history lives here.
          </div>
        </Card>
      ) : (
        <div className="mt-4 grid gap-3">
          {orders.map(o => (
            <Card key={o.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Order</div>
                  <div className="mt-1 text-xs font-mono" style={{ color: "rgb(var(--muted))" }}>
                    {o.id}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-semibold">{money(o.totalCents)}</span>{" "}
                    <span style={{ color: "rgb(var(--muted))" }}>• earned {o.earnedPoints} pts</span>
                  </div>

                  <div className="mt-2 text-sm" style={{ color: "rgb(var(--muted))" }}>
                    {o.lines.slice(0, 2).map(l => `${l.qty}x ${l.name}`).join(", ")}
                    {o.lines.length > 2 ? ` +${o.lines.length - 2} more` : ""}
                  </div>
                </div>

                <Button variant="outline" onClick={() => reorder(o.id)}>
                  Reorder
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
