import { IsInt, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly url: string;

  @IsInt()
  readonly size: number;

  @IsString()
  readonly type: string;
}
