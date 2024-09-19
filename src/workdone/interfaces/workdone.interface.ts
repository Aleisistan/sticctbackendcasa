/* eslint-disable prettier/prettier */
export class Workdone {
    id : number;
    scheduled_date : number;
    work_done : string;
    observations : string;
    hard_required : string;
    resolution : number;

    constructor(id: number, scheduled_date: number, work_done: string, observations: string, hard_required: string, resolution: number){
        this.id = id;
        this.scheduled_date = scheduled_date;
        this.work_done = work_done;
        this.observations = observations;
        this.hard_required = hard_required;
        this.resolution = resolution;
    }
} 