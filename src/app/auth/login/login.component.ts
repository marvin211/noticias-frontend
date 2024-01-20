import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError:string=""; //variable para mostrar el error en el login

  //creamos el formulario reactivo
  loginForm=this.formBuilder.group({ //creamos el formulario reactivo
    username:['',[Validators.required,Validators.email]], //campo para el email
    password: ['',Validators.required], //campo para la contraseña
  })

  //formBuilder es una instancia de FormBuilder que se inyecta en el constructor esto sirve para crear formularios reactivos
  //router es una instancia de Router que se inyecta en el constructor esto sirve para navegar entre rutas
  //loginService es una instancia de LoginService que se inyecta en el constructor esto sirve para hacer peticiones al servidor
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void { //se ejecuta cuando el componente se ha inicializado
  }

  get email(){ //funcion para obtener el campo email
    return this.loginForm.controls.username;
  }

  get password()
  { //funcion para obtener el campo password
    return this.loginForm.controls.password;
  }

  //funcion para hacer login
  login(){
    if(this.loginForm.valid){ //si el formulario es valido
      this.loginError=""; //limpiamos el error

      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({ //hacemos la peticion al servidor
        next: (userData) => { //si la peticion es exitosa
          console.log(userData); //mostramos los datos del usuario
        },
        error: (errorData) => { //si la peticion falla
          console.error(errorData); //mostramos el error
          this.loginError=errorData; //mostramos el error en el login
        },
        complete: () => { //cuando la peticion se completa
          console.info("Login completo"); //mostramos un mensaje
          this.router.navigateByUrl('/inicio'); //navegamos a la ruta /inicio
          this.loginForm.reset(); //reseteamos el formulario
        }
      })

    }
    else{ //si el formulario no es valido
      this.loginForm.markAllAsTouched(); //marcamos todos los campos como tocados para marcar todos los inputs y mostrar el dato que no marcamos bien
      alert("Error al ingresar los datos."); //mostramos un mensaje de error
    }
  }

}
