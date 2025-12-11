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
import { useForm } from 'react-hook-form'
import { compareObjects } from 'shared/libs/compareObjects'
import { initialFilter } from 'shared/configs/filter'

function BrandsList(data) {
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
					Бренд {isOpen ? <ExpandLess /> : <ExpandMore />}
				</ListSubheader>
			}
		>
			<Collapse
				in={isOpen}
				timeout='auto'
			>
				{data.sort().map(item => (
					<ListItem key={item.name}>
						<FormControlLabel
							control={
								<Checkbox
									id='brand'
									value={item.name}
								/>
							}
							label={item.name}
							sx={{ width: '100%' }}
						/>
					</ListItem>
				))}
			</Collapse>
		</List>
	)
}

function TypesList(data) {
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
					Тип {isOpen ? <ExpandLess /> : <ExpandMore />}
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
									id='type'
									value={item}
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
	const filterSidebar = useFilterSidebarStore(state => state.filterSidebar)
	const closeFilterSidebar = useFilterSidebarStore(state => state.closeFilterSidebar)

	const data = DATA.filter(item => item.category === capitalizeFirstLetter(category))
	const uniqueBrands = Object.entries(
		data.reduce((acc, item) => {
			acc[item.brand] = (acc[item.brand] || 0) + 1
			return acc
		}, {})
	).map(([name, count]) => ({ name, count }))
	const uniqueType = [...new Set(data.map(item => item.features.type))]

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
							size='small'
							name='priceFrom'
							label='От'
							type='number'
							placeholder='0'
						/>
						<Input
							size='small'
							name='priceTo'
							label='До'
							type='number'
							placeholder='10000'
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
							/>
						}
						label='В наличии'
						sx={{ width: '100%' }}
					/>
				</ListItem>
			</List>
			<Divider />
			{BrandsList(uniqueBrands)}
			<Divider />
			{TypesList(uniqueType)}
			<List>
				<ListItem>
					<Button fullWidth>Применить</Button>
				</ListItem>
				<ListItem>
					<Button
						fullWidth
						variant='text'
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
