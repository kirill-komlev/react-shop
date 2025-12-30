import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Badge, Container, Divider, InputBase, List, ListItem, ListItemText, Menu, MenuItem, Stack, styled, Tooltip } from '@mui/material'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'

import { Button } from 'shared/ui/Button'
import { Link } from 'shared/ui/Link'

import { PAGE_CONFIG } from 'shared/configs/page.config'
import { APP_CONFIG } from 'shared/configs/app.config'

import { CATEGORIES_FULL } from 'shared/configs/categories'

import { capitalizeFirstLetter } from 'shared/libs/capitalizeFirstLetter'
import { useFavoriteStore, useCartStore, useCartDrawerStore } from 'app/providers/store-provider/StoreProvider'
import { MobileHeader } from './MobileHeader'
import { useLocation } from 'react-router'
import { transformWord } from 'shared/libs/transformWord'
import { useData } from 'shared/hooks/useData'

// const navItems = [
// 	// ['Товары', PAGE_CONFIG.product],
// 	['Акции', PAGE_CONFIG.sales],
// 	['О нас', PAGE_CONFIG.about],
// ]

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

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	// backgroundColor: alpha(theme.palette.common.white, 0.15),
	// '&:hover': {
	// 	backgroundColor: alpha(theme.palette.common.white, 0.25),
	// },
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 0, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: '0ch',
			'& .ListStyle': {
				display: 'none',
			},
			'&:focus': {
				width: '25ch',
				'& .ListStyle': {
					display: 'block',
				},
			},
		},
	},
}))

// const data = DATA.map(item => ({
// 	id: item.id,
// 	name: item.name,
// }))

// const data = DATA.map(item => `${item.category} ${item.name}`)

export function Header() {
	const favorite = useFavoriteStore(state => state.favorite)
	const cart = useCartStore(state => state.cart)
	const openCartDrawer = useCartDrawerStore(state => state.openCartDrawer)

	const { items } = useData()
	const data = items?.map(item => item.name)

	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [isFocused, setIsFocused] = useState(false)
	const handleChange = e => {
		setSearchTerm(e.target.value)
	}

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		// Добавляем небольшую задержку, чтобы клик по списку успел сработать
		setTimeout(() => setIsFocused(false), 200)
	}

	const ListStyle = {
		display: isFocused && searchTerm ? 'block' : 'none',
		width: '100%',
		px: 2,
		bgcolor: 'white.dark',
	}
	useEffect(() => {
		const results = data?.filter(item => item.toLowerCase().includes(searchTerm))
		setSearchResults(results)
	}, [searchTerm])

	const [path, setPath] = useState('')
	const location = useLocation()
	useEffect(() => {
		setPath(location.pathname)
		setSearchTerm('')
		window.scrollTo(0, 0)
	}, [location])

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

	const SearchResult = () => (
		<Box
			sx={{
				display: searchTerm.length === 0 ? 'none' : 'block',
				position: 'fixed',
				top: 64,
				zIndex: 9999,
				// py: 2,
				width: '100%',
				// backgroundColor: 'white.main',
				overflow: 'hidden', // Добавлено, чтобы скрыть всё, что выходит за пределы
			}}
		>
			<Container
				maxWidth='xl'
				disableGutters
				sx={{
					maxHeight: '500px', // Ограничиваем высоту контейнера
					overflowY: 'auto', // Добавляем вертикальный скролл
					'&::-webkit-scrollbar': {
						width: '8px',
					},
					'&::-webkit-scrollbar-track': {
						background: '#f1f1f1',
						borderRadius: '4px',
					},
					'&::-webkit-scrollbar-thumb': {
						background: '#888',
						borderRadius: '4px',
					},
					'&::-webkit-scrollbar-thumb:hover': {
						background: '#555',
					},
				}}
			>
				<List
					aria-label='search items'
					sx={ListStyle}
				>
					{searchResults?.length === 0 ? (
						<ListItem>
							<ListItemText primary='Товар не найден' />
						</ListItem>
					) : (
						searchResults?.map(item => (
							<Box key={item}>
								<ListItem>
									<Link
										to={`${PAGE_CONFIG.product}/${items?.find(p => p.name === item)?.id}/${item}`}
										style={{ width: '100%', textDecoration: 'none', color: 'inherit' }}
									>
										<ListItemText primary={`${transformWord(items?.find(p => p.name === item)?.category, 'ru')} ${item}`} />
									</Link>
								</ListItem>
								<Divider />
							</Box>
						))
					)}
				</List>
			</Container>
		</Box>
	)

	return (
		<>
			<Box sx={{ display: { sm: 'none', md: 'flex' } }}>
				<AppBar
					component='nav'
					color={path == '/' ? (scroll == 0 ? 'transparent' : 'white') : 'white'}
					// color='primary'
					enableColorOnDark
					sx={{ backgroundImage: 'none', boxShadow: scroll == 0 ? 'none' : 'default' }}
				>
					<Container
						maxWidth='xl'
						disableGutters
					>
						<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
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
												color='white'
											/>
										</Box>
										<Typography
											variant='h5'
											color={path == '/' ? (scroll == 0 ? 'white' : 'primary') : 'primary'}
										>
											{APP_CONFIG.name}
										</Typography>
									</Stack>
								</Link>
							</Typography>
							<Stack
								direction='row'
								gap={1}
								sx={{ display: { xs: 'none', sm: 'flex' }, marginRight: 'auto' }}
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
								{/* {navItems.map((item, index) => (
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
								))} */}
							</Stack>

							<Stack
								direction='row'
								gap={1}
								sx={{ display: { xs: 'none', sm: 'flex' } }}
							>
								<Search>
									<SearchIconWrapper>
										<SearchIcon color={path == '/' ? (scroll == 0 ? 'white' : 'primary') : 'primary'} />
									</SearchIconWrapper>
									<StyledInputBase
										value={searchTerm}
										onChange={handleChange}
										onFocus={handleFocus}
										onBlur={handleBlur}
										placeholder='Поиск...'
										inputProps={{ 'aria-label': 'search' }}
									/>
								</Search>
								<Link to={PAGE_CONFIG.favorite}>
									<Tooltip title='Избранное'>
										<IconButton>
											<Badge
												max={9}
												color='primary'
												badgeContent={favorite.length}
											>
												<FavoriteIcon
													color={path == '/' ? (scroll == 0 ? 'white' : 'primary') : 'primary'}
													// color={scroll == 0 ? 'white' : 'primary'}
												/>
											</Badge>
										</IconButton>
									</Tooltip>
								</Link>
								<Tooltip
									title='Корзина'
									onClick={path != '/cart' ? openCartDrawer : () => console.log()}
								>
									<IconButton>
										<Badge
											max={9}
											color='primary'
											badgeContent={cart.length}
										>
											<ShoppingCartIcon
												color={path == '/' ? (scroll == 0 ? 'white' : 'primary') : 'primary'}
												// color={scroll == 0 ? 'white' : 'primary'}
											/>
										</Badge>
									</IconButton>
								</Tooltip>
							</Stack>
						</Toolbar>
					</Container>
				</AppBar>
				<SearchResult />
			</Box>
			<MobileHeader />
		</>
	)
}
