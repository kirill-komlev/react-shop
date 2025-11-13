import { Box, Paper, Stack, Typography } from '@mui/material'

import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { Link } from 'shared/ui/Link'

import { CATEGORIES_FULL } from 'shared/configs/categories'
import { PAGE_CONFIG } from 'shared/configs/page.config'

export function CatalogItem({ index }) {
	return (
		<Link to={PAGE_CONFIG.catalog + '/' + Object.values(CATEGORIES_FULL)[index].en[1]}>
			<Paper
				sx={{
					p: 2,
					'&:hover': {
						backgroundColor: 'primary.main',
						transition: '.2s',
					},
				}}
			>
				<Stack gap={2}>
					<Box
						component='img'
						src={Object.values(CATEGORIES_FULL)[index].img}
						mx={4}
						my={2}
					/>
					<Typography
						variant='h4'
						textAlign='center'
						gutterBottom
					>
						{capitalizeFirstLetter(Object.values(CATEGORIES_FULL)[index].ru[1])}
					</Typography>
				</Stack>
			</Paper>
		</Link>
	)
}
