import { useNavigate, useLocation } from 'react-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { initialFilter } from 'shared/configs/filter'

export const useURLFilter = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [pendingFilter, setPendingFilter] = useState({ ...initialFilter })

	// Получение параметров из URL
	const searchParams = useMemo(() => {
		return new URLSearchParams(location.search)
	}, [location.search])

	// Преобразование фильтра в URL параметры
	const filterToParams = useCallback(filter => {
		const params = new URLSearchParams()

		// Массивы сохраняем как строки через ПЛЮС
		if (filter.brand.length > 0) {
			params.set('brand', filter.brand.join('-'))
		}

		if (filter.type.length > 0) {
			params.set('type', filter.type.join('-'))
		}

		// Цена сохраняем как "min-max" (например: "2000-5000")
		if (filter.price[0] || filter.price[1]) {
			let min = filter.price[0] || ''
			let max = filter.price[1] || ''
			if (max === 0 || min > max) {
				max = 999999
			}
			params.set('price', `${min}-${max}`)
		}

		// Булевы значения
		if (filter.isRatingAbove4) {
			params.set('rating_above_4', 'true')
		}

		if (filter.isDiscount) {
			params.set('discount', 'true')
		}

		if (filter.isInStock) {
			params.set('in_stock', 'true')
		}

		return params
	}, [])

	// Преобразование URL параметров в фильтр
	const paramsToFilter = useCallback(() => {
		const filter = { ...initialFilter }

		// Обрабатываем массивы - разделяем по ПЛЮСУ
		const brandParam = searchParams.get('brand')
		if (brandParam) {
			filter.brand = brandParam.split('-').filter(item => item.trim() !== '')
		}

		const typeParam = searchParams.get('type')
		if (typeParam) {
			filter.type = typeParam.split('-').filter(item => item.trim() !== '')
		}

		// Обрабатываем цену в формате "min-max"
		const priceParam = searchParams.get('price')
		if (priceParam) {
			const [min, max] = priceParam.split('-')
			filter.price[0] = min || ''
			filter.price[1] = max || ''
		}

		// Обрабатываем булевы значения
		filter.isRatingAbove4 = searchParams.get('rating_above_4') === 'true'
		filter.isDiscount = searchParams.get('discount') === 'true'
		filter.isInStock = searchParams.get('in_stock') === 'true'

		return filter
	}, [searchParams])

	// Получить текущий фильтр из URL
	const getFilterFromUrl = useCallback(() => {
		return paramsToFilter()
	}, [paramsToFilter])

	// Обновить URL с новым фильтром
	const updateUrlWithFilter = useCallback(
		newFilter => {
			const params = filterToParams(newFilter)
			const searchString = params.toString()

			// Обновляем URL без перезагрузки страницы
			navigate(
				{
					pathname: location.pathname,
					search: searchString ? `?${searchString}` : '',
				},
				{ replace: true }
			)
		},
		[filterToParams, navigate, location.pathname]
	)

	// Сбросить фильтр в URL
	const resetFilterInUrl = useCallback(() => {
		navigate(
			{
				pathname: location.pathname,
				search: '',
			},
			{ replace: true }
		)

		// Также сбрасываем pending фильтр
		setPendingFilter({ ...initialFilter })
	}, [navigate, location.pathname])

	// Загрузка фильтра из URL при монтировании и обновлении URL
	useEffect(() => {
		const filterFromUrl = getFilterFromUrl()

		// Если в URL есть параметры фильтра, устанавливаем их в pendingFilter
		if (location.search) {
			setPendingFilter(filterFromUrl)
		}
	}, [location.search, getFilterFromUrl])

	// Получить текущий фильтр из URL
	const currentFilter = useMemo(() => {
		return getFilterFromUrl()
	}, [getFilterFromUrl])

	// Инициализируем pendingFilter при первом рендере
	useEffect(() => {
		const filterFromUrl = getFilterFromUrl()
		setPendingFilter(filterFromUrl)
	}, [])

	// Функция для применения фильтра (сохранения в URL)
	const applyFilter = useCallback(() => {
		updateUrlWithFilter(pendingFilter)
	}, [pendingFilter, updateUrlWithFilter])

	return {
		// Фильтр из URL (активный фильтр)
		currentFilter,

		// Фильтр, который пока не применен (предварительный)
		pendingFilter,
		setPendingFilter,

		// Функции для работы с URL
		applyFilter,
		resetFilterInUrl,

		// Вспомогательные функции
		getFilterFromUrl,
		updateUrlWithFilter,
	}
}
