import { Component, computed, effect, signal } from '@angular/core';
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
  <div [style.color]='color()' >Extended Price: {{exPrice() | currency }}</div>
  `,
})
export class App {
  name = 'Angular';
  quantity = signal(1);
  qtyAvailable = signal([1, 2, 3, 4, 5]);
  selectedProduct = signal<Product>({ id: 5, name: 'pot', price: 12 });

  exPrice = computed(() => this.selectedProduct().price * this.quantity());
  color = computed(() => this.exPrice() > 50 ? 'green': 'blue');
  constructor() {
    console.log('Constructor', this.quantity());
    effect(() => console.log('In effect',this.quantity()));
  }
  onQunatitySelected(qty: number) {
    this.quantity.set(qty);
    // this.quantity.set(22);
    // this.quantity.set(100);
  }
}
export interface Product {
  id: number;
  name: string;
  price: number;
}
bootstrapApplication(App);
