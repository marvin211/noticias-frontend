import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Noticias } from 'src/app/services/noticias';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-detalles-noticia',
  templateUrl: './detalles-noticia.component.html',
  styleUrls: ['./detalles-noticia.component.css']
})
export class DetallesNoticiaComponent {

  noticia: Noticias = {} as Noticias;
  noticiasRecomendadas: Noticias[] = []; // Agrega este campo
  id!: number;

  constructor(
    private ruta: ActivatedRoute,
    private noticiaServicio: NoticiasService,
    private enrutador: Router
  ) { }

  ngOnInit(): void {
    this.ruta.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.noticiaServicio.obtenerNoticiaPorId(this.id).subscribe(
        {
          next: noti => {
            this.noticia = noti;
          },
          error: err => {
            console.log(err);
          }
        }
      );
    });

    // Obtiene las noticias recomendadas
    this.noticiaServicio.obtenerNoticiasRecomendadas().subscribe(
      {
        next: noticias => {
          this.noticiasRecomendadas = noticias;
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }

  obtenerNoticia(id: number): void {
    this.enrutador.navigate(['/detalles', id]);
  }

  volver(): void {
    this.enrutador.navigate(['/inicio']);
  }
}
