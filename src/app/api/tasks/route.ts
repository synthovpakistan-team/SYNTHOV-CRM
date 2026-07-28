import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const seedTasks = [
  {
    title: "Follow up with BrightPath LLC re: contract renewal",
    description: "Discuss seat expansion and enterprise SLA options.",
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    isCompleted: false,
  },
  {
    title: "Send proposal to NovaTech Inc",
    description: "Prepare customized pricing quote for 25 licenses.",
    dueDate: new Date(Date.now() + 172800000), // In 2 days
    isCompleted: false,
  },
  {
    title: "Review contract with Stellar Co",
    description: "Legal review of compliance terms.",
    dueDate: new Date(Date.now() + 259200000),
    isCompleted: false,
  },
  {
    title: "Demo call with Orion Media",
    description: "Show VOIP integration and auto-dialer features.",
    dueDate: new Date(),
    isCompleted: true,
  },
];

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    let userId = session?.user?.id;

    if (!userId) {
      const firstUser = await prisma.user.findFirst();
      userId = firstUser?.id;
    }

    if (!userId) {
      return NextResponse.json([]);
    }

    let tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { dueDate: "asc" },
    });

    if (tasks.length === 0) {
      await prisma.task.createMany({
        data: seedTasks.map((t) => ({ ...t, userId: userId! })),
      });

      tasks = await prisma.task.findMany({
        where: { userId },
        orderBy: { dueDate: "asc" },
      });
    }

    return NextResponse.json(tasks);
  } catch (error: any) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    let userId = session?.user?.id;

    if (!userId) {
      const firstUser = await prisma.user.findFirst();
      userId = firstUser?.id;
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Must be logged in to create tasks" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, dueDate } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Task title is required" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        dueDate: dueDate ? new Date(dueDate) : new Date(),
        userId,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, isCompleted } = body;

    if (!id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const updated = await prisma.task.update({
      where: { id },
      data: { isCompleted },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}
