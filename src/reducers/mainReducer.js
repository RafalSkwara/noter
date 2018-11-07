export const mainReducer = (state = {
	categories: [],
	activeCategory: 0,
	listInputs: ['']
}, action) => {
	switch (action.type) {
		case "SET_CATEGORIES":
			return {
				...state,
				categories: action.payload
			}
		case "ACTIVATE_CATEGORY":
			return {
				...state,
				activeCategory: state.categories.filter(el => el.id === action.payload)
			}
		case "SET_LIST":
			return {
				...state,
				listInputs: [...action.payload]
			}
		case "ADD_LIST_ITEM":
			return {
				...state,
				listInputs: [...state.listInputs, '']
			}
		case "UPDATE_LIST_ITEM": //[index, text]
			let inputs = state.listInputs
			inputs[action.payload[0]] = action.payload[1]
			return {
				...state,
				listInputs: [...inputs]
			}
		case "DELETE_LIST_ITEM":
			let res = [];
			state.listInputs.map((el, index) => {
				if (index !== action.payload) {
					res.push(el)
				}})
			return {
				...state,
				listInputs: [...res]
			}
		case "CLEAR_LIST":
			return {
				...state,
				listInputs: ['']
			}

		default:
			return state;
	}
}
