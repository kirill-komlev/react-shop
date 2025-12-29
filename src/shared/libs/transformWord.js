import { CATEGORIES_FULL } from 'shared/configs/categories'
import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'

export const transformWord = (word, language = 'ru') => {
	// Проходим по всем категориям
	for (const [categoryKey, categoryData] of Object.entries(CATEGORIES_FULL)) {
		// Проверяем есть ли слово в массиве для указанного языка
		const wordIndex = categoryData[language]?.indexOf(word.toLowerCase())

		// Если слово найдено в массиве
		if (wordIndex !== -1 && wordIndex !== undefined) {
			// Возвращаем первую форму (единственное число) с заглавной буквы
			return capitalizeFirstLetter(categoryData[language][0])
		}
	}

	// Если слово не найдено, возвращаем исходное с заглавной буквы
	return capitalizeFirstLetter(word)
}
