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
****
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
  ****
## 组件中的数据  总结
1. props：该数据是由组件的使用者传递的数据，所有权（改动权）不属于组件本身，也不一定属于父组件，因为父组件的数据也可能由其他组件传递的呢！因此该组件无法改变改数据
2. state：该数据是由组件自身创建的，所有权（改动权）属于组件自身，因此该组件有权利改动该数据
****
## 事件
**在React中，事件本质上就是一个属性**
按照React对组件的约定，**由于事件本质是一个属性，因此事件也需要使用小驼峰命名法**

- **如果没有特殊处理，在事件处理函数中，this指向undefined**
   - 解决方法1：使用bind函数绑定this
   - 解决方法2：使用箭头函数（使用较多）
****
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
10. **componentWillUnMount** ***
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

****
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
****
## 表单
### 受控组件
组件的使用者，有能力完全控制该组件的行为和内容，通常情况下，受控组件没有自己的状态，其内容完全受到属性的控制。 可以认为是 函数组件
### 非受控组件
组件的使用者，没有能力完全控制该组件的行为和内容，组件的行为和内容完全自己控制。通常，非受控组件有自己的状态，而几乎不给属性。

****
## 属性默认值 和 类型检查
### 属性默认值
通过静态属性```defaultProps```来告知React属性默认值
对于函数组件，混合默认属性在调用函数之前完成；对于类组件，混合默认属性在运行构造函数之前完成的；
混合默认属性在生命周期初始化阶段,
```js
  函数组件中
  Fun.defaultProps={
    a:10,
    b:20
  }


  类组件中
  ClassFn.defaultProps={
    a:10,
    b:20
  }

  或者写在类里面利用es6的语法
  class ClassFn extends Component {
    static defaultProps={
      a:10,
      b:20
    }//static静态字段代表在ClassFn构造函数的属性上

    constructor(props){
     
    }
    
    render() {
        return (
            <div>
            </div>
        );
    }
}
```

### 类型检查
 使用 ``` prop-types```库
通过静态属性``` propTypes```告知React如何检查属性
```js
import React, { Component } from 'react';
import PropTypes from 'prop-types'
  class Tick extends Component {
    
    static propTypes={
      a:PropTypes.number.isRequired,//a属性必须是一个数字类型，并且必须传递
      //number是个函数，isRequired是number上的属性，也是个函数，当检验的时候会一次运行这两个函数，如果校验不通过则报警告warning
    }
    
    render() {
        return (
            <div>
            </div>
        );
    }
}

PropTypes语法
PropTypes.number://数字类型
PropTypes.fun://函数类型
PropTypes.object://对象类型
PropTypes.string://字符串类型
PropTypes.symbol://符号类型
PropTypes.node://任何可以被渲染的内容， 一般为 字符串、数字、React元素
PropTypes.element://React元素
PropTypes.elementType://React元素类型
PropTypes.oneOf(['xxx','xxx'])//枚举，属性值为数组中的一个
PropTypes.oneOfType(['xxx','xxx'])//枚举，属性类型必须数组中的一个
PropTypes.arrayOf(PropTypes.xxx)//必须是某一类型组成的数组
PropTypes.objectOf(PropTypes.xxx)//对象由某一类型的值组成
PropTypes.shape(对象)//传递的属性必须是对象，并且满足指定的对象格式要求，可以多加属性，不精确匹配
PropTypes.exact(对象)//传递的属性必须是对象，并且满足指定的对象格式要求，精确匹配



```

**总结：先混合默认属性再类型检查**

****
## HOC高阶组件
定义： 以组件作为参数，并返回一个组件
区分组件与React元素
```js
这是组件
class Tick extends Component {

}
这是组件
function Comp(){

}

这是React元素
<Comp/>
<h1></h1>

```
**总结：**
1. 不要在render中使用高阶组件
2. 不要在高阶组件内部更改传入的组件

****
## ref
使用场景：希望直接使用dom元素中的某个方法，或者直接希望使用自定义组件中的方法

