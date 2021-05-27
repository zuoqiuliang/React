import {DECREASE,INCREASE,SET} from '../action/action-type'

/**
 * reducer本质是一个普通函数
 * @param state 之前仓库中的（状态）数据
 * @param action 描述要做什么的对象
 */
 export function reducer(state=10,action) {//返回一个新的状态
    // state设置默认值可以在创建store时运行reducer时设置默认状态，
    //由于第一次运行render时action的type是随机的，所以我们自己写的判断进不去，最终返回state的默认值

    if(action.type===DECREASE){
        return state-1;
    }else if(action.type===INCREASE){
        return state+1;
    }else if(action.type===SET){
        return state.payload
    }
    return state;//如果什么不做返回之前状态即可     -------------->第四步，reducer将新状态再传递给store仓库对象
}