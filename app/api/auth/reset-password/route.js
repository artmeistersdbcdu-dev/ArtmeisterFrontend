import bcrypt from "bcryptjs";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return Response.json(
        {
          Success: false,
          Data: { Error: "Token and password are required" },
        },
        { status: 400 }
      );
    }

    // Find the user by token
    const userRes = await query(
      "SELECT id, reset_token_expires FROM users WHERE reset_token = $1",
      [token]
    );

    if (userRes.rowCount === 0) {
      return Response.json(
        {
          Success: false,
          Data: { Error: "Invalid or expired reset token" },
        },
        { status: 400 }
      );
    }

    const user = userRes.rows[0];

    // Check expiration
    if (new Date(user.reset_token_expires) < new Date()) {
      return Response.json(
        {
          Success: false,
          Data: { Error: "Reset token has expired" },
        },
        { status: 400 }
      );
    }

    // Hash the password using bcrypt (matching Go's bcrypt implementation)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password and clear token fields
    await query(
      "UPDATE users SET password = $1, reset_token = NULL, reset_token_expires = NULL WHERE id = $2",
      [hashedPassword, user.id]
    );

    return Response.json({
      Success: true,
      Data: {
        message: "Password reset successfully. You can now log in.",
      },
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return Response.json(
      {
        Success: false,
        Data: { Error: error.message || "Failed to reset password" },
      },
      { status: 500 }
    );
  }
}
