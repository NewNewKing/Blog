function Promise(fn) {
	const self = this;

	this.success = this.then;
	this.fail = this.catch;

	this.state = 'PENDING';


	function resolve(value){
		this.state = 'FULFILLED';
		setTimeout(() => {
			self.success && self.success(value);
		}, 0);	
	}
	function reject(value) {
		this.state = 'REJECTED';
		setTimeout(() => {
			self.fail && self.fail(value);
		}, 0);	
	}

	fn(resolve,reject);
}

Promise.prototype.then = function then (fn) {
	const self = this;
	return new Promise((resolve, reject) => {
		function handle (value){
			const ret = fn(value);
			if(ret && typeof ret.then === 'function'){
				ret.then((value2) => {
					resolve(value2);
				});

				ret.catch((value2) => {
					reject(value2);
				});
			}else{
				resolve(value);
			}
		}
		this.success = handle;
	});
}

Promise.prototype.catch = function (fn) {
	const self = this;
	return new Promise((resolve,reject) => {
		function handle (value){
			const ret = fn(value);
			if(ret && typeof ret.then === 'function'){
				ret.then((value2) => {
					resolve(value2);
				});

				ret.catch((value2) => {
					reject(value2);
				});
			}else{
				resolve(value);
			}
		}

		this.fail = handle;
		
	});
}

Promise.resolve = function(value){
	return new Promise(resolve => resolve(value));
}

Promise.reject = function (value){
	return new Promise((resolve,reject) => reject(value));
}

// new Promise((resolve,reject) => {
//     setTimeout(() => {
//         reject('学会乘法');
//     },1000);
// }).catch((err) => {
// 	console.log('我失败了');
// })

new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('学会乘法');
    },1000);
}).then((res) => {
    console.log('我真是天才，1秒钟就学会了乘法'); 
    return new Promise((resolve,reject) => {
    	setTimeout(() => {
    		reject('没有学会');
    	}, 1000)
    });

})
.then((res) => {
	console.log(res);
    console.log('又花了一秒，我学会了除法');
})
.catch(res => {
	console.log('我没有学会除法')
});




// function Promise (fn) {
//     const self = this;
//     this._list = [];
//     this.state = 'PENDING';
//     this.value = null;
    
//     function resolve(value) {
//     	self.state = 'FULFILLED';
//     	setTimeout(() => {
// 			for(let i = 0;i < self._list.length;i++) {
// 	            value = self._list[i](value);
// 	            this.value = value;
// 	        }
//     	}, 0);
        
//     }
//     function reject() {
        
//     }
    
//     fn && fn(resolve,reject);
// }
// Promise.prototype.then = function then(fn) {
// 	return new Promise(resolve => {
// 		function handle(value) {
// 			const ret = typeof fn === 'function' && fn(value) || value;
// 			if(ret && typeof ret['then'] === 'function'){
// 				ret.then((value) => {
// 					resolve(ret);
// 				});
// 			}else{
// 				resolve(ret);
// 			}
// 		}
// 		if(this.state === 'PENDING'){
// 			this._list.push(handle);
// 		}else if(this.state === 'FULFILLED') {
// 			fn(this.value);
// 		}
// 	})
// }





