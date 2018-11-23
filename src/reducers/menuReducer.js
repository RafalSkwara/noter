export const menuReducer = (state = {
	mainMenu: false
}, action) => {
	switch (action.type) {
		case "OPEN_MENU":
			return {
				...state,
				mainMenu: true
			}
		case "CLOSE_MENU":
			return {
				...state,
				mainMenu: false
			}
		

		default:
			return state;
	}
}
