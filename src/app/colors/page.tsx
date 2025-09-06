export default function ColorsPage() {
  const colors = [
    {
      label: "Brand",
      hex: "#37353E",
      bg: "bg-brand",
      text: "text-brand",
      border: "border-brand",
    },
    {
      label: "Sub 1",
      hex: "#44444E",
      bg: "bg-sub-1",
      text: "text-sub-1",
      border: "border-sub-1",
    },
    {
      label: "Sub 2",
      hex: "#715A5A",
      bg: "bg-sub-2",
      text: "text-sub-2",
      border: "border-sub-2",
    },
    {
      label: "Sub 3",
      hex: "#D3DAD9",
      bg: "bg-sub-3",
      text: "text-sub-3",
      border: "border-sub-3",
    },
  ] as const;

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10">
      <h1 className="text-2xl font-bold mb-2">Color Palette</h1>
      <p className="text-sm text-foreground/70 mb-8">
        Tailwind tokens from <code className="font-mono">@theme</code>: bg-*, text-*, border-*
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        {colors.map((c) => (
          <div
            key={c.label}
            className="rounded-lg overflow-hidden border border-foreground/10 shadow-sm"
          >
            <div className={`h-24 ${c.bg}`} />
            <div className="p-4 space-y-2 text-sm">
              <div className="font-medium">{c.label}</div>
              <div className="flex items-center gap-2">
                <span className={`inline-block size-3 rounded-full ${c.bg} ring-1 ring-inset ring-black/10`} />
                <code className="font-mono">{c.bg}</code>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-block size-3 rounded-full ${c.text}`}>A</span>
                <code className="font-mono">{c.text}</code>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-block size-3 rounded-full border ${c.border}`} />
                <code className="font-mono">{c.border}</code>
              </div>
              <div className="text-xs text-foreground/60">HEX: {c.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
