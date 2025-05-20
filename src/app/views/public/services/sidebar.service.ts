import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
 // Creamos un BehaviorSubject para manejar el estado del sidebar
 private sidebarVisibility = new BehaviorSubject<boolean>(false); // false = oculto, true = visible

 // Observable para suscribirse al estado
 sidebarVisibility$ = this.sidebarVisibility.asObservable();

 // Método para alternar la visibilidad
 toggleSidebar() { 
   this.sidebarVisibility.next(!this.sidebarVisibility.value);
 }

 // Método para establecer la visibilidad del sidebar
 setSidebarVisibility(visible: boolean) {
   this.sidebarVisibility.next(visible);
 }
}