import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { ResponseUsers } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient, 
    private tokenService : TokenService
  ) { }

  getUsers(){
    const token = this.tokenService.getToken();
    return this.http.get<ResponseUsers[]>(`${this.apiUrl}/api/v1/users`,{
      context: checkToken()
    });
  }

  
}
