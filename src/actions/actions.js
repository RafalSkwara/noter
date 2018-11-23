// NOTES
export function setNotes(arr) {
	return {
		type: "SET_NOTES",
		payload: arr
	};
}
export function addNote(arr) {
	return {
		type: "ADD_NOTE",
		payload: arr
	};
}
export function updateNote(obj) {
	return {
		type: "UPDATE_NOTE",
		payload: obj
	};
}
export function removeNote(id) {
	return {
		type: "REMOVE_NOTE",
		payload: id
	};
}

// LISTS

export function setList(arr) {
	return {
		type: "SET_LIST",
		payload: arr
	};
}
export function addListItem() {
	return {
		type: "ADD_LIST_ITEM"
	};
}
export function updateListItem(arr) { //array: [index, text]
	return {
		type: "UPDATE_LIST_ITEM",
		payload: arr
	};
}
export function deleteListItem(num) { 
	return {
		type: "DELETE_LIST_ITEM",
		payload: num
	};
}
export function clearList() { 
	return {
		type: "CLEAR_LIST"
	};
}

//CATEGORIES

export function setCategories(arr) {
	return {
		type: "SET_CATEGORIES",
		payload: arr
	};
}
export function addCategory(obj) {
	return {
		type: "ADD_CATEGORY",
		payload: obj
	};
}
export function removeCategory(id) {
	return {
		type: "REMOVE_CATEGORY",
		payload: id
	};
}
export function activateCategory(id) {
	return {
		type: "ACTIVATE_CATEGORY",
		payload: id
	};
}

// MAIN MENU

export function openMenu() {
	return {
		type: "OPEN_MENU"
	};
}
export function closeMenu() {
	return {
		type: "CLOSE_MENU"
	};
}