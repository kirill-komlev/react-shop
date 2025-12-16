import { CATEGORIES_FULL } from 'shared/configs/categories'

export const findKeyByValue = name => {
	const normalizedName = name.toLowerCase().trim()

	for (const [key, category] of Object.entries(CATEGORIES_FULL)) {
		// Проверяем все языковые варианты
		for (const lang in category) {
			if (lang !== 'img' && Array.isArray(category[lang])) {
				if (category[lang].some(item => item.toLowerCase() === normalizedName)) {
					return key
				}
			}
		}
	}

	return null // Если не найдено
}
