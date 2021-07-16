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

****
## 工具
### 严格模式
- StrictMode(```React.StrictMode```)本质是一个组件，该组件不进行UI渲染
- ```React.Fragment <> </>```它的作用是，在渲染内部组件时，发现不合适的代码
  检查标准：
  - 识别不安全的生命周期，如 旧版生命周期
  - 识别使用过时字符串ref API警告
  - 识别使用废弃的findDOMNode方法的警告
  - 检查意外的副作用（一个函数中做了一些影响外部数据的事情）
    1. 异步处理
    2. 改变参数值
    3. setState
    4. 本地存储
    5. 闭包，改变函数外部变量
       React要求副作用代码仅能出现在以下生命周期函数中
       - ComponentDidMount
       - ComponentDidUpdate
       - ComponentWillUnMount
  - 检查过时的context API
### Profiler
性能分析工具 浏览器控制台的插件

****
## HOOK

HOOK专门用于增强函数组件的功能（HOOK不能在类组件中用），使之可以成为类组件的替代品
 
 定义：HOOK（钩子）本质上是一个函数，该函数可以挂载任何功能，总是以use开头命名

### State Hook
State Hook 是在函数组件中使用的函数（useState）,用于在函数组件中使用状态

官方强调：没有必要更改已完成的组件，官方目前没有计划取消类组件
- useState函数有一个参数，这个参数的值表示状态的默认值
- 函数的返回值是一个数组，该数组一定包含两项
  第一项：当前状态的值
  第二项：改变状态的函数
- 一个函数组件中可以有多个状态，这非常有利于横向切分关注点
```js
  import React,{useState} from 'react'
    function App() {
      let arr=useState(0);//使用一个状态，该状态默认值是0，得到一个数组
      let n=arr[0];//第一个参数是状态的值
      let setN=arr[1];//第二个参数是设置状态的函数

      以上三句代码可以使用es6的结构一句话完成
      let [n,setN]=useState(0);

      return (
        <div className="App">
          <button onClick={()=>{
            setN(n-1)
          }}>-</button>
          <span>{n}</span>
          <button onClick={()=>{
            setN(n+1)
          }}>+</button>
        </div>
      );
    }
    export default App;
```
**细节**

1. useState最好写在函数的起始位置，便于阅读
2. useState严禁出现在代码块(判断、循环)中
3. useState返回的函数（数组第二项），引用不变，节约内存空间
4. **如果使用useState返回的数组第二项函数来改变数据，且数据和之前数据相等，不会导致重新渲染**
5. 如果使用useState返回的数组第二项函数来改变数据，传入的值不会和原来的值合并，而是替换
6. 强制刷新组件:
   1. 类组件：使用forceUpdate
   2. 函数组件：useState返回的数组第二项函数使用一个空对象
7. **如果某些状态之间没有必然的联系，应该分化为不同的状态，而不要合并成一个对象**
8. 和类组件改变状态时一样，**状态的改变可能是异步的（在虚拟DOM事件中），多个状态变化会合并以提高效率**，此时不能信任之前的状态，而应该使用回调函数的方式改变状态，如果状态变化使用了之前的状态，使用函数最保险



### Effect Hook
Effect Hook：用于在函数组件中处理副作用

副作用：
1. ajax请求
2. 计时器
3. 其他异步操作
4. 更改真实DOM对象
5. 本地存储
6. 其他会对外部产生影响的操作（如：闭包）
- useEffect这是一个函数，该函数接收一个回调函数作为参数，接收的回调函数就是需要进行副作用操作的函数，这个回调函数的运行时间点在页面完成真实的UI渲染之后，因此这个回调函数的执行是异步的，不会阻塞浏览器

**细节**
1. 每个函数组件中可以多次使用useEffect，但严禁出现在代码块(判断、循环)中
2. useEffect中的回调函数（副作用函数A）可以有返回值，返回值是一个函数或者undefined，回调函数返回的函数叫清理函数（R这是自己取个名字好写笔记）；
   1. R函数运行的时间点在每次运行回调函数A之前
   2. 首次渲染函数组件不会运行R
   3. 函数组件销毁一定运行R
3. useEffect函数可以传递第二个参数
   1. 第二个参数是个数组
   2. 数组中记录useEffect第一个参数回调函数A的依赖数据
   3. **当组件重新渲染后，只有依赖数据与上一次不一样时，才会执行副作用函数A**
4. 所以，当传递了第二个参数依赖数据后，如果数据没有发生变化 则：
   1. 副作用函数A仅在第一次渲染后运行
   2. 清理函数R仅在卸载组件后运行
   3. 使用空数组[]作为第二个参数，副作用函数A仅在挂载时运行
