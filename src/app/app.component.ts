import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';
import { every } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fastandfurious';

  isCustomerLoggedIn:boolean=StorageService.isCustomerLoggedIn();
  isAdminLoggedIn:boolean=StorageService.isAdminLoggedIn();

  constructor(private router:Router){}

  ngOnInit(){//METODO DE CICLO DE VIDA DE ANGULAR INICIALIZA LAS PROPIEDADES DE LOS COMPONENTES SUSCRIBE A EVENTOS DE ENRUTAMIENTO DE 
    this.router.events.subscribe(event =>{  //ROUTER ACTUA SOBRE NAVIGATIONEND Y ACTUALIZA LOS ESTADOS DE AUTENTICACION DE ADMINLOGGED
      if (event.constructor.name ==="NavigationEnd") { // Y CLIENTELOGGED
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    } )
  }

  
  //LLAMA AL METODO LOGOUT DENTRO DE STORAGESERVICE.
  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/login"); //REDIRIGE AL USUARIO A UNA PAGINA /LOGIN
  }
}
