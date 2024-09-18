export class User {
    id: number;
    name: string;
    institute: string;
    contact: string;

    constructor(id: number, name:string, institute: string, contact: string){
        this.id = id;
        this.name = name;
        this.institute = institute;
        this.contact = contact;
    }
}