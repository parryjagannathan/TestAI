// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { QuizService, AppScreen } from './services/quiz.service';
import { SplashComponent } from './components/splash/splash.component';
import { IntroSlidesComponent } from './components/intro-slides/intro-slides.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuestionContextComponent } from './components/question/question-context.component';
import { QuestionOptionsComponent } from './components/question/question-options.component';
import { ResultsComponent } from './components/results/results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SplashComponent,
    IntroSlidesComponent,
    RegistrationComponent,
    WelcomeComponent,
    QuestionContextComponent,
    QuestionOptionsComponent,
    ResultsComponent
  ],
  template: `
    <div class="app-container">
      <ng-container [ngSwitch]="currentScreen">
        <app-splash *ngSwitchCase="'splash'"></app-splash>
        <app-intro-slides *ngSwitchCase="'intro-slide-1'"></app-intro-slides>
        <app-intro-slides *ngSwitchCase="'intro-slide-2'"></app-intro-slides>
        <app-intro-slides *ngSwitchCase="'intro-slide-3'"></app-intro-slides>
        <app-registration *ngSwitchCase="'registration'"></app-registration>
        <app-welcome *ngSwitchCase="'welcome'"></app-welcome>
        <app-question-context *ngSwitchCase="'question-context'"></app-question-context>
        <app-question-options *ngSwitchCase="'question-options'"></app-question-options>
        <app-results *ngSwitchCase="'results'"></app-results>
      </ng-container>
    </div>
  `,
  styles: [`
    .app-container {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
  `]
})
export class AppComponent implements OnInit {
  currentScreen: AppScreen = 'splash';

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.screen$.subscribe(screen => {
      this.currentScreen = screen;
    });
  }
}
