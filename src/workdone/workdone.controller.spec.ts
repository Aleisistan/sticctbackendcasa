import { Test, TestingModule } from '@nestjs/testing';
import { WorkdoneController } from './workdone.controller';

describe('WorkdoneController', () => {
  let controller: WorkdoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkdoneController],
    }).compile();

    controller = module.get<WorkdoneController>(WorkdoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