5. 副作用函数A中，如果使用了函数上下文中的变量，则由于闭包的影响，会导致副作用函数中变量不会实时变化
  
### 自定义Hook
定义：将一些常用的、跨越多个组件的HOOK功能，抽离出去形成一个函数，该函数就是自定义HOOK。

由于自定义Hook内部需要Hook功能，所以它本身也需要按照Hook的功能实现，规则如下：
1. 函数名必须以use开头
2. 其他函数组件调用自定义Hook时，要将自定义Hook函数放到顶部，不要放到（循环、判断）中
### Context Hook
useContext这是个函数
```js
  import React,{useContext} from 'react'
    let ctx=React.createContext();

    function Text() {
      const value = useContext(ctx)
      return (
        <h1>{value}</h1>
        这里的value就是上下文中的数据
      )
    }

    function App() {
      return (
        <ctx.Provider value={123}>
          <Text></Text>
        </ctx.Provider>
      );
    }

    export default App;

```


### Callback Hook
useCallback函数:用于得到固定引用值得函数，**返回第一个参数函数的一个函数地址**，通常它用于性能优化，它有两个参数：
1. 参数一是个函数，useCallback会固定该函数的引用，只要依赖项没有发生变化，则始终返回之前函数地址
2. 参数二是个数组，记录依赖项

### Memo Hook
作用：用于保持一些稳定的数据，通常用于优化
useMemo函数:用于得到固定引用值得数据，**返回第一个参数函数的返回结果**，通常它用于性能优化，
它有两个参数：
1. 参数一是个函数，useMemo会固定该函数的返回结果，只要依赖项没有发生变化，则始终返回之前的数据结果
2. 参数二是个数组，记录依赖项

**如果React元素本身没有发生变化，一定不会重新渲染**，所以我们在生成许多React元素(div、p等)时，使用memo hook极大节省效率

### Ref Hook

useRef函数：
参数1：返回一个固定的对象

### LayoutEffect Hook
useEffect :运行节点在浏览器渲染完成后，用户看到引得渲染结果后
useLayoutEffect: 运行节点在，完成了DOM改动，但是还没有呈现给用户，用法、传参与useEffect 完全相同

注意：虽然useLayoutEffect不会有页面闪烁，但是有可能会导致渲染阻塞，应该尽量使用useEffect，如果出现问题再考虑useLayoutEffect

### DebugValue Hook

useDebugValue:用于将自定义Hook的关联数据显示到调试栏（专门用于调试）

****
## 路由
定义：根据不同的页面地址，展示不同的组件（页面）
### React Router
React Router包含两个库：
1. react-router:路由核心库
2. react-router-dom:利用路由核心库，结合实际的页面（PC、手机端），实现跟页面路由密切相关的功能

**安装：**
- 如果在页面中实现路由，需要安装react-router-dom这个库.
- react-router-dom依赖react-router所以安装
react-router-dom时会自动安装react-router

### 两种模式
- url地址组成：
例：http://www.react.com:443/news/1-2-1/index.html?openId=1232456&uuid=789456#aaa
该url组成：
    1. 协议名（http）
    2. 主机名（host）
       1. 可以是ip地址
       2. 可以是预设值 如：localhost
       3. 可以是域名 如：www.react.com
       4. 可以是局域网中电脑名称
    3. 端口号（port）：443
       1. 如果协议是http，端口号默认80，可以不写端口号
       2. 如果协议是https，端口号默认是443，可以不写端口号
    4. 路径（path）:news/1-2-1/index.html
    5. 地址参数（search/query）：openId=1232456&uuid=789456
    6. 哈希（hash）：aaa



1. Hash Router哈希路由
  根据url地址中的hash值来确定如何显示组件
 > 使用hash路由原因：hash的变化不会导致页面的刷新
 这种模式兼容性最好



2. Browser History Router 浏览器历史记录路由
   根据url地址中的path路径来确定如何显示组件
  > HTML5出现后，新增了History API,从此以后，浏览器拥有了改变路径(path)而不刷新页面的方式


### 路由组件
  React-Router为我们提供了两个重要组件
#### Router组件
特点：它本身不做任何展示，仅提供路由模式配置，另外，**该组件会产生一个上下文**，上下文中会提供一些实用的对象和方法，供其他相关组件使用
Router组件有两个：
1. HashRouter组件：该组件使用hash模式匹配(实际开发用得少)
2. BrowserRouter组件：该组件使用BrowserHistory模式匹配（用的多）
> 通常情况下，Router组件只有一个，将该组件包裹整个页面
> 
#### Route组件
根据不同的地址（path），展示不同的组件
> 地址取决于Router组件使用的HashRouter组件还是BrowserRouter组件，如果是HashRouter组件，地址就是#后面的内容；如果是BrowserRouter组件，地址就是path

