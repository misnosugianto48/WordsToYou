import { ApiProperty } from '@nestjs/swagger';
import { Content } from 'prisma/prisma-client';

export class ContentEntity implements Content {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  recipient_name: string;

  @ApiProperty()
  word_sent: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
