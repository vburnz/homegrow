import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_GROW_ITEMS = 'GOT_GROW_ITEMS'
const ADDED_GROW_ITEM = 'ADDED_GROW_ITEM'
const REMOVED_GROW_ITEM = 'REMOVED_GROW_ITEM'

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
// const addedGrowItem = item => ({type: ADDED_GROW_ITEM, item})
const removeGrowItem = itemId => ({type: REMOVED_GROW_ITEM, itemId})


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

export const addGrowItem = (item, quantity, price, userId) => async dispatch => { 
    try {
        const res = await axios.post('api/grow', {item, quantity, price, userId})
        const res2 = await axios.get('api/grow')
        dispatch(gotGrowItems(res2.data))
    } catch (error) {
        console.error(error)
    }
}
export const deleteGrowItem = (itemId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/grow/${itemId}`); 
        dispatch(removeGrowItem(itemId))
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
    // case ADDED_GROW_ITEM: 
    //     return {...state, growItems: action.items}
    case REMOVED_GROW_ITEM: 
        return {...state, growItems: state.growItems.filter(item => item.id !== Number(action.itemId))}
    default:
      return state
  }
}
