import { Test, TestingModule } from '@nestjs/testing';
import { ContentsService } from './contents.service';
import { PrismaService } from 'src/common/prisma.service';
import { CommonModule } from 'src/common/common.module';

describe('ContentsService', () => {
  let service: ContentsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentsService],
      imports: [CommonModule],
    }).compile();

    service = module.get<ContentsService>(ContentsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
  });
});
