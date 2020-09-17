import { Component, OnInit, ɵConsole } from '@angular/core';

import { IProduct } from './products';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  title: string = 'Product List';
  imageWidth: number = 50;
  imageHeigth: number = 2;
  showImage: Boolean = false;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private productService: ProductService) {}

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => {
      return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
    });
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.title = `Product List ` + message;
  }

  ngOnInit() {
    console.log('in onit');
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }
}
