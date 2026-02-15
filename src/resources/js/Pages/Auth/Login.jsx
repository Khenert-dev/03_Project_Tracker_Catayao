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
    Stack,
    CircularProgress,
    Divider,
} from '@mui/material'
import { alpha } from '@mui/material/styles'

export default function Login({ status, canResetPassword }) {
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
                        'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #111827 100%)',
                    p: 2,
                }}
            >
                <Card
                    sx={{
                        width: 460,
                        borderRadius: 5,
                        background: alpha('#ffffff', 0.08),
                        backdropFilter: 'blur(25px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                        color: '#fff',
                    }}
                >
                    <CardContent sx={{ p: 6 }}>
                        <Stack spacing={1} alignItems="center" mb={4}>
                            <Typography variant="h4" fontWeight={800}>
                                Welcome Back
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ opacity: 0.7 }}
                            >
                                Sign in to continue
                            </Typography>
                        </Stack>

                        {status && (
                            <Typography
                                sx={{
                                    mb: 3,
                                    color: '#4caf50',
                                    textAlign: 'center',
                                }}
                            >
                                {status}
                            </Typography>
                        )}

                        <form onSubmit={submit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    variant="outlined"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    InputLabelProps={{ style: { color: '#ccc' } }}
                                    sx={{
                                        input: { color: '#fff' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor:
                                                    'rgba(255,255,255,0.3)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#fff',
                                            },
                                        },
                                    }}
                                />

                                <TextField
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    variant="outlined"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    InputLabelProps={{ style: { color: '#ccc' } }}
                                    sx={{
                                        input: { color: '#fff' },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor:
                                                    'rgba(255,255,255,0.3)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: '#fff',
                                            },
                                        },
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
                                            sx={{
                                                color: '#fff',
                                            }}
                                        />
                                    }
                                    label="Remember me"
                                    sx={{ color: '#ccc' }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={processing}
                                    sx={{
                                        py: 1.4,
                                        borderRadius: 3,
                                        fontWeight: 700,
                                        background:
                                            'linear-gradient(90deg, #6366f1, #8b5cf6)',
                                        '&:hover': {
                                            background:
                                                'linear-gradient(90deg, #4f46e5, #7c3aed)',
                                        },
                                    }}
                                >
                                    {processing ? (
                                        <CircularProgress
                                            size={22}
                                            sx={{ color: '#fff' }}
                                        />
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>

                                <Divider
                                    sx={{
                                        backgroundColor:
                                            'rgba(255,255,255,0.15)',
                                    }}
                                />

                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                >
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            style={{
                                                color: '#a5b4fc',
                                                fontSize: 14,
                                            }}
                                        >
                                            Forgot password?
                                        </Link>
                                    )}

                                    <Link
                                        href={route('register')}
                                        style={{
                                            color: '#a5b4fc',
                                            fontSize: 14,
                                        }}
                                    >
                                        Register
                                    </Link>
                                </Stack>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </>
    )
}