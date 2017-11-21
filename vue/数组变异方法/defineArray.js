/**
* 利用数组下标来对数组定义属性
*/
const arr = [1,2,3];

let val = arr[0];

Object.defineProperty(arr,'0',{
    enumerable: true,
    configurable: true,
    get(){
        doSomething();
        return val;
    },
    set(a){
        val = a;
        doSomething();
    }
});

function doSomething() {

}
