import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `<section class="py-12"><div class="max-w-2xl mx-auto text-center"><h1 class="text-4xl font-extrabold mb-4 text-gradient bg-gradient-to-r from-blue-600 to-cyan-400 inline-block text-transparent bg-clip-text">About</h1><p class="text-gray-800 text-lg mt-4 font-light">This is a placeholder About section. Add your details here!</p></div></section>`
})
export class AboutComponent {}
