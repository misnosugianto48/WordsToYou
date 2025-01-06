import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  recipient_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  word_sent: string;
}
