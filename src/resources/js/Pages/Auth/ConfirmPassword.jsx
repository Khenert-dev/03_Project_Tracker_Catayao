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
} from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    })

    const submit = (e) => {
        e.preventDefault()

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <>
            <Head title="Confirm Password" />

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
                        width: 420,
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
                            Confirm Password
                        </Typography>

                        <Typography
                            variant="body2"
                            textAlign="center"
                            sx={{ opacity: 0.7, mb: 4 }}
                        >
                            This is a secure area. Please confirm your password
                            before continuing.
                        </Typography>

                        <form onSubmit={submit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    error={!!errors.password}
                                    helperText={errors.password}
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
                                        'Confirm'
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