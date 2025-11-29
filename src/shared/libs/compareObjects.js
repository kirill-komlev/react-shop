export const compareObjects = (obj1, obj2) => {
	const result = {}

	// Проверяем все ключи из первого объекта
	for (const key in obj1) {
		if (obj1.hasOwnProperty(key)) {
			// Если ключа нет во втором объекте или значения разные
			if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
				result[key] = obj1[key]
			}
		}
	}

	// Проверяем все ключи из второго объекта
	for (const key in obj2) {
		if (obj2.hasOwnProperty(key)) {
			// Если ключа нет в первом объекте или значения разные
			if (!obj1.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
				result[key] = obj2[key]
			}
		}
	}

	return result
}
