import { IsString, IsNotEmpty } from 'class-validator';

export class ProfileDTO {
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
}
