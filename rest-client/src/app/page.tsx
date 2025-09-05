import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <AppShell>
      <div className="flex items-center gap-2">
        <select className="border rounded px-2 py-1">
        <option>GET</option>
          <option>POST</option>
        </select>
        <input className="border rounded px-2 py-1 flex-1" placeholder="https://api.example.com" />
        <Button>Send</Button>
      </div>
      <div className="rounded border p-3 text-sm">Response will appear here…</div>
    </AppShell>
  );
}
