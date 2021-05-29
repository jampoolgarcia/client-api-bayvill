import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { UserI } from '../model/user';
import { Observable } from 'rxjs';
import { UserResetI } from '../model/user-rest';

const url_base = environment.url_base;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public url: string = `${url_base}/user`;

    constructor(private _http: HttpClient){

    }

    saveRecord(data: UserI): Observable<UserI>{
        return this._http.post<UserI>(this.url, data)
    }

    getRecordByUserName(userName: string){
        return this._http.get<number[]>(`${this.url}/${userName}`)
    }

    resetPassword(data: UserResetI): Observable<boolean>{
        return this._http.post<boolean>(`${this.url}/reset-password`, data);
    }

    
}