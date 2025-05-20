import { Component, model } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    NgxCaptchaModule,
    DividerModule,
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted: boolean = false;
  loadingSubmit: boolean = false;

  btnLoading: boolean = false;

  showCaptcha: boolean = false;
  captchaKey: string = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
  captchaResponse: string = '';

  user: any = {
    noUserName: '',
    txPassword: '',
  };

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      noUserName: ['', [Validators.required, Validators.email]],
      txPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor complete todos los campos requeridos',
        life: 3000,
      });
      return;
    }

    if (!this.captchaResponse) {
      this.showCaptcha = true;
      this.messageService.add({
        severity: 'warn',
        summary: 'Validación requerida',
        detail: 'Por favor completa el CAPTCHA',
        life: 3000,
      });
      return;
    }

    // Simular login si CAPTCHA es válido
    const user: any = {
      noUserName: this.loginForm.get('noUserName')?.value,
      txPassword: this.loginForm.get('txPassword')?.value,
    };

    if (
      user.noUserName === 'ladorada@gmail.com' &&
      user.txPassword === 'admin'
    ) {
      localStorage.setItem('usuario', JSON.stringify(user));

      this.btnLoading = true;
      this.messageService.add({
        severity: 'success',
        summary: 'Acceso Válido',
        detail: 'Usuario Conectado Correctamente',
        life: 3000,
      });

      setTimeout(() => {
        this.btnLoading = false;
        this.loadingSubmit = false;
        this.route.navigate(['app-view/dashboard']);
      }, 3000);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Credenciales inválidas',
        detail: 'Usuario o contraseña incorrectos',
        life: 3000,
      });
      this.loadingSubmit = false;
    }

    console.log('USER:', user);
  }

  onCaptchaSuccess(token: string): void {
    this.captchaResponse = token;
    this.showCaptcha = false;
    this.login(); // Vuelve a ejecutar login con CAPTCHA ya validado
  }

  onCaptchaError(): void {
    this.captchaResponse = '';
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Hubo un problema con el captcha',
      life: 3000,
    });
  }

  onCaptchaExpired(): void {
    this.captchaResponse = '';
    this.messageService.add({
      severity: 'warn',
      summary: 'Captcha expirado',
      detail: 'Vuelve a completar el captcha',
      life: 3000,
    });
  }
}
