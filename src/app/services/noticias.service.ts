import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticias } from './noticias';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  private urlBase = "http://localhost:8080/api";//Url del servidor base de Spring Boot

  constructor(private clienteHttp: HttpClient) { }

  //Método que obtiene todas las noticias
  public obtenerNoticias(): Observable<Noticias[]> {
    return this.clienteHttp.get<Noticias[]>(this.urlBase + "/noticias");
  }

  //Obtener los detalles de una noticia por su id
  public obtenerNoticiaPorId(id: number): Observable<Noticias> {
    return this.clienteHttp.get<Noticias>(this.urlBase + "/noticias/detalles/" + id);
  }

  //Obtener las noticias recomendadas
  public obtenerNoticiasRecomendadas(): Observable<Noticias[]> {
    return this.clienteHttp.get<Noticias[]>(this.urlBase + "/noticias/recomendadas");
  }


}
