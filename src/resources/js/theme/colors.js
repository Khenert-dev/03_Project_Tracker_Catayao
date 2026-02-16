export const colors = {
    white: '#ffffff',
    brand: {
        deep: '#0f172a',
        dark: '#1e293b',
        accent: '#164e63',
        primary: '#0f766e',
        secondary: '#ea580c',
        link: '#bfdbfe',
    },
    background: {
        default: '#f8fafc',
        surfaceGradient: 'linear-gradient(145deg, #f3faf8 0%, #eef5ff 55%, #f1f9f2 100%)',
        landingGradient: 'linear-gradient(135deg, #f7fbfa 0%, #edf4f2 100%)',
        authGradient: 'radial-gradient(circle at 15% 15%, #164e63 0%, #0f172a 40%, #111827 100%)',
    },
    feedback: {
        success: '#86efac',
        errorSoft: '#fecaca',
        danger: '#dc2626',
    },
    auth: {
        textMuted: 'rgba(255,255,255,0.78)',
        labelMuted: 'rgba(255,255,255,0.72)',
        border: 'rgba(255,255,255,0.35)',
        borderHover: 'rgba(255,255,255,0.7)',
        divider: 'rgba(255,255,255,0.2)',
        cardBorder: 'rgba(255,255,255,0.14)',
    },
}

export const authFieldSx = {
    input: { color: colors.white },
    '& .MuiFormHelperText-root': { color: colors.feedback.errorSoft },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: colors.auth.border },
        '&:hover fieldset': { borderColor: colors.auth.borderHover },
    },
    '& .MuiInputLabel-root': { color: colors.auth.labelMuted },
}
