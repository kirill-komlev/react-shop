import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router'
import { Router } from './router/Router'
import { ThemeProvider } from './providers/theme-provider/ThemeProvider'

export function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<CssBaseline />
				<Router />
			</BrowserRouter>
		</ThemeProvider>
	)
}
