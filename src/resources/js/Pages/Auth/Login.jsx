import { Head, useForm, Link } from '@inertiajs/react'
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Checkbox,
    FormControlLabel,
    Stack
} from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function Login({ canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e) => {
        e.preventDefault()
        post(route('login'), {
            onFinish: () => reset('password'),
        })
    }

    return (
        <>
            <Head title="Login" />

            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background:
                        'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
                    p: 2,
                }}
            >
                <Card
                    sx={{
                        width: 420,
                        backdropFilter: 'blur(18px)',
                        background: alpha('#ffffff', 0.08),
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 4,
                        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                        color: '#fff',
                    }}
                >
                    <CardContent sx={{ p: 5 }}>
                        <Typography
                            variant="h4"
                            fontWeight={700}
                            textAlign="center"
                            gutterBottom
                        >
                            Project Tracker
                        </Typography>

                        <Typography
                            variant="body2"
                            textAlign="center"
                            sx={{ opacity: 0.7, mb: 4 }}
                        >
                            Secure Access Portal
                        </Typography>

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
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                    InputProps={{
                                        style: { color: '#fff' },
                                    }}
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
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                    InputProps={{
                                        style: { color: '#fff' },
                                    }}
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    'remember',
                                                    e.target.checked
                                                )
                                            }
                                            sx={{ color: '#fff' }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="body2"
                                            sx={{ color: '#fff' }}
                                        >
                                            Remember me
                                        </Typography>
                                    }
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={processing}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: 3,
                                        fontWeight: 600,
                                        background:
                                            'linear-gradient(90deg,#00c6ff,#0072ff)',
                                        boxShadow:
                                            '0 10px 30px rgba(0,114,255,0.5)',
                                        '&:hover': {
                                            background:
                                                'linear-gradient(90deg,#0072ff,#00c6ff)',
                                        },
                                    }}
                                >
                                    Sign In
                                </Button>

                                {canResetPassword && (
                                    <Typography
                                        variant="body2"
                                        textAlign="center"
                                        sx={{ opacity: 0.7 }}
                                    >
                                        <Link
                                            href={route(
                                                'password.request'
                                            )}
                                            style={{
                                                color: '#fff',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            Forgot password?
                                        </Link>
                                    </Typography>
                                )}
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}