import { ApiProperty } from '@nestjs/swagger';

export class CreateContentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  recipient_name: string;

  @ApiProperty()
  word_sent: string;
}
