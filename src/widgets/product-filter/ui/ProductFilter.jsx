import { Box, Checkbox, Collapse, Divider, Drawer, FormControlLabel, IconButton, List, ListItem, ListSubheader, Paper, Slider, Stack, Typography } from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { FilterList } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'

import { useEffect, useMemo, useRef, useState } from 'react'
import { DATA } from 'shared/configs/data'
import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'
import { useFilterSidebarStore } from 'app/providers/store-provider/StoreProvider'
import { useURLFilter } from 'shared/hooks/useURLFilter'
import { Controller, useForm } from 'react-hook-form'
import { compareObjects } from 'shared/libs/compareObjects'
import { initialFilter } from 'shared/configs/filter'

function DataList(data, type, name, props) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<List
			subheader={
				<ListSubheader
					component='div'
					id='nested-list-subheader'
					sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
					onClick={() => setIsOpen(!isOpen)}
				>
					{name} {isOpen ? <ExpandLess /> : <ExpandMore />}
				</ListSubheader>
			}
		>
			<Collapse
				in={isOpen}
				timeout='auto'
			>
				{data.sort().map(item => (
					<ListItem key={item}>
						<FormControlLabel
							control={
								<Checkbox
									id={type}
									value={item}
									{...props}
								/>
							}
							label={item}
							sx={{ width: '100%' }}
						/>
					</ListItem>
				))}
			</Collapse>
		</List>
	)
}

export function ProductFilter({ category }) {
	const { control, handleSubmit, register, reset } = useForm({
		defaultValues: initialFilter,
	})

	const filterSidebar = useFilterSidebarStore(state => state.filterSidebar)
	const closeFilterSidebar = useFilterSidebarStore(state => state.closeFilterSidebar)

	const data = DATA.filter(item => item.category === capitalizeFirstLetter(category))
	// const uniqueBrands = Object.entries(
	// 	data.reduce((acc, item) => {
	// 		acc[item.brand] = (acc[item.brand] || 0) + 1
	// 		return acc
	// 	}, {})
	// ).map(([name, count]) => ({ name, count }))
	const uniqueBrands = [...new Set(data.map(item => item.brand))]
	const uniqueType = [...new Set(data.map(item => item.features.type))]

	const onSubmit = data => {
		localStorage.setItem('filter', JSON.stringify(compareObjects(initialFilter, data)))
	}

	const onReset = () => {
		reset()
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
					<Controller
						name='price' // Изменили на price
						control={control}
						render={({ field }) => (
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
									value={field.value[0]} // Первый элемент массива - "от"
									onChange={e => {
										// Обновляем только первый элемент массива, второй оставляем без изменений
										field.onChange([Number(e.target.value), field.value[1]])
									}}
								/>
								<Input
									id='priceTo'
									size='small'
									name='priceTo'
									label='До'
									type='number'
									placeholder='10000'
									// value={} // Второй элемент массива - "до"
									onChange={e => {
										// Обновляем только второй элемент массива, первый оставляем без изменений
										field.onChange([field.value[0], Number(e.target.value)])
									}}
								/>
							</Stack>
						)}
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
								{...register('isRatingAbove4')}
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
							/>
						}
						label='В наличии'
						sx={{ width: '100%' }}
					/>
				</ListItem>
			</List>
			<Divider />
			{DataList(uniqueBrands, 'brand', 'Бренд', { ...register('brand') })}
			<Divider />
			{DataList(uniqueType, 'type', 'Тип', { ...register('type') })}
			<List>
				<ListItem>
					<Button
						fullWidth
						type='submit'
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
