const studio = document.querySelector('#studio');
const cache = document.createElement('canvas');

function autoScreen() {
	const body = document.body;
	studio.setAttribute('width',body.clientWidth);
	studio.setAttribute('height',body.clientHeight);
	cache.width = body.clientWidth;
	cache.height = body.clientHeight;
	// cache.setAttribute('width',body.clientWidth);
	// cache.setAttribute('height',body.clientHeight);
}

window.onresize = autoScreen;
autoScreen();

const ShapeBuilder = {
	init(width, height){
		this.width = width;
		this.height = height;
		this.ctx = cache.getContext('2d');
		this.ctx.textBaseline = 'middle';
		this.ctx.textAlign = 'center';
	},
	write(words, x, y, size = 40){
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.font = `bold ${size}px Arial`;
		this.ctx.fillText(words, x, y);
		this.x = x;
		this.y = y;
		this.size = size;
		this.length = words.length;
	},
	draw(x, y, size, gap){
		this.x = x;
		this.y = y;
		this.size = size;
		this.width = (this.width / gap | 0) * gap; 
		this.height = (this.height / gap | 0) * gap; 
		this.ctx.beginPath();
        this.ctx.fillStyle = 'red';
        this.ctx.moveTo(this.x + 0.5 * this.size, this.y + 0.3 * this.size);
        this.ctx.bezierCurveTo(this.x + 0.1 * this.size, this.y, this.x, 
                        this.y + 0.6 * this.size, this.x + 0.5 * 
                        this.size, this.y + 0.9 * this.size);
        this.ctx.bezierCurveTo(this.x + 1 * this.size, this.y + 0.6 * 
                        this.size, this.x + 0.9 * this.size, this.y, 
                        this.x + 0.5 * this.size,
                        this.y + 0.3 * this.size);
        this.ctx.closePath();
        this.ctx.fill();
        const data = this.ctx.getImageData(0, 0, this.width, this.height).data;
        const positions = [];
        x = 0;
        y = 0;
        for(var i = 0;i < data.length; i += 4 * gap){
            if(data[i+3] > 0){
                positions.push({x, y});
            }
            
            x += gap;
            
            if(x >= this.width | 0){
                x = 0;
                y += gap;
                i += (gap - 1) * 4 * this.width;
            }
        }
		return positions;

	},
	getPositions(gap){
		const xStart = this.x - (this.length / 2) * this.size, 
		 	xEnd = this.x + (this.length / 2) * this.size,
			yStart = this.y - this.size / 2, 
			yEnd = this.y + this.size / 2, 
			data = this.ctx.getImageData(xStart, yStart, this.size * this.length, this.size).data;	

		let positions = [], x = xStart, y = yStart;
	 	for(var i = 0;i < data.length; i += 4 * gap){
            if(data[i+3] > 0){
                positions.push({x, y});	
            }
            
            x += gap;
            
            if(x >= xEnd){
                x = xStart;
                y += gap;
                i += (gap - 1) * 4 * (xEnd - xStart);
            }
        }
		return positions;
	}
}

ShapeBuilder.init(document.body.clientWidth, document.body.clientHeight);

class Particle {
	constructor({x, y, size = 2, color, xEnd, yEnd, e = 60} = {}){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color ||  `hsla(${Math.random() * 360}, 90%, 65%, 1)`;
        this.xEnd = xEnd;
        this.yEnd = yEnd;
        
        //计算每一帧走过的距离
        this.e = e;
        this.dx = (xEnd - x) / e;
		this.dy = (yEnd - y) / e;
    }
    go(){
        if(--this.e <= 0) {
        	this.x = this.xEnd;
        	this.y = this.yEnd;
        	return ;
        }
		this.x += this.dx;
		this.y += this.dy;
    }
    render(ctx){
        this.go();
        //下面是画出心型的贝塞尔曲线
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.x + 0.5 * this.size, this.y + 0.3 * this.size);
        ctx.bezierCurveTo(this.x + 0.1 * this.size, this.y, this.x, 
                        this.y + 0.6 * this.size, this.x + 0.5 * 
                        this.size, this.y + 0.9 * this.size);
        ctx.bezierCurveTo(this.x + 1 * this.size, this.y + 0.6 * 
                        this.size, this.x + 0.9 * this.size, this.y, 
                        this.x + 0.5 * this.size,
                        this.y + 0.3 * this.size);
        ctx.closePath();
        ctx.fill();
        return true;
    }
}

const canvas = {
	init(){
		this.setProperty();
		// this.createParticles();
		this.createHeart();
		this.loop();
	},
	setProperty(){
		this.ctx = studio.getContext('2d');
		this.width = document.body.clientWidth;
		this.height = document.body.clientHeight;
		this.particles = [];
	},
	createParticles(){
		let dots;
		ShapeBuilder.write('每个字都是',this.width / 2, this.height / 3, 120);
		dots = ShapeBuilder.getPositions(6);
		ShapeBuilder.write('爱你的模样', this.width / 2, this.height * 2 / 3, 120);
		dots = dots.concat(ShapeBuilder.getPositions(6));
		for(let i = 0; i < dots.length; i++){
			this.particles.push(new Particle({
				xEnd:dots[i].x, 
				yEnd:dots[i].y , 
				x: Math.random() * this.width, 
				y: Math.random() * this.height, 
				size:6, 
				color:'hsla(360, 90%, 65%, 1)',
			}));
		}
		
	},
	createHeart(){
		const dots = ShapeBuilder.draw(160, 50, 350, 5);
		console.log(dots);
		for(let i = 0; i < dots.length; i++){
			this.particles.push(new Particle({
				xEnd:dots[i].x, 
				yEnd:dots[i].y , 
				x: Math.random() * this.width, 
				y: Math.random() * this.height, 
				size:6, 
				color:'hsla(360, 90%, 65%, 1)',
			}));
		}
	},
	loop(){
		requestAnimationFrame(this.loop.bind(this));
		this.ctx.fillStyle = 'rgba(0,0,0,0.2)';
		this.ctx.fillRect(0, 0, this.width, this.height);
		// this.ctx.clearRect(0, 0, this.width, this.height);
		for(var i = 0; i < this.particles.length; i++){
			this.particles[i].render(this.ctx);
		}
	}
}

canvas.init();