重要属性：
1. path:匹配的路径
   1. 默认情况下，不区分大小写，可以设置sensitive属性为true来区分大小写
   2. 默认情况下，只匹配开头的目录，如果要精确匹配，配置exact属性为true
   3. 如果不写path，则会匹配任意路径
2. component:匹配成功后要显示的组件
3. children:
   1. 传递React元素，无论是否匹配，一定会显示children，忽略component属性
   2. 传递一个函数，该函数有多个参数，这些参数来自于上下文，该函数返回React元素，则一定显示返回的元素，并且忽略component属性
   3. 如果Route组件在Switch组件中，则Route组件的children属性不起作用、不渲染children中的React元素
4. render：传递一个函数，该函数有一个参数是上下文对象，该函数返回一个React元素，只有匹配后才运行render函数来显示React元素
> Route组件可以写到任意地方，只要保证是Router的后代元素即可
#### Switch 组件
写到Switch组件中的Route组件，当匹配到第一个组件后，立即停止匹配 
> 由于匹配时Switch组件会循环所有子元素，让每个子元素去完成匹配，若匹配到则渲染对应的组件，然后停止循环、匹配；
因此不能在Switch的子元素中使用除Route组件之外的组件。

### 路由信息
Router组件会创建一个向下文，并且会向 上下文中注入一些信息。该上下文对开发者是隐藏的，**Route组件若匹配到了地址，会将这些上下文中的信息对象作为属性传入对应的组件。**

作为属性传递给Route对应组件的上下文信息对象有三个：
1. **history对象**
   它并不是window.history对象，我们利用history对象实现无刷新跳转地址
  - push方法：将某个新的地址入栈（历史记录栈），调用该方法会改变上下文，导致Router组件刷新，导致上下文相关的所有Route组件全部刷新
    **参数1**：新的地址
    **参数2**：可选，附带的状态数据
  - replace方法：将某个新的地址替换掉当前栈中的地址
  - **listen**:向栈中添加一个监听器，监听地址的变化，当地址变化时，会调用传递的参数函数，**运行时间点在即将跳转到新页面时，所以可以通过this.props.location获取之前页面地址**
    - 参数1：函数
      - 参数1：location对象，记录当前的地址信息
      - 参数2：action，一个字符串，表示进入当前地址的方式：
        1. POP(出栈)：通过点击浏览器前进、后退按钮；调用history.go、history.goBack、history.goForWard
        2. PUSH(入栈)
          - 点击Link、NavLink组件等超链接
          - 调用history.push
        3. REPLACE(替换)
          - 调用history.replace

    - listen返回结果：一个函数，可以调用该函数取消监听

  - **block**：函数，设置一个阻塞，传递一个字符串作为阻塞消息或者传递函数（函数返回结果是个字符串），当页面发生跳转时，会进入阻塞，并将阻塞消息传递给路由根组件Router组件的getUserConfirmation方法的第一个参数;block、getUserConfirmation在listen调用之前执行
    **history有且仅能添加一个阻塞**
    **不管在哪个组件添加阻塞，都会调用Router组件的getUserConfirmation，因为同一个页面history都是同一个**
    1. 参数可以为字符串或者函数
      - 如果为函数，参数：
        - 参数1：location对象，记录当前的地址信息
        - 参数2：action，一个字符串，表示进入当前地址的方式：
          1. POP(出栈)：通过点击浏览器前进、后退按钮；调用history.go、history.goBack、history.goForWard
          2. PUSH(入栈)
            - 点击Link、NavLink组件等超链接
            - 调用history.push
          3. REPLACE(替换)
            - 调用history.replace

  - block返回结果：一个函数，可以调用该函数取消阻塞
  
    ```js
      假设这是个类组件
    let lis= props.history.listen((location,action)=>{
        //地址变化时会调用该回调函数
        //可以通过this.props.location获取之前页面地址
        this.props.history.block('是否跳转页面？')//设置了阻塞
        block函数传递一个字符串，用于拦截跳转，在listen回调函数触发前触发block函数；
        跳转前设置的阻塞不起确定作用，阻塞只提供字符串消息，起决定作用的是Router组件的一个属性
      })
      lis()//调用返回的函数即可取消监听
      
        <Router getUserConfirmation={(msg,callback)=>{
          1. msg就是阻塞的字符串;
          2. 调用callback(true)代表跳转，callback(false)代表不跳转；
          3. 这个不写的话就会默认值callback(window.confirm(msg))，显示一个弹框，点击确定代表callback(true)，点击取消代表callback(false)
        }} ></Router>

    ```

