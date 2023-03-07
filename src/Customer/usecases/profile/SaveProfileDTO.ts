import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class SaveProfileDTO {
  @IsString()
  @IsNotEmpty()
  siteUsername: string;

  @IsString()
  @IsNotEmpty()
  sitePassword: string;

  @IsString()
  @IsNotEmpty()
  siteUrl: string;

  @IsString()
  @IsNotEmpty()
  commentType: string;

  @IsString()
  @IsNotEmpty()
  publishType: string;

  @IsNotEmpty()
  @IsNumber()
  commentLimit: number;
}