1. ref写在内置的html组件，得到的将是真是的dom对象
2. ref写在自定义组件上，得到的将是类的实例（创建的对象）
3. ref不能写在函数组件上
   

ref不再推荐使用字符串赋值，字符串的方式将来可能会被移除，因为有效率问题并且不够灵活；

ref赋值时目前推荐使用对象或者函数

1. 对象格式，通过React.createRef()
```js
//ref写成对象格式时一般写在构造器中
  import React, { Component } from 'react';

class Tick extends Component {
    constructor(props){
        super(props)
       this.txt=React.createRef()
      或者写成
      this.txt={
        current:null
      }

      那么在render函数渲染的时候会将有ref属性的元素赋值给this.txt.current
    }
    
    render() {
        return (
            <div>
                <input res={this.txt}/>
            </div>
        );
    }
}

export default Tick;
```

2. 函数格式
   1. 函数调用的时间为render初次执行一次，每次render执行时该函数执行两次
   2. componentDidMount钩子函数调用时就可以使用ref的元素了
   3. 由于每次render都要执行该函数，并且ref值改变时会运行两次，新的旧的函数分别调用一次，旧的函数被新的函数替代，调用时间节点componentDidUpdate钩子函数执行之前；旧的函数被调用时参数传递null；新的函数调用时传递绑定的元素
   4. ref所在的组件被销毁，会调用该函数一次

    ```js
    import React, { Component } from 'react';

    class Tick extends Component {
        
        
        render() {
            return (
                <div>
                  <input ref={el=>{this.box=el}}
                  //这里将绑定的元素赋值给box属性，我们可以在this.box中拿到绑定的元素了
                  这是将函数写在了render里面，会导致render每次执行时该函数会运行两遍，如果想要运行一次可以写在类组件的原型函数上
                  />
                </div>
            );
        }
    }

    export default Tick;


    ```
**注意：谨慎使用ref，因为这是反模式的，不符合React数据渲染页面的哲学理念**


