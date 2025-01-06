import { Test, TestingModule } from '@nestjs/testing';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { CommonModule } from 'src/common/common.module';

describe('ContentsController', () => {
  let controller: ContentsController;
  let service: ContentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [ContentsService],
      imports: [CommonModule],
    }).compile();

    controller = module.get<ContentsController>(ContentsController);
    service = module.get<ContentsService>(ContentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
