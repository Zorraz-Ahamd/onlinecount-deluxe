import { Counter } from "@/hooks/useCounters";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, RotateCcw, Trash2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

interface CounterCardProps {
  counter: Counter;
  isSelected: boolean;
  onSelect: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onDelete: () => void;
  onRename: (name: string) => void;
}

export function CounterCard({
  counter,
  isSelected,
  onSelect,
  onIncrement,
  onDecrement,
  onReset,
  onDelete,
  onRename,
}: CounterCardProps) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRename = () => {
    if (inputRef.current) {
      const val = inputRef.current.value.trim();
      if (val) onRename(val);
    }
    setEditing(false);
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300 select-none group border-0",
        isSelected
          ? "ring-2 ring-primary shadow-xl shadow-primary/10 scale-[1.02] bg-card"
          : "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 bg-card"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-8 flex flex-col items-center gap-5">
        {/* Name */}
        <div className="flex items-center gap-2 w-full justify-center min-h-[2rem]">
          {editing ? (
            <input
              ref={inputRef}
              defaultValue={counter.name}
              autoFocus
              className="text-sm font-medium text-center bg-muted rounded-lg px-3 py-1.5 outline-none border border-input focus:ring-2 focus:ring-ring w-full max-w-[180px]"
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename();
                if (e.key === "Escape") setEditing(false);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground truncate max-w-[150px]">
                {counter.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                }}
                className="text-muted-foreground/40 hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
              >
                <Pencil className="h-3 w-3" />
              </button>
            </>
          )}
        </div>

        {/* Count Display */}
        <div className="text-7xl font-black tabular-nums text-foreground tracking-tighter transition-all leading-none py-2">
          {counter.value.toLocaleString()}
        </div>

        {/* +/- Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-16 w-16 rounded-2xl text-xl border-2 hover:border-primary hover:text-primary transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onDecrement();
            }}
          >
            <Minus className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            className="h-16 w-16 rounded-2xl text-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onIncrement();
            }}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground text-xs rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              onReset();
            }}
          >
            <RotateCcw className="h-3 w-3 mr-1" /> Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive text-xs rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-3 w-3 mr-1" /> Delete
          </Button>
        </div>

        {/* Selected hint */}
        {isSelected && (
          <p className="text-[10px] text-muted-foreground/50 font-medium">
            ⌨ Space/↑/→ to add · Backspace/↓/← to subtract
          </p>
        )}
      </CardContent>
    </Card>
  );
}
