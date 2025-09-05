export default function AppShell({ children }: { children: React.ReactNode }) {
return (
<div className="grid min-h-dvh grid-cols-[280px_1fr]">
<aside className="border-r p-3">sidebar</aside>
<main className="p-4 space-y-4">{children}</main>
</div>
);
}