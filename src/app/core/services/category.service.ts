import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CategoryService {

  private readonly _apiVersion: string = 'v1';
  private _baseUrl: string = `${environment.tavernApi}api/${this._apiVersion}/Category/`;

  constructor(private _httpClient: HttpClient) { }

  public getCategories(): Observable<Array<Category>>{
    return this._httpClient.get<Array<Category>>(this._baseUrl)
                           .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }

}
