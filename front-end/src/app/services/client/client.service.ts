import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  protected url = 'http://localhost:8080/client';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url);
  }

  save(data: Client): Observable<Client> {
    if (data.id) {
      return this.http.put<Client>(this.url, data);
    }
    return this.http.post<Client>(this.url, data);
  }

  findById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.url}/${id}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

}
