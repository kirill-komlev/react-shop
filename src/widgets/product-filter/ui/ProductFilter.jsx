import { Box, Checkbox, Collapse, Divider, Drawer, FormControlLabel, IconButton, List, ListItem, ListSubheader, Paper, Stack, Typography } from '@mui/material'

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
import { initialFilter } from 'shared/configs/filter'

export function ProductFilter({ category }) {
	const [isBrandOpen, setIsBrandOpen] = useState(false)
	const [isTypeOpen, setIsTypeOpen] = useState(false)
	const [filter, setFilter] = useState(initialFilter)

	const filterSidebar = useFilterSidebarStore(state => state.filterSidebar)
	const closeFilterSidebar = useFilterSidebarStore(state => state.closeFilterSidebar)

	const data = DATA.filter(item => item.category === capitalizeFirstLetter(category))

	const uniqueBrands = [...new Set(data.map(item => item.brand))]
	const uniqueType = [...new Set(data.map(item => item.features.type))]

	const handleChange = e => {
		const currentIndex = filter[e.target.id].indexOf(e.target.name)
		const newFilter = [...filter[e.target.id]]

		if (currentIndex === -1) {
			newFilter.push(e.target.name)
		} else {
			newFilter.splice(currentIndex, 1)
		}

		setFilter({
			...filter,
			[e.target.id]: newFilter,
		})
	}

	const handlePriceChange = (min, max) => {
		if (max === 0 || min > max) {
			max = 999999
		}
		setFilter(prev => ({
			...prev,
			price: [min, max],
		}))
	}

	const handleBooleanChange = e => {
		setFilter({
			...filter,
			[e.target.name]: e.target.checked,
		})
	}

	const onSubmit = () => {
		console.log(filter)
	}

	const onReset = () => {
		setFilter(initialFilter)
	}

	console.log('render')

	const DrawerContent = () => (
		<Box>
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
							id='priceFrom'
							size='small'
							name='priceFrom'
							label='От'
							type='number'
							placeholder='0'
							onChange={e => handlePriceChange(Number(e.target.value), filter.price[1])}
						/>
						<Input
							id='priceTo'
							size='small'
							name='priceTo'
							label='До'
							type='number'
							placeholder='10000'
							onChange={e => handlePriceChange(filter.price[0], Number(e.target.value))}
						/>
					</Stack>
				</ListItem>
			</List>
			<Divider />
			{[
				{
					id: 'isRatingAbove4',
					label: 'Рейтинг 4 и выше',
				},
				{
					id: 'isDiscount',
					label: 'По скидке',
				},
				{
					id: 'isInStock',
					label: 'В наличии',
				},
			].map((item, index) => (
				<div key={index}>
					<List>
						<ListItem>
							<FormControlLabel
								control={
									<Checkbox
										id={item.id}
										checked={filter[item.id]}
										onChange={handleBooleanChange}
									/>
								}
								label={item.label}
								sx={{ width: '100%' }}
							/>
						</ListItem>
					</List>
					<Divider />
				</div>
			))}

			<List
				subheader={
					<ListSubheader
						component='div'
						id='nested-list-subheader'
						sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
						onClick={() => setIsBrandOpen(!isBrandOpen)}
					>
						Бренд {isBrandOpen ? <ExpandLess /> : <ExpandMore />}
					</ListSubheader>
				}
			>
				<Collapse
					in={isBrandOpen}
					timeout='auto'
				>
					{uniqueBrands.sort().map(item => (
						<ListItem key={item}>
							<FormControlLabel
								control={
									<Checkbox
										id='brand'
										value={item}
										checked={filter.brand.includes(item)}
										onChange={handleChange}
									/>
								}
								label={item}
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
						onClick={() => setIsTypeOpen(!isTypeOpen)}
					>
						Тип {isTypeOpen ? <ExpandLess /> : <ExpandMore />}
					</ListSubheader>
				}
			>
				<Collapse
					in={isTypeOpen}
					timeout='auto'
				>
					{uniqueType.sort().map(item => (
						<ListItem key={item}>
							<FormControlLabel
								control={
									<Checkbox
										id='type'
										value={item}
										checked={filter.type.includes(item)}
										onChange={handleChange}
									/>
								}
								label={item}
								sx={{ width: '100%' }}
							/>
						</ListItem>
					))}
				</Collapse>
			</List>
			<Divider />
			<List>
				<ListItem>
					<Button
						fullWidth
						onClick={onSubmit}
					>
						Применить
					</Button>
				</ListItem>
				<ListItem>
					<Button
						fullWidth
						variant='text'
						onClick={onReset}
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
