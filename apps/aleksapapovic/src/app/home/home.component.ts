import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
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

  @ViewChild('heroCanvas', { static: false })
  private readonly heroCanvas?: ElementRef<HTMLCanvasElement>;

  @ViewChild('heroCanvasWrap', { static: false })
  private readonly heroCanvasWrap?: ElementRef<HTMLElement>;

  photoUrl = 'profile.jpg';
  photoLoaded = true;

  private rafId: number | undefined;
  private renderer:
    | {
        dispose: () => void;
        setSize: (w: number, h: number, u?: boolean) => void;
        setPixelRatio: (r: number) => void;
      }
    | undefined;
  private camera:
    | {
        aspect: number;
        updateProjectionMatrix: () => void;
      }
    | undefined;
  private disposeThree: (() => void) | undefined;
  private readonly onResize = () => this.resize();
  private removeHeroInteractions: (() => void) | undefined;

  onPhotoError(): void {
    this.photoLoaded = false;
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    await this.initThree();
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.onResize);
    this.removeHeroInteractions?.();
    this.disposeThree?.();
    this.renderer?.dispose();
  }

  private resize(): void {
    if (!this.renderer || !this.heroCanvasWrap) return;
    const rect = this.heroCanvasWrap.nativeElement.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    this.renderer.setSize(w, h, false);
    if (this.camera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }
  }

  private async initThree(): Promise<void> {
    const canvas = this.heroCanvas?.nativeElement;
    const wrap = this.heroCanvasWrap?.nativeElement;
    if (!canvas || !wrap) return;

    const THREE = await import('three');
    const { GLTFLoader } = await import(
      'three/examples/jsm/loaders/GLTFLoader.js'
    );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.35, 3.6);
    this.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    this.renderer = renderer;

    // Skinned character + animation blending (similar vibe to three.js example)
    // https://threejs.org/examples/#webgl_animation_skinning_blending
    const group = new THREE.Group();
    scene.add(group);

    // subtle ground
    const groundGeo = new THREE.PlaneGeometry(12, 12, 1, 1);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xead2b1, // sand-ish
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    group.add(ground);

    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 8;
      positions[i3 + 1] = (Math.random() - 0.5) * 5;
      positions[i3 + 2] = (Math.random() - 0.5) * 6;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMat = new THREE.PointsMaterial({
      color: 0xf3c892,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.35,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    group.add(particles);

    const ambient = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(2.5, 3.5, 2.5);
    scene.add(key);

    const warm = new THREE.DirectionalLight(0xffe2bf, 0.65);
    warm.position.set(-3, 2.8, -1.5);
    scene.add(warm);

    // Load a locally-hosted animated skinned model (same one used by three.js examples)
    const loader = new GLTFLoader();
    type LoadedGLTF = {
      scene: import('three').Object3D;
      animations: import('three').AnimationClip[];
    };

    const gltf = await new Promise<LoadedGLTF>((resolve, reject) => {
      loader.load(
        'models/Soldier.glb',
        (loaded) => resolve(loaded as unknown as LoadedGLTF),
        undefined,
        reject
      );
    });

    const character = gltf.scene;
    character.traverse((obj) => {
      const mesh = obj as unknown as import('three').Mesh;
      if (!mesh.isMesh) return;

      mesh.castShadow = false;
      mesh.receiveShadow = false;

      const mat = mesh.material;
      const mats = Array.isArray(mat) ? mat : [mat];
      for (const m of mats) {
        const maybeStd = m as unknown as {
          roughness?: number;
          metalness?: number;
        };
        if (maybeStd.roughness !== undefined) maybeStd.roughness = 0.95;
        if (maybeStd.metalness !== undefined) maybeStd.metalness = 0.02;
      }
    });

    character.scale.setScalar(1.1);
    character.position.set(0, 0, 0);
    character.rotation.y = Math.PI;
    group.add(character);

    const clock = new THREE.Clock();
    const mixer = new THREE.AnimationMixer(character);
    const actions = new Map<string, import('three').AnimationAction>();
    for (const clip of gltf.animations) {
      actions.set(clip.name, mixer.clipAction(clip));
    }

    const idle = actions.get('Idle') ?? actions.values().next().value;
    const walk = actions.get('Walk') ?? idle;
    const run = actions.get('Run') ?? walk;

    let active = idle;
    active?.reset().fadeIn(0.3).play();
    let desired: import('three').AnimationAction | undefined = active;

    const fadeTo = (
      next: import('three').AnimationAction | undefined,
      duration = 0.25
    ) => {
      if (!next || !active || next === active) return;
      next.reset().play();
      active.crossFadeTo(next, duration, true);
      active = next;
    };

    // Controls (focus the canvas wrapper by clicking it, then use arrow keys).
    // Shift = run.
    const keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      shift: false,
    };

    const setKey = (e: KeyboardEvent, isDown: boolean) => {
      switch (e.key) {
        case 'ArrowDown':
          keys.up = isDown;
          e.preventDefault();
          break;
        case 'ArrowUp':
          keys.down = isDown;
          e.preventDefault();
          break;
        case 'ArrowRight':
          keys.left = isDown;
          e.preventDefault();
          break;
        case 'ArrowLeft':
          keys.right = isDown;
          e.preventDefault();
          break;
        case 'Shift':
          keys.shift = isDown;
          break;
        default:
          break;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => setKey(e, true);
    const onKeyUp = (e: KeyboardEvent) => setKey(e, false);

    const onPointerDownFocus = () => {
      // enable keyboard capture without hijacking global arrow keys
      (wrap as HTMLElement).focus?.();
    };

    wrap.addEventListener('keydown', onKeyDown);
    wrap.addEventListener('keyup', onKeyUp);
    wrap.addEventListener('pointerdown', onPointerDownFocus);

    // Optional: keep the old "hover/press" blending as a fallback when not using keys
    let hovering = false;
    let pressed = false;
    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
      pressed = false;
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    wrap.addEventListener('pointerenter', onEnter);
    wrap.addEventListener('pointerleave', onLeave);
    wrap.addEventListener('pointerdown', onDown);
    wrap.addEventListener('pointerup', onUp);

    this.removeHeroInteractions = () => {
      wrap.removeEventListener('keydown', onKeyDown);
      wrap.removeEventListener('keyup', onKeyUp);
      wrap.removeEventListener('pointerdown', onPointerDownFocus);
      wrap.removeEventListener('pointerenter', onEnter);
      wrap.removeEventListener('pointerleave', onLeave);
      wrap.removeEventListener('pointerdown', onDown);
      wrap.removeEventListener('pointerup', onUp);
    };

    const vel = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const camOffset = new THREE.Vector3(0, 1.35, 3.6);
    const camTarget = new THREE.Vector3();

    const tick = (t: number) => {
      this.rafId = requestAnimationFrame(tick);
      const tt = t * 0.001;
      const dt = clock.getDelta();
      mixer.update(dt);

      // Movement input
      const ix = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      const iz = (keys.down ? 1 : 0) - (keys.up ? 1 : 0); // ArrowUp = forward (-Z)
      dir.set(ix, 0, iz);

      const isMoving = dir.lengthSq() > 0;
      const speed = keys.shift ? 2.0 : 1.2;

      if (isMoving) {
        dir.normalize();
        vel.copy(dir).multiplyScalar(speed);
        character.position.addScaledVector(vel, dt);

        // Face movement direction
        character.rotation.y = Math.atan2(dir.x, dir.z);
        desired = keys.shift ? run : walk;
      } else {
        // fall back to hover/press if user isn't using keyboard
        if (pressed) desired = run;
        else if (hovering) desired = walk;
        else desired = idle;
      }

      if (desired && desired !== active) fadeTo(desired, 0.2);

      // Follow camera (smooth)
      camTarget.copy(character.position).add(new THREE.Vector3(0, 1.1, 0));
      const desiredCamPos = camTarget.clone().add(camOffset);
      camera.position.lerp(desiredCamPos, 1 - Math.pow(0.001, dt)); // framerate-independent lerp
      camera.lookAt(camTarget);

      particles.rotation.y = tt * 0.05;
      renderer.render(scene, camera);
    };

    this.disposeThree = () => {
      particlesGeo.dispose();
      particlesMat.dispose();
      groundGeo.dispose();
      groundMat.dispose();
      mixer.stopAllAction();
      mixer.uncacheRoot(character);
      group.remove(character);
      character.traverse((obj) => {
        const mesh = obj as unknown as import('three').Mesh;
        if (!mesh.isMesh) return;

        mesh.geometry?.dispose?.();
        const mat = mesh.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose?.();
      });
    };

    this.resize();

    window.addEventListener('resize', this.onResize, { passive: true });
    this.rafId = requestAnimationFrame(tick);
  }
}
