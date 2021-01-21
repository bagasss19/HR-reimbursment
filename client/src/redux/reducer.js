import { SETROLE } from "./constant"

const initialState = {
  role: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETROLE:
      return { ...state, role: action.value }

    default:
      return state
  }
}
