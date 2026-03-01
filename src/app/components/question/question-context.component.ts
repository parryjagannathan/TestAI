// src/app/components/question/question-context.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../../services/quiz.service';
import { QuizQuestion, QUIZ_QUESTIONS } from '../../models/quiz.model';

@Component({
  selector: 'app-question-context',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="context-screen" [class]="bgClass">
      <!-- Progress Stepper -->
      <div class="stepper">
        <div class="step-track">
          <ng-container *ngFor="let q of questions; let i = index">
            <div class="step-dot" [class.active]="i === questionIndex" [class.completed]="i < questionIndex">
              <span class="step-label">{{ i + 1 }}</span>
            </div>
            <div class="step-line" *ngIf="i < questions.length - 1" [class.completed]="i < questionIndex"></div>
          </ng-container>
        </div>
      </div>

      <!-- User tag -->
      <div class="user-tag">{{ firstName }} {{ lastName }}</div>

      <!-- Question card -->
      <div class="question-card">
        <p class="question-text">{{ question?.scenario }}<br><strong>{{ question?.question }}</strong></p>
      </div>

      <button class="next-btn" (click)="showOptions()">Next</button>
      <div class="protiviti-logo">protiviti<sup>®</sup></div>
    </div>
  `,
  styles: [`
    .context-screen {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      font-family: 'Helvetica Neue', Arial, sans-serif;
    }
    .bg-cracked {
      background: linear-gradient(180deg, #3a8ab5 0%, #1a5a8a 30%, #5a8aaa 60%, #8aacb8 100%);
    }
    .bg-paths {
      background: linear-gradient(160deg, #4a9bc5 0%, #2a7aaa 30%, #6aaac0 70%, #9acad5 100%);
    }
    .bg-alerts {
      background: linear-gradient(160deg, #2a6a9a 0%, #1a4a7a 30%, #4a7a9a 70%, #7aaac0 100%);
    }
    .bg-team {
      background: linear-gradient(160deg, #3a7aaa 0%, #1a5a8a 40%, #4a8aaa 70%, #8abac5 100%);
    }
    .bg-fog {
      background: linear-gradient(160deg, #6a8a9a 0%, #4a6a7a 30%, #7a9aaa 70%, #aacaca 100%);
    }

    .stepper {
      position: absolute;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
    }
    .step-track {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .step-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
      border: 2px solid rgba(255,255,255,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.3s;
      flex-shrink: 0;
    }
    .step-dot.active {
      background: #1a3a5c;
      border-color: #1a3a5c;
      width: 16px;
      height: 16px;
    }
    .step-dot.completed {
      background: #1a3a5c;
      border-color: #1a3a5c;
    }
    .step-label {
      position: absolute;
      top: 18px;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.8);
      font-weight: 400;
    }
    .step-line {
      flex: 1;
      height: 2px;
      background: rgba(255,255,255,0.35);
      margin: 0 2px;
      transition: background 0.3s;
    }
    .step-line.completed { background: #1a3a5c; }

    .user-tag {
      position: absolute;
      top: 1.5rem;
      right: 2rem;
      background: white;
      padding: 0.5rem 1.2rem;
      border-radius: 50px;
      font-size: 0.9rem;
      color: #1a2a3a;
    }
    .question-card {
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(12px);
      border-radius: 16px;
      padding: 3rem 4rem;
      max-width: 900px;
      width: 85%;
      text-align: center;
    }
    .question-text {
      font-size: clamp(1.2rem, 3.5vw, 2rem);
      color: #1a2a3a;
      line-height: 1.6;
      margin: 0;
      font-weight: 300;
    }
    .next-btn {
      margin-top: 2.5rem;
      padding: 1rem 3rem;
      background: #1a3a5c;
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .next-btn:hover { background: #0f2640; transform: translateY(-1px); }
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
  `]
})
export class QuestionContextComponent implements OnInit {
  question: QuizQuestion | null = null;
  questionIndex = 0;
  questions = QUIZ_QUESTIONS;
  bgClass = 'bg-cracked';

  private bgClasses = ['bg-cracked', 'bg-paths', 'bg-alerts', 'bg-team', 'bg-fog'];

  get firstName() { return this.quizService.user.firstName; }
  get lastName() { return this.quizService.user.lastName; }

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.questionIndex$.subscribe(idx => {
      this.questionIndex = idx;
      this.question = QUIZ_QUESTIONS[idx];
      this.bgClass = this.bgClasses[idx] || 'bg-cracked';
    });
  }

  showOptions(): void {
    this.quizService.setScreen('question-options');
  }
}
