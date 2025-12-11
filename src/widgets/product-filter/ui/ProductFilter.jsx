import { Box, Checkbox, Collapse, Divider, Drawer, FormControlLabel, IconButton, List, ListItem, ListSubheader, Paper, Slider, Stack, Typography } from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { FilterList } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'

import { useEffect, useState } from 'react'
import { DATA } from 'shared/configs/data'
import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'
import { useFilterSidebarStore } from 'app/providers/store-provider/StoreProvider'
import { useURLFilter } from 'shared/hooks/useURLFilter'
import { useForm } from 'react-hook-form'
import { compareObjects } from 'shared/libs/compareObjects'
import { initialFilter } from 'shared/configs/filter'

export function ProductFilter({ category }) {
	const [open, setOpen] = useState({ brand: false, type: false })
	const { params, updateParams } = useURLFilter()
	const { register, handleSubmit, reset, watch, setValue } = useForm({
		defaultValues: initialFilter,
	})

	// Восстанавливаем значения из URL при загрузке
	useEffect(() => {
		const restoredFilter = {
			brand: params.brand || initialFilter.brand,
			type: params.type || initialFilter.type,
			price: params.price || initialFilter.price,
			isRatingAbove4: params.isRatingAbove4 || initialFilter.isRatingAbove4,
			isDiscount: params.isDiscount || initialFilter.isDiscount,
			isInStock: params.isInStock || initialFilter.isInStock,
		}

		reset(restoredFilter)
	}, [params, reset])

	const filterSidebar = useFilterSidebarStore(state => state.filterSidebar)
	const closeFilterSidebar = useFilterSidebarStore(state => state.closeFilterSidebar)

	// Получение данных с определенной категорией
	let data = DATA.filter(item => item.category === capitalizeFirstLetter(category))

	let uniqueBrands = Object.entries(
		data.reduce((acc, item) => {
			acc[item.brand] = (acc[item.brand] || 0) + 1
			return acc
		}, {})
	).map(([name, count]) => ({ name, count }))

	let uniqueType = [...new Set(data.map(item => item.features.type))]

	const onSubmit = data => {
		// Форматируем price для URL
		const urlParams = {
			...data,
			price: data.price.join('-'), // Сохраняем как "0-99999"
		}

		updateParams(urlParams)
	}

	const handleReset = () => {
		reset(initialFilter)
		updateParams({})
	}

	const handlePriceChange = (index, value) => {
		const currentPrice = watch('price')
		const newPrice = [...currentPrice]
		const numValue = Number(value) || 0
		newPrice[index] = numValue
		setValue('price', newPrice)
	}

	console.log('render')

	const DrawerContent = () => (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
		>
			<List
				subheader={
					<ListSubheader
						component='div'
						id='nested-list-subheader'
					>
						Цена
					</ListSubheader>
				}
			>
				<ListItem>
					<Stack
						direction='row'
						spacing={2}
					>
						<Input
							size='small'
							name='priceFrom'
							label='От'
							type='number'
							placeholder='0'
							value={watch('price')[0]}
							onChange={e => handlePriceChange(0, e.target.value)}
							// value={localFilter.price[0]}
							// onChange={handlePriceFromChange}
						/>
						<Input
							size='small'
							name='priceTo'
							label='До'
							type='number'
							placeholder='10000'
							value={watch('price')[1]}
							onChange={e => handlePriceChange(1, e.target.value)}
							// value={localFilter.price[1]}
							// onChange={handlePriceToChange}
						/>
					</Stack>
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem>
					<FormControlLabel
						control={
							<Checkbox
								id='bool'
								name='isRatingAbove4'
								{...register('isRatingAbove4')}
								// onChange={handleBooleanChange}
								// checked={localFilter.isRatingAbove4}
							/>
						}
						label='Рейтинг 4 и выше'
						sx={{ width: '100%' }}
					/>
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem>
					<FormControlLabel
						control={
							<Checkbox
								id='bool'
								name='isDiscount'
								{...register('isDiscount')}
								// onChange={handleBooleanChange}
								// checked={localFilter.isDiscount}
							/>
						}
						label='По скидке'
						sx={{ width: '100%' }}
					/>
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem>
					<FormControlLabel
						control={
							<Checkbox
								id='bool'
								name='isInStock'
								{...register('isInStock')}
								// onChange={handleBooleanChange}
							/>
						}
						label='В наличии'
						sx={{ width: '100%' }}
					/>
				</ListItem>
			</List>
			<Divider />
			<List
				subheader={
					<ListSubheader
						component='div'
						id='nested-list-subheader'
						sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
						onClick={() => setOpen({ ...open, brand: !open.brand })}
					>
						Бренд {open.brand ? <ExpandLess /> : <ExpandMore />}
					</ListSubheader>
				}
			>
				<Collapse
					in={open.brand}
					timeout='auto'
					unmountOnExit
				>
					{uniqueBrands.sort().map(item => (
						<ListItem key={item.name}>
							<FormControlLabel
								control={
									<Checkbox
										id='brand'
										value={item.name}
										{...register('brand')}
										// onChange={handleChange}
										// checked={localFilter.brand.includes(item.name)}
									/>
								}
								label={
									<Typography variant='body1'>{item.name}</Typography>
									// <Stack
									// 	direction='row'
									// 	spacing={0.5}
									// >
									// 	<Typography variant='body1'>{item.name}</Typography>
									// 	<Typography
									// 		variant='caption'
									// 		color='textSecondary'
									// 	>
									// 		({item.count})
									// 	</Typography>
									// </Stack>
								}
								sx={{ width: '100%' }}
							/>
						</ListItem>
					))}
				</Collapse>
			</List>
			<Divider />
			<List
				subheader={
					<ListSubheader
						component='div'
						id='nested-list-subheader'
						sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
						onClick={() => setOpen({ ...open, type: !open.type })}
					>
						Тип {open.type ? <ExpandLess /> : <ExpandMore />}
					</ListSubheader>
				}
			>
				<Collapse
					in={open.type}
					timeout='auto'
					unmountOnExit
				>
					{uniqueType.sort().map(item => (
						<ListItem key={item}>
							<FormControlLabel
								control={
									<Checkbox
										id='type'
										value={item}
										{...register('type')}
										// onChange={handleChange}
										// checked={localFilter.type.includes(item)}
									/>
								}
								label={item}
								sx={{ width: '100%' }}
							/>
						</ListItem>
					))}
				</Collapse>
			</List>
			<List>
				<ListItem>
					<Button
						fullWidth
						// disabled={JSON.stringify(localFilter) == JSON.stringify(activeFilter)}
						type='submit'

						// onClick={applyFiltersToURL}
					>
						Применить
					</Button>
				</ListItem>
				<ListItem>
					<Button
						fullWidth
						variant='text'
						// onClick={resetFilters}
					>
						Очистить
					</Button>
				</ListItem>
			</List>
		</Box>
	)

	const MobileFilterSidebar = () => (
		<Drawer
			open={filterSidebar}
			onClose={closeFilterSidebar}
			anchor='right'
		>
			<Box py={2}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					px={2}
				>
					<Typography variant='h4'>Фильтр</Typography>
					<IconButton onClick={closeFilterSidebar}>
						<CloseIcon />
					</IconButton>
				</Stack>
				<DrawerContent />
			</Box>
		</Drawer>
	)

	const DesktopFilter = () => (
		<Box
			component={Paper}
			sx={{ width: '100%', maxWidth: 280, display: { xs: 'none', md: 'flex' } }}
		>
			<DrawerContent />
		</Box>
	)

	return (
		<>
			<MobileFilterSidebar />
			<DesktopFilter />
		</>
	)
}

export function MobileFilterButton() {
	const openFilterSidebar = useFilterSidebarStore(state => state.openFilterSidebar)
	return (
		<IconButton onClick={openFilterSidebar}>
			<FilterList />
		</IconButton>
	)
}
