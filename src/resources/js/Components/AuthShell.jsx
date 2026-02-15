import { Box, Card, CardContent, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function AuthShell({ title, subtitle, width = 460, children }) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                background: 'radial-gradient(circle at 15% 15%, #164e63 0%, #0f172a 40%, #111827 100%)',
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    maxWidth: width,
                    borderRadius: 4,
                    color: '#fff',
                    background: alpha('#ffffff', 0.08),
                    backdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                }}
            >
                <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                    <Typography variant="h4" fontWeight={800} textAlign="center" gutterBottom>
                        {title}
                    </Typography>
                    {subtitle && (
                        <Typography variant="body2" textAlign="center" sx={{ opacity: 0.78, mb: 3 }}>
                            {subtitle}
                        </Typography>
                    )}
                    {children}
                </CardContent>
            </Card>
        </Box>
    )
}
