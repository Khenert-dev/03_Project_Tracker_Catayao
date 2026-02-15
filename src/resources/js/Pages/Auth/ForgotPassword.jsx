import { Head, useForm } from '@inertiajs/react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Stack,
    CircularProgress,
    Alert,
} from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('password.email'))
    }

    return (
        <>
            <Head title="Forgot Password" />

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
                        width: 460,
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
                            Forgot Password
                        </Typography>

                        <Typography
                            variant="body2"
                            textAlign="center"
                            sx={{ opacity: 0.7, mb: 4 }}
                        >
                            Enter your email and we will send you a reset link.
                        </Typography>

                        {status && (
                            <Alert
                                severity="success"
                                sx={{ mb: 3 }}
                            >
                                {status}
                            </Alert>
                        )}

                        <form onSubmit={submit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />

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
                                        'Email Password Reset Link'
                                    )}
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}