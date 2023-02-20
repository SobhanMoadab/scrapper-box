import { IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';

export class SaveEventsDTO {
  @IsString()
  @IsNotEmpty()
  comments: string[];

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
