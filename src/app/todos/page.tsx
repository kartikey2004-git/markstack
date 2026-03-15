"use client";

import { TodoCalendar } from "@/components/calendar/todo-calendar";

export default function TodosPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Todo Planner</h1>
          <p className="text-muted-foreground">
            Organize your tasks by date with our interactive calendar
          </p>
        </div>
        
        <TodoCalendar />
      </div>
    </div>
  );
}
