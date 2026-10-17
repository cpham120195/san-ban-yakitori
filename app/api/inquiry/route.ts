import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      eventDate,
      eventLocation,
      guestCount,
      preferredPackage,
      eventType,
      message,
    } = body;

    if (!name || !email || !phone || !eventDate || !eventLocation || !guestCount || !eventType) {
      return NextResponse.json(
        { error: "Please fill out all fields." },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Inquiries are temporarily unavailable. Please contact us by email or text." },
        { status: 503 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "San Ban Yakitori <onboarding@resend.dev>",
      to: process.env.BOOKING_TO_EMAIL || "bookings@sanbanyakitori.com",
      subject: `New San Ban Yakitori Inquiry from ${name}`,
      replyTo: email,
      text: `
New booking inquiry

Name: ${name}
Email: ${email}
Phone: ${phone}
Event Date: ${eventDate}
Event Location / City: ${eventLocation}
Guest Count: ${guestCount}
Event Type: ${eventType}
Preferred Experience: ${preferredPackage || "Not sure yet"}

Message:
${message || "No additional details provided."}
      `,
    });

    if (error) {
      console.error("Inquiry email rejected:", error);
      return NextResponse.json(
        { error: "Your inquiry could not be sent. Please try again or contact us by email or text." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry email error:", error);
    return NextResponse.json(
      { error: "Something went wrong while sending your inquiry." },
      { status: 500 }
    );
  }
}
