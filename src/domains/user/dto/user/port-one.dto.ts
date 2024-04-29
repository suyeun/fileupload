import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

class Command {
  readonly impUid!: string;
}

export class PortOneDTO {
  @IsObject()
  @IsNotEmpty()
  @Type(() => Command)
  readonly command!: Command;
}
