const studio = document.querySelector('#studio');

function autoScreen() {
	const body = document.body;
	studio.setAttribute('width',body.clientWidth);
	studio.setAttribute('height',body.clientHeight);
}

window.onresize = autoScreen;
autoScreen();

const canvas = {
	init(){
		this.setProperty();
		// this.test();
		this.loop();
	},
	setProperty(){
		this.ctx = studio.getContext('2d');
	},
	test(){
		this.ctx.font = 'bold 40px Arial';
		this.ctx.textBaseline = 'middle';
		this.ctx.textAlign = 'center';
		this.ctx.fillText('你好啊', 60, 20);

		const ctx = this.ctx;
		document.querySelector('#button').addEventListener('click', function(){
			const imgData = ctx.getImageData(0, 0, 120, 40);
			for(let i = 0;i < imgData.data.length; i+=4){
				if(imgData.data[i + 3] == 0) continue;
				imgData.data[i] = 255;
				imgData.data[i + 1] = 0;
				imgData.data[i + 2] = 0;
				// imgData.data[i + 3] = 255;
			}
			ctx.putImageData(imgData,120,0);
		});
	},
	loop(){
		
	}
}

class ShapeBuilder{
	constructor(){

	}
}


canvas.init();

