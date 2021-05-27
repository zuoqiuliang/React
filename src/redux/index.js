import {createStore,bindActionCreators} from 'redux';
import {getIncreaseAction,getDecreaseAction,getSetAction} from './action/number-action'
import {reducer} from './reducer'

/**
 * @param createStore第一个参数是reducer函数
 * 第二个参数是状态默认数据
 */


let store=createStore(reducer);//返回一个仓库对象------------>第三步，仓库对象将分发的action、旧状态传递给对应的reducer函数

// 传统模式 第一种分发action  
let action=getIncreaseAction()//创建一个action    ----------------->第一步

store.dispatch(action)//分发一个action ------------>第二步





// // 这是第二种方法分发action
// let bindActinos=bindActionCreators({getIncreaseAction,getDecreaseAction,getSetAction},store.dispatch)
// //第一个参数是由action创建函数合并的对象，第二个参数是仓库的dispatch函数，返回一个新对象，新对象中的属性名与第一个参数的属性名一致
// bindActinos.getDecreaseAction()//直接调用对应的action创建函数就可以分发action

