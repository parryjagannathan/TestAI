// src/app/components/question/question-options.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { QuizQuestion, QUIZ_QUESTIONS, QuizOption } from '../../models/quiz.model';

@Component({
  selector: 'app-question-options',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="options-screen" [class]="bgClass">
      <!-- Progress Stepper -->
      <div class="stepper">
        <div class="step-track">
          <ng-container *ngFor="let q of questions; let i = index">
            <div class="step-dot" [class.active]="i === questionIndex" [class.completed]="i < questionIndex"></div>
            <div class="step-line" *ngIf="i < questions.length - 1" [class.completed]="i < questionIndex"></div>
          </ng-container>
        </div>
      </div>

      <!-- User tag -->
      <div class="user-tag">{{ firstName }} {{ lastName }}</div>

      <!-- Timer -->
      <div class="timer-section">
        <div class="timer-label">What do you do?</div>
        <div class="timer-display" [class.urgent]="timeLeft <= 3">
          {{ formattedTime }}
        </div>
      </div>

      <!-- Options grid -->
      <div class="options-grid" *ngIf="question">
        <button 
          *ngFor="let option of question.options"
          class="option-btn"
          [class.selected]="selectedOption === option.label"
          [class.correct]="selectedOption && option.label === selectedOption"
          (click)="selectOption(option)"
        >
          {{ option.text }}
        </button>
      </div>

      <div class="protiviti-logo">protiviti<sup>®</sup></div>
    </div>
  `,
  styles: [`
    .options-screen {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-top: 4rem;
      position: relative;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      box-sizing: border-box;
    }
    .bg-cracked {
      background: linear-gradient(180deg, #3a8ab5 0%, #1a5a8a 30%, #5a8aaa 60%, #8aacb8 100%);
      background-image: 
        radial-gradient(ellipse at center bottom, rgba(255,255,255,0.15) 0%, transparent 60%),
        linear-gradient(180deg, #2a6a9a 0%, #1a4a7a 40%, #3a6a8a 70%, #7aaac0 100%);
    }
    .bg-paths { background: linear-gradient(160deg, #4a9bc5 0%, #2a7aaa 30%, #6aaac0 70%, #9acad5 100%); }
    .bg-alerts { background: linear-gradient(160deg, #2a6a9a 0%, #1a4a7a 30%, #4a7a9a 70%, #7aaac0 100%); }
    .bg-team { background: linear-gradient(160deg, #3a7aaa 0%, #1a5a8a 40%, #4a8aaa 70%, #8abac5 100%); }
    .bg-fog { background: linear-gradient(160deg, #6a8a9a 0%, #4a6a7a 30%, #7a9aaa 70%, #aacaca 100%); }

    .stepper {
      position: absolute;
      top: 1.2rem;
      left: 50%;
      transform: translateX(-50%);
      width: 40%;
    }
    .step-track { display: flex; align-items: center; justify-content: center; }
    .step-dot {
      width: 12px; height: 12px;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
      border: 2px solid rgba(255,255,255,0.5);
      flex-shrink: 0;
    }
    .step-dot.active { background: #1a3a5c; border-color: #1a3a5c; }
    .step-dot.completed { background: #1a3a5c; border-color: #1a3a5c; }
    .step-line { flex: 1; height: 2px; background: rgba(255,255,255,0.35); margin: 0 2px; }
    .step-line.completed { background: #1a3a5c; }

    .user-tag {
      position: absolute;
      top: 1rem;
      right: 2rem;
      background: white;
      padding: 0.4rem 1rem;
      border-radius: 50px;
      font-size: 0.85rem;
      color: #1a2a3a;
    }
    .timer-section {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    .timer-label {
      font-size: 1rem;
      color: rgba(255,255,255,0.85);
      margin-bottom: 0.2rem;
    }
    .timer-display {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 700;
      color: #1a3a5c;
      font-variant-numeric: tabular-nums;
      transition: color 0.3s;
    }
    .timer-display.urgent { color: #c0392b; animation: urgentPulse 0.5s infinite; }
    @keyframes urgentPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.2rem;
      width: 90%;
      max-width: 1100px;
      flex: 1;
    }
    .option-btn {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(10px);
      border: 2px solid transparent;
      border-radius: 16px;
      padding: 2rem 2.5rem;
      font-size: clamp(1rem, 2.5vw, 1.4rem);
      color: #1a2a3a;
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
      line-height: 1.4;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .option-btn:hover {
      background: rgba(255, 255, 255, 0.85);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    }
    .option-btn.selected {
      background: rgba(26, 58, 92, 0.85);
      color: white;
      border-color: #1a3a5c;
      transform: scale(1.02);
    }
    .protiviti-logo {
      position: absolute;
      bottom: 1.5rem;
      right: 2rem;
      font-size: 1.2rem;
      color: white;
      font-weight: 300;
      opacity: 0.8;
    }
    .protiviti-logo sup { font-size: 0.55rem; vertical-align: super; }
    @media (max-width: 600px) {
      .options-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class QuestionOptionsComponent implements OnInit, OnDestroy {
  question: QuizQuestion | null = null;
  questionIndex = 0;
  questions = QUIZ_QUESTIONS;
  selectedOption: string | null = null;
  timeLeft = 10;
  bgClass = 'bg-cracked';

  private bgClasses = ['bg-cracked', 'bg-paths', 'bg-alerts', 'bg-team', 'bg-fog'];
  private timer: any;

  get firstName() { return this.quizService.user.firstName; }
  get lastName() { return this.quizService.user.lastName; }

  get formattedTime(): string {
    const mins = Math.floor(this.timeLeft / 60);
    const secs = this.timeLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.questionIndex$.subscribe(idx => {
      this.questionIndex = idx;
      this.question = QUIZ_QUESTIONS[idx];
      this.bgClass = this.bgClasses[idx] || 'bg-cracked';
      this.selectedOption = null;
      this.startTimer();
    });
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  private startTimer(): void {
    this.clearTimer();
    this.timeLeft = this.question?.timeLimit || 10;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.clearTimer();
        this.autoAdvance();
      }
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private autoAdvance(): void {
    // If no answer selected when timer runs out, record 0 points
    if (!this.selectedOption && this.question) {
      this.quizService.recordAnswer(this.question.id, 'none', 0);
    }
    this.quizService.nextQuestion();
  }

  selectOption(option: QuizOption): void {
    if (!this.question) return;
    this.clearTimer();
    this.selectedOption = option.label;
    this.quizService.recordAnswer(this.question.id, option.label, option.points);
    
    // Short delay to show selection, then advance
    setTimeout(() => {
      this.quizService.nextQuestion();
    }, 800);
  }
}
