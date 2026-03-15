import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import db from "@/lib/database";
import { startOfDay, format } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");

    if (!dateParam) {
      return NextResponse.json({ error: "Date parameter is required" }, { status: 400 });
    }

    // Parse and normalize date to start of day
    const selectedDate = new Date(dateParam);
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const normalizedDate = startOfDay(selectedDate);

    // Fetch todos for the specific date
    const todos = await db.todo.findMany({
      where: {
        userId: session.user.id,
        date: normalizedDate,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({ todos });
  } catch (error) {
    console.error("Todos fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, date } = await request.json();

    if (!title || !date) {
      return NextResponse.json(
        { error: "Title and date are required" },
        { status: 400 }
      );
    }

    // Parse and normalize date to start of day
    const selectedDate = new Date(date);
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    const normalizedDate = startOfDay(selectedDate);

    // Create todo
    const todo = await db.todo.create({
      data: {
        title,
        description: description || null,
        date: normalizedDate,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ todo });
  } catch (error) {
    console.error("Todo creation error:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
