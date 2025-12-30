import { Box, Container, Stack, Typography, Grid } from '@mui/material'

import SportsEsportsIcon from '@mui/icons-material/SportsEsports'

import { PAGE_CONFIG } from 'shared/configs/page.config'
import { Link } from 'shared/ui/Link'
import { APP_CONFIG } from 'shared/configs/app.config'

export function Footer() {
	return (
		<Box
			bgcolor='primary.main'
			sx={{ color: 'white.main' }}
		>
			<Container
				maxWidth='xl'
				sx={{ py: 4 }}
			>
				<Grid
					container
					spacing={2}
				>
					<Grid size={4}>
						<Stack gap={1}>
							<Link
								to={PAGE_CONFIG.home}
								hover={false}
							>
								<Stack
									direction='row'
									spacing={1}
									alignItems='center'
									sx={{ color: 'primary.dark' }}
								>
									{/* <Box
									component='img'
									src={APP_CONFIG.logo}
								/> */}
									<Box
										bgcolor='primary.main'
										height='48px'
										width='48px'
										borderRadius={1}
										display='flex'
										alignItems='center'
										justifyContent='center'
									>
										<SportsEsportsIcon
											fontSize='large'
											color='white'
										/>
									</Box>
									<Typography
										variant='h5'
										color='white'
									>
										{APP_CONFIG.name}
									</Typography>
								</Stack>
							</Link>
							<Typography
								variant='body1'
								color='white.main'
							>
								Мы одни из лидеров рынка по продаже игровой периферии в России
							</Typography>
						</Stack>
					</Grid>
					<Grid size={4}>
						<Stack gap={1}>
							<Typography
								variant='h6'
								color='white.main'
							>
								Ссылки
							</Typography>
							<Link
								to={PAGE_CONFIG.catalog}
								hover={false}
							>
								Каталог
							</Link>
							<Link
								to={PAGE_CONFIG.favorite}
								hover={false}
							>
								Избранные
							</Link>
							<Link
								to={PAGE_CONFIG.cart}
								hover={false}
							>
								Корзина
							</Link>
							<Link
								to={`${PAGE_CONFIG.catalog}/mouses`}
								hover={false}
							>
								Мыши
							</Link>
							<Link
								to={`${PAGE_CONFIG.catalog}/keyboards`}
								hover={false}
							>
								Клавиатуры
							</Link>
							<Link
								to={`${PAGE_CONFIG.catalog}/headphones`}
								hover={false}
							>
								Наушники
							</Link>
						</Stack>
					</Grid>
					<Grid size={4}>
						<Stack gap={1}>
							<Typography
								variant='h6'
								color='white.main'
							>
								Оставайся с нами
							</Typography>
							<Typography
								variant='h6'
								color='white.main'
							>
								8-800-77-07-999 (c 03:00 до 22:00)
							</Typography>
						</Stack>
					</Grid>
					<Grid
						size={12}
						sx={{ textAlign: 'center' }}
					>
						<Typography
							variant='body1'
							color='textDisabled'
						>
							Все права защищены
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}
