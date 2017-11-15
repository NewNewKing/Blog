/*
* 变异数组的方法
*/

const push = Array.prototype.push;

Array.prototype.push = function mutator (...arg){
    const result = push.apply(this,arg);
    doSomething();
    return result
}

function doSomething(){
    console.log('do something');
}

const arr = [];
arr.push(1);
arr.push(2);
arr.push(3);