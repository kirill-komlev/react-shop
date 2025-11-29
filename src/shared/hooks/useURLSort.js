import { useSearchParams } from 'react-router'

export const useURLSort = (defaultSort = 'id, asc') => {
	const [searchParams, setSearchParams] = useSearchParams()

	// Получаем параметр сортировки из URL
	const sortValue = searchParams.get('sort')

	// Если в URL нет параметра сортировки, используем значение по умолчанию
	// Но НЕ записываем его в URL автоматически
	const currentSortValue = sortValue || defaultSort

	const updateSort = newSortValue => {
		const newParams = new URLSearchParams(searchParams)
		newParams.set('sort', newSortValue)
		setSearchParams(newParams, { replace: true })
	}

	return {
		sortValue: currentSortValue,
		updateSort,
	}
}
