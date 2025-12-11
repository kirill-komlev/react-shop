// shared/hooks/useURLFilter.js
import { useCallback, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router'

export function useURLFilter(initialFilter = {}) {
	const [searchParams, setSearchParams] = useSearchParams()

	// Конвертируем объект фильтра в URL параметры
	const filtersToParams = useCallback(filters => {
		const params = new URLSearchParams()

		Object.entries(filters).forEach(([key, value]) => {
			if (value === undefined || value === null || value === '') return

			if (Array.isArray(value)) {
				// Для массивов (например, price, brand, type)
				if (key === 'price') {
					if (value[0] > 0) params.set('priceFrom', value[0])
					if (value[1] < 10000) params.set('priceTo', value[1])
				} else if (value.length > 0) {
					// Для массива значений (brand, type) - сохраняем как строку с разделителем
					params.set(key, value.join(','))
				}
			} else if (typeof value === 'boolean') {
				// Для булевых значений - сохраняем только true
				if (value) {
					params.set(key, 'true')
				}
			} else if (typeof value === 'number') {
				params.set(key, value.toString())
			} else if (typeof value === 'string') {
				params.set(key, value)
			}
		})

		return params
	}, [])

	// Конвертируем URL параметры обратно в объект фильтра
	const paramsToFilters = useCallback(() => {
		const filters = { ...initialFilter }

		// Восстанавливаем цену
		const priceFrom = searchParams.get('priceFrom')
		const priceTo = searchParams.get('priceTo')
		if (priceFrom || priceTo) {
			filters.price = [priceFrom ? Number(priceFrom) : initialFilter.price[0], priceTo ? Number(priceTo) : initialFilter.price[1]]
		}

		// Восстанавливаем булевые значения
		filters.isRatingAbove4 = searchParams.get('isRatingAbove4') === 'true'
		filters.isDiscount = searchParams.get('isDiscount') === 'true'
		filters.isInStock = searchParams.get('isInStock') === 'true'

		// Восстанавливаем массивы значений
		const brandParam = searchParams.get('brand')
		if (brandParam) {
			filters.brand = brandParam.split(',')
		}

		const typeParam = searchParams.get('type')
		if (typeParam) {
			filters.type = typeParam.split(',')
		}

		return filters
	}, [searchParams, initialFilter])

	// Функция для применения фильтров к URL
	const applyFiltersToURL = useCallback(
		filters => {
			const params = filtersToParams(filters)

			// Сохраняем текущие параметры, не связанные с фильтрацией
			searchParams.forEach((value, key) => {
				if (!params.has(key) && !['priceFrom', 'priceTo', 'isRatingAbove4', 'isDiscount', 'isInStock', 'brand', 'type'].includes(key)) {
					params.set(key, value)
				}
			})

			setSearchParams(params)
		},
		[filtersToParams, searchParams, setSearchParams]
	)

	// Функция для сброса фильтров
	const resetFilters = useCallback(() => {
		const params = new URLSearchParams(searchParams)

		// Удаляем только параметры фильтров
		const filterKeys = ['priceFrom', 'priceTo', 'isRatingAbove4', 'isDiscount', 'isInStock', 'brand', 'type']
		filterKeys.forEach(key => params.delete(key))

		setSearchParams(params)
	}, [searchParams, setSearchParams])

	// Текущие фильтры из URL
	const currentFilters = useMemo(() => {
		return paramsToFilters()
	}, [paramsToFilters])

	// Проверяем, есть ли активные фильтры
	const hasActiveFilters = useMemo(() => {
		const defaultParams = filtersToParams(initialFilter).toString()
		const currentParams = filtersToParams(currentFilters).toString()
		return defaultParams !== currentParams
	}, [currentFilters, initialFilter, filtersToParams])

	return {
		currentFilters,
		applyFiltersToURL,
		resetFilters,
		hasActiveFilters,
	}
}
