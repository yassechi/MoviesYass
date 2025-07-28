import {
  Component,
  ElementRef,
  HostListener,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  search() {}

  protected readonly title = signal('MoviesYass');

  // Signaux pour la gestion d'état réactive
  protected readonly estMenuMobileOuvert = signal(false);
  protected readonly lienNavActif = signal<string>('');

  // Références ViewChild pour les éléments DOM
  @ViewChild('menuMobile', { static: false })
  menuMobile!: ElementRef<HTMLElement>;
  @ViewChild('liensNav', { static: false }) liensNav!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    // Toute logique d'initialisation peut être placée ici si nécessaire
  }

  // Méthode pour basculer le menu mobile
  basculerMenuMobile() {
    this.estMenuMobileOuvert.update((estOuvert) => !estOuvert);
  }

  // Gérer les clics sur les liens de navigation
  surClicLienNav(event: Event, idLien: string) {
    event.preventDefault();

    // Mettre à jour le lien actif
    this.lienNavActif.set(idLien);

    // Fermer le menu mobile
    this.estMenuMobileOuvert.set(false);
  }

  // Écouter les clics en dehors de la navigation
  @HostListener('document:click', ['$event'])
  surClicDocument(event: Event) {
    const cible = event.target as HTMLElement;

    // Vérifier si le clic est en dehors des éléments de navigation
    if (this.liensNav && this.menuMobile) {
      const elementNav = this.liensNav.nativeElement;
      const elementMenu = this.menuMobile.nativeElement;

      if (!elementNav.contains(cible) && !elementMenu.contains(cible)) {
        this.estMenuMobileOuvert.set(false);
      }
    }
  }

  // Méthodes getter pour utilisation dans le template
  get classeMenuMobile() {
    return this.estMenuMobileOuvert() ? 'active' : '';
  }

  get classeLiensNav() {
    return this.estMenuMobileOuvert() ? 'active' : '';
  }

  // Méthode pour vérifier si un lien de navigation est actif
  estLienNavActif(idLien: string): boolean {
    return this.lienNavActif() === idLien;
  }
}
