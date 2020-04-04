export default function (state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        ...action.data
      }
    case 'SET_ACTIVE_ALBUM':
      return {
        ...state,
        ...action.data
      }
    case 'SET_STEP':
      return {
        ...state,
        ...action.data
      }
    default:
      return state;
  }
}