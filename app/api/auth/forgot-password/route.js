import crypto from "crypto";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        {
          Success: false,
          Data: { Error: "Email is required" },
        },
        { status: 400 }
      );
    }
    const userRes = await query("SELECT id, name FROM users WHERE email = $1", [
      email,
    ]);

    if (userRes.rowCount === 0) {
      return Response.json(
        {
          Success: false,
          Data: { Error: "No account found with this email" },
        },
        { status: 404 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");

    // Token expires in 1 hour
    const expires = new Date(Date.now() + 3600000); // 1 hour

    // Save reset token and expiration to the database
    await query(
      "UPDATE users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3",
      [token, expires, email]
    );

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/reset-password?token=${token}`;

    return Response.json({
      Success: true,
      Data: {
        message: "If an account with that email exists, we have sent password reset instructions.",
        email,
        resetLink,
      },
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return Response.json(
      {
        Success: false,
        Data: { Error: error.message || "Failed to process forgot password request" },
      },
      { status: 500 }
    );
  }
}
