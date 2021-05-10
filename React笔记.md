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
  2. **普通对象不可以作为子元素，即不可写在JSX表达式的内容部分**，会报错；
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
* JSX表达式内容部分使用注释 {/* */}
* JSX元素属性也可使用JS表达式，属性名称使用**小驼峰**命名法,**普通对象可以放在React元素属性部分，如style属性**
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

## 组件状态
什么是组件状态？**组件状态是组件可以自行维护的数据**，有时候简称状态
* 组件状态只在类组件中有效
* 状态（state）：本质上是类的一个属性,一个对象
* 必须初始化状态，有两种方式
  1. 构造函数中
   ```javascript
  这是利用组件状态写的倒计时的类组件，外部只需传递一个倒计时多少秒的组件属性number
   import React, { Component } from 'react';

    class Tick extends Component {
        constructor(props){
            super(props)
            // 初始化状态
            this.state={
                time:this.props.number
            }
          this.timer=  setInterval(() => {
                if(this.state.time<=0){
                    clearInterval(this.timer);
                    return
                }
                this.setState({
                    time:this.state.time-1
                })
            }, 1000);
        }
        
        render() {
            return (
                <div>
                    剩余时间：{this.state.time}
                </div>
            );
        }
    }

    export default Tick;

   ```
  2. 在类中书写
  ```javascript
  这是利用组件状态写的倒计时的类组件，外部只需传递一个倒计时多少秒的组件属性number
   import React, { Component } from 'react';

    class Tick extends Component {
       // 初始化状态，这段代码在super调用后运行
          state={
            time:this.props.number
          }
        constructor(props){
            super(props)
          this.timer=  setInterval(() => {
                if(this.state.time<=0){
                    clearInterval(this.timer);
                    return
                }
                this.setState({
                    time:this.state.time-1
                })
            }, 1000);
        }
        
        render() {
            return (
                <div>
                    剩余时间：{this.state.time}
                </div>
            );
        }
    }

    export default Tick;

   ```
* **状态的变化：**
  - 不能直接改变状态，因为React无法监控到状态发生了变化，必须使用this.setState({})改变状态,this.setState()会重新设置state状态，并且自动重新渲染,运行render函数

## 深入理解setState
setState对状态的改变**可能**是异步的，也可能是同步的
**state状态一改变马上执行render函数**
  * 如果setState({})在某个HTML元素的事件中，则其是异步改变状态，否则为同步改变状态
  * **我们学习的时候始终把setState当成异步的**
  * 如果在改变完状态后立即做某些事则将代码写在setState的第二个参数上，**第二个参数是个回调函数，该函数运行在render函数之后**
  ```javascript
  setState({
    num:this.state.num+1
  },()=>{
    //在这个回调里面立即做些事情
  })

  ```
  * setState还可以把第一个参数写成函数，**如果遇到某个事件中，需要同步调用多次，则用函数的方式得到最最新状态**
  ```javascript
  第一次改变状态
  setState((cur)=>{
    //参数cur表示当前的状态
    //该函数的返回结果会覆盖掉之前的状态
    //该函数是异步执行
    return {
      num:cur.num+1
    }
  },()=>{
    //在所有状态都改变后，只执行一次render函数执行后才调用
  })

  第二次改变状态
  setState((cur)=>{
    //这个函数会在第一个setState的第一个参数执行后再执行，以保证当前状态的可靠性
    return {
      num:cur.num+1
    }
  })
  ```
  ### 最佳实践
  1. 把所有的setState当做是异步的
  2. 永远不要信任setState调用之后的状态，因为setState()代码是同步执行但是状态改变可能是异步的
  3. 如果要使用改变之后的状态，需要使用回调函数（setState的第二个参数）
  4. **如果新的状态要根据之前的状态进行运算，使用函数的方式改变状态（setState的第一个参数-回调函数）**
  5. **React会对异步的setState进行优化，将多次setState进行合并，即将多次状态改变完成后，再统一对state进行改变，然后只触发一次render函数**
## 组件中的数据  总结
1. props：该数据是由组件的使用者传递的数据，所有权（改动权）不属于组件本身，也不一定属于父组件，因为父组件的数据也可能由其他组件传递的呢！因此该组件无法改变改数据
2. state：该数据是由组件自身创建的，所有权（改动权）属于组件自身，因此该组件有权利改动该数据

## 事件
**在React中，事件本质上就是一个属性**
按照React对组件的约定，**由于事件本质是一个属性，因此事件也需要使用小驼峰命名法**

- **如果没有特殊处理，在事件处理函数中，this指向undefined**
   - 解决方法1：使用bind函数绑定this
   - 解决方法2：使用箭头函数（使用较多）
