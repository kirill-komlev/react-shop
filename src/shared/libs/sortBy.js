export function sortBy(data, sortValue) {
	if (!data || !Array.isArray(data)) return []

	// Парсим строку сортировки
	const [sortField, sortDirection] = sortValue.split(',').map(item => item.trim())

	return [...data].sort((a, b) => {
		const aValue = a[sortField]
		const bValue = b[sortField]

		// Обработка null/undefined значений
		if (aValue == null && bValue == null) return 0
		if (aValue == null) return 1
		if (bValue == null) return -1

		let result = 0

		if (typeof aValue === 'string' && typeof bValue === 'string') {
			result = aValue.localeCompare(bValue)
		} else if (typeof aValue === 'number' && typeof bValue === 'number') {
			result = aValue - bValue
		} else {
			result = String(aValue).localeCompare(String(bValue))
		}

		return sortDirection === 'desc' ? -result : result
	})
}
