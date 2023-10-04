import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Globals } from '../constant/globals';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  //public loginUser = localStorage.getItem('loginUser');
  public config = {};
  public userData: any = {};
  public loading: any;

  constructor(public http: HttpClient, public router: Router) { }

  getHtml(api: string, reqBody: any = {}): Observable<any> {
    let contentHeaders = new HttpHeaders();
    contentHeaders.append('Accept', 'html/text');
    contentHeaders.append('Content-Type', 'html/text');

    const queryParam = Globals.jsonToQueryString(reqBody);
    return this.http.get(api + '?' + queryParam, {
      headers: contentHeaders,
      responseType: 'text',
    });
  }

  getAll(api: string, reqBody: any = {}): Observable<any> {
    return this.http.post(api, reqBody);
  }

  insert(api: string, reqBody: any = {}): Observable<any> {
    return this.http.post(api, reqBody);
  }

  post(api: string, reqBody: any = {}): Observable<any> {
    return this.insert(api, reqBody);
  }

  insertWithProgress(api: string, reqBody: any): Observable<any> {
    return this.http
      .post(api, reqBody, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(catchError(this.errorMsg));
  }

  update(api: string, reqBody: any = {}): Observable<any> {
    return this.http.put(api, reqBody);
  }

  // getById(api: string, reqBody: any = {}): Observable<any> {
  //   const queryParam = Globals.jsonToQueryString(reqBody);
  //   return this.http.get(api + '?' + queryParam);
  // }

  getById(api: string, reqBody: any = {}): Observable<any> {
    return this.http.get(api + '/' + reqBody.id);
  }

  get(api: string, options: any = {}): Observable<any> {
    return this.http.get(api, options);
  }

  put(api: string, reqBody: any = {}): Observable<any> {
    return this.update(api, reqBody);
  }

  delete(api: string, id: String): Observable<any> {
    return this.http.delete(api + '/' + id);
  }

  insertOrUpdate(api: string, reqBody: any = {}): Observable<any> {
    return reqBody?._id ? this.update(api, reqBody) : this.insert(api, reqBody);
  }

  insertOrUpdateFormData(
    api: string,
    reqBody: FormData,
    id: string
  ): Observable<any> {
    return id ? this.update(api, reqBody) : this.insert(api, reqBody);
  }

  download(api: string, reqBody: any = {}): Observable<any> {
    const queryParam = Globals.jsonToQueryString(reqBody);
    console.log('URL : ', api + '?' + queryParam);

    window.open(api + '?' + queryParam);

    return of(true);
  }

  patch(api: string, reqBody: any = {}): Observable<any> {
    return this.http.patch(api, reqBody);
  }

  errorMsg(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getImageUrl(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: "blob",
    });
  }
}
