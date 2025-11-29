export const getObjectFromQueryString = search => {
	const paramsEntries = new URLSearchParams(search).entries()

	return Object.fromEntries(paramsEntries)
}
