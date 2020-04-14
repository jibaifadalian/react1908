import { combineReducers } from "redux";

function isShowReducer(preState = false, action){
    let { type, payload } = action;
    switch (type) {
        case 'aaa':
            return payload;
        default:
            return preState;
    }
}


function rightListReducer(preState = [], action) {
    let { type, payload } = action;
    switch (type) {
        case 'getRightList':
            let newState2 = [...preState, ...payload]  ;
            newState2.rightList = payload;
            return newState2;
        default:
            return preState;
    }
}
function roleListReducer(preState = [], action) {
    let { type, payload } = action;
    switch (type) {
        case 'roleAxios':
            /**深复制老状态  更改状态 返回新状态 */
            let newState1 = [...preState, ...payload]  ;
            newState1.roleList = payload;
            return newState1;
        default:
            return preState;

    }
}
export default combineReducers({
    isShow: isShowReducer,
    rigthList: rightListReducer,
    roleList: roleListReducer
})