import { IFileuploadGateway } from '../../application/providers/IFileuploadGateway';
import {
  presignedURLRequestDTO,
  presignURLResponseDTO,
} from '../../domain/dto/fileuploadDTO';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '../utils/env';
import { Stream } from 'nodemailer/lib/xoauth2';

export class S3Fileuploader implements IFileuploadGateway {
  private readonly s3Client;
  constructor() {
    this.s3Client = new S3Client({
      region: env.AWS_S3_REGION,
      credentials: {
        accessKeyId: env.AWS_S3_ACCESS_KEY,
        secretAccessKey: env.AWS_S3_SECRET_KEY,
      },
    });
  }

  async getPresignedURL(
    data: presignedURLRequestDTO
  ): Promise<presignURLResponseDTO> {
    const { fileName, fileType } = data;

    const command = new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const uploadURL = await getSignedUrl(this.s3Client, command, {
      expiresIn: 120,
    });

    const fileURL = `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
    return { uploadURL, fileURL };
  }

  async getImageBuffer(fileURL: string): Promise<Buffer | undefined> {
    const url = new URL(fileURL);
    const bucket = url.hostname.split('.')[0];
    const key = decodeURIComponent(url.pathname.substring(1));
    console.log(bucket);
    console.log(key);

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });
    let readableStream: Stream.Readable;
    try {
      const { Body } = await this.s3Client.send(command);
      readableStream = Body as Stream.Readable;
    } catch (error) {
      return undefined;
    }

    const chunks: Buffer[] = [];
    for await (const chunk of readableStream) {
      chunks.push(Buffer.from(chunk));
    }
    Buffer.concat(chunks);
    console.log(chunks);
  }
}
