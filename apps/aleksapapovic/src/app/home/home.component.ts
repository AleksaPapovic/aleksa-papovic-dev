import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, BlogListComponent],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  @ViewChild('terminalScreen', { static: false })
  terminalScreen?: ElementRef<HTMLPreElement>;

  photoLoaded = true;
  terminalText = '';
  userInput = '';
  typingComplete = false;

  private typingTimer: number | undefined;
  private readonly script = [
    'Trying 127.0.0.1...',
    'Connected to aleksapapovic.netlify.com',
    "Escape character is ':)'.",
    '',
    'Last login: ' + new Date().toDateString(),
    '',
    'Welcome to Aleksa Papovic portfolio site',
    '',
    'aleksapapovic@:~$ ',
  ].join('\n');

  onPhotoError(): void {
    this.photoLoaded = false;
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    this.startTerminalTyping();
  }

  ngOnDestroy(): void {
    if (this.typingTimer) window.clearTimeout(this.typingTimer);
  }

  private startTerminalTyping(): void {
    const full = this.script;
    let i = 0;

    const step = () => {
      // typing
      i = Math.min(i + 1, full.length);
      this.terminalText = full.slice(0, i);

      if (i >= full.length) {
        this.typingComplete = true;
        // Focus terminal after typing is complete
        setTimeout(() => {
          this.terminalScreen?.nativeElement.focus();
        }, 100);
        return;
      }

      const ch = full[i - 1];
      const delay = ch === '\n' ? 220 : ch === '.' ? 60 : 18;
      this.typingTimer = window.setTimeout(step, delay);
    };

    step();
  }

  onTerminalKeyDown(event: KeyboardEvent): void {
    if (!this.typingComplete) {
      event.preventDefault();
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.userInput.trim() === ':)') {
        this.router.navigate(['/contact']);
      }
      return;
    }

    if (event.key === 'Backspace') {
      event.preventDefault();
      this.userInput = this.userInput.slice(0, -1);
      return;
    }

    // Only allow characters that can form ":)"
    const allowedChars = [':', ')'];
    if (allowedChars.includes(event.key)) {
      event.preventDefault();

      // Only allow ":)" to be typed in sequence
      if (this.userInput === '' && event.key === ':') {
        this.userInput = ':';
      } else if (this.userInput === ':' && event.key === ')') {
        this.userInput = ':)';
      }
      // Ignore any other characters
    } else if (event.key.length === 1) {
      // Prevent any other character input
      event.preventDefault();
    }
  }
}
