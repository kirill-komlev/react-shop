import { Box, Checkbox, Collapse, Divider, FormControlLabel, List, ListItem, ListSubheader, Paper, Stack, Typography } from '@mui/material'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import { useState } from 'react'
import { DATA } from 'shared/configs/data'
import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { Input } from 'shared/ui/Input'
import { Button } from 'shared/ui/Button'
import { initialFilter } from 'shared/configs/filter'

export function ProductFilter({ category, filter, setFilter }) {
	const [open, setOpen] = useState({ brands: false, type: false })

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

	// Получение данных с определенной категорией
	let data = DATA.filter(item => item.category === capitalizeFirstLetter(category))

	let uniqueBrands = Object.entries(
		data.reduce((acc, item) => {
			acc[item.brand] = (acc[item.brand] || 0) + 1
			return acc
		}, {})
	).map(([name, count]) => ({ name, count }))

	let uniqueType = [...new Set(data.map(item => item.features.type))]

	return (
		<Box
			component={Paper}
			sx={{ width: '100%', maxWidth: 360, display: { sm: 'flex' } }}
		>
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
								size='small'
								id='price'
								name='priceFrom'
								label='От'
								type='number'
								placeholder='0'
								onChange={e => handlePriceChange(Number(e.target.value), filter.price[1])}
							/>
							<Input
								size='small'
								id='price'
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
				<List>
					<ListItem>
						<FormControlLabel
							control={
								<Checkbox
									id='rating'
									name='isRatingAbove4'
									onChange={handleBooleanChange}
									checked={filter.isRatingAbove4}
									inputProps={{ 'aria-label': 'controlled' }}
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
									id='discount'
									name='isDiscount'
									onChange={handleBooleanChange}
									checked={filter.isDiscount}
									inputProps={{ 'aria-label': 'controlled' }}
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
									id='inStock'
									name='isInStock'
									onChange={handleBooleanChange}
									checked={filter.isInStock}
									inputProps={{ 'aria-label': 'controlled' }}
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
						{uniqueBrands.sort().map((item, index) => (
							<ListItem key={index}>
								<FormControlLabel
									control={
										<Checkbox
											id='brand'
											name={item.name}
											onChange={handleChange}
											checked={filter.brand.includes(item.name)}
											inputProps={{ 'aria-label': 'controlled' }}
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
						{uniqueType.sort().map((item, index) => (
							<ListItem key={index}>
								<FormControlLabel
									control={
										<Checkbox
											id='type'
											name={item}
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
				<List>
					<ListItem>
						<Button
							fullWidth
							disabled={JSON.stringify(filter) == JSON.stringify(initialFilter)}
							onClick={() => setFilter(initialFilter)}
						>
							Очистить фильтр
						</Button>
					</ListItem>
				</List>
			</nav>
		</Box>
	)
}
