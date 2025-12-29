/**
 * Функция для склонения слов в зависимости от числа
 * @param {number} n - число
 * @param {Array} forms - массив форм слова [для 1, для 2-4, для 5-0]
 * @returns {string} - слово в правильной форме
 */
export function declensionOfNumber(n, forms) {
	// Проверка на корректность ввода
	if (!Array.isArray(forms) || forms.length !== 3) {
		throw new Error('Формы слова должны быть массивом из 3 элементов')
	}

	if (typeof n !== 'number') {
		n = parseFloat(n)
		if (isNaN(n)) {
			return forms[2] // возвращаем форму по умолчанию
		}
	}

	// Для дробных чисел используем форму для 5-0
	if (!Number.isInteger(n)) {
		return forms[2]
	}

	n = Math.abs(n) % 100
	const n1 = n % 10

	if (n > 10 && n < 20) {
		return forms[2] // 11-19 товаров
	}

	if (n1 > 1 && n1 < 5) {
		return forms[1] // 2,3,4 товара
	}

	if (n1 === 1) {
		return forms[0] // 1 товар
	}

	return forms[2] // 5-9, 0 товаров
}