### 阻止跳转
利用 react-router-dom中的prompt组件完成阻止跳转；
```js
  <Prompt when={当这个值为true时触发阻止操作，为false不阻止} 
    message='是否跳转吗'
  >

```

> 问题：为什么不直接使用原生的window.history？
> 1. 因为React中Router组件有两种，使用React封装好的history对象这两种Router组件都可以使用，而使用原生的window.history只能在BrowserRouter组件下使用，HashRouter组件不能使用
> 2. 第二点原因是当使用window.history.pushState方法时，React没有办法收到任何通知，导致React不知道地址发生了变化，结果导致不会重新渲染组件

2. **location对象**
   与React中history.location完全一致，是同一个对象
location对象中记录了当前地址的相关信息（pathname、search、hash）**与完整url地址有关**
 > 我们通常使用第三方库```query-string```,用于解析地址栏中的数据，直接使用qs.parse()转义

3. **match对象**
   match对象中保存了路由**匹配**的相关信息，**只与匹配path有关**
   - isExact:事实上当前路径和路由配置路径是否是精确匹配
   - params:获取路径规则中对应的数据
   - path:获取Route组件上得path属性值
   - url:获取真实浏览器地址path与Route组件path匹配的那部分路径
   - > ```<Route path='/news/year?/month?/day?' />```这种?号代表url中对应项可填可不填
   - > ```<Route path='['/news','/news/year/month/day']' />```可以写成数组格式，代表数组中任意一项都可匹配
  
> 实际上，书写Route组件path时，可以书写```string-pattern```（字符串正则）（类似vue中的动态路由）
> react-router使用了第三方库，Path-to-RegExp，该库将字符串正则转换成真正的正则


**向某个页面传递数据的方式**

1. state:在使用history.push()时传递第二个参数
2. **利用search:把数据填写到地址栏中的?后**
3. 利用hash:把数据填写到地址栏中的#后
4. **利用params:把数据填写到路径中**


#### 非路由组件获取路由信息
非路由组件是指 不是Route组件上component属性的组件；

某些组件并不是Route组件上component属性的组件，而是在Route组件上component属性的组件内部，或者其他普通组件内部，因此这样的组件没有路由信息（history、location、math），如果这样的组件想获取路由信息，有两种方式：

> 1. 将路由信息从Route组件上component属性的组件（父组件）一层一层通过props传递过去
> 2. 使用react-router提供的高阶组件withRouter（react内部组件肯定有Router组件提供的上下文中的信息，即有路由信息），包装要使用路由信息的组件，该高阶组件返回一个新组件，新组件向这个组件传递路由信息


### 其他路由

#### Link
  生成一个无刷新跳转的a元素
  属性：
  1. to属性:
     - 字符串：跳转的目标地址
     - 对象：
       - pathname:url路径
       - search：参数信息
       - hash
       - state:附加的状态数据
  2. replace属性：布尔属性，表示是否替换当前地址，默认false，不替换
  3. innerRef：可以将内部的a元素的ref属性附着在传递的对象或函数参数上
      - 属性值为对象或者函数
  4. className、style等可以给a元素加的属性
#### NavLink
   是一种特殊的Link,Link组件具备的组件，NavLink都有；
   NavLink具备的额外功能：根据当前地址和链接地址，来决定该链接的样式，匹配成功会带有active类样式。
   属性：
   -  activeClassName:匹配时使用自定义类名
   -  activeStyle:匹配时使用的内联样式
   -  exact:是否精确匹配
   -  sensitive:匹配时是否区分大小写
   -  strict:是否严格匹配最后一个 斜杠
   -  className、style等可以给a元素加的属性
#### Redirect
重定向组件，当加载到该组件时会自动跳转（无刷新）到另外地址
  1. to属性： 
   - 字符串类型：跳转的地址
   - 对象类型：跳转的地址信息
      - pathname:url路径
      - search：参数信息
      - hash
      - state:附加的状态数据
  2. push属性：默认为false，表示跳转使用替换的方式，设置true后，则使用push方式跳转
  3. from属性：当匹配到from地址规则时才跳转
  4. exact:是否精确匹配
  5. sensitive:匹配时是否区分大小写
  6. strict:是否严格匹配最后一个 斜杠


### 自定义路由
自定义路由即我们自己封装一个函数组件，将Route组件包裹下，返回Route组件，将Route组件的component、render、path等属性全都传递给我们的自定义路由

**自定义路由组件和Route组件功能完全一样！**

### 导航守卫
导航守卫：当离开一个页面进入另一个页面时，触发的事件

> 自己封装一个导航守卫组件，与上下文对象的props.history.block以及Router组件的getUserConfirmation函数联用，将该组件作为根组件，并把Router组件包装起来

