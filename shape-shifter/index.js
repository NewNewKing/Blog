const studio = document.querySelector('#studio');
const cache = document.createElement('canvas');

function autoScreen() {
	const body = document.body;
	studio.setAttribute('width',body.clientWidth);
	studio.setAttribute('height',body.clientHeight);
	cache.setAttribute('width',body.clientWidth);
	cache.setAttribute('height',body.clientHeight);
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
	getPositions(){
		const xStart = this.x - (this.length / 2) * this.size, 
		 	xEnd = this.x + (this.length / 2) * this.size,
			yStart = this.y - this.size / 2, 
			yEnd = this.y + this.size / 2, 
			data = this.ctx.getImageData(xStart, yStart, xEnd, yEnd).data;

		const gap = 4;

		let positions = [], x = xStart, y = yStart;
		for(var i = 0;i < data.length; i+=4 * gap){
			if(data[i+3] == 255){
				positions.push({x, y});	
			}
			x += gap;
			if(x >= xEnd){
				x = xStart;
				y += gap;
				i += gap * 4 * (xEnd - xStart)
			}
		}
		return positions;
	}
}

ShapeBuilder.init();

class Particle {
	constructor({x, y, size = 2, color, xEnd, yEnd} = {}){
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color ||  `hsla(${Math.random() * 360}, 90%, 65%, 1)`;
		this.xEnd = xEnd;
		this.yEnd = yEnd;

		this.e = 240;
	}
	go(){

	}

	render(ctx){
		// ctx.save();
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
		// ctx.restore();
		return true;
	}
}

const canvas = {
	init(){
		this.setProperty();
		this.test();
		this.loop();
	},
	setProperty(){
		this.ctx = studio.getContext('2d');
	},
	test(){
		
		ShapeBuilder.write('你好', 80, 40, 80);
		const data = ShapeBuilder.getPositions();
		this.ctx.fillStyle = '#ff0000';
		for(var i = 0;i < data.length;i++){
			var a = new Particle({x:data[i].x, y:data[i].y, size:6});
			a.render(this.ctx);
		}
	},
	loop(){
		
	}
}





canvas.init();

