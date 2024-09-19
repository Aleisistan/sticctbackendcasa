/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateWorkdoneDto } from './dto/create-workdone.dto/create-workdone.dto';
import { QueryWorkdoneDto } from './dto/create-workdone.dto/query-workdone.dto';
import { UpdateWorkdoneDto } from './dto/create-workdone.dto/update-workdone.dto';
import { WorkdoneService } from './workdone.service';

@Controller('workdone')
export class WorkdoneController {
    constructor(private readonly WorkdoneService: WorkdoneService) {}

    @Get()
    findAll(@Query() query : QueryWorkdoneDto) {
         // eslint-disable-next-line prefer-const
      let id = query.id;
      let date = query.date;
      let sortBy = query.sortBy;
      let orderBy = query.orderBy;
      return this.WorkdoneService.findAll( id, date, sortBy, orderBy);
    }
    @Get(':id')
    findOne(@Param() params) {
      return this.WorkdoneService.findOne(params.id)
    }
    @Post()
    create(@Body() createWorkdoneDto: CreateWorkdoneDto){
      return this.WorkdoneService.create(createWorkdoneDto);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() updateWorkdoneDto: UpdateWorkdoneDto)   {
      return this.WorkdoneService.update(id, updateWorkdoneDto);
    }
   
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.WorkdoneService.remove(id);
    }
}
