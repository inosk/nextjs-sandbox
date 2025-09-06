import { Button } from "../../components/ui/button";
import { Card, CardHeader, Content as CardContent, CardFooter } from "../../components/ui/card";

export default function ComponentsShowcase() {
  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-display font-bold">Components</h1>
        <p className="text-body text-foreground/70">
          Tokens: colors, radius, shadow, and type scale.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-title font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Button size="sm">Primary sm</Button>
          <Button size="md">Primary md</Button>
          <Button size="lg">Primary lg</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-title font-semibold">Typography</h2>
        <div className="space-y-1">
          <div className="text-display font-semibold">Text Display</div>
          <div className="text-title font-semibold">Text Title</div>
          <div className="text-body">Text Body</div>
          <div className="text-caption text-foreground/70">Text Caption</div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-title font-semibold">Card</h2>
        <Card>
          <CardHeader>
            <div className="text-title font-semibold">Card Title</div>
            <div className="text-caption text-foreground/70">Optional description</div>
          </CardHeader>
          <CardContent>
            <p className="text-body text-foreground/80">
              Card content goes here. Uses <code className="font-mono">rounded-card</code> and
              <code className="font-mono"> shadow-card</code> tokens.
            </p>
          </CardContent>
          <CardFooter>
            <div className="flex gap-3">
              <Button>Confirm</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardFooter>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-title font-semibold">Quick Links</h2>
        <div className="flex gap-4 text-sm">
          <a className="underline underline-offset-4" href="/colors">View Colors</a>
          <a className="underline underline-offset-4" href="/">Home</a>
        </div>
      </section>
    </div>
  );
}
