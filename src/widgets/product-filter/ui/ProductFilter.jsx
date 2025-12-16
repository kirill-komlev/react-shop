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
import { useURLFilter } from 'shared/hooks/useURLFilter'

const DrawerContent = currentData => {
	const data = currentData.data

	const [isBrandOpen, setIsBrandOpen] = useState(false)
	const [isTypeOpen, setIsTypeOpen] = useState(false)

	const uniqueBrands = [...new Set(data.map(item => item.brand))]
	const uniqueType = [...new Set(data.map(item => item.features.type))]

	const {
		pendingFilter, // Предварительный фильтр (еще не применен)
		setPendingFilter, // Функция для изменения pendingFilter
		applyFilter, // Функция для применения фильтра (сохранения в URL)
		resetFilterInUrl, // Функция для сброса фильтра в URL
	} = useURLFilter()

	// Ваши существующие функции обработки
	const handleChange = e => {
		const currentIndex = pendingFilter[e.target.id].indexOf(e.target.value)
		const newFilter = [...pendingFilter[e.target.id]]

		if (currentIndex === -1) {
			newFilter.push(e.target.value)
		} else {
			newFilter.splice(currentIndex, 1)
		}

		setPendingFilter({
			...pendingFilter,
			[e.target.id]: newFilter,
		})
	}

	const handlePriceChange = (min, max) => {
		setPendingFilter({
			...pendingFilter,
			price: [min, max],
		})
	}

	const handleBooleanChange = e => {
		setPendingFilter({
			...pendingFilter,
			[e.target.id]: e.target.checked,
		})
	}

	const onSubmit = () => {
		applyFilter() // Сохраняем в URL
	}

	const onReset = () => {
		resetFilterInUrl()
	}

	return (
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
							value={pendingFilter.price[0] || ''}
							onChange={e => handlePriceChange(e.target.value, pendingFilter.price[1])}
						/>
						<Input
							id='priceTo'
							size='small'
							name='priceTo'
							label='До'
							type='number'
							placeholder='10000'
							value={pendingFilter.price[1] || ''}
							onChange={e => handlePriceChange(pendingFilter.price[0], e.target.value)}
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
										checked={pendingFilter[item.id]}
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
										checked={pendingFilter.brand.includes(item)}
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
										checked={pendingFilter.type.includes(item)}
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
}

export function ProductFilter({ category }) {
	const filterSidebar = useFilterSidebarStore(state => state.filterSidebar)
	const closeFilterSidebar = useFilterSidebarStore(state => state.closeFilterSidebar)

	const data = DATA.filter(item => item.category === capitalizeFirstLetter(category))

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
				<DrawerContent data={data} />
			</Box>
		</Drawer>
	)

	const DesktopFilter = () => (
		<Box
			component={Paper}
			sx={{ width: '100%', maxWidth: 280, display: { xs: 'none', md: 'flex' } }}
		>
			<DrawerContent data={data} />
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
