// app/api/delete-image/route.js
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function DELETE(req) {
  const { url } = await req.json();

  if (!url) {
    return Response.json({ error: "URL required" }, { status: 400 });
  }

  const key = new URL(url).pathname.slice(1);

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
      }),
    );

    return Response.json({ success: true, deleted: key });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
