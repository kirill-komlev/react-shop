import { FormControl, MenuItem, Select } from '@mui/material'

export function ProductSort({ value, onChange }) {
	return (
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
				<MenuItem value='discountValue, asc'>сначала недорогие</MenuItem>
				<MenuItem value='discountValue, desc'>сначала дорогие</MenuItem>
				<MenuItem value='rating, desc'>с лучшей оценкой</MenuItem>
			</Select>
		</FormControl>
	)
}
