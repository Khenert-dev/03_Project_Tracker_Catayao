import { Head, useForm, Link } from '@inertiajs/react'
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Stack,
    CircularProgress,
} from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('register'), {
            onFinish: () =>
                reset('password', 'password_confirmation'),
        })
    }

    return (
        <>
            <Head title="Register" />

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
                            variant="h4"
                            fontWeight={800}
                            textAlign="center"
                            gutterBottom
                        >
                            Create Account
                        </Typography>

                        <form onSubmit={submit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />

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

                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    fullWidth
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value
                                        )
                                    }
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
                                        'Register'
                                    )}
                                </Button>

                                <Typography textAlign="center">
                                    Already have an account?{' '}
                                    <Link href={route('login')}>
                                        Login
                                    </Link>
                                </Typography>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}