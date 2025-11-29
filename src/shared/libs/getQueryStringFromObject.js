export const getQueryStringFromObject = filter => {
	return new URLSearchParams(filter).toString()
}
