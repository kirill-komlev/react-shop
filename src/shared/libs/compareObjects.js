/**
 * Сравнивает два объекта и возвращает только те изменения из второго объекта,
 * которые есть в первом объекте-шаблоне
 * @param {Object} template - Объект-шаблон (первый объект)
 * @param {Object} changed - Измененный объект (второй объект)
 * @returns {Object} Объект с уникальными изменениями из второго объекта, которые присутствуют в шаблоне
 */
export function compareObjects(template, changed) {
	// Если оба не объекты, возвращаем пустой объект
	if (typeof template !== 'object' || template === null || typeof changed !== 'object' || changed === null) {
		return {}
	}

	const result = {}

	/**
	 * Рекурсивная функция для сравнения
	 * @param {Object} templatePart - Часть шаблонного объекта
	 * @param {Object} changedPart - Часть измененного объекта
	 * @param {Array} path - Текущий путь в объекте
	 */
	function deepCompare(templatePart, changedPart, path = []) {
		// Если changedPart не объект или null, не обрабатываем дальше
		if (typeof changedPart !== 'object' || changedPart === null) {
			return
		}

		// Перебираем все ключи шаблона
		for (const key in templatePart) {
			if (!templatePart.hasOwnProperty(key)) continue

			const templateValue = templatePart[key]
			const changedValue = changedPart[key]
			const currentPath = [...path, key]

			// Если ключа нет в changed или значение undefined
			if (!changedPart.hasOwnProperty(key) || changedValue === undefined) {
				continue // Пропускаем, так как нет изменения
			}

			// Если оба значения - объекты (не массивы и не null)
			if (isObject(templateValue) && isObject(changedValue)) {
				// Рекурсивно сравниваем вложенные объекты
				deepCompare(templateValue, changedValue, currentPath)
			}
			// Если значения разные
			else if (!isEqual(templateValue, changedValue)) {
				// Добавляем измененное значение из второго объекта
				setValueByPath(result, currentPath, changedValue)
			}
		}
	}

	// Запускаем сравнение
	deepCompare(template, changed)

	return result
}

/**
 * Проверяет, является ли значение объектом (не массивом, не null)
 */
function isObject(value) {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Глубокое сравнение двух значений
 */
function isEqual(a, b) {
	// Примитивы и null
	if (a === b) return true

	// Если один из них null или не объект
	if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
		return a === b
	}

	// Массивы
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false
		for (let i = 0; i < a.length; i++) {
			if (!isEqual(a[i], b[i])) return false
		}
		return true
	}

	// Если один массив, а другой нет
	if (Array.isArray(a) || Array.isArray(b)) return false

	// Объекты
	const keysA = Object.keys(a)
	const keysB = Object.keys(b)

	if (keysA.length !== keysB.length) return false

	for (const key of keysA) {
		if (!keysB.includes(key) || !isEqual(a[key], b[key])) {
			return false
		}
	}

	return true
}

/**
 * Устанавливает значение по пути в объекте
 */
function setValueByPath(obj, path, value) {
	let current = obj

	for (let i = 0; i < path.length - 1; i++) {
		const key = path[i]
		if (!current[key] || typeof current[key] !== 'object') {
			current[key] = {}
		}
		current = current[key]
	}

	current[path[path.length - 1]] = value
}

// Альтернативная версия с плоской структурой ключей
function compareObjectsFlat(template, changed) {
	if (typeof template !== 'object' || template === null || typeof changed !== 'object' || changed === null) {
		return {}
	}

	const result = {}

	function deepCompareFlat(templatePart, changedPart, path = '') {
		if (typeof changedPart !== 'object' || changedPart === null) {
			return
		}

		for (const key in templatePart) {
			if (!templatePart.hasOwnProperty(key)) continue

			const fullKey = path ? `${path}.${key}` : key
			const templateValue = templatePart[key]
			const changedValue = changedPart[key]

			// Если ключа нет в changed или значение undefined - пропускаем
			if (!changedPart.hasOwnProperty(key) || changedValue === undefined) {
				continue
			}

			if (isObject(templateValue) && isObject(changedValue)) {
				deepCompareFlat(templateValue, changedValue, fullKey)
			} else if (!isEqual(templateValue, changedValue)) {
				result[fullKey] = changedValue
			}
		}
	}

	deepCompareFlat(template, changed)
	return result
}
