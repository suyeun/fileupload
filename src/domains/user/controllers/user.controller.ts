import {
  Controller,
  Post,
  Get,
  HttpStatus,
  HttpCode,
  Body,
  Req,
  Query,
} from "@nestjs/common";

import * as USER_DTO from "../dto";
import { UserService } from "../services";
import { query } from "express";

@Controller("api/v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  //소셜로그인
  @HttpCode(HttpStatus.OK)
  @Post("/social")
  social(@Body() body: USER_DTO.UserSocialDTO) {
    return this.userService.social(body);
  }
}
