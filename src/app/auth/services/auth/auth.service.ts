import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const BASE_URL = ["https://rentarcarrosbackend-production.up.railway.app/"]

@Injectable({
  providedIn: 'root'
})
//Metodo para realizar solicitudes http al backend para registrar e iniciar sesion de usuarios
//Usan endpoints "api/auth/*" y devuelven un observable que da respuesta al servidor.
export class AuthService {

  constructor(private http: HttpClient) { }

  register(signupRequest: any):Observable<any>{
    return this.http.post(BASE_URL+"/api/auth/signup",signupRequest);
  }

  login(loginRequest : any): Observable<any>{
    return this.http.post(BASE_URL+"/api/auth/login",loginRequest);
  }

}
