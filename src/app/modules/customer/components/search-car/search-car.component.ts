import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.scss']
})
export class SearchCarComponent {
  searchCarForm!: FormGroup;
  listOfBrands = ['BMW', 'AUDI', 'FERRARI', 'TESLA', 'VOLVO', 'TOYOTA', 'HONDA', 'FORD', 'NISSAN', 'HYUNDAI', 'LEXUS', 'KIA'];
  listOfType = ['Petroleo', 'Hibrido', 'Diesel', 'Electrico', 'CNG'];
  listOfColor = ['Rojo', 'Blanco', 'Azul', 'Negro', 'Naranja', 'Gris', 'Plateado'];
  listOfTransmission = ['Mecanico', 'Automatico'];
  isSpinning: boolean = false;
  cars: any[] = [];

  constructor(private fb: FormBuilder,
    private  service: CustomerService) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    })
  }

  searchCar() {
    this.isSpinning = true;
    this.service.searchCar(this.searchCarForm.value).subscribe((res) => {
      res.carDtoList.forEach((element : any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
      this.isSpinning = false;
    });
  }
}
