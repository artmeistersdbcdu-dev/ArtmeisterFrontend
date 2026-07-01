export const upload = async (img) => {
  const formData = new FormData();
  if (img.size > 5 * 1024 * 1024) {

    toast.error("File too large. Max 5MB allowed.");

    return;

  }
  formData.append("file", img);
  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const uploadDummy = async (img) => {
  console.log("Noo");
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/default.jpeg`;
  return { success: true, Url: url };
};
export const testUpload = async (img) => {
  const file = formData.get("file");
  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ error: "File too large" }, { status: 413 });
  }
  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const fileName = `${Date.now()}-${file.name}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

  return Response.json({
    success: true,
    url,
  });
};
