const pushProgressInLS = (field) => {
	localStorage.setItem(`sudoku_field`, JSON.stringify(field));
}

const deleteProgressFromLS = () => {
	localStorage.removeItem('sudoku_field');
}

export {pushProgressInLS, deleteProgressFromLS};