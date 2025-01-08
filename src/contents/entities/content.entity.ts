import { ApiProperty } from '@nestjs/swagger';
export class ContentEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  recipientName: string;

  @ApiProperty()
  wordSent: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
