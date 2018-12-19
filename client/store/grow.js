import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_GROW_ITEMS = 'GOT_GROW_ITEMS'

/**
 * INITIAL STATE
 */
const initalState = {
    growItems: []
}

/**
 * ACTION CREATORS
 */
const gotGrowItems = items => ({type: GOT_GROW_ITEMS, items})


/**
 * THUNK CREATORS
 */

export const getGrowItems = () => async dispatch => { 
    try {
        const res = await axios.get('api/grow'); 
        console.log('thunk data', res.data); 
        dispatch(gotGrowItems(res.data))
    } catch (error) {
        console.error(error); 
    }
}

/**
 * REDUCER
 */
export default function(state = initalState, action) {
  switch (action.type) {
    case GOT_GROW_ITEMS:
      return {...state, growItems: action.items}
    default:
      return state
  }
}
