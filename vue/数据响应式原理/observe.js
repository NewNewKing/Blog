// /*
// * 观察数据的方法，并且可以返回数据的观察者
// */ 
// function observe(value) {
// 	//如果数据不是对象就直接返回
// 	if(typeof value !== 'object') return;
// 	let ob;

// 	//如果数据有观察者，就直接返回观察者
// 	if(value.__ob__){
// 		ob = value.__ob__;
// 	//如果数据没有观察者，就观察数据，新建一个观察者并且返回这个观察者	
// 	}else if(typeof value === 'object'){
// 		ob = new Observer(value);
// 	}

// 	return ob;
// }

// //观察者类
// class Observer {
// 	constructor(value){
// 		//如果是数组
// 		if(Aarray.isArray(value)){
// 			//使用变异的方法来替换某些原生的数组方法  如push、pop等
// 			augment(value, arrayMethods, arrayKeys);
// 		//这里没有进行值的判断
// 		//但实际上只对对象起作用
// 		}else{

// 		}
// 	}
// }

function defineReactive(obj,key,val) {
	const dep = new Dep();
	const property = Object.getOwnPropertyDescriptor(obj, key);
	const getter = property && property.get
  	const setter = property && property.set

	Object.defineProperty(obj,key,{
		enumerable: true,
    	configurable: true,
    	get: function () {
    		const value = getter ? getter.call(obj) : val

    		if(Dep.target){
    	        //添加订阅
    	        dep.depend()
    	    }
    	    console.log(dep);
    		return value;
    	},
    	set: function (newVal) {
    		const value = getter ? getter.call(obj) : val
    		//判断新值与旧值是否相等
    		//判断的后半段是为了验证新值与旧值都为NaN的情况  NaN不等于自身
    		if(newVal === value || (newVal !== newVal && value !== value)){
    			return ;
    		}
    		// observe(newVal);
    		val = newVal;
    		console.log(dep);
    		//发布改变	
    		dep.notify();
    	}
	});
}

//这一句是不是感觉很熟悉  就相当于初始化vue的data ---- data:{obj:{}};
const obj = {
	html:'how are you'
};

//低配的不能再低配的watcher对象（源码中是一个类，我这用一个对象代替了）
const watcher = {
	addDep:function (dep) {
		dep.addSub(this);
	},
	update:function(){
		box1Html();
	}
}
const watcher2 = {
	addDep:function (dep) {
		dep.addSub(this);
	},
	update:function(){
		box2Html();
	}
}

//假装这个是渲染页面的
function box1Html () {
	document.querySelector('#box1').innerHTML = obj.html;
}
function box2Html () {
	document.querySelector('#box2').innerHTML = obj.html;
}

defineReactive(obj,'html',obj.html);//定义响应式的数据
Dep.target = watcher;
box1Html();
Dep.target = null;

Dep.target = watcher2;
box2Html();
Dep.target = null;

// 然后在下打开了控制台开始调试，输入：
// obj.html = 'I am fine thank you'

