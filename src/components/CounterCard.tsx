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
        "cursor-pointer transition-all duration-200 select-none",
        isSelected
          ? "ring-2 ring-primary shadow-lg scale-[1.02]"
          : "hover:shadow-md"
      )}
      onClick={onSelect}
    >
      <CardContent className="p-6 flex flex-col items-center gap-4">
        {/* Name */}
        <div className="flex items-center gap-2 w-full justify-center min-h-[2rem]">
          {editing ? (
            <input
              ref={inputRef}
              defaultValue={counter.name}
              autoFocus
              className="text-sm font-medium text-center bg-muted rounded px-2 py-1 outline-none border border-input focus:ring-1 focus:ring-ring w-full max-w-[180px]"
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename();
                if (e.key === "Escape") setEditing(false);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <>
              <span className="text-sm font-medium text-muted-foreground truncate max-w-[150px]">
                {counter.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                }}
                className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                <Pencil className="h-3 w-3" />
              </button>
            </>
          )}
        </div>

        {/* Count Display */}
        <div className="text-6xl font-bold tabular-nums text-foreground tracking-tight transition-all">
          {counter.value.toLocaleString()}
        </div>

        {/* +/- Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full text-xl"
            onClick={(e) => {
              e.stopPropagation();
              onDecrement();
            }}
          >
            <Minus className="h-6 w-6" />
          </Button>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full text-xl"
            onClick={(e) => {
              e.stopPropagation();
              onIncrement();
            }}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground text-xs"
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
            className="text-destructive text-xs"
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
          <p className="text-[10px] text-muted-foreground/60">
            ⌨ Space/↑/→ to add • Backspace/↓/← to subtract
          </p>
        )}
      </CardContent>
    </Card>
  );
}
