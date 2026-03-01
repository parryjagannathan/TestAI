// src/app/components/registration/registration.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="registration-screen">
      <div class="logo">protiviti<sup>®</sup></div>
      
      <div class="content">
        <h1 class="title">Before we begin</h1>
        
        <div class="form-row">
          <input 
            type="text" 
            placeholder="First Name" 
            [(ngModel)]="firstName"
            class="input-field"
            (keyup.enter)="begin()"
          >
          <input 
            type="text" 
            placeholder="Last Name" 
            [(ngModel)]="lastName"
            class="input-field"
            (keyup.enter)="begin()"
          >
        </div>
        
        <button 
          class="begin-btn" 
          [disabled]="!firstName.trim() || !lastName.trim()"
          (click)="begin()"
        >
          Begin the Experience →
        </button>
        
        <div class="privacy">
          <p class="privacy-main">We use this information to personalize your experience</p>
          <p class="privacy-sub">Your information is handled in accordance with Protiviti's privacy standards.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .registration-screen {
      width: 100%;
      height: 100%;
      background: linear-gradient(160deg, #5bb3d0 0%, #7ec8e3 40%, #a8d8ea 70%, #caeafa 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }
    .logo {
      position: absolute;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 2rem;
      color: #1a2a3a;
      font-weight: 300;
      letter-spacing: 0.05em;
    }
    .logo sup { font-size: 0.6rem; vertical-align: super; }
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      width: 90%;
      max-width: 900px;
    }
    .title {
      font-size: clamp(1.5rem, 4vw, 2.5rem);
      color: #e8f4ff;
      font-weight: 300;
      margin: 0;
      text-align: center;
    }
    .form-row {
      display: flex;
      gap: 1.5rem;
      width: 100%;
    }
    .input-field {
      flex: 1;
      padding: 1.2rem 1.5rem;
      border-radius: 50px;
      border: none;
      background: rgba(255, 255, 255, 0.7);
      font-size: 1.1rem;
      color: #1a2a3a;
      outline: none;
      backdrop-filter: blur(10px);
      transition: background 0.2s;
    }
    .input-field::placeholder { color: #4a7a9b; }
    .input-field:focus {
      background: rgba(255, 255, 255, 0.9);
    }
    .begin-btn {
      width: 100%;
      padding: 1.3rem;
      border-radius: 50px;
      border: none;
      background: #1a3a5c;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.2s;
      letter-spacing: 0.02em;
    }
    .begin-btn:hover:not(:disabled) {
      background: #0f2640;
      transform: translateY(-1px);
    }
    .begin-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .privacy {
      text-align: center;
      margin-top: 1rem;
    }
    .privacy-main {
      color: #1a3a5c;
      font-size: 0.95rem;
      font-weight: 500;
      margin: 0 0 0.3rem 0;
    }
    .privacy-sub {
      color: #2a5a8a;
      font-size: 0.8rem;
      margin: 0;
    }
    @media (max-width: 600px) {
      .form-row { flex-direction: column; }
    }
  `]
})
export class RegistrationComponent {
  firstName = '';
  lastName = '';

  constructor(private quizService: QuizService) {}

  begin(): void {
    if (!this.firstName.trim() || !this.lastName.trim()) return;
    this.quizService.setUser(this.firstName.trim(), this.lastName.trim());
    this.quizService.setScreen('welcome');
  }
}
