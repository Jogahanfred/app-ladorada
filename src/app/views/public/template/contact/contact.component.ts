import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SubscriberService } from '../../services/subscriber/subscriber.service';
import { Subscriber } from '../../../../shared/interface/subscriber.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    NgIf,
  ],
  templateUrl: './contact.component.html',
  standalone: true,
  styleUrl: './contact.component.css',
  providers: [MessageService],
})
export class ContactComponent implements OnInit {
  formData!: FormGroup;
  submitted = false;
  btnLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private subscriberService: SubscriberService
  ) {}

  ngOnInit(): void {
    this.formData = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
    });
  }
  get f() {
    return this.formData.controls;
  }

  submit(): void {
    this.submitted = true;
    this.btnLoading = true;

    if (this.formData.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Completa todos los campos correctamente',
        life: 3000,
      });
      return;
    }

    const suscriptor: Subscriber = {
      Nombre: this.formData.value.nombre,
      Correo: this.formData.value.correo,
      Mensaje: this.formData.value.mensaje,
    };

    this.subscriberService.saveSubscriber(suscriptor).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registrado',
          detail: res.msg,
          life: 3000,
        });
        this.formData.reset();
        this.submitted = false;
        this.btnLoading = false;
      },
      error: (err) => {
        const errorMsg = err?.error?.msg || 'Error inesperado';
        this.btnLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error al registrar',
          detail: errorMsg,
          life: 3000,
        });
      },
    });
  }
}
