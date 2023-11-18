import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators, FormControl } from '@angular/forms';
import { ApiService ,Product} from '../service/api.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productForm !: FormGroup;
  modalLabel: String="Add";
  data:any;
  product: Product[] = [];
  clicked=false;
 

 
  constructor(private formBuilder:FormBuilder,private router: Router, private api:ApiService
    ,private modalService: NgbModal,private toastr: ToastrService
    ){}

  ngOnInit(): void{
  this.loadForm();
this.data= this.getAllProduct();

 


  
  }

  loadForm(){
    this.productForm= new FormGroup({
      productName : new FormControl("",Validators.required),
      productprice : new FormControl("",Validators.required),
      productDesc : new FormControl("",Validators.required),
      productQuantity : new FormControl("",Validators.required)

    })

  }
  create(content: any) {
    this.loadForm()
     this.clicked=true;
    this.modalLabel = "Add";
    this.modalService
      .open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: "modal-basic-title" })
      .result.then(
      );
  }
  onSubmit(){
    if(this.productForm.valid){
      let requestBody={
        "productName":this.productForm.get('productName')?.value,
        "productprice":this.productForm.get('productprice')?.value,
        "productDesc":this.productForm.get('productDesc')?.value,
        "productQuantity":this.productForm.get('productQuantity')?.value
      }
  
      this.api.postProduct(requestBody)
      {
        this.modalService.dismissAll();
        this.toastr.success("Product added successfully", '');
        this.clicked=false;
        
       
        this.getAllProduct();
      } 
      error:()=>{
          alert("Error while adding the product")
          
        }
      
    }
  
  }

  getAllProduct(){
  this.product=this.api.getProduct();
   }

  onUpdate(){
    this.productForm.markAllAsTouched();
    let requestBody={
      "productName":this.productForm.get('productName')?.value,
      "productprice":this.productForm.get('productprice')?.value,
      "productDesc":this.productForm.get('productDesc')?.value,
      "productQuantity":this.productForm.get('productQuantity')?.value
    }
    if(this.productForm.valid){
    this.api.editProduct(requestBody);
    this.modalService.dismissAll();
    this.toastr.success("Product updated successfully",'');
    this.getAllProduct();
     }}


  edit(content:any,f:any){
    this.loadForm()
    this.modalLabel = "Edit";
    this.modalService
      .open(content, { size: 'lg', backdrop: 'static', ariaLabelledBy: "modal-basic-title" })
      .result.then(
      );
   let name=f.productName;
   let productdata=this.api.getProductByName(f.productName);
   console.log(productdata);
   this.productForm.get("productName")?.setValue(productdata?.productName);
   this.productForm.get("productprice")?.setValue(productdata?.productprice);
   this.productForm.get("productDesc")?.setValue(productdata?.productDesc);
   this.productForm.get("productQuantity")?.setValue(productdata?.productQuantity);


  }
  delete(f:any){
    this.api.deleteProduct(f.productName);
    this.toastr.success("Product Deleted  successfully",'');
    this.getAllProduct();


  }
  closeModel(){
    this.clicked=false;
    this.modalService.dismissAll();
  }

  onLogout() {
    
    this.router.navigate(['/login']);
  }

}
