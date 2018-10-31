export const mainReducer = (state = {
	notes: [],
	categories: [],
	activeCategory: 0
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

		default:
			return state;
	}
}
