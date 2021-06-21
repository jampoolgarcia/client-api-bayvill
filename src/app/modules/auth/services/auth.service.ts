import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { UserI } from '../model/user';
import { Observable } from 'rxjs';
import { UserResetI } from '../model/user-rest';
import { TurnI } from '../model/turn';
import { map, tap } from 'rxjs/operators';

const url_base = environment.url_base;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public url: string = `${url_base}/user`;

    constructor(private _http: HttpClient){}

    saveRecord(data: UserI): Observable<UserI>{
        return this._http.post<UserI>(this.url, data)
    }

    getRecordByUserName(userName: string){
        return this._http.get<number[]>(`${this.url}/${userName}`)
    }

    resetPassword(data: UserResetI): Observable<boolean>{
        return this._http.post<boolean>(`${this.url}/reset-password`, data);
    }

    changePassword(id: string, password: string, newPassword: string): Observable<any>{
      return this._http.post(`${this.url}/change-password/${id}`, { password, newPassword});
    }

    updateRecordStatusAndRole(recordId: string, role: number, isActive: boolean){
      return this._http.patch(`${this.url}/${recordId}`, { 'role': role, 'isActive':isActive });
    }

    login(userName: string, password: string): Observable<any>{
        return this._http.post<any>(`${this.url}/login`, {userName, password});
    }

    logout() {
      let turn = this.getTurn();
      return this._http.post(`${this.url}/logout`, turn);
    }

    getAllRecords(){
      return this._http.get<UserI[]>(this.url)
          .pipe(
            map(data => this.excludeCurrentUser(data))
          );
    }

    excludeCurrentUser(data: UserI[]): UserI[] {
      let user = JSON.parse(localStorage.getItem('currentUser')!);
      let res = data.filter(elem => elem.id != user.id);
      return res;
    }

    saveSession(data: any): boolean{
   
        let user: UserI = {
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          userName: data.user.userName,
          role: data.user.role,
          isActive: data.user.isActive
        }
  
        let turn: TurnI = {
          id: data.turn.id,
          startDate: data.turn.startDate,
          startBalance: data.turn.startBalance,
          boxId: data.turn.boxId,
          userId: data.turn.userId,
          token: data.turn.token
        }
  
        this.setUser(user);
        this.setTurn(turn);
        this.setToken(turn.token);
        return true;
      
    }

    setUser(user: UserI): void {
        let user_string = JSON.stringify(user);
        localStorage.setItem("currentUser", user_string);
    }
    
    setToken(token: string): void {
        localStorage.setItem("accessToken", token);
    }
    
    setTurn(turn: TurnI): void {
        let turn_string = JSON.stringify(turn);
        localStorage.setItem("turn", turn_string);
    }

    getTurn(): TurnI | undefined {
      let turn_string = localStorage.getItem("turn");
      let turn: TurnI = JSON.parse(turn_string!);
      return turn;
    }
}