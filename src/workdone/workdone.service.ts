/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkdoneDto } from './dto/create-workdone.dto/create-workdone.dto';
import { UpdateWorkdoneDto } from './dto/create-workdone.dto/update-workdone.dto';
import { Workdone } from './interfaces/workdone.interface';

@Injectable()
export class WorkdoneService {
    private workdone = [
        {
            "id": 1,
            "scheduled_date" : 120224,
            "work_done": "cambio placa de video",
            "observations": "para administrar mejor los recursos del cpu",
            "hard_required": "rx 3090 provista por usuario",
            "resolution": 10
        },
        {
            "id": 2,
            "scheduled_date" : 120223,
            "work_done": "formateo y cambio de fuente",
            "observations": "se instalo win10 en disco nvme y se cambio fuente",
            "hard_required": "disco nvme provisto por usuario. Fuente provista por CCT",
            "resolution": 10
        }
    ] ;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findAll(id: number, scheduled_date: number, sortBy: string, oderBy: number)  {
        let queryWorkdone = [];
        if(!id){
            queryWorkdone = this.workdone;
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            queryWorkdone = this.workdone.filter(function(workdone){
                return workdone.id == id;

        });
        if(!scheduled_date){
            queryWorkdone = this.workdone;
    
    }
    else {
        queryWorkdone = this.workdone.filter(function(workdone){
            return workdone.scheduled_date == scheduled_date;
    
    });
    
    
        }
        }
        if(!sortBy) {
            return queryWorkdone;
        }
            let orderedWorkdone = queryWorkdone.sort(function(a, b) {
            let OrdenarA = a[sortBy];
            let OrdenarB = b[sortBy];
            if(OrdenarA < OrdenarB) {
                return -1;
            }
            if(OrdenarA == OrdenarB){
                return 0;
            }
            return 1;
        })
        return orderedWorkdone;
    
    }
    
        findOne(id: any) {
            return this.workdone.find(function(workdone){
                return workdone.id == id;
            });
        }
        create(CreateWorkdoneDto: CreateWorkdoneDto) {
            // eslint-disable-next-line prefer-const
            let nextId = this.workdone[this.workdone.length-1].id +1;
            let workdone = new Workdone(nextId, CreateWorkdoneDto.scheduled_date, CreateWorkdoneDto.work_done, CreateWorkdoneDto.observations, CreateWorkdoneDto.hard_required, CreateWorkdoneDto.resolution);
            this.workdone.push(workdone);
            return workdone;
        }
        update(id: number, updateWorkdoneDto: UpdateWorkdoneDto): Workdone {
            let workdone = this.findOne(id);
            workdone.scheduled_date = updateWorkdoneDto.scheduled_date;
            workdone.work_done = updateWorkdoneDto.work_done;
            workdone.observations = updateWorkdoneDto.observations;
            workdone.hard_required = updateWorkdoneDto.hard_required;
            workdone.resolution = updateWorkdoneDto.resolution;
            return workdone;
        }
        remove(id: number) {
            let workdone = this.findOne(id);
            if(!workdone) 
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
            let pos = this.workdone.indexOf(workdone)
            this.workdone.splice(pos, 1);
               
          }
}
