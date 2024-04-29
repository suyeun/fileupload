import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS_SDK from 'aws-sdk';
import mime from 'mime';

import logger from '../../../../configs/logger.config';
// =================================
import { customAlphabet } from 'nanoid';

// =================================
enum S3Path {
  USER_PROFILE = 'mirrorcity/user/profile',
  PARTS_THUMBNAIL = 'mirrorcity/avatar/parts/thumbnail',
  PARTS_AOS_ASSETBUNDLE = 'mirrorcity/avatar/parts/assetbundle/aos',
  PARTS_IOS_ASSETBUNDLE = 'mirrorcity/avatar/parts/assetbundle/ios',
  PARTS_WEB_ASSETBUNDLE = 'mirrorcity/avatar/parts/assetbundle/web',
  AVATAR_THUMBNAIL = 'mirrorcity/avatar/thumbnail',
  AVATAR_PRESET_THUMBNAIL = 'mirrorcity/avatar/preset/thumbnail',
  ROOM_THUMBNAIL = 'mirrorcity/space/thumbnail',
  SPACE_PRESET_THUMBNAIL = 'mirrorcity/space/preset/thumbnail',
}

// export { S3Path };
// =================================
export class FileDto {
  file?: string;
  fileName?: string;
  extension?: string;
}

export const nanoidPromise = (size: number) =>
  customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', size);

export const mysqlNanoidPromise = (size: number) => customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', size);

// https://www.npmjs.com/package/aws-sdk
// https://www.npmjs.com/package/@aws-sdk/client-ses

// https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html
// https://www.freecodecamp.org/news/how-to-upload-files-to-aws-s3-with-node/

// https://www.npmjs.com/package/@aws-sdk/client-s3
// https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/upload-objects.html

// [file upload]
// https://songsong.dev/entry/S3%EC%97%90-%ED%8C%8C%EC%9D%BC%EC%9D%84-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EB%8A%94-%EC%84%B8-%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95

// https://inpa.tistory.com/entry/AWS-SDK-%F0%9F%91%A8%F0%9F%8F%BB%E2%80%8D%F0%9F%92%BB-Nodejs-%EC%97%B0%EB%8F%99-%EB%B0%8F-SDK-%EA%B8%B0%EB%B3%B8-%EC%82%AC%EC%9A%A9%EB%B2%95

// TODO: make this class methods async
@Injectable()
export class AWSService {
  // private readonly cloudFront = new AWS_SDK.CloudFront();
  // private readonly client = new AWS.S3({ region: "REGION" });
  private readonly s3: AWS_SDK.S3;

  private readonly S3_BUCKET: string;

  constructor(private readonly configService: ConfigService) {
    AWS_SDK.config.update({ region: 'ap-northeast-2' });
    this.s3 = new AWS_SDK.S3({});
    this.S3_BUCKET = this.configService.get<string>('BUCKET', '');
  }

  public async profileUpload(fileBuffer: Buffer, accId: number, extension: string): Promise<string> {
    try {
      const key = `${S3Path.USER_PROFILE}/${accId.toString()}.${extension}`;
      const contentType = mime.lookup(extension) || 'Application/octet-stream';
      const params = {
        Bucket: this.S3_BUCKET,
        Key: key,
        Body: fileBuffer,
        ACL: 'public-read', // Set the object access control to public-read
        ContentType: contentType,
      };
      await this.s3.putObject(params).promise();
      return key;
    } catch (err) {
      logger.error(err);
      return '';
    }
  }

  public async fileUpload(fileBuffer: Buffer, key: string): Promise<string> {
    try {
      const extension = key.split('.').pop() || '';
      const contentType = mime.lookup(extension) || 'application/octet-stream';
      const params = {
        Bucket: this.S3_BUCKET,
        Key: key,
        Body: fileBuffer,
        ACL: 'public-read', // Set the object access control to public-read
        ContentType: contentType,
      };
      await this.s3.putObject(params).promise();
      return key;
    } catch (err) {
      logger.error(err);
      return '';
    }
  }

  public async avatarProfileUploadFromFileDto({ file, extension }: FileDto): Promise<string[]> {
    try {
      if (!file) return ['', ''];
      const randomId = await nanoidPromise(10)();
      extension = extension || 'png';

      const fileBuffer = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const fileName = `${randomId}.${extension}`;
      const key = `${S3Path.AVATAR_THUMBNAIL}/${fileName}`;
      const contentType = mime.lookup(extension) || 'Application/octet-stream';
      const params = {
        Bucket: this.S3_BUCKET,
        Key: key,
        Body: fileBuffer,
        ACL: 'public-read', // Set the object access control to public-read
        ContentType: contentType,
      };
      await this.s3.putObject(params).promise();
      return [fileName, key];
    } catch (err) {
      logger.error(err);
      return ['', ''];
    }
  }

  public async avatarProfileUploadFromPresetThumbnail(presetThumbnail: string): Promise<string[]> {
    try {
      if (!presetThumbnail) return ['', ''];

      const randomId = await nanoidPromise(10)();

      const fileName = `${randomId}.${presetThumbnail.split('.')[1]}`;
      const key = `${S3Path.AVATAR_THUMBNAIL}/${randomId}.${presetThumbnail.split('.')[1]}`;
      const isCopy = await this.cpFile(presetThumbnail, key);

      if (!isCopy) return ['', ''];

      return [fileName, key];
    } catch (err) {
      logger.error(err);
      return ['', ''];
    }
  }

  public async putObject(file: Express.Multer.File): Promise<string> {
    try {
      const key = `tmp/${file.originalname}`;
      // const keys = key.split('.');
      const contentType = mime.lookup(key) || 'Application/octet-stream';
      const params = {
        Bucket: this.S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read', // Set the object access control to public-read
        ContentType: contentType,
      };
      const resultS3 = await this.s3.putObject(params).promise();
      console.log(resultS3);

      return key;
    } catch (err) {
      logger.error(err);
      return '';
    }
  }

  public async getSignedUrl(uploadFiles: string[]): Promise<object[]> {
    try {
      const array: object[] = [];
      uploadFiles.forEach((v: string) => {
        if (!v) return;
        const files = v.split('.');
        const fileName = files[1] ? `${files[0]}.${files[1]}` : files[0];
        const key = `tmp/${fileName}`;
        const contentType = mime.lookup(key) || 'Application/octet-stream';
        const params = {
          Bucket: this.S3_BUCKET,
          Key: key,
          ACL: 'public-read', // Set the object access control to public-read
          ContentType: contentType,
          Expires: 120, // pre-signed URL 만료 시간 (초 단위)
        };
        array.push({ filePath: key, signedUrl: this.s3.getSignedUrl('putObject', params) });
      });

      return array;
    } catch (err) {
      logger.error(err);
      return [];
    }
  }

  public async remove(key: string): Promise<boolean> {
    try {
      const params = {
        Bucket: this.S3_BUCKET,
        Key: key,
      };
      await this.s3.deleteObject(params).promise();
      return true;
    } catch (err) {
      logger.error(err);
      return false;
    }
  }

  public async cpFile(originKey: string, newKey: string): Promise<boolean> {
    try {
      const params = {
        Bucket: this.S3_BUCKET,
        CopySource: `${this.S3_BUCKET}/${originKey}`,
        Key: newKey,
        ACL: 'public-read', // Set the object access control to public-read
      };
      await this.s3.copyObject(params).promise();
      return true;
    } catch (err) {
      logger.error(err);
      return false;
    }
  }
}