## 生命周期
**生命周期只存在于类组件中，函数组件每次调用都会重新运行函数，旧的组件即刻被销毁**

* 旧版生命周期：React < 16.0.0
  
    1是初始化阶段  2-4是挂载阶段 
1. **constructor**
   1. 同一个组件对象，只会创建一次，即**一个类组件constructor内部代码只会执行一次**
   2. 不能在第一次挂载到页面之前调用setState，**为了避免问题，构造函数(constructor)中严禁使用setState**
2. **componentWillMount** 新版中已去掉
   1. 正常情况下，和构造函数（constructor）一样，只会运行一次
   2. 可以使用setState,但是为了避免bug,不允许使用setState，因为某些特殊情况下，该函数可能被调用多次
3. **render** ***
   1. 返回一个虚拟DOM，会被挂载到虚拟DOM中，最终渲染到页面的真实DOM中
   2. render函数可能不止运行一次，只要重新渲染就会重新运行
   3. 严禁使用setState，因为会导致无线递归渲染
4. **componentDidMount** ***
   1. 只会执行一次
   2. 可以使用setState
   3. 通常情况下，**会将网络请求，启动计时器等一开始需要的操作，书写在该函数中**
   
 **5-9更新阶段**
  属性改变会更新、状态改变会更新

5. **componentWillReceiveProp** 新版中已去掉
   1. 即将接收新的属性值，属性值被重新赋值就会运行该函数，不一定属性值改变
   2. 参数为新的属性对象props
   3. 该函数可能会导致一些bug，不推荐使用

6. **shouldComponentUpdate** ***
   1. 指示React是否要重新渲染该组件，通过该函数返回true或false来指定，true代表重新渲染，false不重新渲染
   2. 默认情况下，不写该函数会直接返回true
   3. 

7. **componentWillUpdate** 新版中已去掉
   1. 组件即将被重新渲染
8. **render**
   1. 只要页面显示更新了就一定是运行了render重新渲染挂载虚拟DOM 
9. **componentDidUpdate**
    1. 参数1代表 之前的属性对象props；参数二代表之前的状态对象state
    2. 往往在该函数中使用DOM操作，改变元素
10. **componentWillUnmount** ***
    1. 在虚拟DOM树中不存在了，运行该函数
    2. 通常在该函数中销毁一些组件依赖的资源，如 计时器

旧版生命周期图
  ![avatar](http://m.qpic.cn/psc?/V51Mju1I4Uz5tx4Tu1Fj4XfvFp1oGJ7w/45NBuzDIW489QBoVep5mcSg.FFoJ2XtkJKWoEpG9PWMuJETC8KTcJ4U5C9tDhUaiwzmU5v0oPv25qjY5I83*ZDGCFk5dRcN448fXzfhOk48!/b&bo=0AcyBAAAAAABJ.E!&rf=viewer_4)

新版生命周期图
  ![avatar](http://m.qpic.cn/psc?/V51Mju1I4Uz5tx4Tu1Fj4XfvFp1oGJ7w/45NBuzDIW489QBoVep5mcfAMkQaJ6ohOw4K*8gVSHRHLgtBm.iyU2cpemTBKV59wfsDNe0cr86dGGEXuXllzAf4VIyGHibH5JYOsVbIjKks!/b&bo=0AfaAwAAAAABNx4!&rf=viewer_4)


  React官方认为：数据的来源必须是单一的
新版新增的钩子函数
1. getDerivedStateFormProps  
   在render执行前调用
   通过参数可以获取到新的属性和状态
   该函数式静态的，该函数的返回值会覆盖掉组件状态
   该函数没什么用
2. getSnapShotBeforeUpdate
   1. 真实DOM构建完成，但还未实际渲染到页面中
   2. 在该函数中通常用于DOM操作
   3. 该函数的返回值会作为componentDidUpdate的第三个参数
   4. 该函数只发生在更新阶段



## 传递元素内容
**如果给自定义组件传递元素内容，React会将元素内容作为props的children属性传递过去**
```javascript
  这是在函数组件内部显示传递进来的元素
  import React from 'react'

  export default function Comp(props) {
      console.log(props)
      return (
          <div>
              {props.children}
              {props.content}
          </div>
      )
  }


  这是在组件如何传递元素
  import Comp from './components/Comp';
  function App() {
    return (
      <div className="App">
        <Comp content={<h2>这是通过传递的元素内容1</h2>}>
          <h1>这是传递的元素内容</h1>
          //在组件内部写元素内容是语法糖，方便我们书写代码
        </Comp>
        
      </div>
    );
  }

  export default App;


```