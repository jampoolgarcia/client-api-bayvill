import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { UserI } from '../model/user';
import { Observable } from 'rxjs';

const url_base = environment.url_base;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public entity: string = "user";

    constructor(private _http: HttpClient){

    }

    saveRecord(data: UserI): Observable<UserI>{
        return this._http.post<UserI>(`${url_base}/${this.entity}`, data)
    }
}