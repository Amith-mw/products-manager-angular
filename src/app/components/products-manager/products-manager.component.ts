import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.css'],
})
export class ProductsManagerComponent implements OnInit {
  public loading: boolean = false;
  public products: IProduct[] = [];
  public errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProductsFromServer();
  }

  public getAllProductsFromServer() {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (data: IProduct[]) => {
        this.products = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.loading = false;
      },
    });
  }

  public deleteProductHandler(productId: string | undefined) {
    if (productId) {
      this.productService.deleteProduct(productId).subscribe({
        next: (data) => {
          this.getAllProductsFromServer();
        },
        error: (error) => {
          this.errorMessage = error;
        },
      });
    }
  }
}
