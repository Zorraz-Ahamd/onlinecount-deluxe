import { useCounters } from "@/hooks/useCounters";
import { CounterCard } from "@/components/CounterCard";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Zap,
  Keyboard,
  Save,
  Smartphone,
  Target,
  BarChart3,
  Dumbbell,
  Trophy,
  FlaskConical,
  Users,
  Gamepad2,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useCallback, useState } from "react";

const Index = () => {
  const {
    counters,
    selectedId,
    setSelectedId,
    addCounter,
    increment,
    decrement,
    resetCounter,
    deleteCounter,
    updateCounter,
  } = useCounters();

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedId) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if ([" ", "ArrowUp", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        increment(selectedId);
      } else if (["Backspace", "ArrowDown", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        decrement(selectedId);
      }
    },
    [selectedId, increment, decrement]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const features = [
    { icon: Zap, title: "Instant Counting", desc: "Click or tap to count instantly with zero delay" },
    { icon: Keyboard, title: "Keyboard Shortcuts", desc: "Space, arrows, backspace for hands-free counting" },
    { icon: Save, title: "Auto-Save", desc: "Counts persist in your browser automatically" },
    { icon: Smartphone, title: "Mobile Friendly", desc: "Responsive design works on any device" },
  ];

  const useCases = [
    { icon: Users, title: "Event Attendance" },
    { icon: BarChart3, title: "Inventory Tracking" },
    { icon: Dumbbell, title: "Workout Reps" },
    { icon: Trophy, title: "Sports Scoring" },
    { icon: FlaskConical, title: "Research Data" },
    { icon: Gamepad2, title: "Gaming Stats" },
  ];

  const faqs = [
    { q: "What is an online tally counter?", a: "An online tally counter is a web-based counting tool that allows users to increase or decrease a numeric value digitally. It is commonly used for tracking events, inventory, workouts, sports scores, research data, and other counting tasks." },
    { q: "Is this tally counter free to use?", a: "Yes, this tally counter is completely free to use. You can start counting immediately without signing up or installing any software." },
    { q: "Do I need to create an account?", a: "No account is required. Your counter is saved locally in your browser. Optional account features may be available in the future for syncing counters across devices." },
    { q: "Can I use keyboard shortcuts to count?", a: "Yes. Increase the count using the space bar, up arrow, or right arrow. Decrease using backspace, down arrow, or left arrow — ideal for fast, hands-free counting." },
    { q: "What happens if I refresh the page?", a: "Your counter is automatically saved in your browser, so refreshing the page will not reset your count unless you clear your browser data." },
    { q: "Does this tool work on mobile devices?", a: "Yes, the tally counter is fully responsive and works on desktops, laptops, tablets, and mobile phones." },
  ];

  const benefits = [
    "Free to use with no restrictions",
    "Works directly in your browser",
    "Mobile-friendly and responsive",
    "Supports keyboard shortcuts",
    "No login or signup required",
    "Fast, simple, and reliable",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative overflow-hidden border-b bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-transparent to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Zap className="h-3 w-3" /> Free Online Tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4">
            Free Online Digital<br />
            <span className="text-primary">Counter Tool</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            A simple and fast way to count numbers, track data, and manage tallies directly in your browser. No downloads, no signups — just count.
          </p>
          <Button
            size="lg"
            className="rounded-xl px-8 shadow-lg shadow-primary/20 text-base"
            onClick={() => {
              if (counters.length === 0) addCounter("Counter 1");
              document.getElementById("counter-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Plus className="h-5 w-5 mr-2" /> Start Counting
          </Button>
        </div>
      </header>

      {/* Counter Section */}
      <section id="counter-section" className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Your Counters</h2>
          <Button
            className="rounded-xl shadow-sm"
            onClick={() => addCounter(`Counter ${counters.length + 1}`)}
          >
            <Plus className="h-4 w-4 mr-1" /> New Counter
          </Button>
        </div>

        {counters.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-border bg-card/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-4">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <p className="text-lg text-muted-foreground mb-5">
              No counters yet. Create one to get started!
            </p>
            <Button
              size="lg"
              className="rounded-xl px-8"
              onClick={() => addCounter("Counter 1")}
            >
              <Plus className="h-5 w-5 mr-2" /> Create Your First Counter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {counters.map((counter) => (
              <CounterCard
                key={counter.id}
                counter={counter}
                isSelected={selectedId === counter.id}
                onSelect={() => setSelectedId(counter.id)}
                onIncrement={() => increment(counter.id)}
                onDecrement={() => decrement(counter.id)}
                onReset={() => resetCounter(counter.id)}
                onDelete={() => deleteCounter(counter.id)}
                onRename={(name) => updateCounter(counter.id, { name })}
              />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-card border-y">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">Simple & Interactive Counting</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Increment or decrement counts using on-screen buttons or keyboard shortcuts. Optimized for both desktop and mobile.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-background border hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent mb-4">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Use Cases</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            This online counting tool can be used for many everyday and professional scenarios.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {useCases.map((u) => (
            <div key={u.title} className="flex flex-col items-center gap-3 p-5 rounded-2xl border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent">
                <u.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{u.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Use This */}
      <section className="bg-card border-y">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-3">Why Use This Free Online Counter?</h2>
              <p className="text-muted-foreground mb-6">
                Unlike physical clickers or complex apps, this digital tally counter focuses on speed, clarity, and usability.
              </p>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-foreground">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "∞", label: "Unlimited Counters" },
                { value: "0ms", label: "Setup Time" },
                { value: "100%", label: "Free Forever" },
                { value: "24/7", label: "Always Available" },
              ].map((s) => (
                <div key={s.label} className="p-6 rounded-2xl bg-background border text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{s.value}</div>
                  <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border rounded-2xl bg-card overflow-hidden transition-all"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    openFaq === i && "rotate-180"
                  )}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Summary */}
      <section className="bg-card border-y">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <ShieldCheck className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground mb-3">Your Privacy Matters</h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            We do not collect personal information, track users for advertising, or share data with third parties. All tally counts are stored locally in your browser. No invasive tracking cookies are used.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-8 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tally Counter. Free online digital counter tool. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
