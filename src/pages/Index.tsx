import { useCounters } from "@/hooks/useCounters";
import { CounterCard } from "@/components/CounterCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useCallback } from "react";

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

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedId) return;
      // Don't capture when typing in an input
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Tally Counter
            </h1>
            <p className="text-sm text-muted-foreground">
              Tap to count. Your data stays in your browser.
            </p>
          </div>
          <Button onClick={() => addCounter(`Counter ${counters.length + 1}`)}>
            <Plus className="h-4 w-4 mr-1" /> New Counter
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {counters.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-lg text-muted-foreground mb-4">
              No counters yet. Create one to get started!
            </p>
            <Button
              size="lg"
              onClick={() => addCounter("Counter 1")}
            >
              <Plus className="h-5 w-5 mr-2" /> Create Your First Counter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
      </main>
    </div>
  );
};

export default Index;
