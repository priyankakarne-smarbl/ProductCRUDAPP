import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private localStorageKey='productkey'

  private product: Product[] = [];


  constructor() { 
    
  }

  
getProduct():any{
  let data=localStorage.getItem(this.localStorageKey);
  this.product= data ? JSON.parse(data):null;
  return this.product;

}

postProduct(data:any){
  this.product.push(data);
  localStorage.setItem(this.localStorageKey,JSON.stringify(this.product));
  return this.product;

}
getProductByName(name:any){
  for(let i=0;i<this.product.length;i++){
    if(name==this.product[i].productName){
      return this.product[i];
    }
  }
  return null;
}


editProduct(request:any){
  this.product=this.product.map(item =>(item.productName == request.productName ? request :item))
  localStorage.setItem(this.localStorageKey,JSON.stringify(this.product));
  return this.product;

    }

    deleteProduct(pname: any){
      for(let i=0;i<this.product.length;i++){
        if(pname==this.product[i].productName){
          this.product.splice(i,1);
          localStorage.setItem(this.localStorageKey,JSON.stringify(this.product));
        }
      }
}
// clearList(){
//   localStorage.removeItem(this.localStorageKey);
// }
}


export interface Product {
  productName:string;
  productDesc:string;
  productprice:number;
  productQuantity:number
}
