import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sing',
  imports: [],
  templateUrl: './sing.html',
  styleUrl: './sing.scss'
})
export class Sing implements AfterViewInit {
  // Références aux éléments du DOM
  @ViewChild('contactForm') form!: ElementRef;
  @ViewChild('submitButton') submitButton!: ElementRef;
  @ViewChild('successMessage') successMessage!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput!: ElementRef;
  @ViewChild('passwordStrength') passwordStrength!: ElementRef;
  @ViewChild('passwordRequirements') passwordRequirements!: ElementRef;
  @ViewChild('phoneInput') phoneInput!: ElementRef;

  // Initialisation après que la vue soit chargée
  ngAfterViewInit() {
    this.initializeForm();
  }

  // Initialisation du formulaire et de ses événements
  private initializeForm() {
    const form = this.form.nativeElement;
    const submitButton = this.submitButton.nativeElement;
    const successMessage = this.successMessage.nativeElement;
    const buttonText = submitButton.querySelector('.button-text');
    const passwordInput = this.passwordInput.nativeElement;
    const confirmPasswordInput = this.confirmPasswordInput.nativeElement;
    const passwordStrength = this.passwordStrength.nativeElement;
    const passwordRequirements = this.passwordRequirements.nativeElement;
    const phoneInput = this.phoneInput.nativeElement;

    // Gestion des boutons pour afficher/masquer le mot de passe
    const passwordToggles = form.querySelectorAll('.password-toggle');
    passwordToggles.forEach((toggle: HTMLElement) => {
      toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling as HTMLInputElement;
        if (input.type === 'password') {
          input.type = 'text';
          toggle.textContent = '🙈';
        } else {
          input.type = 'password';
          toggle.textContent = '👁️';
        }
      });
    });

    // Validation en temps réel des champs
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach((input: HTMLInputElement) => {
      input.addEventListener('input', () => this.validateField(input));
      input.addEventListener('blur', () => this.validateField(input));
    });

    // Validation spécifique pour le mot de passe
    passwordInput.addEventListener('input', () => {
      this.validatePassword(passwordInput.value);
      if (confirmPasswordInput.value) {
        this.validatePasswordConfirmation();
      }
    });

    passwordInput.addEventListener('focus', () => {
      passwordStrength.style.display = 'block';
      passwordRequirements.style.display = 'block';
    });

    confirmPasswordInput.addEventListener('input', () => this.validatePasswordConfirmation());

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.handleFormSubmit();
    });

    // Formatage automatique du numéro de téléphone
    phoneInput.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      let value = target.value.replace(/\D/g, '');
      if (value.length >= 10) {
        value = value.substring(0, 10);
        value = value.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
      }
      target.value = value;
    });

    // Amélioration de l'accessibilité avec la navigation au clavier
    inputs.forEach((input: HTMLInputElement) => {
      input.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' && input.type !== 'textarea') {
          e.preventDefault();
          const nextInput = this.getNextInput(input, inputs);
          if (nextInput) {
            nextInput.focus();
          } else {
            submitButton.focus();
          }
        }
      });
    });
  }

  // Validation de la force du mot de passe
  private validatePassword(password: string) {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Mise à jour visuelle des exigences
    Object.keys(requirements).forEach(req => {
      const element = document.querySelector(`[data-requirement="${req}"]`);
      if (requirements[req as keyof typeof requirements]) {
        element?.classList.add('met');
      } else {
        element?.classList.remove('met');
      }
    });

    // Calcul de la force du mot de passe
    const metRequirements = Object.values(requirements).filter(Boolean).length;
    const strengthElement = this.passwordStrength.nativeElement;
    const strengthText = strengthElement.querySelector('.strength-text');

    strengthElement.className = 'password-strength';
    
    if (password.length === 0) {
      strengthText.textContent = 'Entrez un mot de passe';
    } else if (metRequirements < 3) {
      strengthElement.classList.add('strength-weak');
      strengthText.textContent = 'Faible';
    } else if (metRequirements < 4) {
      strengthElement.classList.add('strength-fair');
      strengthText.textContent = 'Moyen';
    } else if (metRequirements < 5) {
      strengthElement.classList.add('strength-good');
      strengthText.textContent = 'Bon';
    } else {
      strengthElement.classList.add('strength-strong');
      strengthText.textContent = 'Excellent';
    }
  }

  // Validation de la confirmation du mot de passe
  private validatePasswordConfirmation() {
    const password = this.passwordInput.nativeElement.value;
    const confirmPassword = this.confirmPasswordInput.nativeElement.value;
    const formGroup = this.confirmPasswordInput.nativeElement.closest('.form-group');

    if (confirmPassword && password !== confirmPassword) {
      this.confirmPasswordInput.nativeElement.setCustomValidity('Les mots de passe ne correspondent pas');
      formGroup.classList.add('error');
      formGroup.classList.remove('valid');
    } else {
      this.confirmPasswordInput.nativeElement.setCustomValidity('');
      if (confirmPassword) {
        formGroup.classList.remove('error');
        formGroup.classList.add('valid');
      }
    }
  }

  // Validation d'un champ individuel
  private validateField(field: HTMLInputElement) {
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
  }

  // Gestion de la soumission du formulaire
  private handleFormSubmit() {
    const form = this.form.nativeElement;
    const submitButton = this.submitButton.nativeElement;
    const successMessage = this.successMessage.nativeElement;
    const buttonText = submitButton.querySelector('.button-text');
    const inputs = form.querySelectorAll('input, textarea');

    // Validation de la confirmation du mot de passe
    this.validatePasswordConfirmation();
    
    // Vérification de la validité de tous les champs requis
    const requiredFields = form.querySelectorAll('[required]');
    let isFormValid = true;
    
    requiredFields.forEach((field: HTMLInputElement) => {
      if (!field.checkValidity()) {
        isFormValid = false;
        this.validateField(field);
      }
    });
    
    if (isFormValid) {
      // Animation de chargement
      submitButton.classList.add('loading');
      buttonText.textContent = 'Création en cours...';
      
      // Simulation de l'envoi du formulaire
      setTimeout(() => {
        submitButton.classList.remove('loading');
        buttonText.textContent = 'Créer mon compte';
        
        // Affichage du message de succès
        successMessage.classList.add('show');
        
        // Réinitialisation du formulaire
        form.reset();
        this.passwordStrength.nativeElement.style.display = 'none';
        this.passwordRequirements.nativeElement.style.display = 'none';
        
        // Nettoyage des classes de validation
        inputs.forEach((input: HTMLInputElement) => {
          input.closest('.form-group')?.classList.remove('valid', 'error');
        });
        
        // Masquage du message de succès après 5 secondes
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 5000);
      }, 2000);
    } else {
      // Focus sur le premier champ invalide
      const firstInvalidField = form.querySelector(':invalid');
      if (firstInvalidField) {
        (firstInvalidField as HTMLElement).focus();
      }
    }
  }

  // Navigation au clavier entre les champs
  private getNextInput(currentInput: HTMLInputElement, inputs: NodeListOf<HTMLInputElement>): HTMLInputElement | null {
    const inputsArray = Array.from(inputs);
    const currentIndex = inputsArray.indexOf(currentInput);
    return inputsArray[currentIndex + 1] || null;
  }
}