import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Operation } from '../../models/Operation';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public operation: Operation;

  headers = new HttpHeaders({'Content-Type' : 'application/json'});
  public endpoint = 'http://localhost:5000/calculadora/api';


  constructor(private http: HttpClient, public router: Router) { }


  getOperations() {
    return this.http.get(`${this.endpoint}/`);
  }

  postnewOperation(operation: Operation, route: string) {
    return this.http.post(`${this.endpoint}/${route}`, operation, {responseType: 'json'});
  }

}