### 滚动条复位
1. 使用高阶组件，将Route对应的组件包装一下，在返回的新组件内的componentDidMount钩子函数中来设置scrollTop为0、
2. 使用自定义HOOK，利用useEffect(在函数组件中)
   ```js
   function useScroll(pathname){
     useEffect(()=>{
       将scrollTop设置为0；
       或者自己写一个动画函数来设置滚动条为0
     },[pathname])
   }
   在初次渲染完成调用useEffect的回调函数，依赖值是传入的地址,每次切换地址时将调用useEffect的回调函数
   ```
   > 这个自定义HOOK放在每个Route对应的组件内即可


## Redux

#### Redux核心概念
##### MVC
它是一个UI的解决方案，用于降低UI，以及UI关联的数据的复杂度。
- 传统的服务端的MVC
  环境:
  1. 服务端需要响应给客户端一个完整的HTML
  2. 该HTML包含页面需要的数据
  3. 浏览器仅承担渲染页面的作用
  > 以上方式叫做服务端渲染， 即服务器将完整的页面组装好后，一起发送给客户端。服务器端要处理UI中要用到的数据，并且要将数据嵌入到页面中，最终生成一个完整的HTML页面响应。为了降低处理这个过程的复杂度，出现了MVC模式
MVC模式：
  1. Controller:处理请求，组装这次请求需要的数据
  2. Model:需要用于UI渲染的数据模型
  3. View:视图，用于将模型组装到界面中
  
- 前端MVC模式的困难


#### action

1. action是一个plain-object(平面对象)，平面对象的__proto__指向Object.prototype,可以将action理解成一个对象字面量{}
2. **action中必须有type属性，用于描述操作的类型，type类型可以是任意类型(string、number等等)**
3. 通常使用payload属性作为附加数据，可以为任何类型
4. 大型项目中，由于操作类型非常多，为了避免硬编码(写死的对象、字符串等等)，会将action的类型存放到一个或一些单独的文件中
5. 为了方便创建action，通常会使用action创建函数(action creator)来创建action
   > 凡是一个函数返回action就是action创建函数，且action创建函数应为无副作用的纯函数

    纯函数：
     1. 不能以任何形式改变参数 
     2. 函数内部不能有异步 
     3. 不可以对外部环境中的数据造成影响(不可本地存储、不可改变函数外部变量)
6. 为了方便action创建函数分发action，redux提供了一个函数```bindActionCreators```,该函数用于增强action创建函数功能，使用它不仅可以创建action，还可以创建后自动完成分发
   ```js
    import {createStore,bindActionCreators} from 'redux';
    import {getIncreaseAction,getDecreaseAction,getSetAction} from './action/number-action'
    import {reducer} from './reducer'
   let store=createStore(reducer,10);//返回一个仓库对象------------>第三步，仓库对象将分发的action、旧数据传递给对应的reducer函数

     传统模式 第一种分发action  
    let action=getIncreaseAction()//创建一个action    ----------------->第一步

    store.dispatch(action)//分发一个action ------------>第二步


   -------------------------------------------------------------


    这是第二种方法分发action

    //bindActionCreators第一个参数是由action创建函数合并的对象，第二个参数是仓库的dispatch函数；bindActionCreators返回一个新对象，新对象中的属性名与第一个参数的属性名一致
    let bindActinos=bindActionCreators({getIncreaseAction,getDecreaseAction,getSetAction},store.dispatch)
    
    bindActinos.getDecreaseAction()//直接调用对应的action创建函数就可以分发action

   
   ```

### reducer

reducer是用于改变数据的函数

1. 一个数据仓库，有且仅有一个reducer,并且通常情况下，一个工程项目只有一个仓库
2. 为了方便管理，通常将reducer放到单独的文件中
3. reducer被调用的时间点
   1. 当创建一个store时```createStore(reducer,默认状态)```会调用reducer
      1. 利用这一点，用reducer初始化状态，创建仓库时不传递任何状态，将reducer函数的参数state设置一个默认值
   2. 通过store.dispatch分发了一个action，此时会调用reducer
4. reducer函数内部通常用switch来判断type值(书写习惯)
5. **reducer必须是一个没有副作用的纯函数**
   - 作用：
     1. 纯函数有利于测试和调试
     2. 有利于还原数据
     3. 有利于将来和react结合使用
   - 要求
     1. 不能改变参数、参数内属性(可以使用结构、object.assign({},对象1，对象2))，因此改变状态必须得到新的状态
     2. 不能有异步(ajax、setTimeout、promise)
     3. 不能对外部环境造成影响(不能使用本地存储)
