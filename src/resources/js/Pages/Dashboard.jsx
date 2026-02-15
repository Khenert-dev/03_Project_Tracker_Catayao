import { Head, router } from '@inertiajs/react'
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    Button,
    Container,
    Stack,
} from '@mui/material'

export default function Dashboard({ auth }) {
    const handleLogout = () => {
        router.post(route('logout'))
    }

    return (
        <>
            <Head title="Dashboard" />

            <AppBar position="static" elevation={0}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={700}>
                        Project Tracker
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="body2">
                            {auth?.user?.name}
                        </Typography>

                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg">
                <Box sx={{ py: 6 }}>
                    <Typography variant="h4" fontWeight={700}>
                        Dashboard
                    </Typography>
                </Box>
            </Container>
        </>
    )
}