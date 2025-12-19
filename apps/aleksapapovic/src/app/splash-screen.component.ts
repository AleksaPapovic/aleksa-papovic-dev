import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  OnInit,
} from '@angular/core';
import {
  Scene,
  WebGLRenderer,
  Mesh,
  PlaneGeometry,
  MeshBasicMaterial,
  OrthographicCamera,
  BufferAttribute,
} from 'three';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  standalone: true,
})
export class SplashScreenComponent implements AfterViewInit, OnInit {
  @ViewChild('gradientCanvas', { static: true })
  gradientCanvas!: ElementRef<HTMLCanvasElement>;
  @Output() animationCompleted = new EventEmitter<void>();
  loaderPercent = 0;
  private duration = 1100;
  private renderer?: WebGLRenderer;

  ngOnInit() {
    const start = performance.now();
    const animateProgress = (now: number) => {
      this.loaderPercent = Math.min(100, ((now - start) / this.duration) * 100);
      if (this.loaderPercent < 100) {
        requestAnimationFrame(animateProgress);
      } else {
        setTimeout(() => this.animationCompleted.emit(), 340);
      }
    };
    requestAnimationFrame(animateProgress);
  }

  ngAfterViewInit(): void {
    if (!this.gradientCanvas?.nativeElement) return;
    this.initThreeGradientBG();
  }

  private initThreeGradientBG() {
    const canvas = this.gradientCanvas.nativeElement;
    this.renderer = new WebGLRenderer({ canvas, antialias: true });
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height, false);
    const scene = new Scene();
    const camera = new OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      10
    );
    camera.position.z = 1;
    const geometry = new PlaneGeometry(width, height, 1, 1);
    // Top: deep dark blue, Bottom: pure black
    const colors = new Float32Array([
      0.03,
      0.08,
      0.21, // top left: darker blue
      0.03,
      0.08,
      0.21, // top right: darker blue
      0.0,
      0.0,
      0.0, // bottom left: black
      0.0,
      0.0,
      0.0, // bottom right: black
    ]);
    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    const material = new MeshBasicMaterial({ vertexColors: true });
    const plane = new Mesh(geometry, material);
    scene.add(plane);
    this.renderer.render(scene, camera);
  }
}
