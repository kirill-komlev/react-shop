import { useNavigate, useLocation } from 'react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { initialFilter } from 'shared/configs/filter'

export const useURLFilter = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [pendingFilter, setPendingFilter] = useState({ ...initialFilter })

	// Функция для получения фильтра из URL
	const getFilterFromUrl = useCallback(() => {
		if (!location.search) return { ...initialFilter }

		const params = new URLSearchParams(location.search)
		const filter = { ...initialFilter }

		// Бренды - разделяем по '-'
		const brandParam = params.get('brand')
		if (brandParam) {
			filter.brand = brandParam.split('-').filter(item => item.trim() !== '')
		}

		// Типы - разделяем по '-'
		const typeParam = params.get('type')
		if (typeParam) {
			filter.type = typeParam.split('-').filter(item => item.trim() !== '')
		}

		// Цена
		// const priceParam = params.get('price')
		// if (priceParam && priceParam !== '-') {
		// 	const [min, max] = priceParam.split('-')
		// 	filter.price[0] = Number(min)
		// 	filter.price[1] = Number(max)
		// }

		// Булевы значения
		filter.isRatingAbove4 = params.get('rating_above_4') === 'true'
		filter.isDiscount = params.get('discount') === 'true'
		filter.isInStock = params.get('in_stock') === 'true'

		return filter
	}, [location.search])

	// Функция для сохранения фильтра в URL (сохраняет другие параметры)
	const updateUrlWithFilter = useCallback(
		filter => {
			// Создаём новый URLSearchParams из текущего URL
			const params = new URLSearchParams(location.search)

			// Удаляем все параметры фильтрации
			params.delete('brand')
			params.delete('type')
			params.delete('rating_above_4')
			params.delete('discount')
			params.delete('in_stock')
			// params.delete('price') // если будете использовать

			// Бренды - объединяем через '-'
			if (filter.brand.length > 0) {
				params.set('brand', filter.brand.join('-'))
			} else {
				params.delete('brand')
			}

			// Типы - объединяем через '-'
			if (filter.type.length > 0) {
				params.set('type', filter.type.join('-'))
			} else {
				params.delete('type')
			}

			// Булевы значения
			if (filter.isRatingAbove4) {
				params.set('rating_above_4', 'true')
			} else {
				params.delete('rating_above_4')
			}

			if (filter.isDiscount) {
				params.set('discount', 'true')
			} else {
				params.delete('discount')
			}

			if (filter.isInStock) {
				params.set('in_stock', 'true')
			} else {
				params.delete('in_stock')
			}

			// Цена (если будете использовать)
			/*
			if (filter.price[0] || filter.price[1]) {
				params.set('price', `${filter.price[0] || initialFilter.price[0]}-${filter.price[1] || initialFilter.price[1]}`)
			} else {
				params.delete('price')
			}
			*/

			const searchString = params.toString()
			navigate(
				{
					pathname: location.pathname,
					search: searchString ? `?${searchString}` : '',
				},
				{ replace: true }
			)
		},
		[navigate, location.pathname, location.search]
	)

	// Сбросить фильтр (сохраняет другие параметры)
	const resetFilterInUrl = useCallback(() => {
		// Создаём новый URLSearchParams из текущего URL
		const params = new URLSearchParams(location.search)

		// Удаляем только параметры фильтрации
		params.delete('brand')
		params.delete('type')
		params.delete('rating_above_4')
		params.delete('discount')
		params.delete('in_stock')
		// params.delete('price') // если будете использовать

		const searchString = params.toString()
		navigate(
			{
				pathname: location.pathname,
				search: searchString ? `?${searchString}` : '',
			},
			{ replace: true }
		)
		// Сразу сбрасываем pendingFilter
		setPendingFilter({ ...initialFilter })
	}, [navigate, location.pathname, location.search])

	// Применить фильтр
	const applyFilter = useCallback(() => {
		updateUrlWithFilter(pendingFilter)
	}, [pendingFilter, updateUrlWithFilter])

	// При загрузке страницы загружаем фильтр из URL
	useEffect(() => {
		const filterFromUrl = getFilterFromUrl()
		setPendingFilter(filterFromUrl)
	}, [getFilterFromUrl]) // При монтировании и при изменении getFilterFromUrl

	// Текущий активный фильтр из URL
	const currentFilter = useMemo(() => {
		return getFilterFromUrl()
	}, [getFilterFromUrl])

	return {
		currentFilter,
		pendingFilter,
		setPendingFilter,
		applyFilter,
		resetFilterInUrl,
		getFilterFromUrl,
		updateUrlWithFilter,
	}
}
