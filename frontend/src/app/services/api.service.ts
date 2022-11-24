import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduto(data : any){
    return this.http.post<any>("http://127.0.0.1:8000/api/companies/",data);
  }

  getProduto(){
    return this.http.get<any>("http://127.0.0.1:8000/api/companies/");
  }

  putProduto(data: any,id : number){
    return this.http.put<any>("http://127.0.0.1:8000/api/companies/"+id,data);
  }

  deleteProduto(id: number){
    return this.http.delete<any>("http://127.0.0.1:8000/api/companies/"+id);
  }
}
