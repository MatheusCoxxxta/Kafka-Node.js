import AWS from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

interface ICredentials {
  accessKeyId: string;
  secretAccessKey: string;
}

class FileUpload {
  async execute(fileName: string): Promise<string> {
    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      } as ICredentials,
    });

    const body = fs.readFileSync(`tmp/${fileName}`);

    const params = {
      Bucket: "certificates-application",
      Key: fileName,
      Body: body,
      ACL: "public-read",
      ContentType: "application/pdf",
    };

    const options = { partSize: 10 * 1024 * 1024, queueSize: 1 };

    const response = await s3.upload(params, options).promise();

    return response.Location;
  }
}

export { FileUpload };