6. 由于在大中型项目中，操作比较复杂，数据结构与比较复杂，因此会对reducer进行细分
    1. redux提供了一个方法使我们更加方便的合并reducer，```combineReducers```用法：combineReducers({
        属性：不同的reducer模块
        属性：不同的reducer模块
        属性：不同的reducer模块
      })
      作用：**合并reducer，得到一个新的reducer，该新的reducer管理一个对象，该对象中的每一个属性交给对应的reducer管理**
```js
  import {DECREASE,INCREASE,SET} from './action/action-type'

  /**
   * reducer本质是一个普通函数
   * @param state 之前仓库中的（状态）数据
   * @param action 描述要做什么的对象
   */
  export function reducer(state=10,action) {//返回一个新的数据
      state设置默认值可以在创建store时运行reducer时设置默认数据，
      由于第一次运行render时action的type是随机的，所以我们自己写的判断进不去，最终返回state的默认值

      if(action.type===DECREASE){
          return state-1;
      }else if(action.type===INCREASE){
          return state+1;
      }else if(action.type===SET){
          return state.payload
      }
      return state;//如果什么不做返回之前数据即可     -------------->第四步，reducer将新状态再传递给store仓库对象
  }

```


### store
store：用于保存数据的仓库。通过createStore方法创建的对象。

```js
    let store=createStore(reducer);
    store.dispatch(action)来分发action
    store.getState()来获取当前仓库中保存的数据
    store.subscribe(()=>{})注册一个监听器，监听器是一个无参函数，当分发一个action之后，会运行注册的监听器。监听器会返回一个函数用于取消监听。可以在监听器里面输出每次分发完action后的仓库数据，以便查看。


```

## redux中间件
```js
使用中间件写法
import {createStore,applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'


let store=createStore(reducer,
  applyMiddleware(thunk,logger)
)
```

redux-logger：用来在控制台调试方便开发者查看仓库数据的变化
redux-thunk：用来处理异步的action，即可以在action创建函数中书写异步代码。action处理函数返回的不是个对象了，而是一个函数，该函数可以是异步的。
    redux-thunk会向action函数中传递三个参数：
    1. dispatch：来自于store.dispatch
    2. getState：来自于store.getState
    3. extra:来自于用户设置的额外参数


## react-redux

- 如果一个组件仅用于渲染一个UI界面，而没有自己的状态，通常是函数组件，这样的组件叫 **展示组件**
- 如果一个组件，仅用于提供数据，只渲染其他组件，而没有任何属于自己的UI界面，这样的组件叫做**容器组件**

react-redux库:用来连接react和redux，包含几个组件：
- Provider组件：没有任何UI界面，该组件作用是将redux仓库放到一个上下文中
- connect：这是一个方法，返回一个高阶组件，用于连接仓库和组件的
  1. 参数1：函数，第一个参数是store的状态数据；第二个参数是外部传递给容器组件的属性，该函数返回一个对象，函数返回的对象依次展开传递给展示组件的属性，是展示组件需要的数据
  2. 参数2：
    情况1：参数是函数，展示组件需要调用的事件函数，事件函数返回的对象依次展开传递给展示组件的属性，第一个参数是dispatch；第二个参数是外部传递给容器组件的属性
    情况2：参数是对象，对象的每个属性是个action创建函数，当事件触发时，会自动的dispatch函数返回的action
  - connect()调用后返回一个高阶组件，高阶组件也是个函数，传入展示组件返回容器组件

``` js
connect(展示组件需要的数据，展示组件需要的事件)(展示组件)

这样会返回容器组件
```
  connect使用的细节：
  1. 如果对返回的容器组件加上额外的属性，则这些属性会直接传递到展示组件
  2. 如果不传递第二个组件，通过connect连接的组件会自动得到一个属性dispatch，使得组件有能力自行调用dispatch触发action(不推荐这样做，拒绝组件和仓库数据耦合)
   

## connected-react-router(redux和router结合)

> 课前知识：
     1. 安装谷歌插件：redux-devtools
     2. 使用npm安装第三方库： redux-devtools-extension

用于将redux和react-router进行联合
会将下面两个路由数据和仓库同步：
1. action：这个不是redux中的action,在connected-react-router中代表当前路由跳转的方式(PUSH、REPLACE、POP)
2. location:记录了当前的地址信息

**connected-react-router中的内容：**
1. **connectRouter**:这是一个函数，需要一个参数，是history对象，调用它返回一个管理仓库中路由信息的reducer，因此一般我们在reducer的文件中：

在仓库中使用history需要导入第三方库```history```，使用里面的createBrowserHistory,调用该方法得到history对象，createBrowserHistory()
  ```js
    combineReducers({
      属性：不同的reducer模块,
      属性：不同的reducer模块,
      属性：不同的reducer模块,
      router:connectRouter(createBrowserHistory()),//在仓库中添加路由的仓库状态
    })
  ```
