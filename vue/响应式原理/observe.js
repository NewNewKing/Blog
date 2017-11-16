/*
* 观察数据的方法，并且可以返回数据的观察者
*/ 
function observe(value) {
	//如果数据不是对象就直接返回
	if(typeof value !== 'object') return;
	let ob;

	//如果数据有观察者，就直接返回观察者
	if(value.__ob__){
		ob = value.__ob__;
	//如果数据没有观察者，就观察数据，新建一个观察者并且返回这个观察者	
	}else if(typeof value === 'object'){
		ob = new Observer(value);
	}

	return ob;
}

//观察者类
class Observer {
	constructor(value){
		//如果是数组
		if(Aarray.isArray(value)){
			//使用变异的方法来替换某些原生的数组方法  如push、pop等
			augment(value, arrayMethods, arrayKeys);
		//这里没有进行值的判断
		//但实际上只对对象起作用
		}else{

		}
	}
}

function defineReactive(obj,key,val) {
	const dep = new Dep();

	Object.defineProperty(obj,key,{
		enumerable: true,
    	configurable: true,
    	get: function () {

    		return val;
    	},
    	set: function (newVal) {
    		//判断新值与旧值是否相等
    		//判断的后半段是为了验证新值与旧值都为NaN的情况  NaN不等于自身
    		if(newVal === val || (newVal !== newVal && value !== value)){
    			return ;
    		}
    		// observe(newVal);
    		val = newVal;
    	}
	});
}