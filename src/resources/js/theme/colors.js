import { alpha } from '@mui/material/styles'

export const colors = {
    white: '#ffffff',
    brand: {
        deep: '#0f172a',
        dark: '#1e293b',
        accent: '#164e63',
        primary: '#0f766e',
        secondary: '#ea580c',
        link: '#0f766e',
    },
    background: {
        default: '#f8fafc',
        surfaceGradient: 'linear-gradient(145deg, #f3faf8 0%, #eef5ff 55%, #f1f9f2 100%)',
        landingGradient: 'linear-gradient(145deg, #f3faf8 0%, #eef5ff 55%, #f1f9f2 100%)',
        authGradient: 'linear-gradient(145deg, #f3faf8 0%, #eef5ff 55%, #f1f9f2 100%)',
    },
    feedback: {
        success: '#86efac',
        errorSoft: '#fecaca',
        danger: '#dc2626',
    },
    auth: {
        textMuted: 'rgba(15,23,42,0.78)',
        labelMuted: 'rgba(15,23,42,0.72)',
        border: 'rgba(15,23,42,0.25)',
        borderHover: 'rgba(15,23,42,0.45)',
        divider: 'rgba(15,23,42,0.2)',
        cardBorder: 'rgba(15,23,42,0.12)',
    },
}

export const authFieldSx = {
    '& .MuiInputBase-input': { color: 'text.primary' },
    '& .MuiFormHelperText-root': { color: 'error.main' },
    '& .MuiOutlinedInput-root': {
        backgroundColor: alpha(colors.white, 0.72),
        '& fieldset': { borderColor: colors.auth.border },
        '&:hover fieldset': { borderColor: colors.auth.borderHover },
    },
    '& .MuiInputLabel-root': { color: colors.auth.labelMuted },
}
