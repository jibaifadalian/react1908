
const roleListReducer = (preState = [], action) => {
    let { type, payload } = action;
    switch (type) {
        case 'roleAxios':
            /**深复制老状态  更改状态 返回新状态 */
            let newState1 = { ...preState,...payload };
            newState1.roleList = payload;
            return newState1;
        default:
            return preState;

    }
}

export default roleListReducer;