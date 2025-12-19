import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideLottieOptions } from 'ngx-lottie';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
provideLottieOptions({
  player: () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web'),
});
