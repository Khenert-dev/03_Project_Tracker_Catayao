import { Head, Link, useForm } from '@inertiajs/react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Alert,
    CircularProgress,
} from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({})

    const submit = (e) => {
        e.preventDefault()
        post(route('verification.send'))
    }

    return (
        <>
            <Head title="Email Verification" />

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background:
                        'radial-gradient(circle at 20% 20%, #1f2a44 0%, #0f172a 40%, #0a0f1c 100%)',
                    p: 2,
                }}
            >
                <Card
                    sx={{
                        width: 520,
                        backdropFilter: 'blur(20px)',
                        background: alpha('#ffffff', 0.06),
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 4,
                        boxShadow: '0 40px 100px rgba(0,0,0,0.65)',
                        color: '#fff',
                    }}
                >
                    <CardContent sx={{ p: 6 }}>
                        <Typography
                            variant="h5"
                            fontWeight={700}
                            textAlign="center"
                            gutterBottom
                        >
                            Verify Your Email
                        </Typography>

                        <Typography
                            variant="body2"
                            textAlign="center"
                            sx={{ opacity: 0.7, mb: 4 }}
                        >
                            Please verify your email address by clicking the
                            link we sent you. If you didn’t receive it, we can
                            resend it.
                        </Typography>

                        {status === 'verification-link-sent' && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                A new verification link has been sent.
                            </Alert>
                        )}

                        <form onSubmit={submit}>
                            <Stack spacing={3}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <CircularProgress
                                            size={22}
                                            sx={{ color: '#fff' }}
                                        />
                                    ) : (
                                        'Resend Verification Email'
                                    )}
                                </Button>

                                <Button
                                    component={Link}
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    variant="outlined"
                                    color="inherit"
                                >
                                    Log Out
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}