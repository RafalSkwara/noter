export function setNotes(arr) {
	return {
		type: "SET_NOTES",
		payload: arr
	};
}
export function setCategories(arr) {
	return {
		type: "SET_CATEGORIES",
		payload: arr
	};
}
export function addNote(arr) {
	return {
		type: "ADD_NOTE",
		payload: arr
	};
}
export function addCategory(obj) {
	return {
		type: "ADD_CATEGORY",
		payload: obj
	};
}
export function removeNote(id) {
	return {
		type: "REMOVE_NOTE",
		payload: id
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