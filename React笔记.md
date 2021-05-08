[TOC]
## React.createElement
  **创建一个React元素，称作虚拟DOM,本质上是一个对象**
  1. 参数1：元素类型，如果是字符串，代表一个普通的HTML元素
  2. 参数2：元素属性，是一个对象
  3. 后续参数：元素子节点，仍然是React元素


```javascript
    // React最原始最核心写法
    let h1=React.createElement('h1',{title:'这是h1的属性'},<span>子元素</span>)
    // React.createElement负责创建React元素，用js描述React元素结构，而React元素可以放到移动端、桌面端、客户端任何地方，React.createElement不负责。
    ReactDOM.render(React元素,渲染的dom位置)
    // ReactDOM.render负责将React元素渲染到页面上
```
## JSX
**由于使用React.createElement创建React元素太麻烦，所以使用JSX来创建**
什么是JSX？
* JSX是js的扩展语法，需要用babel转义，**JSX是为了方便书写React元素的；最终会被babel转换为React.createElement,**
  ```javascript
  所以在书写JSX的地方必须import React from 'react'引入React文件
  ```
  
  ```javascript
    如：let span=<span>这是一个JSX语法的React元素</span>//span也是React元素，
    //babel会将上面的标签式的写法转换成下面React.createElement的写法，二者完全相等
    let span=React.createElement('span',{},'这是一个JSX语法的React元素')
  ```
* 每个JSX表达式有且仅有一个根节点
  ```javascript
  let con=(<h1>这是JSX表达式<span>子元素</span></h1>)
    //如果再加一个p元素可以在二者外面套一个div，也可以使用空标签 如：
  let con=(
      <div>
      <h1>这是JSX表达式<span>子元素</span></h1>
      <p>P元素</p>
      </div>
      )
   或
   let con=(
      <>
      <h1>这是JSX表达式<span>子元素</span></h1>
      <p>P元素</p>
      </>
      )
    //空标签并不会生成真实的DOM，只是一种结构
    //空标签的真实语法是：
    let con=(
      <React.Fragment>
      <h1>这是JSX表达式<span>子元素</span></h1>
      <p>P元素</p>
      </React.Fragment>
      )
    //在表达式外面加()代表是表达式
  ```
* 每个JSX元素必须结束，自结束也可以（XML规范)
### JSX嵌入表达式
* **JSX内容部分可以书写JS表达式，JS表达式用{}包起来即可，总之{}代表里面可以书写JS代码** ，
  1. 其中null、undefined、false在JSX表达式中不显示；
  2. **普通对象不可以作为子元素，即不可写在JSX表达式的内容部分**，会报错；**普通对象可以放在React元素属性部分，如style属性**
   ```javascript
    //普通对象放在元素内容部分这样写会报错
    let con=(
            <p>{{name:'zql'}}</p>
           )

    //普通对象放在元素属性上没问题
    let con=(
            <p  style={{width:'200px'}}></p>
        )
   ```
  3. 可以放置React元素对象
  4. **可以放置数组，会将数组每一项作为子元素，如果每一项是React元素需要加key值，但是数组中不可有普通对象，可以有React对象**
* JSX表达式中使用注释 {/* */}
* JSX元素属性也可使用JS表达式，属性名称使用**小驼峰**命名法
    ```javascript
        let url='http://路径';
        let cls='active';
        let con=(
            <img src={url} className={cls} style={{width:200}}/>
        )
    ```
* 防止注入攻击
  - 在JSX中有特殊字符的代码时会自动编码，为了安全
  - 当我们需要将一个字符串的HTML结构放到React元素内容中时，可以使用dangerouslySetInnerHTML
  ```javascript
    let content=`<p>sjkbckcbksc</p><span>这是span</span>`
    let con=(
        <div dangerouslySetInnerHTML={{
            __html:content
        }}
        ></div>
    )
  ```
  ### JSX的不可变性
  * 虽然JSX元素是一个对象，但是该对象中所有属性不可更改
  * 当需要改变元素属性时，需要重新创建JSX元素（重新渲染）

***

## 组件
* **组件名称首字母必须大写，因为React根据首字母是否大写来区分是否为组件或者React元素，首字母小写时用的内置组件 ``` <span></span>```;大写时用的函数组件或者类组件**
* **组件生成的仍然是React元素，只不过type类型不同，是函数或类**
###  函数组件 
 **函数组件必须返回一个React元素
 使用函数组件时，React会调用该函数，将函数返回值放在相应位置**
 ```javascript
    函数组件内部：
    import React from 'react';
    export default function MyFuncComp(props) { 
        即使props中没有内容，props也是对象{}
        console.log(props)
        return <h1>函数组件{props.number}</h1>
    };
```
```javascript
    使用组件：
      <div className="App">
        <header className="App-header">
          {/* 组件也是React元素，只不过与普通的React元素type类型不同 */}
        <MyFuncComp number='2'></MyFuncComp>字符串类型属性
        <MyFuncComp number={5}></MyFuncComp>数字类型属性
        <MyFuncComp  obj={{name:'liang',val:123}}></MyFuncComp>对象类型属性
        <MyFuncComp enable></MyFuncComp>布尔作为属性
        <ClassComp ui={<span>React元素</span>}></ClassComp>React元素对象作为组件属性
        
        </header>
      </div>
 ```

### 类组件
* 类组件必须提供一个render函数用于渲染组件；
* render函数必须返回一个React元素，并且必须继承React.Component
```javascript
      类组件内部：
        import React from 'react';
        export default class ClassComp extends React.Component{
            render(){
                return <p>类组件{this.props.number}</p>
            }
        }
```
```javascript
      使用组件：
      <div className="App">
        <header className="App-header">
          {/* 组件也是React元素，只不过与普通的React元素type类型不同 */}
        <MyFuncComp number='2'></MyFuncComp>字符串类型属性
        <MyFuncComp number={5}></MyFuncComp>数字类型属性
        <MyFuncComp obj={{name:'liang',val:123}}></MyFuncComp>对象类型属性
        <MyFuncComp enable></MyFuncComp>布尔类型属性
        <ClassComp ui={<span>React元素</span>}></ClassComp>React元素对象作为组件属性
        
        </header>
      </div>
        
```    
### 组件属性
**React哲学：数据属于谁，谁才有权利改动，数据自顶而下流动**
#### 函数组件属性
1. 对于函数组件，属性会作为一个对象的属性，**传递给函数的参数**
2. 传递的属性可以为任何类型：布尔、字符串、数字、对象，**由于组件属性可以传递对象，所以React元素也可以传递**
3. 组件属性命名应该使用小驼峰命名法
4. 组件内部无法改变传进来的属性，**数据属于谁，谁才有权利改动**

#### 类组件属性
1. 对于类组件，属性会作为一个对象的属性，**传递给构造函数的参数**
2. 传递的属性可以为任何类型：布尔、字符串、数字、对象，**由于组件属性可以传递对象，所以React元素也可以传递**
3. 组件属性命名应该使用小驼峰命名法；
4. 组件内部无法改变传进来的属性,**数据属于谁，谁才有权利改动**
   
**总结：React元素如：```<span></span> ```本质上就是一个组件（内置组件），因为console.log（React元素）和函数组件/类组件都是一样的，只有type类型不同**