****
## Context上下文
Context表示做某一些事情的环境
React上下文特点：
1. 当某个组件创建了上下文后，上下文中的数据会被所有后代组件共享
2. 如果某个组件依赖了上下文后，会导致该组件不再纯粹（纯粹意味着 外部属性仅来源于属性）
3. 一般情况下，用于第三方组件（通用组件）
![avatar](http://m.qpic.cn/psc?/V51Mju1I4Uz5tx4Tu1Fj4XfvFp1oGJ7w/45NBuzDIW489QBoVep5mcfXTDKtSe09ys1uTgEVkaFJ0RL*TvY4fDQwtzMUHz6C6BjsZBKbkzHODBceq3*IYZ5y2ryI6sBy2Cnqn3PWobj8!/b&bo=4wU4BAAAAAABN8o!&rf=viewer_4)

![avatar](http://m.qpic.cn/psc?/V51Mju1I4Uz5tx4Tu1Fj4XfvFp1oGJ7w/45NBuzDIW489QBoVep5mcXTw7lsulxaKuV.gOjRneSTAcVqR2Q2GL4kBerOEv2gspopUtk03V.v9jC*YYTDh6AJlNh.YCBa69dOVGpeMX9c!/b&bo=cgY4BAAAAAABJ0g!&rf=viewer_4)


### 旧版上下文API
**创建上下文**
只有类组件才可以创建上下文，一般上下文数据来自类组件的状态或者属性，所以函数组件没有状态就不可以创建上下文，这是旧版的理念
1. 第一步：给类组件书写静态属性 childContextTypes，使用该属性对上下文中的数据类型进行约束（必填）
2. 第二步：添加实例方法 getChildContext,该方法返回的对象就是上下文中的数据，该数据必须满足类型约束。该方法会在每次render运行之后运行，也就是属性或者状态变化就会运行该函数。

**使用上下文中的数据**
一个组件使用上下文中的数据时，组件中必须有一个静态属性contextTypes，该属性描述了上下文中的数据类型
1. 可以在类组件的构造函数中通过第二个参数获取上下文数据
2. 在类组件的this.context中获取
3. 在函数组件中的第二个参数获取

**上下文数据变化**
上下文中的数据不可以直接变化，最终都是通过状态或者属性的改变而改变

上下文中加入一个处理函数，用于后代元素更改上下文的数据 类组件中this.context.方法名即可更改


### 新版上下文API
**创建上下文**
1. 上下文是一个独立于组件的对象，该对象通过React.createContext()创建,React.createContext()返回一个对象，对象中有两个属性
* Provider属性：生产者；这是一个组件，该组件会创建一个上下文，该组件有一个value属性，可以为数据赋值(类组件适合使用Provider)
   
  ```js
  import React, { Component } from 'react';

    let ctx= React.createContext();
    
    class Tick extends Component {

      state={
        a:123,
        b:'bbb'
      }
        render() {
            return (
              <ctx.Provider value={this.state}>
                <div>
                    
                </div>
              <ctx.Provider />
            );
        }
    }

    export default Tick;
      
  ```
 
****
**使用上下文中的数据**
**类组件使用上下文**
  1. 类组件使用上下文数据时必须拥有静态属性 contextType，并且赋值为上下文对象
  2. 类组件中在this.context中获取上下文对象中的数据
  3. 也可以使用Consumer获取使用上下文数据
   ```js
   import React, { Component } from 'react';

    let ctx= React.createContext();
    class Tick extends Component {
      static contextType=ctx;
        类组件使用上下文数据时必须拥有静态属性 contextType，并且赋值为上下文对象
        
        render() {
            return (
                <div>
                    {this.context.a}
                    类组件中在this.context中获取上下文对象中的数据
                </div>
            );
        }
    }
    export default Tick;
   
   
   ```

**函数组件使用上下文**
  1. 函数组件中使用 Consumer来获取上下文数据
  * Consumer属性：消费者；这是一个组件，它的子节点是一个函数（函数组件适合使用Consumer）
   ```js
    import React from 'react'
    let ctx= React.createContext();
    export default function Index(props) {
      
    return (
        <div>
          <ctx.Consumer>
            (value)=><span>{value}</span>
          </ctx.Consumer>
          该组件会将上下文数据传给子节点函数的参数，最终将函数返回值展示

         </div>
    )
   }      
         
      
  ```

  **注意细节**
  如果上下文提供者中的value属性发生变化（object.is比较，**每次状态state改变都会产生一个全新的对象**），会导致上下文提供者的所有后代元素全部渲染（无论子组件是否有优化，即无论shouldComponentUpdate钩子函数返回true还是false）

****

  ## PureComponent
  纯组件，用于避免不必要的渲染（运行render函数），从而提高效率

  PureComponent是一个组件，如果A组件继承自该组件，则A组件的shouldComponentUpdate钩子函数会对属性和状态进行浅比较，如果属性和状态的当前值和更新的值相同则不运行render函数
    ```js
      import React, { PureComponent } from 'react';

      let ctx= React.createContext();
      class Tick extends PureComponent {
        这样就继承自PureComponent组件了，也拥有了shouldComponentUpdate浅比较
          render() {
              return (
                  <div>
                     
                  </div>
              );
          }
      }

      export default Tick;
    ```
  **注意**
  类组件：
  1. 为了效率尽量使用PureComponent
  2. 改变状态时一定要用setDate覆盖旧的状态对象，以让shouldComponentUpdate浅比较的出来
  3. 有个第三方库Immutable.js,专门用于制作不可变对象
   
  函数组件：
  1. 使用React.memo函数制作纯组件

****
## render props
1. 某个组件需要一个属性，该属性是个函数，函数的参数是组件内部调用时传递的，函数的返回值用于渲染
2. 通常该属性名字叫render，属性值是个函数
 ```js
  <A>
    (
      <>
      (value)=><span>用于渲染的内容{value.xxx}</span>
      </>
    )
  </A>
 或者写在组件render属性上

 <A render={(value)=><span>用于渲染的内容{value.xxx}</span>}></A>
 
 ```
**注意**
有时候，某些组件的各种功能以及处理逻辑完全相同，只是界面渲染的代码不一样，建议使用 render props或者HOC高阶组件来处理

****
## Portals
插槽：将一个指定的React元素渲染到指定的DOM容器中
ReactDOM.createPortal(React元素，真实DOM容器)

注意事件冒泡
React中的事件是包装过的，它的事件冒泡是根据虚拟DOM树的结构冒泡的，跟真实DOM无关

****
## 错误边界
问题：默认情况下，若一个组件在**渲染期间**（render）发生错误（渲染时是同步的），会导致整个组件树全部被卸载不显示

解决问题：
错误边界：是一个组件，该组件会捕获到渲染期间（render）子组件发生的错误，并有能力阻止错误继续传播

**某个组件捕获错误**
1. 编写生命周期函数getDerivedStateFromError
   1. 特点：静态函数
   2. 运行时间点：渲染子组件过程中，发生错误之后，在更新页面之前
   3. 注意：**只有该组件的子组件发生错误才会运行该函数**，自身发生错误不运行
   4. 该函数返回一个对象，React会将该对象的属性覆盖掉当前组件的state,那么我们就可以根据该组件的state来渲染不同内容了！
   5. 参数：错误对象
   6. 用于改变状态

2. 编写生命周期函数componentDidCatch
   1. 特点：实例方法
   2. 运行时间点：渲染子组件过程中，发生错误之后，在更新页面之后
   3. 通常该函数用于记录错误信息
   
**细节**

某些错误，错误边界组件无法捕获
1. 自身组件的错误
2. 异步的错误
3. 事件中的错误
   
**总结**
仅处理渲染子组件期间的同步错误

****

## 渲染
* React元素：内置组件、自定义组件 如```<span></span> ```和 ```<APP></APP> ```
* React节点：专门用于渲染到UI界面的对象，**React通过React元素创建React节点**，ReactDOM一定是通过React节点来渲染的,React节点我们看不到的平时，它是私有的在React中。
  * 节点类型：
  1. React DOM节点：创建该节点的React元素类型一定是字符串
  2. React 组件节点：创建该节点的组件类型一定是函数或者 类
  3. React 文本节点：该节点由字符串、数字创建
  4. React 空节点：该节点由 null、undefined、false创建
  5. React 数组节点：该节点由一个数组创建
   
### 首次渲染（新节点渲染）
1. 通过参数的值创建节点
2. 根据不同的节点做不同的事情
   1. 文本节点:通过document.createTextNode创建真实的文本节点
   2. 空节点：什么也不做
   3. 数组节点：遍历数组，将数组每一项递归创建节点（回到第1步进行反复操作直到遍历结束）
   4. DOM 节点：通过document.createElement创建真实的DOM对象，然后立即设置该DOM对象的各种属性，再遍历对应React元素的children属性（递归操作，回到第1步进行反复操作直到遍历结束）
   5. 组件节点：
      1. 函数组件：调用函数（该函数必须返回一个可以生成节点的内容），将该函数的返回结果递归生成节点（递归操作，回到第1步进行反复操作直到遍历结束）
      2. 类组件：
         1. 创建该类的实例
         2. 立即调用对象的生命周期方法 getDerivedStateFromProps
         3. 运行该对象的render方法，得到节点对象（递归操作，回到第1步进行反复操作）
         4. 将该组件的componentDidMount加入到执行队列（当整个虚拟DOM树全部构建完毕，并将真实DOM加入到容器中后，执行该函数）
3. 生成出虚拟DOM树后，保存起来，以便后续复用
4. 将之前生成的真实DOM加入到容器中
**React节点生成的树才是真正的虚拟DOM树**，之前说React元素就是虚拟DOM是不严格说法