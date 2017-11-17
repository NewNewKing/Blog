class Dep {
	constructor(){
		//订阅的信息
		this.subs = [];
	}

	addSub(sub){
		this.subs.push(sub);
	}

	removeSub (sub) {
		remove(this.subs, sub);
	}

	//此方法的作用等同于 this.subs.push(Watcher);
	depend(){
		if (Dep.target) {
	    	Dep.target.addDep(this)
	    }
	}
	
	//这个方法就是发布通知了 告诉你 有改变啦
	notify(){
		const subs = this.subs.slice()
	    for (let i = 0, l = subs.length; i < l; i++) {
	      subs[i].update()
	    }
	}
}