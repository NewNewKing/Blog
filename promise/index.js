function Promise(fn) {

	// 0 - Pending
	// 1 - resolved
	// 2 - rejected
	this._state = 0;

	//执行结果
	this._value = null;

	this.

}	

function resolve () {
	
}



// new Promise((resolve,reject) => {
//     setTimeout(() => {
//         resolve('学会乘法');
//     },1000);
// }).then((res) => {
//     console.log('我真是天才，1秒钟就学会了乘法'); 
//     return new Promise((resolve,reject) => {
//     	setTimeout(() => {
//     		reject('没有学会');
//     	}, 1000)
//     });

// })
// .then((res) => {
// 	console.log(res);
//     console.log('又花了一秒，我学会了除法');
// })
// .catch(res => {
// 	console.log('我没有学会除法')
// });


