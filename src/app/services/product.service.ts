import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private serverUrl: string = `http://localhost:9000`; // json-server url

  constructor(private httpClient: HttpClient) {}

  // GET ALL PRODUCTS
  public getAllProducts(): Observable<IProduct[]> {
    let dataURL: string = `${this.serverUrl}/products`;
    return this.httpClient
      .get<IProduct[]>(dataURL)
      .pipe(catchError(this.handleError));
  }

  // GET SINGLE PRODUCT
  public getProduct(productId: string): Observable<IProduct> {
    let dataURL: string = `${this.serverUrl}/products/${productId}`;
    return this.httpClient
      .get<IProduct>(dataURL)
      .pipe(catchError(this.handleError));
  }

  // CREATE A PRODUCT
  public createProduct(product: IProduct): Observable<IProduct> {
    let dataURL: string = `${this.serverUrl}/products`;
    return this.httpClient
      .post<IProduct>(dataURL, product)
      .pipe(catchError(this.handleError));
  }

  // UPDATE PRODUCT
  public updateProduct(
    product: IProduct,
    productId: string
  ): Observable<IProduct> {
    let dataURL: string = `${this.serverUrl}/products/${productId}`;
    return this.httpClient
      .put<IProduct>(dataURL, product)
      .pipe(catchError(this.handleError));
  }

  // DELETE PRODUCT
  public deleteProduct(productId: string): Observable<{}> {
    let dataURL: string = `${this.serverUrl}/products/${productId}`;
    return this.httpClient
      .delete<{}>(dataURL)
      .pipe(catchError(this.handleError));
  }

  // GET ALL CATEGORIES
  public getAllCategories(): Observable<ICategory[]> {
    let dataURL: string = `${this.serverUrl}/categories`;
    return this.httpClient
      .get<ICategory[]>(dataURL)
      .pipe(catchError(this.handleError));
  }

  // GET SINGLE CATEGORY
  public getCategory(product: IProduct): Observable<ICategory> {
    let dataURL: string = `${this.serverUrl}/categories/${product.categoryId}`;
    return this.httpClient
      .get<ICategory>(dataURL)
      .pipe(catchError(this.handleError));
  }

  // ERROR HANDLING
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';

    if (error.error instanceof ErrorEvent) {
      // client error
      errorMessage = `Error : ${error.error.message}`;
    } else {
      // server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
