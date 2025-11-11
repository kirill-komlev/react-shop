import { IconButton, Stack } from '@mui/material'

import AppsIcon from '@mui/icons-material/Apps'
import ReorderIcon from '@mui/icons-material/Reorder'

import { useProductDirection } from 'app/providers/store-provider/StoreProvider'

export function ProductDirection() {
	const productDirection = useProductDirection(state => state.productDirection)
	const setProductVertical = useProductDirection(state => state.setProductVertical)
	const setProductHorizontal = useProductDirection(state => state.setProductHorizontal)

	return (
		<Stack direction='row'>
			<IconButton onClick={setProductVertical}>
				<AppsIcon color={productDirection == 'vertical' ? 'primary' : 'disabled'} />
			</IconButton>

			<IconButton onClick={setProductHorizontal}>
				<ReorderIcon color={productDirection == 'horizontal' ? 'primary' : 'disabled'} />
			</IconButton>
		</Stack>
	)
}
