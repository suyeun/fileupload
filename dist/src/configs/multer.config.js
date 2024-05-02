"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const multer = __importStar(require("multer"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('MulterOptions');
const pathMaker = (directory) => {
    const uploadPath = path.join(__dirname, '../../uploads/', directory ? `${directory}/` : '');
    if (fs.existsSync(uploadPath))
        return;
    fs.mkdirSync(uploadPath, { recursive: true });
    logger.warn(`path create : ${uploadPath}`);
};
const storageService = (directory) => {
    if (directory)
        pathMaker(directory);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return multer.diskStorage({
        destination(req, file, cb) {
            const request = req;
            const requestFile = file;
            const uploadPath = path.join(__dirname, '../../uploads/', directory ? `${directory}/` : '');
            cb(null, uploadPath);
        },
        filename(req, file, cb) {
            const request = req;
            const requestFile = file;
            const ext = path.extname(file.originalname);
            const targetFileName = `${path.basename(file.originalname, ext)}_${Date.now()}${ext}`;
            // logger.debug(`REQ FILE : ${targetFileName}, ${file.originalname}`);
            cb(null, targetFileName);
        },
    });
};
const multerOptions = (directory) => {
    return {
        storage: storageService(directory),
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB : 전송 제한
    };
};
exports.multerOptions = multerOptions;
//# sourceMappingURL=multer.config.js.map