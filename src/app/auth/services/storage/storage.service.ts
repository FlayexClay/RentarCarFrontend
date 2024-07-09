import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  } 

  static getUserId(){
    const user = this.getUser();
    if (user == null) { return '';}
    return user.id;
  } 

  static getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = window.localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) return '';
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    const token = this.getToken();
    if (token == null) return false;
  
    const user = this.getUser();
    if (user == null) return false;
  
    return user.role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    const token = this.getToken();
    if (token == null) return false;
    const user = this.getUser();
    if (user == null) return false;
    return user.role === 'CUSTOMER';
  }

  //METODO QUE QUITA EL TOKEN Y USER ACTUAL
  static logout():void{
    window.localStorage.removeItem(TOKEN); 
    window.localStorage.removeItem(USER);
  }
}
