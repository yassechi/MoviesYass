import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginForm') loginForm!: ElementRef;
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;
  
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;
  showError: boolean = false;
  showSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('💡 Pour tester la connexion :');
    console.log('Email: admin@test.com');
    console.log('Mot de passe: password123');
  }

  ngAfterViewInit() {
    // S'assurer que le focus est mis sur le champ email après l'initialisation de la vue
    if (this.emailInput) {
      this.emailInput.nativeElement.focus();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  validateField(field: HTMLInputElement): boolean {
    const isValid = field.checkValidity();
    const formGroup = field.closest('.form-group');
    
    if (field.value.length > 0) {
      if (isValid) {
        formGroup?.classList.remove('error');
        formGroup?.classList.add('valid');
      } else {
        formGroup?.classList.remove('valid');
        formGroup?.classList.add('error');
      }
    } else {
      formGroup?.classList.remove('valid', 'error');
    }
    
    return isValid;
  }

  onInputChange(event: Event) {
    const field = event.target as HTMLInputElement;
    this.validateField(field);
  }

  onSubmit() {
    // Réinitialiser les états
    this.showError = false;
    this.showSuccess = false;
    
    // Valider le formulaire
    if (!this.loginForm.nativeElement.checkValidity()) {
      const invalidFields = this.loginForm.nativeElement.querySelectorAll(':invalid');
      invalidFields.forEach((field: HTMLInputElement) => this.validateField(field));
      return;
    }

    // Commencer le chargement
    this.isLoading = true;
    
    // Simuler la requête de connexion
    setTimeout(() => {
      this.isLoading = false;
      
      // Valider les identifiants
      if (this.email === 'admin@test.com' && this.password === 'password123') {
        this.showSuccess = true;
        
        // Redirection après 2 secondes
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      } else {
        this.showError = true;
        this.errorMessage = 'Email ou mot de passe incorrect';
        
        // Cacher le message d'erreur après 5 secondes
        setTimeout(() => {
          this.showError = false;
        }, 5000);
      }
    }, 1500);
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  onSignup() {
    this.router.navigate(['/signup']);
  }

  handleKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputs = this.loginForm.nativeElement.querySelectorAll('input[required]');
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        this.onSubmit();
      }
    }
  }
}