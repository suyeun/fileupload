import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

class Command {
  readonly provider!: string;
  readonly idToken!: string;
  readonly deviceId?: string;
  readonly name?: string;
}

export class UserSocialDTO {
  @IsObject()
  @IsNotEmpty()
  @Type(() => Command)
  readonly command!: Command;
}
