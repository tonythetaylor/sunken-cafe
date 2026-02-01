import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAppStore } from "../store/useAppStore";

export function AccountPage() {
  const user = useAppStore(s => s.user);
  const loginMock = useAppStore(s => s.loginMock);
  const logout = useAppStore(s => s.logout);

  const [name, setName] = useState("");

  return (
    <div className="px-4 pb-24 pt-4">
      <h1 className="text-lg font-semibold">Account</h1>

      <Card className="mt-4 p-4">
        {user ? (
          <>
            <div className="text-sm font-semibold">Signed in</div>
            <div className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
              {user.name} (mock auth)
            </div>
            <Button variant="outline" className="mt-3 w-full" onClick={logout}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <div className="text-sm font-semibold">Mock login</div>
            <div className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
              No backend yet, so we store your name locally.
            </div>
            <div className="mt-3 flex gap-2">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              <Button onClick={() => loginMock(name.trim() || "Guest")}>Enter</Button>
            </div>
          </>
        )}
      </Card>

      <Card className="mt-4 p-4">
        <div className="text-sm font-semibold">TODO (backend later)</div>
        <ul className="mt-2 list-disc pl-5 text-sm" style={{ color: "rgb(var(--muted))" }}>
          <li>Real auth (email/OAuth)</li>
          <li>Payment processing</li>
          <li>Order fulfillment status</li>
          <li>Inventory and promos</li>
        </ul>
      </Card>
    </div>
  );
}
