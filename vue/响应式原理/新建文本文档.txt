class Watcher {
	constructor(){

	}

	depend(dep){
		dep.addSub(this);
	}

	update(){
		
	}
}