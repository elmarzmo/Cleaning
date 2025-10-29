import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Quote {
  // backend
  private apiUrl = 'http://localhost:5000/api/quotes';

  constructor(private hhtp:HttpClient){}

  sendQuote(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getQuotes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  
}
