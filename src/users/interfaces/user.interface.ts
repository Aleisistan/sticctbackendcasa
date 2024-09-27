/* eslint-disable prettier/prettier */
export class User {
    id: number;
    name: string;
    institute: string;
    mail: string;
    cel: number;

    constructor(id: number, name:string, institute:string, mail:string, cel:number){
        this.id = id;
        this.name = name;
        this.institute = institute;
        this.mail = mail;
        this.cel = cel;
    }
}