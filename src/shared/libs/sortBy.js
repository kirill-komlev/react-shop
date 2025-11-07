export function sortBy(data, value) {
	const prop = value.split(', ')[0]
	const direction = value.split(', ')[1]
	return [...data].sort((a, b) => {
		const valueA = a[prop]
		const valueB = b[prop]

		let result

		// Если оба значения - числа, сортируем как числа
		if (typeof valueA === 'number' && typeof valueB === 'number') {
			result = valueA - valueB
		} else {
			// Иначе сортируем как строки
			result = String(valueA || '').localeCompare(String(valueB || ''))
		}

		// Меняем направление если нужно
		return direction === 'desc' ? -result : result
	})
}
