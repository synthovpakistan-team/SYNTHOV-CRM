import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [contactsCount, tasksCount, recentActivity] = await Promise.all([
      prisma.contact.count(),
      prisma.task.count({ where: { isCompleted: false } }),
      prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({
      contactsCount,
      tasksCount,
      callsCount: 18,
      messagesCount: 32,
      recentActivity,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
