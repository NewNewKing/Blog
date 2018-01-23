//  重要的步骤
//  1. 确定isVue 避免被响应
//  2. 合并opiton到实例上 vm.$options。
//  3.


let uid = 0;

Vue.prototype._init = function (){
	const vm = this;


// 1**************************************
	//Vue实例的id也能确定多少个实例
	vm._uid = uid++;

	vm.isVue = true; //避免被观察响应式


// 2**************************************
	//合并option
	if (options && options._isComponent) {
		//如果是组件的option

		//优化组件的实例化，
		//因为动态合并实在是太慢了，而且没有内部的组件需要被特殊对待
      	initInternalComponent(vm, options) //预测是 vm.$options = deal(options);
    } else {
      	vm.$options = mergeOptions(
       		resolveConstructorOptions(vm.constructor),
        	options || {},
        	vm
      	)
    };

// 3**************************************
	//初始化生命周期
	initLifecycle(vm);//主要为三个生命状态属性 isMounted、isDestroyed、isBeingDestroyed

	//初始化事件
	initEvents(vm);

	//初始化渲染
	initRender(vm);

	//生命钩子-beforeCreate
	callHook(vm, 'beforeCreate');

    initInjections(vm)
    initState(vm)
    initProvide(vm)
    callHook(vm, 'created')

}