import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router'
import { Router } from './router/Router'

export function App() {
	return (
		<BrowserRouter>
			<CssBaseline />
			<Router />
		</BrowserRouter>
	)
}
