import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ContentsModule } from './contents/contents.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ContentsModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
