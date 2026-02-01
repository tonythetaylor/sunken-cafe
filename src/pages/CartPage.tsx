import { Link, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { money } from "../lib/storage";
import { useAppStore } from "../store/useAppStore";

export function CartPage() {
  const cart = useAppStore(s => s.cart);
  const setQty = useAppStore(s => s.setQty);
  const removeLine = useAppStore(s => s.removeLine);
  const checkout = useAppStore(s => s.checkout);

  const nav = useNavigate();

  const total = cart.reduce((acc, l) => acc + l.priceCents * l.qty, 0);

  return (
    <div className="px-4 pb-24 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Cart</h1>
        <Link to="/menu" className="text-sm underline" style={{ color: "rgb(var(--emerald))" }}>
          Add more
        </Link>
      </div>

      {cart.length === 0 ? (
        <Card className="mt-4 p-4">
          <div className="text-sm font-semibold">Your cart is empty</div>
          <div className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
            The garden awaits. Pick something cozy.
          </div>
          <Link to="/menu">
            <Button className="mt-3 w-full">Browse menu</Button>
          </Link>
        </Card>
      ) : (
        <>
          <div className="mt-4 grid gap-3">
            {cart.map(line => (
              <Card key={line.lineId} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">{line.name}</div>
                    {line.notes && (
                      <div className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
                        {line.notes}
                      </div>
                    )}
                    <div className="mt-2 text-sm font-semibold">{money(line.priceCents)}</div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        className="h-9 w-9 rounded-xl border"
                        style={{ borderColor: "rgba(0,0,0,0.12)" }}
                        onClick={() => setQty(line.lineId, line.qty - 1)}
                        aria-label="decrease"
                      >
                        -
                      </button>
                      <div className="w-7 text-center text-sm font-semibold">{line.qty}</div>
                      <button
                        className="h-9 w-9 rounded-xl border"
                        style={{ borderColor: "rgba(0,0,0,0.12)" }}
                        onClick={() => setQty(line.lineId, line.qty + 1)}
                        aria-label="increase"
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="text-xs underline"
                      style={{ color: "rgb(var(--muted))" }}
                      onClick={() => removeLine(line.lineId)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-4 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm" style={{ color: "rgb(var(--muted))" }}>
                Total
              </div>
              <div className="text-lg font-semibold">{money(total)}</div>
            </div>

            <Button
              className="mt-3 w-full"
              onClick={() => {
                const res = checkout();
                if (!res.ok) return;
                nav(`/orders?placed=${res.orderId}`);
              }}
            >
              Checkout
            </Button>
          </Card>
        </>
      )}
    </div>
  );
}
