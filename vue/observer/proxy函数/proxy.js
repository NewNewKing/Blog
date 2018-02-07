function proxy (target, source){
    for(let key in source){
        Object.defineProperty(target,key,{
            enumerable: true,
            configurable: true,
            get:function() {
                return source[key];
            },
            set:function(val) {
                source[key] = val;
            }
    	});
    }
}
const father = {};
const child = {
    money:100
}
proxy(father, child);

console.log(father);
console.log(father.money);