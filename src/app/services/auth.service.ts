import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contacts.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  login(loginRequest:any):Observable<any>{
    return this.http.post<any>(this.baseApiUrl+"/api/Authentication/login",loginRequest, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
