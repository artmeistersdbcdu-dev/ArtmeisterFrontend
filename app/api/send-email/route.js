import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { to, resetURL } = await req.json();
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ArtMeister <onboarding@resend.dev>",
        to,
        subject: "Reset your password",
        html: `<a href="${resetURL}">Reset Password</a>`,
      }),
    });

    const data = await res.text(); // IMPORTANT

    if (!res.ok) {
      console.log("RESEND ERROR:", data);
      return NextResponse.json(
        { error: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.log("ROUTE ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}