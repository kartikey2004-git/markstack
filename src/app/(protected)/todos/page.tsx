"use client";

import { TodoCalendar } from "@/components/calendar/todo-calendar";
import { ProtectedPageWrapper } from "@/components/layout/protected-page-wrapper";

export default function TodosPage() {
  return (
    <ProtectedPageWrapper
      title="Todo Planner"
      description="Organize your tasks by date with our interactive calendar"
    >
      <TodoCalendar />
    </ProtectedPageWrapper>
  );
}
