import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";
import { UserRepository } from "../../user/repositories/user.repository";
import { Reflector } from "@nestjs/core";
import { objectToJson } from "../../../utils";

const logger = new Logger("TokenAuthGuard");

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userRepository: UserRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization =
      request.headers.accesstoken || request.headers["accessToken"];
    return true;
    try {
      logger.debug(
        `TokenAuthGuard parse : ${request.url} / ${objectToJson(
          request.originalUrl
        )}`
      );
      // if (request.url === '/sample/login') return true;
      // else return false;
      if (authorization) {
        request.headers["accId"] = "1";
        return true;
        //const user = await this.userRepository.checkToken(authorization);
        //if (user) {
        //  request.headers["adminId"] = user.id.toString();
        //  return true;
        //}
      }
      const accessToken = request.body.accessToken;
      if (accessToken) {
        const user = await this.userRepository.checkToken(accessToken);
        logger.debug("userToken:", user, accessToken);
        if (!user) {
          return false;
        }
        //request.headers["accId"] = user.id.toString();
        return true;
      }
      return false;
    } catch (e) {
      logger.error("redis error", e);
      throw e;
    }
  }
}
