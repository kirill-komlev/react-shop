import { useLocation } from 'react-router'
import { getObjectFromQueryString } from 'shared/libs/getObjectFromQueryString'

export function useFiltersQuery() {
	const { search } = useLocation()
	const filter = getObjectFromQueryString(search)

	return [filter]
}
