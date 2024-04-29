import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsNumber,
} from "class-validator";

class Command {
  @IsNumber()
  @IsNotEmpty()
  readonly year!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly month!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly workId!: number;
}
