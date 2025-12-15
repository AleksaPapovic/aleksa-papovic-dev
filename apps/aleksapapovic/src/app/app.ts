import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThreeBackgroundComponent } from './three-init/three-init.component';

@Component({
  imports: [RouterModule, ThreeBackgroundComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