2. **routerMiddleware**:一个函数，参数是和connectRouter参数相同的history，该函数会返回一个中间件，用于拦截特殊的action
3. **ConnectedRouter**：一个组件，有一个属性是和connectRouter参数相同的history，用于向上下文提供一个history对象和其他路由信息一致，**之所以制作一个新的组件，是因为connected-react-router这个库必须保证react项目整个过程使用的同一个history对象**
   > 要求react不可以使用react-router-dom中的Router组件，要使用ConnectedRouter组件，因为react-router-dom中的Router组件中的history和createBrowserHistory创建的不是一个history，不能达到路由和仓库同步


## dva
官方网站：https://dvajs.com；阿里巴巴出品的库
dva不仅仅是一个第三方库，更是一个框架，它主要整合了redux相关数据，让我们处理数据更加容易。dva依赖了很多东西：react、react-router、redux、redux-saga、react-redux、connected-react-router等
**由于dva内部使用了react-redux、connected-react-router，所以我们的组件和仓库关联、路由和仓库关联**



- dva的使用：
1. dva默认导出一个函数，调用该函数可以得到一个dva对象
2. dva对象.router：一个路由方法，传入一个函数，该函数返回一个react节点，将来应用程序启动后会自动应用该节点
3. dva对象.start：一个方法，该方法用于启动dva应用程序，可以认为启动的就是react程序，该方法传入一个选择器，用于选中页面中的某个dom元素，react会将内容渲染到该元素内部
4. dva对象.model：一个方法，该方法用于定义一个模型，该模型可以理解为redux的action、reducer、redux-saga副作用处理的整合，整合成了一个对象，将该对象传入model方法即可。
   整合对象中的属性：
   1. namespace:命名空间，该属性是一个字符串，字符串的值会被作为仓库中的属性保存
   2. state: 该模型的默认状态
   3. reducers：该属性配置为一个对象，对象中的每个方法就是一个reducer，dva规定，reducer的名字就是reducer匹配的action类型
   4. effects:处理副作用(如ajax请求)，底层使用redux-saga实现的，该属性配置为一个对象，对象中的每个方法均处理一个副作用，方法的名字就是匹配的action类型
      1. 函数的参数1：action
      2. 函数的参数2：封装好的saga/effects对象
   5. subscriptions:该属性配置为一个对象，该对象中可以写任意数量、任意名称的属性，每个属性是一个函数，这些函数会在模型加入到仓库中后立即运行，可以在这些函数中注册事件。
      1. 函数的参数1：dispatch
      2. 函数的参数2：history对象
