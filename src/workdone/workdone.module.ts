import { Module } from '@nestjs/common';
import { WorkdoneService } from './workdone.service';
import { WorkdoneController } from './workdone.controller';

@Module({
  providers: [WorkdoneService],
  controllers: [WorkdoneController]
})
export class WorkdoneModule {}
