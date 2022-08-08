import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  public loading: boolean = false;
  public product: IProduct = {} as IProduct;
  public errorMessage: string | null = null;
  public categories: ICategory[] = [] as ICategory[];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }

  public submitNewProduct() {
    this.productService.createProduct(this.product).subscribe({
      next: (data) => {
        this.router.navigate(['/']).then();
      },
      error: (error) => {
        this.errorMessage = error;
        this.router.navigate(['/products/add']).then();
      },
    });
  }
}
