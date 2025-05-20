import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ToastModule, 
      InputTextModule,
      TextareaModule,FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [MessageService],
})
export class ProfileComponent {
  user = {
    profilePicture: '/assets/images/perfil-admin.png',
    role: 'Administrador',
    email: 'ladorada@gmail.com',
    registrationDate: '20 de Mayo del 2025',
    preferences: 'Administrar las ventas y novedades LADORADA',
  };

  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.user.role, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      preferences: [this.user.preferences, [Validators.required]],
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value;
      this.user = {
        ...this.user,
        role: updatedData.name,
        email: updatedData.email,
        preferences: updatedData.preferences,
      };

      this.saveUserDataToFile(updatedData);
      this.messageService.add({
        severity: 'success',
        summary: 'Informativo',
        detail: 'Perfil actualizado correctamente',
        life: 3000,
      }); 
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Completar campos',
        detail: 'Por favor, complete todos los campos.',
        life: 3000,
      }); 
    }
  }

  saveUserDataToFile(updatedData: any): void {
    const fileContent = JSON.stringify(updatedData);
    localStorage.setItem('userData', fileContent);
  }
}
