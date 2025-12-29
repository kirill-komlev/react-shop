import { Box, Container, Stack, Typography, Grid } from '@mui/material'
import { useFavoriteStore } from 'app/providers/store-provider/StoreProvider'
import { DATA } from 'shared/configs/data'
import { ProductCard } from 'widgets/product-card/ui/ProductCard'

export function FavoritePage() {
	const favorite = useFavoriteStore(state => state.favorite)

	const productsInFavorite = DATA.filter(item => {
		if (favorite.indexOf(item.id) != -1) return true

		return false
	})

	return (
		<Box pt={4}>
			<Container maxWidth='xl'>
				<Stack
					// direction='row'
					gap={2}
					sx={{ mb: 4 }}
				>
					<Typography variant='h4'>Избранное</Typography>
					<Grid
						container
						spacing={2}
					>
						{productsInFavorite.map(item => (
							<Grid
								size={{ xs: 12, sm: 6, md: 4 }}
								key={item.id}
							>
								<ProductCard data={item} />
							</Grid>
						))}
					</Grid>
				</Stack>
			</Container>
		</Box>
	)
}
