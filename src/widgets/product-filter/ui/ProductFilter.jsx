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
import { useFilterSidebarStore } from 'app/providers/store-provider/StoreProvider'
import { useURLFilter } from 'shared/hooks/useURLFilter'

export function ProductFilter({ category }) {
	const [open, setOpen] = useState({ brands: false, type: false })
	const { localFilter, activeFilter, handleChange, handlePriceChange, handleBooleanChange, resetFilters, applyFiltersToURL } = useURLFilter()

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

	// Обработчики для полей цены
	const handlePriceFromChange = e => {
		const value = Number(e.target.value) || 0
		handlePriceChange(value, localFilter.price[1])
	}

	const handlePriceToChange = e => {
		const value = Number(e.target.value) || 0
		handlePriceChange(localFilter.price[0], value)
	}

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
					<Stack
						direction='row'
						spacing={2}
					>
						<Input
							key={`price-from-${localFilter.price[0]}`}
							size='small'
							name='priceFrom'
							label='От'
							type='number'
							placeholder='0'
							value={localFilter.price[0]}
							onChange={handlePriceFromChange}
						/>
						<Input
							key={`price-to-${localFilter.price[1]}`}
							size='small'
							name='priceTo'
							label='До'
							type='number'
							placeholder='10000'
							value={localFilter.price[1]}
							onChange={handlePriceToChange}
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
								onChange={handleBooleanChange}
								checked={localFilter.isRatingAbove4}
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
								onChange={handleBooleanChange}
								checked={localFilter.isDiscount}
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
								onChange={handleBooleanChange}
								checked={localFilter.isInStock}
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
										onChange={handleChange}
										checked={localFilter.brand.includes(item.name)}
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
										onChange={handleChange}
										checked={localFilter.type.includes(item)}
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
						disabled={JSON.stringify(localFilter) == JSON.stringify(activeFilter)}
						onClick={applyFiltersToURL}
					>
						Применить
					</Button>
				</ListItem>
				<ListItem>
					<Button
						fullWidth
						variant='text'
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
