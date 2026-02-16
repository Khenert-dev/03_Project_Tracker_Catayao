import { Head, Link } from '@inertiajs/react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    Stack,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { colors } from '@/theme/colors'

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Project Tracker" />

            <Box
                sx={{
                    minHeight: '100vh',
                    position: 'relative',
                    overflow: 'hidden',
                    background: colors.background.landingGradient,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width: 500,
                        height: 500,
                        top: -150,
                        right: -150,
                        borderRadius: '50%',
                        background: alpha(colors.brand.deep, 0.05),
                        filter: 'blur(100px)',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        width: 400,
                        height: 400,
                        bottom: -120,
                        left: -120,
                        borderRadius: '50%',
                        background: alpha(colors.brand.dark, 0.06),
                        filter: 'blur(100px)',
                    }}
                />

                <AppBar
                    position="static"
                    elevation={0}
                    sx={{
                        background: alpha(colors.white, 0.6),
                        backdropFilter: 'blur(14px)',
                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                        color: colors.brand.deep,
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" fontWeight={900}>
                            Project Tracker
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            <Button
                                component={Link}
                                href={route('login')}
                                sx={{ fontWeight: 600, color: colors.brand.deep }}
                            >
                                Login
                            </Button>

                            <Button
                                variant="contained"
                                component={Link}
                                href={
                                    auth?.user
                                        ? route('dashboard')
                                        : route('register')
                                }
                                sx={{
                                    background: colors.brand.deep,
                                    borderRadius: 3,
                                    '&:hover': {
                                        background: colors.brand.dark,
                                    },
                                }}
                            >
                                {auth?.user ? 'Dashboard' : 'Register'}
                            </Button>
                        </Stack>
                    </Toolbar>
                </AppBar>

                <Container maxWidth="lg">
                    <Box
                        sx={{
                            minHeight: '75vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: 3,
                            position: 'relative',
                            zIndex: 2,
                        }}
                    >
                        <Typography
                            variant="h2"
                            fontWeight={900}
                            sx={{
                                color: colors.brand.deep,
                                maxWidth: 850,
                                lineHeight: 1.2,
                            }}
                        >
                            Organize Projects.
                            <br />
                            Track Tasks.
                            <br />
                            Stay Focused.
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{ color: 'text.secondary', maxWidth: 600 }}
                        >
                            A modern project management system built with
                            Laravel, Inertia, React, and Material UI.
                        </Typography>

                        <Stack direction="row" spacing={2} mt={3}>
                            <Button
                                variant="contained"
                                size="large"
                                component={Link}
                                href={
                                    auth?.user
                                        ? route('dashboard')
                                        : route('register')
                                }
                                sx={{
                                    background: colors.brand.deep,
                                    px: 5,
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 700,
                                    '&:hover': {
                                        background: colors.brand.dark,
                                    },
                                }}
                            >
                                Get Started
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                component={Link}
                                href={route('login')}
                                sx={{
                                    px: 5,
                                    py: 1.5,
                                    borderRadius: 3,
                                    fontWeight: 700,
                                    borderColor: colors.brand.deep,
                                    color: colors.brand.deep,
                                    '&:hover': {
                                        backgroundColor:
                                            alpha(colors.brand.deep, 0.05),
                                        borderColor: colors.brand.deep,
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </Stack>
                    </Box>

                    <Box sx={{ pb: 12, position: 'relative', zIndex: 2 }}>
                        <Grid container spacing={4}>
                            {[
                                {
                                    title: 'Project Management',
                                    desc: 'Create, edit, and manage projects effortlessly.',
                                },
                                {
                                    title: 'Task Tracking',
                                    desc: 'Set priorities and toggle completion instantly.',
                                },
                                {
                                    title: 'Productivity Focus',
                                    desc: 'Stay structured and complete work faster.',
                                },
                            ].map((feature) => (
                                <Grid item xs={12} md={4} key={feature.title}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            background:
                                                alpha(colors.white, 0.75),
                                            backdropFilter: 'blur(18px)',
                                            border:
                                                '1px solid rgba(0,0,0,0.05)',
                                            borderRadius: 4,
                                        }}
                                    >
                                        <CardContent sx={{ p: 5 }}>
                                            <Typography
                                                variant="h6"
                                                fontWeight={900}
                                                gutterBottom
                                                sx={{ color: colors.brand.deep }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                {feature.desc}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    )
}
