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

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Project Tracker" />

            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold">
                        03 Project Tracker
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        {auth.user ? (
                            <Button color="inherit" component={Link} href={route('dashboard')}>
                                Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button color="inherit" component={Link} href={route('login')}>
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    component={Link}
                                    href={route('register')}
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
                <Box
                    sx={{
                        minHeight: '70vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 4,
                    }}
                >
                    <Typography variant="h3" fontWeight="bold">
                        Manage Projects Efficiently
                    </Typography>

                    <Typography variant="h6" color="text.secondary">
                        Built with Laravel + Inertia + React + MUI
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        href={auth.user ? route('dashboard') : route('login')}
                    >
                        Get Started
                    </Button>
                </Box>

                <Grid container spacing={4} sx={{ pb: 8 }}>
                    {['Tasks', 'Teams', 'Deadlines'].map((feature) => (
                        <Grid item xs={12} md={4} key={feature}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                                        {feature}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Track and manage {feature.toLowerCase()} inside your
                                        Project Tracker system.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}