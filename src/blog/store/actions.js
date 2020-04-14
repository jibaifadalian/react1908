import axios from 'axios'
export const mapStateToProps = (state) => {
    return {
        rightList: state.rigthList
    }
}
export const rightActionCreator = () => {
        return axios.get('/rights').then(res => {
            return {
                type: "getRightList",
                payload: res.data
            }
        })
}


