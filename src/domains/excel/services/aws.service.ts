import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import AWS_SDK from "aws-sdk";
import mime from "mime";
import { nanoid } from "nanoid";

enum S3Path {
  THUMBNAIL = "test/thumbnail",
}

// TODO: make this class methods async
@Injectable()
export class AWSService {
  private readonly s3: AWS_SDK.S3;
  private readonly S3_BUCKET: string;

  constructor(private readonly configService: ConfigService) {
    AWS_SDK.config.update({
      region: "ap-northeast-2",
      credentials: {
        accessKeyId: this.configService.get<string>("AWS_ACCESS_KEY_ID", ""),
        secretAccessKey: this.configService.get<string>(
          "AWS_SECRET_ACCESS_KEY",
          ""
        ),
      },
    });
    this.s3 = new AWS_SDK.S3({});
    this.S3_BUCKET = this.configService.get<string>("AWS_S3_BUCKET", "");
  }

  public async fileUpload(fileBuffer: Buffer, key: string): Promise<string> {
    try {
      const extension = key.split(".").pop() || "";
      const contentType = mime.lookup(extension) || "application/octet-stream";
      const params = {
        Bucket: this.S3_BUCKET,
        Key: key,
        Body: fileBuffer,
        ACL: "public-read", // Set the object access control to public-read
        ContentType: contentType,
      };
      await this.s3.putObject(params).promise();
      return key;
    } catch (err) {
      return "";
    }
  }

  //space object 썸네일, 아바타 프리셋 썸네일, 아바타 object 썸네일 업로드
  //업로드 경로 env로 관리하도록 수정해야함 10.06
  //cms에서 개발 중
  public async imgUploadFromFileDto(file: any): Promise<string[]> {
    try {
      if (!file) return ["", ""];

      const extension = "png";
      const customName =
        `${file.originalname}`.split(".")[0] || file.originalname;
      const nano = nanoid(10);
      const fileName = `${customName}.${extension}`;
      const contentType = mime.lookup(extension) || "Application/octet-stream";
      const key = `images/${fileName}`.replace(/ /g, "");
      console.log("!!!!!!", this.S3_BUCKET, "/", key);
      const params = {
        Bucket: this.S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ACL: "public-read",
        ContentType: contentType,
      };

      await this.s3.putObject(params).promise();
      console.log("Uploaded in:", key, this.S3_BUCKET);
      return [customName, key];
    } catch (err) {
      console.log("err", err);
      return ["", ""];
    }
  }
}
