import { Component, input, signal } from '@angular/core';
import { AllMovie, MovieModel } from '../Models/movie-film';

@Component({
  selector: 'app-display-movies',
  imports: [],
  templateUrl: './display-movies.html',
  styleUrl: './display-movies.scss'
})
export class DisplayMovies {

  items = input.required<AllMovie>();

  deleteMovie() {

  }



        // const imageContainer = document.querySelector('.image-container');
        // const typewriterText = document.querySelector('.typewriter-text');
        // const subtitle = document.querySelector('.typewriter-subtitle');
        // const decorativeLine = document.querySelector('.decorative-line');

        // imageContainer.addEventListener('mouseleave', () => {
        //     // Réinitialiser toutes les animations
        //     typewriterText.style.animation = 'none';
        //     subtitle.style.animation = 'none';
        //     decorativeLine.style.animation = 'none';
            
        //     // Forcer le reflow
        //     typewriterText.offsetHeight;
        //     subtitle.offsetHeight;
        //     decorativeLine.offsetHeight;
        // });
        
        // imageContainer.addEventListener('mouseenter', () => {
        //     // Relancer les animations avec un délai pour permettre la réinitialisation
        //     setTimeout(() => {
        //         typewriterText.style.animation = 'typewriter 2.5s steps(20, end) forwards, blink-cursor 1s infinite';
        //         subtitle.style.animation = 'fadeInUp 1.2s ease 2.5s forwards';
        //         decorativeLine.style.animation = 'expandLine 1s ease 3.5s forwards';
        //     }, 50);
        // });

        // // Créer des particules dorées supplémentaires
        // function createGoldenParticles() {
        //     const particleContainer = document.querySelector('.golden-particles');
            
        //     for (let i = 0; i < 12; i++) {
        //         const particle = document.createElement('div');
        //         particle.className = 'golden-particle';
        //         particle.style.left = Math.random() * 100 + '%';
        //         particle.style.animationDelay = Math.random() * 4 + 's';
        //         particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
                
        //         // Variation de taille
        //         const size = Math.random() * 2 + 2;
        //         particle.style.width = size + 'px';
        //         particle.style.height = size + 'px';
                
        //         this.particleContainer.appendChild(particle);
        //     }
        // }

        // // Initialiser les particules supplémentaires
        // createGoldenParticles();

        // // Effet de scintillement aléatoire sur le texte
        // function addSparkleEffect() {
        //     const text = document.querySelector('.typewriter-text');
            
        //     setInterval(() => {
        //         if (this.imageContainer.matches(':hover')) {
        //             text.style.textShadow = `
        //                 2px 2px 4px rgba(0, 0, 0, 0.8),
        //                 0 0 ${Math.random() * 20 + 10}px rgba(243, 156, 18, ${Math.random() * 0.5 + 0.3})
        //             `;
        //         }
        //     }, 200);
        // }

        // Activer l'effet de scintillement
        // addSparkleEffect();
}
