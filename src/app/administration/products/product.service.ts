import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "../categories/category.model";
import { Product } from "./product.model";
import { map, tap } from 'rxjs/operators';

// const categoryKeller = new Category(1, 'Kellerabläufe', 'Ein Kellerablauf eignet sich für Waschküchen oder andere Räume im Keller, in denen mit Wasser hantiert wird. In der Waschküche sollte unbedingt ein Kellerablauf installiert sein. Tritt bei der Waschmaschine einmal Wasser aus, läuft das Wasser problemlos ab. Der Kellerablauf schützt nicht nur vor Wasserschäden, sondern ermöglicht auch das komfortable Entsorgen von Schmutzwasser nach dem Putzen. Viele Kellerabläufe sind mit einer Rückstausicherung ausgestattet, welche verhindert, dass bei starkem Regen Wasser in den Keller gedrückt wird. Dieser Verschluss schützt auch bedingt vor Hochwasser.');
// const categoryDachfenster = new Category(1, 'Dachfenster', 'Wie stellen Sie sich Ihren perfekten Dachraum vor? Mit viel Tageslicht, einem optimalen Luftaustausch, einem angenehmen Klima und einem tollen Ausblick? Dann sind die Dachfenster von BENZ24 genau richtig, denn wir bieten für jeden Anwendungszweck die passende Lösung: Holz oder Kunststoff, elektrisch oder manuell und 1 bis 3-fach Verglasung für Alt- und Neubauten. Durch unser großes Logistikzentrum können wir nicht nur eine kurze Lieferzeit, sondern auch Marken und Eigenmarken zu top Preisen garantieren. Bestellen Sie jetzt Ihr perfektes Dachfenster mit passendem Eindeckrahmen und Innenfutter.');

// const products: Product[] = [
//   new Product(
//     'ACO Kellerablauf Junior Rückstausicherung',
//     'https://benz24.de/media/catalog/product/cache/1/image/330x/9df78eab33525d08d6e5fb8d27136e95/a/c/aco-kellerablauf-junior.jpg',
//     '',
//     143.00,
//     'ACO'
//   ),
//   new Product(
//     'KESSEL Kellerablauf Drehfix Rückstausicherung Bodenablauf',
//     'https://benz24.de/media/catalog/product/cache/1/image/330x/9df78eab33525d08d6e5fb8d27136e95/2/7/27301_f.jpg',
//     '',
//     109.95,
//     'KESSEL'
//   ),
//   new Product(
//     'KESSEL Kellerablauf Practicus Auslauf seitlich 150x150 mm Bodenablauf',
//     'https://benz24.de/media/catalog/product/cache/1/image/330x/9df78eab33525d08d6e5fb8d27136e95/4/5/45110.jpg',
//     '',
//     36.70,
//     'KESSEL'
//   ),
// ]


@Injectable({providedIn: 'root'})
export class ProductService {

  private products: Product[] = [];
  productsChanged = new Subject<Product[]>();


  constructor(
    private http: HttpClient
  ){}



  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice());
  }


  storeProducts(products: Product[]){
    return this.http.put<Product[]>(`${environment.firebaseApiUrl}products.json`, products);
  }


  updateProduct(index: number, product: Product){
    this.products[index] = product;
    return this.storeProducts(this.products).pipe(
      tap((products) => {
        this.products = products;
        this.productsChanged.next(this.products.slice());
      })
    )
  }


  addProduct(product: Product){
    let index = this.products.push(product) - 1;
    product._id = index;

    return this.storeProducts(this.products).pipe(
      tap(products => {
        this.products = products;
        this.productsChanged.next(this.products.slice());
      })
    )
  }


  removeProduct(index: number){
    this.products = this.products.filter((product, indexArray) => {
      return +index !== +indexArray;
    });

    return this.storeProducts(this.products).pipe(
      tap(products => {
        this.products = products;
        this.productsChanged.next(this.products.slice());
      })
    )
  }


  fetchProducts() {
    // this.storeProducts(products);

    return this.http.get<Product[]>(`${environment.firebaseApiUrl}products.json`).pipe(
      map(products => {
        let newProducts = [];
        for(let index in products){
          newProducts[index] = {
            ...products[index],
            _id: index
          };
        }

        return newProducts;
      }),
      tap(products => {
        this.setProducts(products);
      }),
    )
  }


  getProducts(){

    // this.http.post(`${environment.firebaseApiUrl}categories.json`, categoryKeller).subscribe(resData => {
    //   console.log(resData);
    // })

    // for(let p of products) {
    //   this.http.post(`${environment.firebaseApiUrl}products.json`, p).subscribe();
    // }


    return this.products.slice();
  }


  getProduct(index: number) {
    return this.products[index];
  }


}
