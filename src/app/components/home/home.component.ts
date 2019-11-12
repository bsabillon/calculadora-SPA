import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Operation } from '../../../models/Operation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public operations: any = [];
  display: string = '';
  operationId: number;
  number1: number;
  number2: number;
  operator: string;
  result: number;
  route: string;
  operation: Operation;


  constructor(public router: Router, public dataService: DataService) { }

  ngOnInit() {
    this.getOperations();
  }


  getOperations() {
    this.dataService.getOperations().subscribe((operation: Operation) => {
      this.operations = operation;
    });
  }

  addInput(input: number) {
    
    if (this.number1 == null) {
      this.number1 = input;
    } else {
      this.number2 = input;
    }
    this.display += input;
  }

  addOperator(input: string){
   switch (input) {
    case ('+'): this.route = 'sumar'; break;
    case ('-'): this.route = 'restar';break;
    case ('*'): this.route = 'multiplicar'; break;
    case ('/'): this.route = 'dividir'; break;
    case ('^'): this.route = 'exponencial'; break;
    case ('√'): this.route = 'raiz'; break;
   }
   this.display += input;
   this.operator = input;
  }

  deleteInput() {
    this.cleanData();
  }

  cleanData(){
  this.display = '';
  this.number1 = null;
  this.number2 = 0;
  //this.operator = '';
  //this.result= null;
  //this.route = '';

  }


  addNewOperation() {
    const operation: Operation = {
      OperationId: this.operationId,
      Operator: this.operator,
      number1: this.number1,
      number2: this.number2,
      Result: this.result,
    }

    this.dataService.postnewOperation(operation, this.route).subscribe((data) => {
      this.dataService.operation = operation;
      this.operation = operation;
      console.log(data);
      this.getOperations();
      this.display = data.result.toString();
    })
  }
 



}
