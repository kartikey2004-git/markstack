"use client";

import { useState, useEffect, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { format, startOfDay, isToday } from "date-fns";
import { Plus, Trash2, CalendarDays, CheckCircle, Circle } from "lucide-react";

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoCalendarProps {
  className?: string;
}

export function TodoCalendar({ className }: TodoCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [todos, setTodos] = useState<Todo[]>([]);
  const [datesWithTodos, setDatesWithTodos] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  // Fetch todos for selected date
  const fetchTodosForDate = useCallback(async (date: Date) => {
    setLoading(true);
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const response = await fetch(`/api/todos?date=${dateStr}`);
      if (!response.ok) throw new Error("Failed to fetch todos");
      
      const data = await response.json();
      setTodos(data.todos.map((todo: any) => ({
        ...todo,
        date: new Date(todo.date),
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      })));
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch dates with todos for current month
  const fetchMonthTodos = useCallback(async (date: Date) => {
    try {
      const monthStr = format(date, "yyyy-MM");
      const response = await fetch(`/api/todos/month?month=${monthStr}`);
      if (!response.ok) throw new Error("Failed to fetch month todos");
      
      const data = await response.json();
      setDatesWithTodos(new Set(data.datesWithTodos));
    } catch (error) {
      console.error("Error fetching month todos:", error);
    }
  }, []);

  // Load todos when selected date changes
  useEffect(() => {
    fetchTodosForDate(selectedDate);
  }, [selectedDate, fetchTodosForDate]);

  // Load month todos when component mounts or selected date changes month
  useEffect(() => {
    fetchMonthTodos(selectedDate);
  }, [selectedDate, fetchMonthTodos]);

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsAddingTodo(false);
      setNewTodoTitle("");
      setNewTodoDescription("");
    }
  };

  // Add new todo
  const handleAddTodo = async () => {
    if (!newTodoTitle.trim()) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodoTitle.trim(),
          description: newTodoDescription.trim() || undefined,
          date: selectedDate.toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to create todo");

      const newTodo = await response.json();
      setTodos(prev => [...prev, {
        ...newTodo.todo,
        date: new Date(newTodo.todo.date),
        createdAt: new Date(newTodo.todo.createdAt),
        updatedAt: new Date(newTodo.todo.updatedAt),
      }]);

      // Update dates with todos
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      setDatesWithTodos(prev => new Set([...prev, dateStr]));

      // Reset form
      setNewTodoTitle("");
      setNewTodoDescription("");
      setIsAddingTodo(false);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Toggle todo completion
  const handleToggleTodo = async (todoId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      setTodos(prev => prev.map(todo => 
        todo.id === todoId ? { ...todo, completed } : todo
      ));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete todo
  const handleDeleteTodo = async (todoId: string) => {
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      setTodos(prev => prev.filter(todo => todo.id !== todoId));

      // Update dates with todos if this was the last todo for this date
      const remainingTodos = todos.filter(todo => todo.id !== todoId);
      if (remainingTodos.length === 0) {
        const dateStr = format(selectedDate, "yyyy-MM-dd");
        setDatesWithTodos(prev => {
          const newSet = new Set(prev);
          newSet.delete(dateStr);
          return newSet;
        });
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Custom modifier for dates with todos
  const modifiers = {
    hasTodos: (date: Date) => {
      const dateStr = format(date, "yyyy-MM-dd");
      return datesWithTodos.has(dateStr);
    },
  };

  const modifiersStyles = {
    hasTodos: {
      backgroundColor: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      borderRadius: "50%",
    },
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            Todo Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Todo Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              {format(selectedDate, "MMMM d, yyyy")}
              {isToday(selectedDate) && (
                <Badge variant="secondary">Today</Badge>
              )}
            </div>
            <Button
              size="sm"
              onClick={() => setIsAddingTodo(!isAddingTodo)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Todo
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Todo Form */}
          {isAddingTodo && (
            <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
              <Input
                placeholder="Todo title..."
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
                className="w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddTodo();
                  }
                }}
              />
              <Textarea
                placeholder="Description (optional)..."
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                className="w-full min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleAddTodo} disabled={!newTodoTitle.trim()}>
                  Add Todo
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingTodo(false);
                    setNewTodoTitle("");
                    setNewTodoDescription("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Todo List */}
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading todos...
              </div>
            ) : todos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No todos for this day yet. Click "Add Todo" to create one!
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={(checked) => 
                      handleToggleTodo(todo.id, checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                      {todo.title}
                    </div>
                    {todo.description && (
                      <div className={`text-sm text-muted-foreground mt-1 ${todo.completed ? "line-through" : ""}`}>
                        {todo.description}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
