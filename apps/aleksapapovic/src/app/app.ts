import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { SplashScreenComponent } from './splash-screen.component';
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three';
import Lenis from 'lenis';

@Component({
  standalone: true,
  imports: [RouterOutlet, NgIf, SplashScreenComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('bgCanvas', { static: true })
  bgCanvas?: ElementRef<HTMLCanvasElement>;

  private renderer?: WebGLRenderer;
  private scene = new Scene();
  private camera = new PerspectiveCamera(60, 1, 0.1, 200);
  private particles?: Points;
  private frameId?: number;

  title = 'andresjosehr-portfolio';
  appContentVisible = false;

  private lenis!: Lenis;

  onSplashAnimationCompleted(): void {
    this.appContentVisible = true;

    setTimeout(() => {
      this.initLenis();
    }, 100);
  }

  private initLenis(): void {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    });

    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  ngAfterViewInit(): void {
    if (!this.bgCanvas?.nativeElement || typeof window === 'undefined') {
      return;
    }

    this.scene.background = new Color('transparent');
    this.renderer = new WebGLRenderer({
      canvas: this.bgCanvas.nativeElement,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.camera.position.z = 50;

    this.createParticles();

    this.resize();
    window.addEventListener('resize', this.resize);
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.lenis) {
      this.lenis.destroy();
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resize);
    }

    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = undefined;
    }

    this.renderer?.dispose();
  }

  private createParticles(): void {
    const count = 900;
    const geometry = new BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));

    this.particles = new Points(
      geometry,
      new PointsMaterial({
        color: 0x61dafb,
        size: 1.1,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
      })
    );

    this.scene.add(this.particles);
  }

  private animate = (): void => {
    if (!this.renderer || !this.particles) {
      return;
    }

    const time = performance.now() * 0.0004;
    this.particles.rotation.y = time * 0.5;
    this.particles.rotation.x = Math.sin(time) * 0.3;

    this.renderer.render(this.scene, this.camera);
    this.frameId = requestAnimationFrame(this.animate);
  };

  private resize = (): void => {
    if (!this.renderer || typeof window === 'undefined') {
      return;
    }

    const { innerWidth: width, innerHeight: height } = window;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  };
}
