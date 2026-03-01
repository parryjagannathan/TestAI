// src/app/components/intro-slides/intro-slides.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService, AppScreen } from '../../services/quiz.service';

interface Slide {
  screen: AppScreen;
  line1: string;
  line2: string;
  highlighted: string;
  bgClass: string;
}

@Component({
  selector: 'app-intro-slides',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="intro-slide" [class]="slide.bgClass" (click)="advance()">
      <div class="slide-content">
        <p class="slide-text">
          {{ slide.line1 }}
          <br>
          <span class="highlight">{{ slide.highlighted }}</span>{{ slide.line2 }}
        </p>
      </div>
      <div class="protiviti-logo">protiviti<sup>®</sup></div>
    </div>
  `,
  styles: [`
    .intro-slide {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      background: linear-gradient(135deg, #7ec8e3 0%, #5bb3d0 30%, #b8e4f2 60%, #e8f7fd 100%);
    }
    .slide-content {
      text-align: center;
      padding: 2rem;
      max-width: 70%;
    }
    .slide-text {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: clamp(1.4rem, 3.5vw, 2.5rem);
      color: #1a2a3a;
      line-height: 1.5;
      margin: 0;
    }
    .highlight {
      color: #1a6bb5;
      font-weight: 600;
    }
    .protiviti-logo {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      font-family: 'Helvetica Neue', sans-serif;
      font-size: 1.4rem;
      color: #1a2a3a;
      font-weight: 300;
      letter-spacing: 0.05em;
    }
    .protiviti-logo sup {
      font-size: 0.6rem;
      vertical-align: super;
    }
  `]
})
export class IntroSlidesComponent implements OnInit {
  slide!: Slide;

  private slides: Slide[] = [
    {
      screen: 'intro-slide-1',
      line1: 'Over the next 24 months,',
      line2: 'will make more than 5,000 decisions.',
      highlighted: 'you ',
      bgClass: 'bg-blue'
    },
    {
      screen: 'intro-slide-2',
      line1: 'Most will be made under pressure.',
      line2: " isn't about what you know.",
      highlighted: 'This experience',
      bgClass: 'bg-light'
    },
    {
      screen: 'intro-slide-3',
      line1: "it's about how you move forward",
      line2: '',
      highlighted: 'when clarity is incomplete.',
      bgClass: 'bg-lighter'
    }
  ];

  private nextScreenMap: Record<string, AppScreen> = {
    'intro-slide-1': 'intro-slide-2',
    'intro-slide-2': 'intro-slide-3',
    'intro-slide-3': 'registration'
  };

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.slide = this.slides.find(s => s.screen === this.quizService.currentScreen) || this.slides[0];
  }

  advance(): void {
    const next = this.nextScreenMap[this.quizService.currentScreen];
    if (next) this.quizService.setScreen(next);
  }
}
