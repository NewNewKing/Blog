class Dep {
	constructor(){
		this.subs = [];
	}

	addSub(sub){
		thos.subs.push(sub);
	}

	removeSub (sub) {
		remove(this.subs, sub);
	}

	depend(){
		if (Dep.target) {
	    	Dep.target.addDep(this)
	    }
	}

	notify(){
		const subs = this.subs.slice()
	    for (let i = 0, l = subs.length; i < l; i++) {
	      subs[i].update()
	    }
	}
}