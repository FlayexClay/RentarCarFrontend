import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss'],
})
export class PostCarComponent implements OnInit {
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  listOfBrands = ['BMW', 'AUDI', 'FERRARI', 'TESLA', 'VOLVO', 'TOYOTA', 'HONDA', 'FORD', 'NISSAN', 'HYUNDAI', 'LEXUS', 'KIA'];
  listOfType = ['Petroleo', 'Hibrido', 'Diesel', 'Electrico', 'CNG'];
  listOfColor = ['Rojo', 'Blanco', 'Azul', 'Negro', 'Naranja', 'Gris', 'Plateado'];
  listOfTransmission = ['Mecanico', 'Automatico'];

  constructor(private fb: FormBuilder, private adminService: AdminService, private message: NzMessageService, private router: Router) {}

  ngOnInit(): void {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });
  }

  postCar(): void {
    this.isSpinning = true;
    if (!this.selectedFile) {
      console.error('No seleccionó un archivo');
      this.isSpinning = false;
      return;
    }
  
    if (this.postCarForm.invalid) {
      console.error('El formulario es inválido');
      this.isSpinning = false;
      return;
    }
  
    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('brand', this.postCarForm.get('brand')?.value);
    formData.append('name', this.postCarForm.get('name')?.value);
    formData.append('type', this.postCarForm.get('type')?.value);
    formData.append('color', this.postCarForm.get('color')?.value);
    formData.append('year', this.postCarForm.get('year')?.value);
    formData.append('transmission', this.postCarForm.get('transmission')?.value);
    formData.append('description', this.postCarForm.get('description')?.value);
    formData.append('price', this.postCarForm.get('price')?.value);
  
    this.adminService.postCar(formData).subscribe({
      next: (res) => {
        this.isSpinning = false;
        this.message.success('El carro se subió con éxito!', { nzDuration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (error) => {
        this.isSpinning = false;
        this.message.error('Error mientras se subía el carro: ' + error.message, { nzDuration: 5000 });
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.previewImage();
    }
  }

  previewImage(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
