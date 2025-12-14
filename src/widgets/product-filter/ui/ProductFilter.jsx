import { Box, Checkbox, Collapse, Divider, Drawer, FormControlLabel, IconButton, List, ListItem, ListSubheader, Paper, Stack, Typography } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { FilterList } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import { useState, useCallback, useMemo, memo } from 'react'
import { DATA } from 'shared/configs/data'
import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'
import { useFilterSidebarStore } from 'app/providers/store-provider/StoreProvider'
import { initialFilter } from 'shared/configs/filter'

// Мемоизированный компонент для отрисовки контента фильтра
const FilterContent = memo(
	({ filter, onBrandToggle, onTypeToggle, onFilterChange, onPriceChange, onBooleanChange, onApply, onReset, isBrandOpen, isTypeOpen, uniqueBrands, uniqueType }) => {
		// Обработчики для полей цены с useCallback
		const handleMinPriceChange = useCallback(
			e => {
				onPriceChange(Number(e.target.value) || 0, filter.price[1])
			},
			[onPriceChange, filter.price[1]]
		)

		const handleMaxPriceChange = useCallback(
			e => {
				onPriceChange(filter.price[0], Number(e.target.value) || 0)
			},
			[onPriceChange, filter.price[0]]
		)

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
								value={filter.price[0]}
								onChange={handleMinPriceChange}
								key='price-from'
							/>
							<Input
								id='priceTo'
								size='small'
								name='priceTo'
								label='До'
								type='number'
								placeholder='10000'
								value={filter.price[1]}
								onChange={handleMaxPriceChange}
								key='price-to'
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
											onChange={onBooleanChange}
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
							onClick={onBrandToggle}
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
											onChange={onFilterChange}
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
							onClick={onTypeToggle}
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
											onChange={onFilterChange}
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
							onClick={onApply}
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
)

export function ProductFilter({ category }) {
	const [isBrandOpen, setIsBrandOpen] = useState(false)
	const [isTypeOpen, setIsTypeOpen] = useState(false)
	const [filter, setFilter] = useState(initialFilter)

	const filterSidebar = useFilterSidebarStore(state => state.filterSidebar)
	const closeFilterSidebar = useFilterSidebarStore(state => state.closeFilterSidebar)

	// Мемоизация данных
	const data = useMemo(() => DATA.filter(item => item.category === capitalizeFirstLetter(category)), [category])

	const uniqueBrands = useMemo(() => [...new Set(data.map(item => item.brand))], [data])
	const uniqueType = useMemo(() => [...new Set(data.map(item => item.features.type))], [data])

	// Мемоизация обработчиков с useCallback
	const handleChange = useCallback(
		e => {
			const currentIndex = filter[e.target.id].indexOf(e.target.value)
			const newFilter = [...filter[e.target.id]]

			if (currentIndex === -1) {
				newFilter.push(e.target.value)
			} else {
				newFilter.splice(currentIndex, 1)
			}

			setFilter(prev => ({
				...prev,
				[e.target.id]: newFilter,
			}))
		},
		[filter]
	)

	const handlePriceChange = useCallback((min, max) => {
		setFilter(prev => ({
			...prev,
			price: [min, max],
		}))
	}, [])

	const handleBooleanChange = useCallback(e => {
		setFilter(prev => ({
			...prev,
			[e.target.id]: e.target.checked,
		}))
	}, [])

	const handleBrandToggle = useCallback(() => {
		setIsBrandOpen(prev => !prev)
	}, [])

	const handleTypeToggle = useCallback(() => {
		setIsTypeOpen(prev => !prev)
	}, [])

	const onSubmit = useCallback(() => {
		console.log(filter)
	}, [filter])

	const onReset = useCallback(() => {
		setFilter(initialFilter)
	}, [])

	const MobileFilterSidebar = useMemo(
		() => (
			<Drawer
				open={filterSidebar}
				onClose={closeFilterSidebar}
				anchor='right'
				key='mobile-filter'
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
					<FilterContent
						filter={filter}
						onBrandToggle={handleBrandToggle}
						onTypeToggle={handleTypeToggle}
						onFilterChange={handleChange}
						onPriceChange={handlePriceChange}
						onBooleanChange={handleBooleanChange}
						onApply={onSubmit}
						onReset={onReset}
						isBrandOpen={isBrandOpen}
						isTypeOpen={isTypeOpen}
						uniqueBrands={uniqueBrands}
						uniqueType={uniqueType}
					/>
				</Box>
			</Drawer>
		),
		[
			filterSidebar,
			closeFilterSidebar,
			filter,
			isBrandOpen,
			isTypeOpen,
			uniqueBrands,
			uniqueType,
			handleBrandToggle,
			handleTypeToggle,
			handleChange,
			handlePriceChange,
			handleBooleanChange,
			onSubmit,
			onReset,
		]
	)

	const DesktopFilter = useMemo(
		() => (
			<Box
				component={Paper}
				sx={{ width: '100%', maxWidth: 280, display: { xs: 'none', md: 'flex' } }}
				key='desktop-filter'
			>
				<FilterContent
					filter={filter}
					onBrandToggle={handleBrandToggle}
					onTypeToggle={handleTypeToggle}
					onFilterChange={handleChange}
					onPriceChange={handlePriceChange}
					onBooleanChange={handleBooleanChange}
					onApply={onSubmit}
					onReset={onReset}
					isBrandOpen={isBrandOpen}
					isTypeOpen={isTypeOpen}
					uniqueBrands={uniqueBrands}
					uniqueType={uniqueType}
				/>
			</Box>
		),
		[filter, isBrandOpen, isTypeOpen, uniqueBrands, uniqueType, handleBrandToggle, handleTypeToggle, handleChange, handlePriceChange, handleBooleanChange, onSubmit, onReset]
	)

	return (
		<>
			{MobileFilterSidebar}
			{DesktopFilter}
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
