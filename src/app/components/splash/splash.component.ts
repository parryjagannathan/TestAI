// src/app/components/splash/splash.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="splash-screen" (click)="advance()">
      <img class="splash-bg" src="assets/images/Screen-4.jpg" alt="Protiviti Path to Transformation">
      <div class="touch-hint">TOUCH ANYWHERE TO BEGIN</div>
    </div>
  `,
  styles: [`
    .splash-screen {
      width: 100%;
      height: 100%;
      cursor: pointer;
      position: relative;
    }
    .splash-bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .touch-hint {
      position: absolute;
      bottom: 8%;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,0.7);
      font-family: 'Helvetica Neue', sans-serif;
      font-size: 0.85rem;
      letter-spacing: 0.2em;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
  `]
})
export class SplashComponent {
  constructor(private quizService: QuizService) {}

  advance(): void {
    this.quizService.setScreen('intro-slide-1');
  }
}
