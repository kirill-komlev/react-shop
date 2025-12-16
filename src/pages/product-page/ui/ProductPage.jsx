import { Box, Breadcrumbs, Container, Stack, Typography } from '@mui/material'
import { useParams } from 'react-router'
import { CATEGORIES_FULL } from 'shared/configs/categories'
import { DATA } from 'shared/configs/data'
import { PAGE_CONFIG } from 'shared/configs/page.config'
import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { findKeyByValue } from 'shared/libs/findKeyByValue'
import { Link } from 'shared/ui/Link'

export function ProductPage() {
	const product = useParams()
	const data = DATA[product.id]
	return (
		<Box pt={4}>
			<Container maxWidth='xl'>
				<Stack gap={2}>
					<Breadcrumbs>
						<Link to={PAGE_CONFIG.home}>Главная</Link>
						<Link to={PAGE_CONFIG.catalog}>Каталог</Link>
						<Link to={PAGE_CONFIG.catalog + '/' + findKeyByValue(data.category)}>{data.category}</Link>
						<Typography color='initial'>{data.name}</Typography>
					</Breadcrumbs>
				</Stack>
				<Box py={2}>
					<Stack
						direction='row'
						gap={2}
						justifyContent='space-between'
					>
						<Box
							component='img'
							src={data.image}
							width='500px'
						/>
						<Box>
							<Typography variant='h4'>{data.name}</Typography>
							<Typography variant='h6'>{data.price}</Typography>
						</Box>
					</Stack>
				</Box>
			</Container>
		</Box>
	)
}
