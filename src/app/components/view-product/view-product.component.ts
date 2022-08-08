import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  public loading: boolean = false;
  public productId: string | null = null;
  public product: IProduct = {} as IProduct;
  public errorMessage: string | null = null;
  public category: ICategory = {} as ICategory;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.productId = param.get('productId');
      },
    });
    if (this.productId) {
      this.loading = true;
      this.productService.getProduct(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
          this.productService.getCategory(data).subscribe({
            next: (data: ICategory) => {
              this.category = data;
            },
          });
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        },
      });
    }
  }

  public isNotEmpty() {
    return Object.keys(this.product).length > 0;
  }
}
