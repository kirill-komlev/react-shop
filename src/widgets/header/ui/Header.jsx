import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Badge, Container, Drawer, Menu, MenuItem, Stack, Tooltip, BottomNavigation, BottomNavigationAction } from '@mui/material'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import GamepadIcon from '@mui/icons-material/Gamepad'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'

import { Button } from 'shared/ui/Button'
import { Link } from 'shared/ui/Link'

import { PAGE_CONFIG } from 'shared/configs/page.config'
import { APP_CONFIG } from 'shared/configs/app.config'

import { CATEGORIES_FULL } from 'shared/configs/categories'

import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { useFavoriteStore, useCartStore, useCartDrawerStore } from 'app/providers/store-provider/StoreProvider'
import { MobileHeader } from './MobileHeader'

const navItems = [
	// ['Товары', PAGE_CONFIG.product],
	['Акции', PAGE_CONFIG.sales],
	['О нас', PAGE_CONFIG.about],
]

const LinkButtonStyle = {
	px: 2,
	color: '#fff',
	backgroundColor: 'primary.main',
	'&:hover': {
		backgroundColor: 'primary.dark',
	},
	'.MuiButton-endIcon': {
		marginLeft: '0',
	},
}

export function Header() {
	const favorite = useFavoriteStore(state => state.favorite)
	const cart = useCartStore(state => state.cart)
	const openCartDrawer = useCartDrawerStore(state => state.openCartDrawer)

	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const [scroll, setScroll] = useState(0)
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])
	const handleScroll = () => {
		setScroll(window.scrollY)
	}

	return (
		<>
			<Box sx={{ display: { sm: 'flex' } }}>
				<AppBar
					component='nav'
					color={scroll == 0 ? 'transparent' : 'default'}
					enableColorOnDark
					sx={{ backgroundImage: 'none', boxShadow: scroll == 0 ? 'none' : 'default' }}
				>
					<Container
						maxWidth='xl'
						disableGutters
					>
						<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography
								variant='h6'
								component='div'
								sx={{ display: { xs: 'none', sm: 'block' } }}
							>
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
												sx={{ fill: '#ffffff' }}
											/>
										</Box>
										<Typography
											variant='h5'
											color={scroll == 0 ? 'white' : 'primary'}
										>
											{APP_CONFIG.name}
										</Typography>
									</Stack>
								</Link>
							</Typography>
							<Stack
								direction='row'
								gap={1}
								sx={{ display: { xs: 'none', sm: 'flex' } }}
							>
								<Button
									variant='text'
									sx={LinkButtonStyle}
									id='basic-button'
									aria-controls={open ? 'basic-menu' : undefined}
									aria-haspopup='true'
									aria-expanded={open ? 'true' : undefined}
									onClick={handleClick}
									endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
								>
									Каталог
								</Button>
								<Menu
									id='basic-menu'
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									slotProps={{
										list: {
											'aria-labelledby': 'basic-button',
										},
									}}
								>
									{Object.values(CATEGORIES_FULL).map((item, index) => (
										<Link
											to={`${PAGE_CONFIG.catalog}/${item.en[1]}`}
											hover={false}
											key={index}
										>
											<MenuItem onClick={handleClose}>{capitalizeFirstLetter(item.ru[1])}</MenuItem>
										</Link>
									))}
								</Menu>
								{navItems.map((item, index) => (
									<Link
										key={index}
										to={item[1]}
										hover={false}
									>
										<Button
											variant='text'
											sx={LinkButtonStyle}
										>
											{item[0]}
										</Button>
									</Link>
								))}
							</Stack>
							<Stack
								direction='row'
								gap={1}
								sx={{ display: { xs: 'none', sm: 'flex' } }}
							>
								<Link to={PAGE_CONFIG.favorite}>
									<Tooltip title='Избранное'>
										<IconButton>
											<Badge
												max={9}
												color='primary'
												badgeContent={favorite.length}
											>
												<FavoriteIcon color={scroll == 0 ? 'white' : 'primary'} />
											</Badge>
										</IconButton>
									</Tooltip>
								</Link>
								<Tooltip
									title='Корзина'
									onClick={openCartDrawer}
								>
									<IconButton>
										<Badge
											max={9}
											color='primary'
											badgeContent={cart.length}
										>
											<ShoppingCartIcon color={scroll == 0 ? 'white' : 'primary'} />
										</Badge>
									</IconButton>
								</Tooltip>
							</Stack>
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
			<MobileHeader />
		</>
	)
}
