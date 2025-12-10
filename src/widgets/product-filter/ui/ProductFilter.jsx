import { Box, Checkbox, Collapse, Divider, Drawer, FormControlLabel, IconButton, List, ListItem, ListSubheader, Paper, Slider, Stack, Typography } from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { FilterList } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'

import { useState } from 'react'
import { DATA } from 'shared/configs/data'
import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'
import { initialFilter } from 'shared/configs/filter'
import { useFilterSidebarStore } from 'app/providers/store-provider/StoreProvider'
// import { useURLFilter } from 'shared/hooks/useURLFilter'

export function ProductFilter({ category }) {
	const [open, setOpen] = useState({ brands: false, type: false })
	// const { filter, handleChange, handlePriceChange, handleBooleanChange, resetFilters } = useURLFilter()
	const [filter, setFilter] = useState(initialFilter)
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

	const handleFilterChange = e => {
		if (e.target.id === 'brand' || e.target.id === 'type') {
			const currentIndex = filter[e.target.id].indexOf(e.target.name)
			const newFilter = [...filter[e.target.id]]

			if (currentIndex === -1) {
				newFilter.push(e.target.name)
			} else {
				newFilter.splice(currentIndex, 1)
			}

			return setFilter({
				...filter,
				[e.target.id]: newFilter,
			})
		} else if (e.target.id === 'bool') {
			return setFilter({ ...filter, [e.target.name]: e.target.checked })
		} else if (e.target.id === 'price') {
			console.log(e.target)
			return setFilter({
				...filter,
				price: e.target.value,
			})
		}
		// else if (e.target.name === 'priceFrom' || e.target.name === 'priceTo') {
		// let [min, max] = filter.price

		// console.log(e.target)
		// console.log(e.target.name, Number(e.target.value))

		// if (e.target.name == 'priceFrom') [min, max] = [Number(e.target.value), filter.price[1]]
		// else if (e.target.name == 'priceTo') [min, max] = [filter.price[0], Number(e.target.value)]

		// if (max === 0 || min > max) {
		// 	max = 999999
		// }

		// console.log(min, max)

		// return setFilter({
		// 	...filter,
		// 	price: [min, max],
		// })

		// if (e.target.name == 'priceFrom') {
		// }

		// if (max === 0 || min > max) {
		// 	max = 999999
		// }

		// setFilter({
		// 	...filter,
		// 	price: [min, max],
		// })
		// }
	}

	const handleChange = (event, newValue) => {
		setFilter({
			...filter,
			price: newValue,
		})
	}

	function valuetext(value) {
		return `${value} P`
	}

	const resetFilters = () => {
		setFilter(initialFilter)
	}

	console.log(filter)

	const DrawerContent = () => (
		<nav>
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
					{/* <Stack
						direction='row'
						spacing={2}
					>
						<Input
							size='small'
							name='priceFrom'
							label='От'
							type='number'
							placeholder='0'
							// value={filter.price[0]}
							onChange={handleFilterChange}
						/>
						<Input
							size='small'
							name='priceTo'
							label='До'
							type='number'
							placeholder='10000'
							onChange={handleFilterChange}
						/>
					</Stack> */}
					<Slider
						getAriaLabel={() => 'Price range'}
						id='price'
						value={filter.price}
						onChange={handleChange}
						valueLabelDisplay='auto'
						getAriaValueText={valuetext}
						sx={{ mt: 4 }}
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
								name='isRatingAbove4'
								onChange={handleFilterChange}
								checked={filter.isRatingAbove4}
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
								onChange={handleFilterChange}
								checked={filter.isDiscount}
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
								onChange={handleFilterChange}
								checked={filter.isInStock}
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
						onClick={() => setOpen({ ...open, brands: !open.brands })}
					>
						Бренд {open.brands ? <ExpandLess /> : <ExpandMore />}
					</ListSubheader>
				}
			>
				<Collapse
					in={open.brands}
					timeout='auto'
					unmountOnExit
				>
					{uniqueBrands.sort().map(item => (
						<ListItem key={item.name}>
							<FormControlLabel
								control={
									<Checkbox
										id='brand'
										name={item.name}
										onChange={handleFilterChange}
										checked={filter.brand.includes(item.name)}
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
										name={item}
										onChange={handleFilterChange}
										checked={filter.type.includes(item)}
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
						disabled={JSON.stringify(filter) == JSON.stringify(initialFilter)}
						// onClick={resetFilters}
					>
						Применить
					</Button>
				</ListItem>
				<ListItem>
					<Button
						fullWidth
						variant='text'
						disabled={JSON.stringify(filter) == JSON.stringify(initialFilter)}
						onClick={resetFilters}
					>
						Очистить
					</Button>
				</ListItem>
			</List>
		</nav>
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
