import {
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import {
  WordPressPostComment,
  WordPressProductComment,
} from '../../../usecases/transferComments/TransferCommentDTO';

export class SaveCommentsDTO {
  @IsArray()
  @IsNotEmpty()
  comments: Array<WordPressPostComment | WordPressProductComment>;

  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @IsString()
  @IsEnum(['WEEKLY', 'DAILY'])
  publishTime: string;
}
