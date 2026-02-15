import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#0f766e',
        },
        secondary: {
            main: '#ea580c',
        },
        background: {
            default: '#f8fafc',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: ['Manrope', 'Segoe UI', 'Tahoma', 'sans-serif'].join(','),
        h4: {
            fontWeight: 800,
        },
        h5: {
            fontWeight: 700,
        },
    },
})

export default theme
