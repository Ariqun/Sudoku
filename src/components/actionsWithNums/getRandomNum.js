const getRandomNum = (positions) => {
	const num = Math.floor(Math.random() * 81);

	if (positions.includes(num)) getRandomNum(positions);
	return num;
}

const getRandomNumForCell = () => {
	return Math.floor(Math.random() * (10 - 1) + 1);
}

export {getRandomNum, getRandomNumForCell};