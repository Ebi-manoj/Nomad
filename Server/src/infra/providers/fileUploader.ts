import { IFileuploadGateway } from '../../application/providers/IFileuploadGateway';
import {
  presignedURLRequestDTO,
  presignURLResponseDTO,
} from '../../domain/dto/DocumentsDTO';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { env } from '../utils/env';
import { Stream } from 'nodemailer/lib/xoauth2';
import { v4 as uuidv4 } from 'uuid';

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
    const { fileName, fileType, type } = data;

    const key = `${type}/${uuidv4()}-${fileName}`;
    const command = new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadURL = await getSignedUrl(this.s3Client, command, {
      expiresIn: 120,
    });

    const fileURL = `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_S3_REGION}.amazonaws.com/${key}`;
    return { uploadURL, fileURL };
  }
  async getViewPresignedUrl(fileUrl: string): Promise<string> {
    const bucketBase = `https://${env.AWS_BUCKET_NAME}.s3.${env.AWS_S3_REGION}.amazonaws.com/`;
    const fileKey = fileUrl.replace(bucketBase, '');

    const command = new GetObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: fileKey,
    });

    const signedUrl = await getSignedUrl(this.s3Client, command, {
      expiresIn: 60 * 5,
    });

    return signedUrl;
  }
}
