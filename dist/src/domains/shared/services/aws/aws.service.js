"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSService = exports.mysqlNanoidPromise = exports.nanoidPromise = exports.FileDto = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const mime_1 = __importDefault(require("mime"));
const logger_config_1 = __importDefault(require("../../../../configs/logger.config"));
// =================================
const nanoid_1 = require("nanoid");
// =================================
var S3Path;
(function (S3Path) {
    S3Path["USER_PROFILE"] = "mirrorcity/user/profile";
    S3Path["PARTS_THUMBNAIL"] = "mirrorcity/avatar/parts/thumbnail";
    S3Path["PARTS_AOS_ASSETBUNDLE"] = "mirrorcity/avatar/parts/assetbundle/aos";
    S3Path["PARTS_IOS_ASSETBUNDLE"] = "mirrorcity/avatar/parts/assetbundle/ios";
    S3Path["PARTS_WEB_ASSETBUNDLE"] = "mirrorcity/avatar/parts/assetbundle/web";
    S3Path["AVATAR_THUMBNAIL"] = "mirrorcity/avatar/thumbnail";
    S3Path["AVATAR_PRESET_THUMBNAIL"] = "mirrorcity/avatar/preset/thumbnail";
    S3Path["ROOM_THUMBNAIL"] = "mirrorcity/space/thumbnail";
    S3Path["SPACE_PRESET_THUMBNAIL"] = "mirrorcity/space/preset/thumbnail";
})(S3Path || (S3Path = {}));
// export { S3Path };
// =================================
class FileDto {
}
exports.FileDto = FileDto;
const nanoidPromise = (size) => (0, nanoid_1.customAlphabet)('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', size);
exports.nanoidPromise = nanoidPromise;
const mysqlNanoidPromise = (size) => (0, nanoid_1.customAlphabet)('0123456789abcdefghijklmnopqrstuvwxyz', size);
exports.mysqlNanoidPromise = mysqlNanoidPromise;
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
let AWSService = class AWSService {
    constructor(configService) {
        this.configService = configService;
        aws_sdk_1.default.config.update({ region: 'ap-northeast-2' });
        this.s3 = new aws_sdk_1.default.S3({});
        this.S3_BUCKET = this.configService.get('BUCKET', '');
    }
    profileUpload(fileBuffer, accId, extension) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = `${S3Path.USER_PROFILE}/${accId.toString()}.${extension}`;
                const contentType = mime_1.default.lookup(extension) || 'Application/octet-stream';
                const params = {
                    Bucket: this.S3_BUCKET,
                    Key: key,
                    Body: fileBuffer,
                    ACL: 'public-read',
                    ContentType: contentType,
                };
                yield this.s3.putObject(params).promise();
                return key;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return '';
            }
        });
    }
    fileUpload(fileBuffer, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const extension = key.split('.').pop() || '';
                const contentType = mime_1.default.lookup(extension) || 'application/octet-stream';
                const params = {
                    Bucket: this.S3_BUCKET,
                    Key: key,
                    Body: fileBuffer,
                    ACL: 'public-read',
                    ContentType: contentType,
                };
                yield this.s3.putObject(params).promise();
                return key;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return '';
            }
        });
    }
    avatarProfileUploadFromFileDto({ file, extension }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!file)
                    return ['', ''];
                const randomId = yield (0, exports.nanoidPromise)(10)();
                extension = extension || 'png';
                const fileBuffer = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                const fileName = `${randomId}.${extension}`;
                const key = `${S3Path.AVATAR_THUMBNAIL}/${fileName}`;
                const contentType = mime_1.default.lookup(extension) || 'Application/octet-stream';
                const params = {
                    Bucket: this.S3_BUCKET,
                    Key: key,
                    Body: fileBuffer,
                    ACL: 'public-read',
                    ContentType: contentType,
                };
                yield this.s3.putObject(params).promise();
                return [fileName, key];
            }
            catch (err) {
                logger_config_1.default.error(err);
                return ['', ''];
            }
        });
    }
    avatarProfileUploadFromPresetThumbnail(presetThumbnail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!presetThumbnail)
                    return ['', ''];
                const randomId = yield (0, exports.nanoidPromise)(10)();
                const fileName = `${randomId}.${presetThumbnail.split('.')[1]}`;
                const key = `${S3Path.AVATAR_THUMBNAIL}/${randomId}.${presetThumbnail.split('.')[1]}`;
                const isCopy = yield this.cpFile(presetThumbnail, key);
                if (!isCopy)
                    return ['', ''];
                return [fileName, key];
            }
            catch (err) {
                logger_config_1.default.error(err);
                return ['', ''];
            }
        });
    }
    putObject(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = `tmp/${file.originalname}`;
                // const keys = key.split('.');
                const contentType = mime_1.default.lookup(key) || 'Application/octet-stream';
                const params = {
                    Bucket: this.S3_BUCKET,
                    Key: key,
                    Body: file.buffer,
                    ACL: 'public-read',
                    ContentType: contentType,
                };
                const resultS3 = yield this.s3.putObject(params).promise();
                console.log(resultS3);
                return key;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return '';
            }
        });
    }
    getSignedUrl(uploadFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const array = [];
                uploadFiles.forEach((v) => {
                    if (!v)
                        return;
                    const files = v.split('.');
                    const fileName = files[1] ? `${files[0]}.${files[1]}` : files[0];
                    const key = `tmp/${fileName}`;
                    const contentType = mime_1.default.lookup(key) || 'Application/octet-stream';
                    const params = {
                        Bucket: this.S3_BUCKET,
                        Key: key,
                        ACL: 'public-read',
                        ContentType: contentType,
                        Expires: 120, // pre-signed URL 만료 시간 (초 단위)
                    };
                    array.push({ filePath: key, signedUrl: this.s3.getSignedUrl('putObject', params) });
                });
                return array;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return [];
            }
        });
    }
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    Bucket: this.S3_BUCKET,
                    Key: key,
                };
                yield this.s3.deleteObject(params).promise();
                return true;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return false;
            }
        });
    }
    cpFile(originKey, newKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    Bucket: this.S3_BUCKET,
                    CopySource: `${this.S3_BUCKET}/${originKey}`,
                    Key: newKey,
                    ACL: 'public-read', // Set the object access control to public-read
                };
                yield this.s3.copyObject(params).promise();
                return true;
            }
            catch (err) {
                logger_config_1.default.error(err);
                return false;
            }
        });
    }
};
AWSService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AWSService);
exports.AWSService = AWSService;
//# sourceMappingURL=aws.service.js.map