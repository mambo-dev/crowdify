import { S3, config } from "aws-sdk";

config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function uploadFileTos3(file: File) {
  const params = {
    Bucket: "crowdify-bucket",
    Key: file.name,
    Body: file, // Assuming `file` is an object with `name` and `data` properties
    ACL: "public-read", // Set the ACL to public-read to make the uploaded object publicly accessible
  };

  try {
    await s3.putObject(params).promise();

    const url = `https://${params.Bucket}.s3.amazonaws.com/${encodeURIComponent(
      params.Key
    )}`;
    return url;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
