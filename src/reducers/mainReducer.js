export const mainReducer = (state = {
	notes: [],
	categories: [],
	activeCategory: 0,
	listInputs: ['']
}, action) => {
	switch (action.type) {
		case "SET_NOTES":
			return {
				...state,
				notes: action.payload
			}
		case "ADD_NOTE":
			return {
				...state,
				notes: [...state.notes, action.payload]
			}
		case "REMOVE_NOTE":
			return {
				...state,
				notes: state.notes.filter(el=>el.id!==action.payload)
			}
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
