import { Identifiable } from "src/app/shared/identifiable";

export class Category implements Identifiable{
  _id: number;
  name: string;
  description: string;

  constructor(name: string, description: string){
    this.name = name;
    this.description = description;
  }
}
