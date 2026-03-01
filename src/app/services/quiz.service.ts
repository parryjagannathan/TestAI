// src/app/services/quiz.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizResult, QUIZ_QUESTIONS, getPersonaByScore } from '../models/quiz.model';

export type AppScreen = 
  | 'splash'
  | 'intro-slide-1'
  | 'intro-slide-2' 
  | 'intro-slide-3'
  | 'registration'
  | 'welcome'
  | 'question-context'
  | 'question-options'
  | 'results';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private currentScreen$ = new BehaviorSubject<AppScreen>('splash');
  private currentQuestion$ = new BehaviorSubject<number>(0);
  private answers: { questionId: number; selectedOption: string; points: number }[] = [];
  private userData = { firstName: '', lastName: '', email: '', country: '' };
  private resultSubject$ = new BehaviorSubject<QuizResult | null>(null);

  screen$: Observable<AppScreen> = this.currentScreen$.asObservable();
  questionIndex$: Observable<number> = this.currentQuestion$.asObservable();
  result$: Observable<QuizResult | null> = this.resultSubject$.asObservable();

  get currentScreen(): AppScreen {
    return this.currentScreen$.value;
  }

  get questionIndex(): number {
    return this.currentQuestion$.value;
  }

  get questions() {
    return QUIZ_QUESTIONS;
  }

  get user() {
    return this.userData;
  }

  setScreen(screen: AppScreen): void {
    this.currentScreen$.next(screen);
  }

  setUser(firstName: string, lastName: string): void {
    this.userData.firstName = firstName;
    this.userData.lastName = lastName;
  }

  setContact(email: string, country: string): void {
    this.userData.email = email;
    this.userData.country = country;
  }

  recordAnswer(questionId: number, selectedOption: string, points: number): void {
    const existing = this.answers.findIndex(a => a.questionId === questionId);
    const answer = { questionId, selectedOption, points };
    if (existing >= 0) {
      this.answers[existing] = answer;
    } else {
      this.answers.push(answer);
    }
  }

  nextQuestion(): void {
    const next = this.currentQuestion$.value + 1;
    if (next < QUIZ_QUESTIONS.length) {
      this.currentQuestion$.next(next);
      this.setScreen('question-context');
    } else {
      this.calculateResults();
    }
  }

  calculateResults(): void {
    const totalScore = this.answers.reduce((sum, a) => sum + a.points, 0);
    const persona = getPersonaByScore(totalScore);
    
    const result: QuizResult = {
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      email: this.userData.email,
      country: this.userData.country,
      answers: [...this.answers],
      totalScore,
      persona,
      completedAt: new Date()
    };

    this.resultSubject$.next(result);
    this.setScreen('results');
  }

  submitToApi(result: QuizResult): Observable<any> {
    // TODO: Replace with actual third-party API endpoint
    console.log('Submitting to API:', {
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      country: result.country,
      score: result.totalScore,
      persona: result.persona.id,
      answers: result.answers,
      completedAt: result.completedAt
    });
    
    // Simulated API call - replace with actual HttpClient.post()
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({ success: true, persona: result.persona.id, score: result.totalScore });
        observer.complete();
      }, 1500);
    });
  }

  reset(): void {
    this.answers = [];
    this.userData = { firstName: '', lastName: '', email: '', country: '' };
    this.currentQuestion$.next(0);
    this.resultSubject$.next(null);
    this.setScreen('splash');
  }
}
