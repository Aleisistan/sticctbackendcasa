import { Test, TestingModule } from '@nestjs/testing';
import { WorkdoneService } from './workdone.service';

describe('WorkdoneService', () => {
  let service: WorkdoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkdoneService],
    }).compile();

    service = module.get<WorkdoneService>(WorkdoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
