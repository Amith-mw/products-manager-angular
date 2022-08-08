import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  public loading: boolean = false;
  public productId: string | null = null;
  public product: IProduct = {} as IProduct;
  public errorMessage: string | null = null;
  public categories: ICategory[] = [] as ICategory[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.activatedRoute.paramMap.subscribe({
      next: (param: ParamMap) => {
        this.productId = param.get('productId');
      },
      error: () => {},
    });

    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          this.productService.getAllCategories().subscribe({
            next: (data) => {
              this.categories = data;
            },
            error: (error) => {
              this.errorMessage = error;
            },
          });
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        },
      });
    }
  }

  public updateProduct() {
    if (this.productId) {
      this.productService
        .updateProduct(this.product, this.productId)
        .subscribe({
          next: (data) => {
            this.router.navigate(['/']).then();
          },
          error: (error) => {
            this.errorMessage = error;
            this.router.navigate([`/products/edit/${this.productId}`]).then();
          },
        });
    }
  }
}
