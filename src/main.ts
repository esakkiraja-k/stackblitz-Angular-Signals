import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  standalone: true,
  template: `
  <h1>Shopping Cart <h1>
    <select 
    [ngModel] = "quantity()"
    (ngModelChange) = "onQunatitySelected($event)">
    <option disabled value=""> --select quantity</option>
    <option *ngFor ="let q of qtyAvailable()">{{q}}</option>
    </select>
  <div>{{ quantity() }} </div>
  <div>Product: {{selectedProduct().name}}</div>
  <div>Product: {{selectedProduct().price}}</div>
  `,
})
export class App {
  name = 'Angular';
  quantity = signal(1);
  qtyAvailable = signal([1, 2, 3, 4, 5]);
  selectedProduct = signal<Product>({ id: 5, name: 'pot', price: 12 });

  constructor() {
    console.log('Constructor', this.quantity());
  }
  onQunatitySelected(qty: number) {}
}
export interface Product {
  id: number;
  name: string;
  price: number;
}
bootstrapApplication(App);
