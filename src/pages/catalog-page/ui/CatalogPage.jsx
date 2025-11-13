import { Box, Breadcrumbs, Container, Stack, Typography, Grid, Paper } from '@mui/material'
import { CATEGORIES_FULL } from 'shared/configs/categories'

import { PAGE_CONFIG } from 'shared/configs/page.config'

import { Link } from 'shared/ui/Link'
import { CatalogItem } from 'widgets/catalog/ui/CatalogItem'

export function CatalogPage() {
	return (
		<Box mt={12}>
			<Container maxWidth='xl'>
				<Stack gap={2}>
					<Breadcrumbs>
						<Link to={PAGE_CONFIG.home}>Главная</Link>
						<Typography color='initial'>Каталог</Typography>
					</Breadcrumbs>
					<Typography variant='h4'>Каталог товаров</Typography>
					<Grid
						container
						spacing={4}
					>
						{Object.values(CATEGORIES_FULL).map((item, index) => (
							<Grid
								size={3}
								key={index}
							>
								<CatalogItem index={index} />
							</Grid>
						))}
					</Grid>
				</Stack>
			</Container>
		</Box>
	)
}
