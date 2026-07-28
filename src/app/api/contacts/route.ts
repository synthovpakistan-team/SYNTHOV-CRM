import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const seedContacts = [
  {
    firstName: "Marcus",
    lastName: "Johnson",
    email: "marcus.j@example.com",
    phone: "(555) 123-4567",
    companyName: "Acme Corp",
    status: "Lead",
    notes: "Interested in enterprise CRM plan.",
  },
  {
    firstName: "Sandra",
    lastName: "Lee",
    email: "slee@novatech.io",
    phone: "(555) 987-6543",
    companyName: "NovaTech Inc",
    status: "Client",
    notes: "Long term client since 2024.",
  },
  {
    firstName: "David",
    lastName: "Kim",
    email: "dkim@stellar.co",
    phone: "(555) 456-7890",
    companyName: "Stellar Co",
    status: "Prospect",
    notes: "Demo scheduled for next week.",
  },
  {
    firstName: "Priya",
    lastName: "Nair",
    email: "priya@orionmedia.com",
    phone: "(555) 234-5678",
    companyName: "Orion Media",
    status: "Lead",
    notes: "Requested pricing matrix.",
  },
  {
    firstName: "James",
    lastName: "Wilson",
    email: "jwilson@brightpath.net",
    phone: "(555) 876-5432",
    companyName: "BrightPath LLC",
    status: "Client",
    notes: "Upgraded to 50 seats.",
  },
];

export async function GET() {
  try {
    let contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (contacts.length === 0) {
      // Seed default contacts to give immediate real data
      await prisma.contact.createMany({
        data: seedContacts,
      });

      contacts = await prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(contacts);
  } catch (error: any) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts from database" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, companyName, status, notes } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First Name, Last Name and Email are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.contact.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A contact with this email already exists" },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        companyName: companyName || null,
        status: status || "Lead",
        notes: notes || null,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error: any) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create contact" },
      { status: 500 }
    );
  }
}
