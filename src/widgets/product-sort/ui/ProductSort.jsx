import { FormControl, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Sort } from '@mui/icons-material'

export function ProductSort({ value, onChange }) {
	return (
		<>
			<Stack
				direction='row'
				spacing={1}
				alignItems='center'
			>
				<Sort sx={{ display: { xs: 'flex', md: 'none' } }} />
				<Typography
					variant='body1'
					sx={{ display: { xs: 'none', md: 'flex' } }}
				>
					Сортировка:
				</Typography>
				<FormControl
					variant='standard'
					sx={{ minWidth: 120 }}
				>
					<Select
						labelId='select-standard-label'
						id='select-standard'
						value={value}
						onChange={onChange}
					>
						<MenuItem value='id, asc'>по новизне</MenuItem>
						<MenuItem value='name, asc'>по имени</MenuItem>
						<MenuItem value='finalPrice, asc'>сначала недорогие</MenuItem>
						<MenuItem value='finalPrice, desc'>сначала дорогие</MenuItem>
						<MenuItem value='rating, desc'>с лучшей оценкой</MenuItem>
					</Select>
				</FormControl>
			</Stack>
		</>
	)
}
