import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/database";
import { startOfMonth, endOfMonth, startOfDay, format } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const monthParam = searchParams.get("month");

    if (!monthParam) {
      return NextResponse.json({ error: "Month parameter is required" }, { status: 400 });
    }

    // Parse month (YYYY-MM format)
    const monthDate = new Date(monthParam + "-01"); // Add day 1 to make it a valid date
    if (isNaN(monthDate.getTime())) {
      return NextResponse.json({ error: "Invalid month format" }, { status: 400 });
    }

    const monthStart = startOfMonth(monthDate);
    const monthEnd = endOfMonth(monthDate);

    // Fetch all todos for the month
    const todos = await db.todo.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: monthStart,
          lte: monthEnd,
        },
      },
      select: {
        date: true,
        id: true,
      },
    });

    // Create a Set of dates that have todos (normalized to YYYY-MM-DD format)
    const datesWithTodos = new Set(
      todos.map(todo => format(startOfDay(todo.date), "yyyy-MM-dd"))
    );

    return NextResponse.json({ datesWithTodos: Array.from(datesWithTodos) });
  } catch (error) {
    console.error("Month todos fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch month todos" },
      { status: 500 }
    );
  }
}
