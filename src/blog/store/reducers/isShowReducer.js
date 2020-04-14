export default function reducer(preState,action) {
  let {type,payload} = action
  switch (type) {
    case 'change_text':
      return {
        ...preState,
        text:payload
      }
    case "child2_getData":
      return {
        ...preState,
        list:payload
      }
    default:
      return preState
  }
}