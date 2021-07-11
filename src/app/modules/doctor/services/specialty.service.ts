import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SpecialtyI } from '../model/specialty';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const url_base = environment.url_base;

@Injectable({
    providedIn: 'root'
  })
export class SpecialtyService {

    public url: string = `${url_base}/specialty`;
    public recordsList: SpecialtyI[] = [];

    constructor(private http: HttpClient) { }

  getAllRecords(): Observable<SpecialtyI[]>{
    return this.http.get<SpecialtyI[]>(`${this.url}`);
  }

  getByIdRecord(id: string){
    return this.http.get<SpecialtyI>(`${this.url}/${id}`);
  }

  saveNewRecord(specialty: SpecialtyI){
    delete specialty.id;
    return this.http.post<SpecialtyI>(
      `${this.url}`, 
      specialty
    );
  }

  updateRecord(specialty: SpecialtyI){
      return this.http.put<any>(
        `${this.url}/${specialty.id}`, 
        specialty
      );
  }

}