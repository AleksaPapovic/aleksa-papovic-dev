import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  sent = false;
  error = '';
  loading = false;
  captchaPassed = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      captcha: ['', [Validators.required]],
    });
  }

  // For demo: captcha is "blue42"
  checkCaptcha() {
    if (this.contactForm.value.captcha.trim().toLowerCase() === 'blue42') {
      this.captchaPassed = true;
      this.error = '';
    } else {
      this.captchaPassed = false;
      this.error = 'CAPTCHA failed!';
    }
  }

  async onSubmit() {
    this.submitted = true;
    this.error = '';
    if (!this.captchaPassed) {
      this.error = 'Please solve the captcha correctly.';
      return;
    }
    if (this.contactForm.invalid) {
      this.error = 'Please fill in all fields correctly.';
      return;
    }
    this.loading = true;

    // In production, use your backend! This just simulates sending...
    setTimeout(() => {
      this.sent = true;
      this.loading = false;
    }, 1400);
    // EMAIL SEND: Here you would POST to a server API that sends the mail to papovicaleksa99@gmail.com
    // with the form data.
  }
}
