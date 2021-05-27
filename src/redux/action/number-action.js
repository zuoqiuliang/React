import {DECREASE,INCREASE,SET} from './action-type'

/**
 * @param 用于得到一个增加数字操作的action
 */

export function getIncreaseAction() {
    return {
        type:INCREASE
    }
}

/**
 * @param 用于得到一个减少数字操作的action
 */

 export function getDecreaseAction() {
    return {
        type:DECREASE
    }
}

/**
 * @param 用于得到一个设置数字操作的action
 */

 export function getSetAction(newNumber) {
    return {
        type:SET,
        payload:newNumber
    }
}