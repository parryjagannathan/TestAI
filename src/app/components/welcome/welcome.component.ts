// src/app/components/welcome/welcome.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="welcome-screen" (click)="advance()">
      <div class="logo">protiviti<sup>®</sup></div>
      <div class="user-tag">{{ firstName }} {{ lastName }}</div>

      <div class="card">
        <h1 class="greeting">Thank you {{ firstName }}!</h1>
        <p class="subtitle">This will be a short, personalized (4 – 6 minutes) designed to help you:</p>
        
        <div class="features">
          <div class="feature">
            <div class="feature-icon">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="18" stroke="#2563a8" stroke-width="2.5" fill="none"/>
                <path d="M20 20 L25 15 L30 22 L25 30" stroke="#2563a8" stroke-width="2" fill="none" stroke-linejoin="round"/>
                <line x1="16" y1="32" x2="34" y2="32" stroke="#2563a8" stroke-width="2"/>
                <line x1="18" y1="37" x2="32" y2="37" stroke="#2563a8" stroke-width="2"/>
              </svg>
            </div>
            <p>Test how you make decisions under pressure and where you can sharpen your edge</p>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 35 L30 20 L40 35" stroke="#2563a8" stroke-width="2.5" fill="none" stroke-linejoin="round"/>
                <path d="M28 35 L18 22" stroke="#2563a8" stroke-width="2.5" fill="none"/>
                <circle cx="30" cy="40" r="3" fill="#2563a8"/>
              </svg>
            </div>
            <p>Identify how your leadership style creates clarity for your team</p>
          </div>
          <div class="feature">
            <div class="feature-icon">
              <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="12" width="26" height="32" rx="2" stroke="#2563a8" stroke-width="2.5" fill="none"/>
                <line x1="20" y1="22" x2="36" y2="22" stroke="#2563a8" stroke-width="2"/>
                <line x1="20" y1="28" x2="36" y2="28" stroke="#2563a8" stroke-width="2"/>
                <line x1="20" y1="34" x2="30" y2="34" stroke="#2563a8" stroke-width="2"/>
                <circle cx="37" cy="40" r="7" stroke="#2563a8" stroke-width="2" fill="none"/>
                <line x1="43" y1="46" x2="47" y2="50" stroke="#2563a8" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <p>Receive a personalized leadership snapshot with clear, practical recommendations</p>
          </div>
        </div>
      </div>

      <div class="bottom-text">There are four types of decision makers... which one are you?</div>
      <div class="touch-hint">TOUCH ANYWHERE TO CONTINUE</div>
    </div>
  `,
  styles: [`
    .welcome-screen {
      width: 100%;
      height: 100%;
      background: linear-gradient(160deg, #5bb3d0 0%, #7ec8e3 40%, #a8d8ea 70%, #caeafa 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      padding: 1rem;
      box-sizing: border-box;
    }
    .logo {
      position: absolute;
      top: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.8rem;
      color: #1a2a3a;
      font-weight: 300;
    }
    .logo sup { font-size: 0.6rem; vertical-align: super; }
    .user-tag {
      position: absolute;
      top: 1.5rem;
      right: 2rem;
      background: white;
      padding: 0.5rem 1.2rem;
      border-radius: 50px;
      font-size: 0.9rem;
      color: #1a2a3a;
      font-weight: 500;
    }
    .card {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 2.5rem 3rem;
      max-width: 900px;
      width: 90%;
      text-align: center;
      margin-top: 3rem;
    }
    .greeting {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      color: #1a3a5c;
      margin: 0 0 0.5rem 0;
      font-weight: 400;
    }
    .subtitle {
      color: #2a5a8a;
      font-size: 0.95rem;
      margin-bottom: 2rem;
    }
    .features {
      display: flex;
      gap: 2rem;
      justify-content: center;
      align-items: flex-start;
    }
    .feature {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .feature-icon {
      width: 60px;
      height: 60px;
    }
    .feature-icon svg { width: 100%; height: 100%; }
    .feature p {
      font-size: 0.9rem;
      color: #1a3a5c;
      line-height: 1.5;
      margin: 0;
      text-align: center;
    }
    .bottom-text {
      margin-top: 2rem;
      font-size: clamp(1.2rem, 3vw, 2rem);
      color: #1a3a5c;
      font-weight: 300;
      text-align: center;
    }
    .touch-hint {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(26, 58, 92, 0.6);
      font-size: 0.75rem;
      letter-spacing: 0.2em;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }
    @media (max-width: 600px) {
      .features { flex-direction: column; }
      .card { padding: 1.5rem; }
    }
  `]
})
export class WelcomeComponent {
  get firstName() { return this.quizService.user.firstName; }
  get lastName() { return this.quizService.user.lastName; }

  constructor(private quizService: QuizService) {}

  advance(): void {
    this.quizService.setScreen('question-context');
  }
}
