import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticias } from 'src/app/services/noticias';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-detalles-noticia',
  templateUrl: './detalles-noticia.component.html',
  styleUrls: ['./detalles-noticia.component.css']
})
export class DetallesNoticiaComponent {

  noticia!: Noticias;
  id!: number;

  constructor(
    private ruta: ActivatedRoute,
    private noticiaServicio: NoticiasService,
    private enrutador: Router
  ) { }

  ngOnInit(): void {

    this.id = this.ruta.snapshot.params['id'];//Obtenemos el id que estamos recibiendo en la ruta

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
  }

  volver(): void {
    this.enrutador.navigate(['/inicio']);
  }


}
