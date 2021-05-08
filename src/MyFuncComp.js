import React from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default function MyFuncComp(props) {  //函数组件必须返回一个React元素
    // 即使props中没有内容，props也是对象{}
    console.log(props)
    return <h1>函数组件{props.number}</h1>
};



// 函数组件

// 对于函数组件，属性会作为一个对象的属性，传递给函数的参数
//（传递的属性可以为任何类型：布尔、字符串、数字、对象）,组件属性命名应该使用小驼峰命名法