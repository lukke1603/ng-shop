import { Identifiable } from "src/app/shared/identifiable";
import { Category } from "../categories/category.model";



export class Product implements Identifiable{
  public _id: string|number;
  public name: string;
  public imagePath: string;
  public category: string;
  public price: number;
  public producer: string;


  constructor(name: string, imagePath: string, category: string, price: number, producer: string){
    this.name = name;
    this.imagePath = imagePath;
    this.category = category;
    this.price = price;
    this.producer = producer;
  }
}
