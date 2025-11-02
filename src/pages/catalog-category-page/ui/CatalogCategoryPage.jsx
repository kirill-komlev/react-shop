import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { Box, Container, Grid, Typography } from '@mui/material'

import { ProductCardHorizontal } from 'widgets/product-card/ui/ProductCard'

import { DATA } from 'shared/configs/data'

import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { CATEGORIES_FULL } from 'shared/configs/categories'
import { ProductFilter } from 'widgets/product-filter/ui/ProductFilter'
import { Button } from 'shared/ui/Button'
import { initialFilter } from 'shared/configs/filter'

export function CatalogCategoryPage() {
	const [productCount, setProductCount] = useState(10)
	const [filter, setFilter] = useState(initialFilter)

	// Сброс значения при переходе между страницами
	useEffect(() => {
		setFilter(initialFilter)
	}, [location.pathname])

	// Фильтр по категории
	let { category } = useParams()
	let data = DATA.filter(item => item.category === capitalizeFirstLetter(CATEGORIES_FULL[category].ru[1]))

	const filteredData = useMemo(() => {
		return data.filter(product => {
			// Фильтр по бренду
			if (filter.brand.length > 0 && !filter.brand.includes(product.brand)) {
				return false
			}

			// Фильтр по типу
			if (filter.type.length > 0 && !filter.type.includes(product.features.type)) {
				return false
			}

			// Фильтр по цене
			if (product.price < filter.price[0] || product.price > filter.price[1]) {
				return false
			}

			// Фильтр по рейтингу
			if (filter.isRatingAbove4 && product.rating < 4) {
				return false
			}

			// Фильтр по скидке
			if (filter.isDiscount && product.discount === 0) {
				return false
			}

			// Фильтр по скидке
			if (filter.isDiscount && !product.inStock) {
				return false
			}

			return true
		})
	}, [filter, data])

	return (
		<Box
			component='section'
			py={4}
			bgcolor='#f6f6f6'
			minHeight='100vh'
		>
			<Container
				maxWidth='xl'
				sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2 }}
			>
				<Typography
					variant='h4'
					width='100%'
				>
					Все {CATEGORIES_FULL[category].ru[1]}
				</Typography>
				<Box
					display='flex'
					alignItems='flex-start'
					width='100%'
					gap={4}
				>
					<ProductFilter
						filter={filter}
						setFilter={setFilter}
						category={capitalizeFirstLetter(CATEGORIES_FULL[category].ru[1])}
					/>
					<Grid
						container
						spacing={2}
						width='100%'
					>
						{filteredData.slice(0, productCount).map((item, index) => (
							<Grid
								size={12}
								key={index}
							>
								<ProductCardHorizontal data={item} />
							</Grid>
						))}
					</Grid>
				</Box>
				{filteredData.length > productCount ? <Button onClick={() => setProductCount(productCount + 4)}>Показать еще</Button> : ''}
			</Container>
		</Box>
	)
}
