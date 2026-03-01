// src/app/components/results/results.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { QuizResult, PersonaProfile } from '../../models/quiz.model';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="results-screen" *ngIf="result">
      <!-- Hero header -->
      <div class="hero-header">
        <img class="hero-bg" src="assets/images/Screen-17.jpg" alt="" style="opacity:0.15; position:absolute; inset:0; width:100%; height:100%; object-fit:cover;">
        <div class="hero-content">
          <div class="logo-white">protiviti<sup>®</sup></div>
          <div class="exec-label">Executive summary for</div>
          <h1 class="exec-name">{{ result.firstName | uppercase }} {{ result.lastName | uppercase }}</h1>
        </div>
      </div>

      <!-- Main content -->
      <div class="main-content">
        <!-- Left panel -->
        <div class="left-panel">
          <!-- Persona badge -->
          <div class="persona-badge" [style.borderColor]="result.persona.color">
            <div class="persona-icon">{{ result.persona.icon }}</div>
            <div class="persona-info">
              <div class="persona-name" [style.color]="result.persona.color">{{ result.persona.name }}</div>
              <div class="persona-tagline">{{ result.persona.tagline }}</div>
              <div class="persona-score">Score: {{ result.totalScore }} / 20</div>
            </div>
          </div>

          <!-- Score bar -->
          <div class="score-section">
            <div class="score-bar-track">
              <div class="score-bar-fill" [style.width.%]="(result.totalScore / 20) * 100" [style.backgroundColor]="result.persona.color"></div>
            </div>
            <div class="score-ranges">
              <span class="score-range" *ngFor="let p of personas" [class.active]="p.id === result.persona.id">
                <span class="range-dot" [style.backgroundColor]="p.color"></span>{{ p.name }}
              </span>
            </div>
          </div>

          <!-- Executive Summary -->
          <div class="section-card">
            <h3 class="section-title">Your Leadership Profile</h3>
            <p>{{ result.persona.executiveSummary }}</p>
          </div>

          <!-- Pressure Profile -->
          <div class="section-card">
            <h3 class="section-title">Your Pressure Profile</h3>
            <p>{{ result.persona.pressureProfile }}</p>
          </div>

          <!-- How you create clarity -->
          <div class="section-card">
            <h3 class="section-title">How You Create or Lose Clarity</h3>
            <p>{{ result.persona.clarityDescription }}</p>
          </div>

          <!-- AI Transformation -->
          <div class="section-card accent">
            <h3 class="section-title">AI & Technology Transformation</h3>
            <p>{{ result.persona.aiTransformation }}</p>
            <div class="focus-chip"><strong>24-Month Focus:</strong> {{ result.persona.aiFocus24 }}</div>
          </div>

          <!-- Risk -->
          <div class="section-card">
            <h3 class="section-title">Protect from Risk & Drive Resilience</h3>
            <p>{{ result.persona.riskResilience }}</p>
            <div class="focus-chip"><strong>24-Month Focus:</strong> {{ result.persona.riskFocus24 }}</div>
          </div>

          <!-- Growth -->
          <div class="section-card">
            <h3 class="section-title">Respond to Growth & Volatility</h3>
            <p>{{ result.persona.growthVolatility }}</p>
            <div class="focus-chip"><strong>24-Month Focus:</strong> {{ result.persona.growthFocus24 }}</div>
          </div>

          <!-- Closing -->
          <div class="closing-card" [style.borderLeftColor]="result.persona.color">
            <p class="closing-text">{{ result.persona.closingReflection }}</p>
          </div>
        </div>

        <!-- Right panel -->
        <div class="right-panel">
          <h2 class="want-report">Want the full report?</h2>
          <p class="report-sub">Receive a detailed leadership snapshot with personalized insights and recommendations.</p>

          <div class="contact-form">
            <input 
              type="email" 
              placeholder="Business email address" 
              [(ngModel)]="email"
              class="contact-input"
            >
            <select [(ngModel)]="country" class="contact-input contact-select">
              <option value="">Country</option>
              <option *ngFor="let c of countries" [value]="c">{{ c }}</option>
            </select>
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="contactConsent">
              Would you like to be contacted about future promotions or content?
            </label>
            <button class="submit-btn" [disabled]="!email || submitting || submitted" (click)="submit()">
              <span *ngIf="!submitting && !submitted">Submit</span>
              <span *ngIf="submitting">Submitting...</span>
              <span *ngIf="submitted">✓ Submitted!</span>
            </button>
          </div>

          <!-- Answer Summary -->
          <div class="answers-summary">
            <h3>Your Responses</h3>
            <div class="answer-item" *ngFor="let ans of result.answers; let i = index">
              <div class="ans-q">Q{{ ans.questionId }}</div>
              <div class="ans-text">
                <div class="ans-option">Option {{ ans.selectedOption }}</div>
                <div class="ans-points">{{ ans.points }} pt{{ ans.points !== 1 ? 's' : '' }}</div>
              </div>
            </div>
            <div class="total-row">
              <span>Total Score</span>
              <span class="total-score" [style.color]="result.persona.color">{{ result.totalScore }} / 20</span>
            </div>
          </div>

          <!-- Restart -->
          <button class="restart-btn" (click)="restart()">Start Over</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .results-screen {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background: #f0f4f8;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }
    .hero-header {
      position: relative;
      background: linear-gradient(135deg, #1a3a5c 0%, #2563a8 60%, #1a5a8a 100%);
      padding: 2.5rem 3rem;
      overflow: hidden;
    }
    .hero-content { position: relative; z-index: 1; }
    .logo-white {
      font-size: 1.5rem;
      color: white;
      font-weight: 300;
      opacity: 0.9;
      margin-bottom: 1rem;
    }
    .logo-white sup { font-size: 0.55rem; vertical-align: super; }
    .exec-label {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.7);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 0.3rem;
    }
    .exec-name {
      font-size: clamp(1.8rem, 4vw, 3rem);
      color: white;
      margin: 0;
      font-weight: 700;
    }
    .main-content {
      display: flex;
      gap: 2rem;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }
    .left-panel {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .right-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Persona Badge */
    .persona-badge {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      border-left: 5px solid;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .persona-icon { font-size: 3rem; }
    .persona-name { font-size: 1.6rem; font-weight: 700; }
    .persona-tagline { color: #666; font-size: 0.95rem; margin-top: 0.2rem; }
    .persona-score { color: #888; font-size: 0.85rem; margin-top: 0.3rem; }

    /* Score bar */
    .score-section { background: white; border-radius: 12px; padding: 1.2rem 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .score-bar-track { height: 10px; background: #e2e8f0; border-radius: 5px; margin-bottom: 0.8rem; overflow: hidden; }
    .score-bar-fill { height: 100%; border-radius: 5px; transition: width 1s ease; }
    .score-ranges { display: flex; gap: 1rem; flex-wrap: wrap; }
    .score-range { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: #666; }
    .score-range.active { font-weight: 700; color: #1a2a3a; }
    .range-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

    /* Section cards */
    .section-card {
      background: white;
      border-radius: 12px;
      padding: 1.2rem 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .section-card.accent { background: #f0f7ff; }
    .section-title { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #2563a8; margin: 0 0 0.6rem 0; }
    .section-card p { margin: 0; color: #374151; font-size: 0.9rem; line-height: 1.6; }
    .focus-chip { margin-top: 0.8rem; background: #dbeafe; border-radius: 6px; padding: 0.5rem 0.8rem; font-size: 0.82rem; color: #1e40af; }

    /* Closing */
    .closing-card { background: white; border-radius: 12px; padding: 1.5rem; border-left: 4px solid; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .closing-text { margin: 0; font-style: italic; color: #374151; font-size: 1rem; line-height: 1.6; }

    /* Right panel */
    .want-report { font-size: 1.4rem; color: #1a2a3a; margin: 0; }
    .report-sub { color: #666; font-size: 0.9rem; margin: 0; }
    .contact-form { background: white; border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .contact-input {
      width: 100%;
      padding: 0.9rem 1rem;
      border: 1.5px solid #e2e8f0;
      border-radius: 8px;
      font-size: 0.95rem;
      color: #1a2a3a;
      outline: none;
      box-sizing: border-box;
      background: white;
    }
    .contact-input:focus { border-color: #2563a8; }
    .contact-select { cursor: pointer; }
    .checkbox-label { display: flex; gap: 0.6rem; align-items: flex-start; font-size: 0.82rem; color: #555; cursor: pointer; }
    .checkbox-label input { margin-top: 2px; flex-shrink: 0; }
    .submit-btn {
      padding: 0.9rem;
      background: #1a3a5c;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .submit-btn:hover:not(:disabled) { background: #0f2640; }
    .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

    /* Answers summary */
    .answers-summary { background: white; border-radius: 12px; padding: 1.2rem 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .answers-summary h3 { margin: 0 0 1rem 0; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.08em; color: #2563a8; }
    .answer-item { display: flex; gap: 0.8rem; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #f0f4f8; }
    .ans-q { background: #e2e8f0; border-radius: 4px; padding: 0.2rem 0.5rem; font-size: 0.8rem; font-weight: 600; color: #374151; min-width: 28px; text-align: center; }
    .ans-text { flex: 1; display: flex; justify-content: space-between; align-items: center; }
    .ans-option { font-size: 0.85rem; color: #374151; }
    .ans-points { font-size: 0.8rem; font-weight: 600; color: #2563a8; }
    .total-row { display: flex; justify-content: space-between; align-items: center; padding-top: 0.8rem; font-weight: 700; }
    .total-score { font-size: 1.2rem; }

    .restart-btn {
      padding: 0.8rem;
      background: transparent;
      color: #666;
      border: 1.5px solid #e2e8f0;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .restart-btn:hover { border-color: #1a3a5c; color: #1a3a5c; }

    @media (max-width: 768px) {
      .main-content { flex-direction: column; padding: 1rem; }
    }
  `]
})
export class ResultsComponent implements OnInit {
  result: QuizResult | null = null;
  email = '';
  country = '';
  contactConsent = false;
  submitting = false;
  submitted = false;

  personas = [
    { id: 'compass', name: 'Compass', color: '#1a3a5c' },
    { id: 'accelerator', name: 'Accelerator', color: '#2563a8' },
    { id: 'beacon', name: 'Beacon', color: '#0891b2' },
    { id: 'shield', name: 'Shield', color: '#475569' }
  ];

  countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 
    'France', 'Japan', 'Singapore', 'India', 'Brazil', 'Other'
  ];

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.result$.subscribe(result => {
      this.result = result;
    });
  }

  submit(): void {
    if (!this.result || !this.email) return;
    this.quizService.setContact(this.email, this.country);
    this.submitting = true;
    
    this.quizService.submitToApi(this.result).subscribe({
      next: () => {
        this.submitting = false;
        this.submitted = true;
      },
      error: () => {
        this.submitting = false;
        alert('Submission failed. Please try again.');
      }
    });
  }

  restart(): void {
    this.quizService.reset();
  }
}
