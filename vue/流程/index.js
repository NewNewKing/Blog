function Vue (option) {
	this._init(option);
}

Vue.prototype._init = function(option) {
	const vm = this;
	vm.$option = option;

	// 初始化一系列的属性与方法 生命周期钩子等等
    // initLifecycle(vm) 
    // initEvents(vm)
    // initRender(vm)
    // callHook(vm, 'beforeCreate')
    // initInjections(vm) // resolve injections before data/props
    initState(vm) //开始初始化状态 数据、方法等等
    // initProvide(vm) // resolve provide after data/props
    // callHook(vm, 'created')
};

function initState(vm) {
	const opts = vm.$option;
	// if (opts.props) initProps(vm, opts.props)
	// if (opts.methods) initMethods(vm, opts.methods)
	if (opts.data) {
	    initData(vm)
	}else{
		observe(vm._data = {}, true) //开始观察对象
	}
	// 其实在状态中还处理了watch与computed
}

function initData(vm) {
	const data = vm._data = vm.$option.data;
	console.log(data);
}

new Vue({
	data:{
		a:1
	}
})
