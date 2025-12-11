import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

export const useURLFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const params = useMemo(() => {
		const paramsObj = {}
		searchParams.forEach((value, key) => {
			if (paramsObj[key]) {
				if (Array.isArray(paramsObj[key])) {
					paramsObj[key].push(value)
				} else {
					paramsObj[key] = [paramsObj[key], value]
				}
			} else {
				paramsObj[key] = value
			}
		})

		// Преобразуем строки в нужные типы
		if (paramsObj.brand) {
			paramsObj.brand = Array.isArray(paramsObj.brand) ? paramsObj.brand : [paramsObj.brand]
		}
		if (paramsObj.type) {
			paramsObj.type = Array.isArray(paramsObj.type) ? paramsObj.type : [paramsObj.type]
		}
		if (paramsObj.price) {
			const prices = paramsObj.price.split('-').map(Number)
			if (prices.length === 2 && !isNaN(prices[0]) && !isNaN(prices[1])) {
				paramsObj.price = prices
			}
		}
		if (paramsObj.isRatingAbove4) {
			paramsObj.isRatingAbove4 = paramsObj.isRatingAbove4 === 'true'
		}
		if (paramsObj.isDiscount) {
			paramsObj.isDiscount = paramsObj.isDiscount === 'true'
		}
		if (paramsObj.isInStock) {
			paramsObj.isInStock = paramsObj.isInStock === 'true'
		}

		return paramsObj
	}, [searchParams])

	const updateParams = useCallback(
		newParams => {
			setSearchParams(prev => {
				const newSearchParams = new URLSearchParams(prev)

				Object.entries(newParams).forEach(([key, value]) => {
					// Удаляем параметр если значение пустое
					if (value === '' || value === undefined || value === null || (Array.isArray(value) && value.length === 0) || (typeof value === 'boolean' && !value)) {
						newSearchParams.delete(key)
					} else if (Array.isArray(value)) {
						newSearchParams.delete(key)
						value.forEach(item => {
							newSearchParams.append(key, item.toString())
						})
					} else {
						newSearchParams.set(key, value.toString())
					}
				})

				return newSearchParams
			})
		},
		[setSearchParams]
	)

	return { params, updateParams }
}
