export const notesReducer = (state = {
	notes: []
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
		case "UPDATE_NOTE":
			return {
				...state,
				notes: state.notes.map(note=> {
					let theId = Number(action.payload.id)
					if (note.id == Number(action.payload.id)) {						
						return action.payload;
					} else {
						return note
						
					}
				})
			}

		default:
			return state;
	}
}
