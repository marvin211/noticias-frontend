import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';
import { Noticias } from 'src/app/services/noticias';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userLoginOn:boolean=false;

  noticias: Noticias[] = [];

  constructor(private noticiaServicio:NoticiasService, private loginService:LoginService, private enrutador: Router) { }

  ngOnInit(): void { //se ejecuta cuando el componente se ha inicializado

    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    //Obtener noticias
    this.obtenerNoticias();
  }

  private obtenerNoticias(){
    this.noticiaServicio.obtenerNoticias().subscribe({
      next:(noticias) => {
        this.noticias=noticias;
      }
    });
  }

  //Obtener noticia
//Obtener noticia
obtenerNoticia(id: number | undefined){
  if (id !== undefined) {
    this.enrutador.navigate(['detalles', id]);
  } else {
    console.error('ID de noticia no definido');
  }
}

}
