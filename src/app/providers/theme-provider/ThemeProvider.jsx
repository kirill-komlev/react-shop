import { createTheme, ThemeProvider as MuiThemeProvider, alpha, getContrastRatio } from '@mui/material'

const primaryBase = '#6366f1'
const secondaryBase = '#10b981'

const theme = createTheme({
	cssVariables: {
		nativeColor: true,
	},
	palette: {
		mode: 'dark',
		primary: {
			main: alpha(primaryBase, 0.7),
			light: alpha(primaryBase, 0.5),
			dark: alpha(primaryBase, 0.9),
		},
		secondary: {
			main: alpha(secondaryBase, 0.7),
			light: alpha(secondaryBase, 0.5),
			dark: alpha(secondaryBase, 0.9),
		},
		text: {
			primary: '#f1f5f9',
			secondary: '#94a3b8',
		},

		// background: {
		// 	paper: '#0f1117',
		// 	default: '#181c25',
		// },
	},
})

export function ThemeProvider({ children }) {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}
