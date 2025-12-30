import { useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { Box, Breadcrumbs, Container, Grid, Paper, Stack, Typography } from '@mui/material'

import { ProductCard } from 'widgets/product-card/ui/ProductCard'
import { ProductFilter, MobileFilterButton } from 'widgets/product-filter/ui/ProductFilter'
import { ProductSort } from 'widgets/product-sort/ui/ProductSort'
import { ProductDirection } from 'widgets/product-direction/ui/ProductDirection'

import { Button } from 'shared/ui/Button'

import { CATEGORIES_FULL } from 'shared/configs/categories'

import { sortBy } from 'shared/libs/sortBy'
import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'

import { useProductDirection } from 'app/providers/store-provider/StoreProvider'
import { PAGE_CONFIG } from 'shared/configs/page.config'
import { Link } from 'shared/ui/Link'
import { useURLSort } from 'shared/hooks/useURLSort'
import { useURLFilter } from 'shared/hooks/useURLFilter'
import { useData } from 'shared/hooks/useData'

export function CatalogCategoryPage() {
	const productDirection = useProductDirection(state => state.productDirection)
	const { sortValue, updateSort } = useURLSort()
	const { currentFilter } = useURLFilter()

	const [productCount, setProductCount] = useState(20)

	// Фильтр по категории
	let { category } = useParams()

	const { items } = useData()
	const data = items?.filter(item => item.category === capitalizeFirstLetter(CATEGORIES_FULL[category].ru[1]))

	const filteredData = useMemo(() => {
		return data?.filter(product => {
			// Фильтр по бренду
			if (currentFilter.brand.length > 0 && !currentFilter.brand.includes(product.brand)) {
				return false
			}

			// Фильтр по типу
			if (currentFilter.type.length > 0 && !currentFilter.type.includes(product.features.type)) {
				return false
			}

			// Фильтр по цене
			// if (currentFilter.price !== initialFilter.price) {
			// 	return false
			// } else {
			// 	if (product.price < currentFilter.price[0] || product.price > currentFilter.price[1]) {
			// 		return false
			// 	}
			// }

			// Фильтр по рейтингу
			if (currentFilter.isRatingAbove4 && product.rating < 4) {
				return false
			}

			// Фильтр по скидке
			if (currentFilter.isDiscount && product.discount === 0) {
				return false
			}

			// Фильтр по наличию
			if (currentFilter.isInStock && !product.inStock) {
				return false
			}

			return true
		})
	}, [currentFilter, data])

	const sortedData = useMemo(() => {
		return sortBy(filteredData, sortValue)
	}, [filteredData, sortValue])

	const handleChangeSort = event => {
		updateSort(event.target.value)
	}

	return (
		<Box pt={4}>
			<Container maxWidth='xl'>
				<Stack gap={2}>
					<Breadcrumbs>
						<Link to={PAGE_CONFIG.home}>Главная</Link>
						<Link to={PAGE_CONFIG.catalog}>Каталог</Link>
						<Typography color='initial'>{capitalizeFirstLetter(CATEGORIES_FULL[category].ru[1])}</Typography>
					</Breadcrumbs>
					<Typography
						variant='h4'
						width='100%'
					>
						{/* {capitalizeFirstLetter(CATEGORIES_FULL[category].ru[1])}: {filteredData.length} */}
					</Typography>
					<Box
						display='flex'
						alignItems='flex-start'
						width='100%'
						gap={4}
					>
						<ProductFilter category={capitalizeFirstLetter(CATEGORIES_FULL[category].ru[1])} />
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
									<ProductSort
										value={sortValue}
										onChange={handleChangeSort}
									/>
									<ProductDirection />
									<Box display={{ xs: 'block', md: 'none' }}>
										<MobileFilterButton />
									</Box>
								</Stack>
							</Paper>
							<Grid
								container
								spacing={2}
								width='100%'
								sx={{ mb: 4 }}
							>
								{sortedData?.slice(0, productCount)?.map(item => {
									if (productDirection == 'vertical')
										return (
											<Grid
												size={{ xs: 12, sm: 6, md: 4 }}
												key={item.id}
											>
												<ProductCard data={item} />
											</Grid>
										)
									else
										return (
											<Grid
												size={{ xs: 12, sm: 6, md: 12 }}
												key={item.id}
											>
												<Box sx={{ display: { xs: 'none', md: 'block' } }}>
													<ProductCard
														data={item}
														type='horizontal'
													/>
												</Box>

												<Box sx={{ display: { xs: 'block', md: 'none' } }}>
													<ProductCard data={item} />
												</Box>
											</Grid>
										)
								})}
							</Grid>
						</Stack>
					</Box>
					{sortedData.length > productCount ? <Button onClick={() => setProductCount(productCount + 4)}>Показать еще</Button> : ''}
				</Stack>
			</Container>
		</Box>
	)
}
