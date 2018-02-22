function resize(width, height, canvases){
	if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
		const body = document.querySelectorAll('body')[0];
		body.style.width = width + 'px';
		body.style.height = height + 'px';
	}

	canvases.forEach(canvasId => {
		const el = document.querySelector(`#${canvasId}`);
		el.setAttribute('width', width);
		el.setAttribute('height', height);
	});
}

const config = {
	width: 360,
	height: 600,
	canvases: ['bg', 'firework'],
	// skyColor: 'hsla(210, 60%, 5%, 0.2)',
	skyColor: 'hsla({hue}, 60%, {lightness}%, 0.2)',
	fireworkTime:{min:30,max:60},
	fireworkOpt:{
		x: undefined,
		y: undefined,
		xEnd: undefined,
		yEnd: undefined,
		radius: 2,  //烟花半径
		opacity: 0.8,
		count: 300,   //炸裂后粒子数
		wait: undefined,  //消失后 => 炸裂  等待时间
	}
}

resize(config.width, config.height, config.canvases);

class Particle{
	constructor({x, y, size = 1, radius = 1.2} = {}){
		this.x = x;
		this.y = y;
		this.size = size;

		this.rate = Math.random();
		this.angle = Math.PI * 2 * Math.random();
		this.vx = radius * Math.cos(this.angle) * this.rate;
		this.vy = radius * Math.sin(this.angle) * this.rate;
	}

	go(){
		this.x += this.vx;
		this.y += this.vy; 
		this.vy += 0.02;
		this.vx *= 0.98;
		this.vy *= 0.98;
	}

	render(ctx){
		this.go();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
		ctx.fill();
	}
}

class Firework{
	constructor({x, y = config.height, xEnd, yEnd, count = 300, wait} = {}){
		this.x = x || config.width / 8 + Math.random() * config.width * 3 / 4;
		this.y = y;
		this.xEnd = xEnd || this.x;
		this.yEnd = yEnd || config.width / 8 + Math.random() * config.width * 3 / 8;
		this.opacity = 0.8;
		this.count = count;

		this.hue = 360 * Math.random() | 0;
		this.color = `hsla(${this.hue},80%,60%,1)`;
		this.size = 2;
		this.velocity = -3;

		this.particles = [];
		this.createParticles();

		this.status = 1;
		this.wait = wait || 30 + Math.random() * 30;
	}
	createParticles(){
		for(let i = 0;i < this.count; ++i){
			this.particles.push(new Particle({x:this.xEnd, y:this.yEnd}));
		}
	}
	getSkyColor(){
		const skyColor = {
			lightness: this.status == 3 ? this.opacity : 0 ,
			hue: this.hue
		};
		return skyColor;
	}
	rise(){
		this.y += this.velocity * 1;
		this.velocity += 0.005;
		if(this.y - this.yEnd <= 50){
			this.opacity = (this.y - this.yEnd) / 50;
		}
		if(this.y <= this.yEnd){
			this.status = 2;
		}

	}
	render(ctx){
		switch(this.status){
			case 1:
				ctx.save();
				ctx.beginPath();
				ctx.globalCompositeOperation = 'lighter';
				ctx.globalAlpha = this.opacity;
				ctx.translate(this.x, this.y);
				ctx.scale(0.8, 2.3);
				ctx.translate(-this.x, -this.y);
				ctx.fillStyle = this.color;
				ctx.arc(this.x + Math.sin(Math.PI * 2 * Math.random()) / 1.2, this.y, this.size, 0, Math.PI * 2, false);
				ctx.fill();
				ctx.restore();

				this.rise();
				return true;
			break;
			case 2:
				if(--this.wait <= 0){

					this.opacity = 1;
					this.status = 3;
				}
				return true;
			break;
			case 3:
				ctx.save();
				ctx.globalCompositeOperation = 'lighter';
				ctx.globalAlpha = this.opacity;
				ctx.fillStyle = this.color;
				for(let i = 0;i < this.particles.length;++i){
					this.particles[i].render(ctx);
				}
				ctx.restore();

				this.opacity -= 0.01;
				return this.opacity > 0;
			break;
			default: 
				return false;
		}

	}

}

const canvas = {
	init: function(){
		this.setProperty();
		this.renderBg();
		this.loop();
	},
	setProperty: function(){
		this.fireworks = [];
		this.width = config.width;
		this.height = config.height;
		this.fireworkTime = (config.fireworkTime.min + (config.fireworkTime.max - config.fireworkTime.min) * Math.random()) | 0;

		this.skyColor = {
			lightness: 0,
			hue: 210
		}
		this.bgCtx = document.querySelector('#bg').getContext('2d');
		this.fireworkCtx = document.querySelector('#firework').getContext('2d');
	},
	renderBg(){
		this.bgCtx.fillStyle = 'hsla(210, 60%, 5%, 0.2)'
		this.bgCtx.fillRect(0, 0, this.width, this.height);
	},

	loop(){
		requestAnimationFrame(this.loop.bind(this));
		// this.fireworkCtx.clearRect(0, 0, this.width, this.height);
		this.fireworkCtx.fillStyle = config.skyColor.replace('{lightness}', 5 + this.skyColor.lightness * 15).replace('{hue}' , this.skyColor.hue);
		this.fireworkCtx.fillRect(0,0,this.width,this.height);	

		if(--this.fireworkTime <= 0){
			this.fireworks.push(new Firework(config.fireworkOpt));
			this.fireworkTime = (config.fireworkTime.min + (config.fireworkTime.max - config.fireworkTime.min) * Math.random()) | 0;
		}
		this.skyColor = {
			lightness: 0,
			hue: 210
		};
		for(let i = this.fireworks.length - 1; i >= 0; --i){
			this.skyColor = this.skyColor.lightness >= this.fireworks[i].getSkyColor().lightness ? this.skyColor : this.fireworks[i].getSkyColor();
			!this.fireworks[i].render(this.fireworkCtx) && this.fireworks.splice(i,1);	
		}

		

	}
}



canvas.init();