import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';

//modulo de enrutamiento nos mostrara admin y cliente. Define las rutas para los componentes definidos
const routes: Routes = [
  {path:"register", component: SignupComponent},
  {path:"login", component: LoginComponent},
  {path: "admin" , loadChildren: () => import("./modules/admin/admin.module").then(m=>m.AdminModule)},
  {path: "customer" , loadChildren: () => import("./modules/customer/customer.module").then(m=>m.CustomerModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
