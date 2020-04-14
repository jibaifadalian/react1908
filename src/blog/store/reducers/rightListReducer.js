const rightListReducer = (preState = [], action) => {
    let { type, payload } = action;
    switch (type) {
        case 'getRightList':
            let newState2 = [...preState, ...payload]  ;
            return newState2;
        default:
            return preState;
    }
}

export default rightListReducer