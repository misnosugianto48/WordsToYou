import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ContentsController],
  providers: [ContentsService],
  imports: [CommonModule],
})
export class ContentsModule {}
