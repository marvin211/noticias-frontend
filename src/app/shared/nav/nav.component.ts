import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn:boolean=false; //variable para saber si el usuario esta logueado o no por defecto es false

  //constructor(private loginService:LoginService, private router:Router) { }: Este es el constructor del componente. Se inyectan dos servicios, LoginService y Router, que se utilizarán en el componente.
  constructor(private loginService:LoginService, private router:Router) { }

  //ngOnInit(): void { ... }: Este es un método del ciclo de vida de Angular que se ejecuta después de que se crea el componente. Aquí, se suscribe al BehaviorSubject currentUserLoginOn del servicio LoginService. Cada vez que currentUserLoginOn emite un nuevo valor, se actualiza la variable userLoginOn del componente.
  ngOnInit(): void {//se ejecuta cuando el componente se ha inicializado

    //Suscribirse a currentUserLoginOn: Aquí, se suscribe al BehaviorSubject currentUserLoginOn del servicio LoginService. Cada vez que currentUserLoginOn emite un nuevo valor, se actualiza la variable userLoginOn del componente.
    this.loginService.currentUserLoginOn.subscribe( //nos suscribimos al BehaviorSubject currentUserLoginOn del servicio LoginService
      {
        next:(userLoginOn) => { //cada vez que currentUserLoginOn emite un nuevo valor
          this.userLoginOn=userLoginOn; //actualizamos la variable userLoginOn del componente
        }
      }
    )

    //Con lo anterior podemos saber si el usuario esta logueado o no
  }

  //logout() { ... }: Este método se llama cuando el usuario quiere cerrar sesión. Llama al método logout del servicio LoginService y luego redirige al usuario a la ruta '/inicio' utilizando el servicio Router
  logout()
  {
    this.loginService.logout(); //llamamos al metodo logout del servicio LoginService
    this.router.navigate(['/inicio']) //navegamos a la ruta /inicio
  }

}
