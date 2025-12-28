import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { lightBlue, blue } from '@mui/material/colors'

import { ProductCard } from 'widgets/product-card/ui/ProductCard'

import { DATA } from 'shared/configs/data'
import { Button } from 'shared/ui/Button'
import Squares from 'shared/ui/Squares/Squares'
import GridMotion from 'shared/ui/GridMotion/GridMotion'
import Particles from 'shared/ui/Particles/Particles'

const items = [
	'Item 1',
	<div key='jsx-item-1'>Custom JSX Content</div>,
	'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'Item 2',
	<div key='jsx-item-2'>Custom JSX Content</div>,
	'Item 4',
	<div key='jsx-item-2'>Custom JSX Content</div>,
	'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'Item 5',
	<div key='jsx-item-2'>Custom JSX Content</div>,
	'Item 7',
	<div key='jsx-item-2'>Custom JSX Content</div>,
	'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'Item 8',
	<div key='jsx-item-2'>Custom JSX Content</div>,
	'Item 10',
	<div key='jsx-item-3'>Custom JSX Content</div>,
	'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'Item 11',
	<div key='jsx-item-2'>Custom JSX Content</div>,
	'Item 13',
	<div key='jsx-item-4'>Custom JSX Content</div>,
	'https://images.unsplash.com/photo-1723403804231-f4e9b515fe9d?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
	'Item 14',
]

export function HomePage() {
	return (
		<>
			<Box
				height={'700px'}
				sx={{
					mt: -8,
					backgroundColor: 'primary.main',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					position: 'relative',
				}}
			>
				<Particles
					particleColors={['#ffffff', '#ffffff']}
					particleCount={200}
					particleSpread={10}
					speed={0.1}
					particleBaseSize={100}
					moveParticlesOnHover={true}
					alphaParticles={false}
					disableRotation={false}
				/>
				<Container
					maxWidth='xl'
					sx={{ height: '100%' }}
				>
					<Stack
						gap={2}
						justifyContent='center'
						alignItems='center'
						height='100%'
					>
						<Typography
							variant='h2'
							color='white'
							sx={{ zIndex: 999 }}
						>
							Победа начинается здесь
						</Typography>
						<Button
							size='large'
							// variant='outlined'
							color='inherit'
							sx={{ zIndex: 999 }}
						>
							Перейти в каталог
						</Button>
					</Stack>
				</Container>
			</Box>
			<Container
				maxWidth='xl'
				sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}
			>
				<Typography variant='h4'>Популярные товары</Typography>
				<Grid
					container
					spacing={2}
					width='100%'
				>
					{DATA.slice(0, 4).map((item, index) => (
						<Grid
							size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
							key={index}
						>
							<ProductCard data={item} />
						</Grid>
					))}
				</Grid>
				<Button>Посмотреть все</Button>
			</Container>
		</>
	)
}
