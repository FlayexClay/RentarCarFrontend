import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit {

  carId: number;
  isSpinning = false;
  existingImage: string | null = null;
  imgChanged: boolean = false;
  selectedFile: any;
  imagePreview: string | ArrayBuffer | null = null;
  updateForm!: FormGroup;
  listOfBrands = ['BMW', 'AUDI', 'FERRARI', 'TESLA', 'VOLVO', 'TOYOTA', 'HONDA', 'FORD', 'NISSAN', 'HYUNDAI', 'LEXUS', 'KIA'];
  listOfType = ['Petroleo', 'Hibrido', 'Diesel', 'Electrico', 'CNG'];
  listOfColor = ['Rojo', 'Blanco', 'Azul', 'Negro', 'Naranja', 'Gris', 'Plateado'];
  listOfTransmission = ['Mecanico', 'Automatico'];

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {
    this.carId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });
    this.getCarById();
  }

  getCarById(): void {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe(
      (res) => {
        this.isSpinning = false;
        const carDto = res;

        this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
        
        if (carDto.year) {
          carDto.year = new Date(carDto.year);
        }

        this.updateForm.patchValue(carDto);
      },
      (error) => {
        this.isSpinning = false;
        console.error('Error al obtener el auto:', error);
      }
    );
  }

  updateCar() {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.imgChanged && this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('brand', this.updateForm.get('brand')?.value);
    formData.append('name', this.updateForm.get('name')?.value);
    formData.append('type', this.updateForm.get('type')?.value);
    formData.append('color', this.updateForm.get('color')?.value);
    formData.append('year', this.updateForm.get('year')?.value);
    formData.append('transmission', this.updateForm.get('transmission')?.value);
    formData.append('description', this.updateForm.get('description')?.value);
    formData.append('price', this.updateForm.get('price')?.value);

    this.adminService.updateCar(this.carId, formData).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.message.success('El carro se actualizo con éxito!', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (error) => {
        this.isSpinning = false;
        this.message.error('Error mientras se actualizo el carro: ' + error.message, { nzDuration: 5000 });
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
