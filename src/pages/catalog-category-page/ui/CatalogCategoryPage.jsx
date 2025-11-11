import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material'

import { ProductCard, ProductCardHorizontal } from 'widgets/product-card/ui/ProductCard'
import { ProductFilter } from 'widgets/product-filter/ui/ProductFilter'
import { ProductSort } from 'widgets/product-sort/ui/ProductSort'
import { ProductDirection } from 'widgets/product-direction/ui/ProductDirection'

import { Button } from 'shared/ui/Button'

import { initialFilter } from 'shared/configs/filter'
import { CATEGORIES_FULL } from 'shared/configs/categories'
import { DATA } from 'shared/configs/data'

import { sortBy } from 'shared/libs/sortBy'
import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'

import { useProductDirection } from 'app/providers/store-provider/StoreProvider'

export function CatalogCategoryPage() {
	const productDirection = useProductDirection(state => state.productDirection)

	const [productCount, setProductCount] = useState(10)
	const [filter, setFilter] = useState(initialFilter)
	const [sort, setSort] = useState('id, asc')

	// Сброс значения при переходе между страницами
	useEffect(() => {
		setFilter(initialFilter)
		setSort('id, asc')
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

	const handleChange = event => {
		setSort(event.target.value)
	}

	const sortedData = sortBy(filteredData, sort)

	return (
		<Box
			component='section'
			py={4}
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
					{capitalizeFirstLetter(CATEGORIES_FULL[category].ru[1])}: {filteredData.length}
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
					<Stack
						gap={2}
						sx={{ width: '100%' }}
					>
						<Paper sx={{ p: 2 }}>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
							>
								<Stack
									direction='row'
									spacing={1}
									alignItems='center'
								>
									<Typography variant='body1'>Сортировка:</Typography>
									<ProductSort
										value={sort}
										onChange={handleChange}
									/>
								</Stack>
								<ProductDirection />
							</Stack>
						</Paper>
						<Grid
							container
							spacing={2}
							width='100%'
						>
							{sortedData.slice(0, productCount).map((item, index) => {
								if (productDirection == 'vertical') {
									return (
										<Grid
											size={4}
											key={index}
										>
											<ProductCard data={item} />
										</Grid>
									)
								} else {
									return (
										<Grid
											size={12}
											key={index}
										>
											<ProductCardHorizontal data={item} />
										</Grid>
									)
								}
							})}
						</Grid>
					</Stack>
				</Box>
				{sortedData.length > productCount ? <Button onClick={() => setProductCount(productCount + 4)}>Показать еще</Button> : ''}
			</Container>
		</Box>
	)
}
