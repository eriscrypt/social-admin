class Particle {
  x: number;
  y: number;
  dx: number = 1;
  dy: number = 0.5;
  radius: number = 40;
  color: string = "#00d8cd";

  constructor() {
    this.x =
      Math.random() * (window.innerWidth - this.radius * 2) + this.radius;
    this.y =
      Math.random() * (window.innerHeight - this.radius * 2) + this.radius;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x > window.innerWidth - this.radius || this.x < 0 + this.radius) {
      this.dx = -this.dx;
    }
    if (this.y > window.innerHeight - this.radius || this.y < 0 + this.radius) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

export class CanvasPlugin {
  canvas: null | HTMLCanvasElement = null;
  ctx: null | CanvasRenderingContext2D = null;
  width: number = 0;
  height: number = 0;

  particles = [] as Particle[];

  constructor() {
    const { canvas, ctx } = this.getCanvas();
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    document.body.appendChild(this.canvas);

    // for (let i = 0; i < 1; i++) {
    //   this.particles.push(new Particle());
    // }

    this.render();
  }

  getCanvas() {
    const el = document.createElement("canvas");
    el.id = "canvas";
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.background = "var(--bg)";

    const ctx = el.getContext("2d");

    return {
      canvas: el,
      ctx,
    };
  }

  render() {
    if (!this.ctx) return;
    requestAnimationFrame(this.render.bind(this));

    this.ctx.clearRect(0, 0, this.width, this.height);

    const lines = 20;
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#00d8cd";
    this.ctx.lineWidth = 4;
    for (let i = 0; i < lines; i++) {
      this.ctx.moveTo(0, 100 + i * 40);
      this.ctx.lineTo(this.width, this.height + 100);
      this.ctx.stroke();
    }

    this.ctx.closePath();

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      particle.draw(this.ctx);
      particle.update();
    }
  }
}
