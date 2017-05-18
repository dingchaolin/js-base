/**
 * Created by lenovo on 2017/5/16.
 */

let func_PassValue = function( a, b ){
    let temp = a;
    a = b;
    b = temp;
};

let func_PassRef = function( Obj ){
    let temp = Obj.x;
    Obj.x = Obj.y;
    Obj.y = temp;
}

let x = 1, y = 2;
func_PassValue( x ,y );

console.log( "pass by value=====", x, y );

// 可以把基本类型包装成Obj类型,来达到ref传递的目的

let obj = {
    x : 1, y : 2
};

func_PassRef( obj );

console.log( obj );


