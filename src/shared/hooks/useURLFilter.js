import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { initialFilter } from 'shared/configs/filter'

export const useURLFilter = (defaultFilter = initialFilter) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [localFilter, setLocalFilter] = useState(defaultFilter)

	// Инициализируем локальный фильтр из URL при загрузке
	useEffect(() => {
		const filtersFromURL = getFiltersFromURL(searchParams)
		setLocalFilter(filtersFromURL)
	}, []) // Только при первоначальной загрузке

	// Функция для получения фильтров из URL
	const getFiltersFromURL = params => {
		const filters = { ...defaultFilter }

		const brandParam = params.get('brand')
		const typeParam = params.get('type')
		const priceParam = params.get('price')

		if (brandParam) {
			filters.brand = brandParam.split(',').filter(Boolean)
		}

		if (typeParam) {
			filters.type = typeParam.split(',').filter(Boolean)
		}

		if (priceParam) {
			const [min, max] = priceParam.split('-').map(Number)
			if (!isNaN(min) && !isNaN(max)) {
				filters.price = [min, max]
			}
		}

		filters.isRatingAbove4 = params.get('rating') === 'true'
		filters.isDiscount = params.get('discount') === 'true'
		filters.isInStock = params.get('stock') === 'true'

		return filters
	}

	// Функция для обновления URL с фильтрами
	const applyFiltersToURL = () => {
		const params = new URLSearchParams()

		// Сохраняем сортировку
		const sortParam = searchParams.get('sort')
		if (sortParam) {
			params.set('sort', sortParam)
		}

		// Добавляем фильтры только если они не дефолтные
		if (localFilter.brand.length > 0) {
			params.set('brand', localFilter.brand.join(','))
		}

		if (localFilter.type.length > 0) {
			params.set('type', localFilter.type.join(','))
		}

		if (localFilter.price[0] !== defaultFilter.price[0] || localFilter.price[1] !== defaultFilter.price[1]) {
			params.set('price', `${localFilter.price[0]}-${localFilter.price[1]}`)
		}

		if (localFilter.isRatingAbove4) {
			params.set('rating', 'true')
		}
		if (localFilter.isDiscount) {
			params.set('discount', 'true')
		}
		if (localFilter.isInStock) {
			params.set('stock', 'true')
		}

		setSearchParams(params, { replace: true })
	}

	// Функция сброса фильтров (только локально, пока не применено)
	const resetLocalFilters = () => {
		setLocalFilter(defaultFilter)
	}

	// Функция сброса фильтров в URL
	const resetFilters = () => {
		const params = new URLSearchParams()

		// Сохраняем сортировку
		const sortParam = searchParams.get('sort')
		if (sortParam) {
			params.set('sort', sortParam)
		}

		setSearchParams(params, { replace: true })
		setLocalFilter(defaultFilter)
	}

	// Локальные обработчики
	const handleChange = e => {
		const currentIndex = localFilter[e.target.id].indexOf(e.target.name)
		const newFilter = [...localFilter[e.target.id]]

		if (currentIndex === -1) {
			newFilter.push(e.target.name)
		} else {
			newFilter.splice(currentIndex, 1)
		}

		setLocalFilter({
			...localFilter,
			[e.target.id]: newFilter,
		})
	}

	const handlePriceChange = (min, max) => {
		if (max === 0 || min > max) {
			max = 999999
		}

		setLocalFilter({
			...localFilter,
			price: [min, max],
		})
	}

	const handleBooleanChange = e => {
		setLocalFilter({
			...localFilter,
			[e.target.name]: e.target.checked,
		})
	}

	// Получаем актуальные фильтры из URL
	const activeFilter = getFiltersFromURL(searchParams)

	return {
		localFilter, // Локальное состояние фильтров (для формы)
		activeFilter, // Активные фильтры из URL (для фильтрации данных)
		handleChange,
		handlePriceChange,
		handleBooleanChange,
		applyFiltersToURL, // Применить фильтры (записать в URL)
		resetLocalFilters, // Сбросить локальные фильтры
		resetFilters, // Сбросить фильтры в URL
		setLocalFilter, // Для прямого изменения состояния
	}
}
