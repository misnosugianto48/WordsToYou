import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  recipientName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  wordSent: string;
}
