export class Order {
    id: number;
    name: string;
    institute: string;
    contact: string;
    priority: string;
    description: string;

    constructor(id: number, name:string, institute: string, contact: string, priority: string, description: string){
        this.id = id;
        this.name = name;
        this.institute = institute;
        this.contact = contact;
        this.priority = priority;
        this.description = description;
    }
}