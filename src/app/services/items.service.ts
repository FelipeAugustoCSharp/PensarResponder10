import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IItems } from '../models/IItem';
@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private readonly API_URL = "http://localhost:3000/items";
  
  // Usando BehaviorSubject para manter a lista atualizada
  private itemListSubject = new BehaviorSubject<IItems[]>([]);
  itemList$ = this.itemListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshItems();
  }

  getItems() : Observable<IItems[]> {
    return this.http.get<IItems[]>(this.API_URL);
  }

  refreshItems() {
    this.getItems().subscribe(items => this.itemListSubject.next(items));
  }

  updateItem(id: string, item: IItems): Observable<IItems> {
    return this.http.put<IItems>(`${this.API_URL}/${id}`, item).pipe(
      tap(() => this.refreshItems()) 
    );
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => this.refreshItems()) 
    );
  }

  createItem(item: IItems): Observable<IItems> {
    return this.http.post<IItems>(this.API_URL, item).pipe(
      tap(() => this.refreshItems()) 
    );
  }
}