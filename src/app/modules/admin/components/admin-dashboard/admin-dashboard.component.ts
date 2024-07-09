import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  cars: any[] = [];

  constructor(private adminService: AdminService, private message:NzMessageService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe(
      (res) => {
        console.log(res);
        if (Array.isArray(res)) {
          res.forEach(element => {
            element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
            this.cars.push(element);
          });
        } else {
          console.error('La respuesta no es un array:', res);
        }
      },
      (error) => {
        console.error('Error al obtener los autos', error);
      }
    );
  }

  deleteCar(id: number) {
    console.log(id);
    this.adminService.deleteCar(id).subscribe(
      (res) => {
        this.getAllCars();
        this.message.success('Carro eliminado correctamente', { nzDuration: 5000 });
      },
      (error) => {
        console.error('Error al eliminar el carro:', error);
        this.message.error('Error al eliminar el carro', { nzDuration: 5000 });
      }
    );
  }


}
