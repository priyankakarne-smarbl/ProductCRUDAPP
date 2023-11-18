import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(uname:string,pword:string){
    if(uname==='admin@gmail.com' && pword==='admin'){
      return 200;
    }else{
    return 403;
    }
  }
}
