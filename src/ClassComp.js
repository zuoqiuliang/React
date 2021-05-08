import React from 'react';

export default class ClassComp extends React.Component{
    //类组件必须提供一个render函数用于渲染组件；
    // render函数必须返回一个React元素，并且必须继承React.Component
    render(){
        return <p>类组件</p>
    }
}


// 类组件

// 对于类组件，属性会作为一个对象的属性，传递给构造函数的参数
//（传递的属性可以为任何类型：布尔、字符串、数字、对象）,组件属性命名应该使用小驼峰命名法；组件内部无法改变传进来的属性

//React元素如：<span></span> 本质上就是一个组件（内置组件），因为console.log（React元素）和函数组件/类组件都是一样的，只有type类型不同