![avatar](https://zos.alipayobjects.com/rmsportal/PPrerEAKbIoDZYr.png)

5. dva中同步路由到仓库

    > dva已经做了connected-react-router中的connectRouter和routerMiddleware这两步，只有一个history等待我们传递，所以以下配置：
   1. 在调用dva函数时，导入```history```，使用里面的createBrowserHistory,调用createBrowserHistory()得到history对象
   2. 在根函数中，使用ConnectedRouter作为根组件，用于向上下文提供一个history对象和其他路由信息一致

6. dva配置：
   1. history:同步到仓库的history对象
   2. initialState:创建redux仓库时，使用的默认状态
   3. onError:当仓库的运行发生错误的时候，运行的函数
   4. onAction:配置中间件
      1. 传入一个中间件对象
      2. 传入一个中间件数组
   5. onStateChange：当仓库中状态发生变化时运行的函数
   6. extraReducers:指定额外的 reducer,是一个对象，对象中每个属性是一个方法，每个方法是需要合并的reducer，方法名即仓库对应的属性名
   7. extraEnhancers：配置一个数组，数组每一项是个函数，用于封装createStore函数的，dva会将原来的仓库创建函数作为参数传递，返回一个新的用于创建仓库的函数



```js
  import dva from 'dva'
  import {createBrowserHistory} from 'history'

  const app = dva({
    history:createBrowserHistory(),
    initialState:{
      模型1默认状态：123，
      模型2默认状态：234
    },
    onError(e,dispatch) {
      message.error(e.message,dispatch);
    },
    onAction(){

    },
    extraReducers: {
      abc(state=123,action){

      }
    },
    extraEnhancers:[function (createStore){
      return function(...args){
        return createStore(...args)
      }
    }]
  });

```
### dva插件
通过dva对象.use(插件)，来使用插件，插件本质就是一个对象，该对象与配置对象相同，dva会在启动时，将传递的插件对象混合到配置中

**第三方插件：**
- dva-loading:该插件会在仓库中加入一个loading状态，是一个对象。有以下属性：
  1. global：全局是否正在处理副作用，只要有任何一个模块在处理副作用，该属性为true
  2. models:一个对象，对象中的属性名以及属性值代表哪个模型是否在处理副作用中
  3. effects：一个对象，对象中的属性名以及属性值代表哪个action是否触发了副作用

```js
  import createLoading from dva-loading
  const app = dva({
    history:createBrowserHistory(),
  })


  app.use(createLoading({
    namespaced:'Load'
  }))
  配置在仓库中的名字，默认是loading
```


## umijs

官网：https://umijs.org/

### 全局安装umi
  ``` yarn global add umi```
  全局安装后会有一个命令行工具-umi，通过该命令可以对umi工程进行操作
   umi还可以使用脚手架
命令行：
umi dev：使用开发模式启动命令行

### 约定式路由
umi对路由的处理主要有两种：

1. **约定式**：使用约定好的文件夹和文件，来代表页面，umi会根据开发者书写的页面生成路由配置

  > 路由匹配约定
  1. umi约定，工程中的pages文件夹下存放的是页面，如果工程包含src目录，则src/pages是页面文件夹
  2. umi约定，页面的文件名，以及页面的文件路径，是该页面匹配的路由
  3. umi约定，如果页面的文件名是index，则可以省略文件名(首页)，注意避免文件名和当前目录下文件夹名称相同
  4. umi约定，如果src/layouts目录存在，则该目录中的index.js表示的全局通用布局，布局中的children则会添加具体的页面
  5. umi约定，如果pages文件夹下包含_layout.js，则_layout.js所在的目录以及其所有的子目录中的页面，公用这个页面
  6. 404页面，umi约定，pages/404.js表示404页面，如果路由无匹配，则会渲染该页面
  7. 约定 [ ] 包裹的文件或文件夹为动态路由。
    ```src/pages/users/[id].js 会成为 /users/:id```
  8. 约定 [ $] 包裹的文件或文件夹为动态可选路由,即/users后写不写内容都会匹配到这个文件
    ```src/pages/users/[id$].js 会成为 /users/:id?```

  > 路由跳转约定
  1. 链接跳转：Link：导入Link组件即可；NavLink ：导入NavLink组件即可，用法和react-router-dom中路由一样
  2. 代码跳转：导入history对象，```import { history } from 'umi';```或者在组件属性中获取history
  > 路由信息的获取
  所有的**页面组件、布局组件**(pages、layouts文件夹下的文件)都会通过属性props，收到下面属性：
  1. match：等同于react-router中的match
  2. history:等同于react-router中的history（history.location.query被封装成了一个对象，使用的query-string库进行的封装）
  3. location:等同于react-router中的location(location.query被封装成了一个对象，使用的query-string库进行的封装)
  4. route:当前路由配置，包含 path、exact、component、routes 等
  - 如果需要在普通组件中获取路由信息，则需要使用withRouter封装，```import { withRouter } from 'umi'```导入即可

2. **配置式**：直接书写路由配置文件
   当使用了路由配置后，约定式路由失效
   两种方式书写umi配置：
   1. 使用根目录下的文件 ```.umirc.js```
   2. 使用根目录下的文件 ```config/config.js```
  进行路由匹配时，每个配置就是一个匹配规则，并且，每个配置是一个对象，对象中的某些属性会直接形成Route组件的属性

  注意：

  - component配置项，需要填写页面组件的路径，路径相对于src/pages文件夹
  - exact配置项：如果我们没有手动写exact则生成的路由配置自动添加exact:true
  - 每一个路由配置可以添加任何属性
  - Routes属性是一个数组，数组中每一项是一个组件路径，路径相对于项目根目录，当匹配到路由后，会转而渲染该属性指定的组件，并将component对应的组件作为children放到匹配的组件中

路由配置中的信息，同样可以写到约定式路由中，方式是，为约定式路由添加第一个文档注释（YAML），需要将注释放到最开始位置

  YAML格式:
  - 键值对：冒号后需要加上空格(不需要加任何双引号)
  - 如果某个属性有多个键或多个值，需要进行缩进(空格)
  
### umi使用dva插件
> 文档：https://umijs.org/zh-CN/plugins/plugin-dva

dva插件和umi整合后，将模型分为两种：
1. 全局模型：所有页面通用，工程一开始启动后，模型就会挂载到仓库
2. 局部模型：只能被某些页面使用，访问具体的页面时才会挂载到仓库

**定义全局模型**
在```src/models```目录定义的js文件都会被看作是全局模型，默认情况下，全局的命名空间和文件名一致

**定义局部模型**
局部模型定义在pages文件夹或其子文件夹下，在哪个文件夹定义的模型，会被该文件夹中所有页面及子页面所共享。

局部模型的定义和全局模型的定义类似，需要创建一个models文件夹