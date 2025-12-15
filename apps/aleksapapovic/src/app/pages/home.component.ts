import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="home-hero">
      <div class="profile">
        <img src="https://avatars.githubusercontent.com/u/xxxxxxx?v=4" alt="Aleksa Papovic Avatar" class="profile-img"/>
        <h1>Aleksa Papovic</h1>
        <h2>Full Stack Developer & Problem Solver</h2>
        <p>
          Hi, I'm Aleksa, a passionate developer crafting beautiful web experiences, with a focus on performance, animation, and awesome user interfaces. Welcome to my digital space!
        </p>
        <a class="btn-primary" routerLink="/projects">View My Projects</a>
      </div>
    </section>
    <section class="home-about">
      <h2>About Me</h2>
      <p>
        With 7+ years experience spanning frontend (Angular, React, Three.js) and backend (Node, NestJS), I've shipped scalable products and open source libraries.
        I'm driven by curiosity, coffee, and bringing ideas to life for real people.
      </p>
      <div class="skills">
        <span>JavaScript</span>
        <span>TypeScript</span>
        <span>Angular</span>
        <span>React</span>
        <span>Three.js</span>
        <span>Node.js</span>
        <span>NestJS</span>
        <span>Design Systems</span>
      </div>
    </section>
    <section class="home-contact">
      <h2>Let's Connect</h2>
      <a href="mailto:aleksapapovic.dev@gmail.com" class="btn-outline">Email Me</a>
      <a href="https://github.com/aleksapapovic" target="_blank" class="btn-outline">GitHub</a>
      <a href="https://linkedin.com/in/aleksapapovic" target="_blank" class="btn-outline">LinkedIn</a>
    </section>
  `,
  styles: [`
    .home-hero {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 56px 16px 32px 16px;
      background: linear-gradient(135deg,#0f2027 0%,#2c5364 100%);
      color: #fff;
      text-align: center;
      min-height: 350px;
    }
    .profile-img {
      width: 120px;
      height: 120px;
      border-radius: 60px;
      border: 4px solid #61dafb;
      margin-bottom: 12px;
    }
    .btn-primary {
      margin-top: 20px;
      display: inline-block;
      padding: 10px 30px;
      border-radius: 24px;
      background: #61dafb;
      color: #0f2027;
      font-weight: bold;
      text-decoration: none;
      transition: background .3s;
    }
    .btn-primary:hover {
      background: #29c4e5;
    }
    .home-about {
      max-width: 650px;
      margin: 40px auto 0 auto;
      text-align: center;
      color: #234;
      background: #f7fafc;
      border-radius: 24px;
      box-shadow: 0 4px 24px rgba(34,60,80,.07);
      padding: 36px 22px;
    }
    .skills {
      margin: 22px 0 10px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
    }
    .skills span {
      background: #61dafb;
      color: #123;
      padding: 7px 18px;
      border-radius: 16px;
      font-size: 0.98rem;
      font-weight: 600;
      margin-bottom: 8px;
      opacity: 0.85;
    }
    .home-contact {
      max-width: 600px;
      margin: 50px auto 36px auto;
      text-align: center;
    }
    .btn-outline {
      margin: 10px 15px 0 0;
      padding: 10px 24px;
      border-radius: 22px;
      background: none;
      border: 2px solid #61dafb;
      color: #0f2027;
      font-weight: 600;
      text-decoration: none;
      display: inline-block;
      transition: background .3s, color .3s;
    }
    .btn-outline:hover {
      background: #61dafb;
      color: #fff;
    }
  `],
  standalone: true,
})
export class HomeComponent {}