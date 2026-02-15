import AuthShell from '@/Components/AuthShell'
import { Head, Link, useForm } from '@inertiajs/react'
import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
} from '@mui/material'

const fieldSx = {
    input: { color: '#fff' },
    '& .MuiFormHelperText-root': { color: '#fecaca' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.7)' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.72)' },
}

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (event) => {
        event.preventDefault()
        post(route('login'), { onFinish: () => reset('password') })
    }

    return (
        <>
            <Head title="Login" />
            <AuthShell title="Welcome Back" subtitle="Sign in to continue to your project tracker.">
                {status && (
                    <Typography sx={{ mb: 2, color: '#86efac', textAlign: 'center' }}>
                        {status}
                    </Typography>
                )}

                <form onSubmit={submit}>
                    <Stack spacing={2.5}>
                        <TextField
                            label="Email"
                            type="email"
                            value={data.email}
                            onChange={(event) => setData('email', event.target.value)}
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            fullWidth
                            sx={fieldSx}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={data.password}
                            onChange={(event) => setData('password', event.target.value)}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            fullWidth
                            sx={fieldSx}
                        />
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    checked={data.remember}
                                    onChange={(event) => setData('remember', event.target.checked)}
                                    sx={{ color: '#fff' }}
                                />
                            )}
                            label="Remember me"
                            sx={{ color: 'rgba(255,255,255,0.78)' }}
                        />
                        <Button type="submit" variant="contained" disabled={processing} sx={{ textTransform: 'none', py: 1.2 }}>
                            {processing ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Sign In'}
                        </Button>
                        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {canResetPassword ? (
                                <Link href={route('password.request')} style={{ color: '#bfdbfe', fontSize: 14 }}>
                                    Forgot password?
                                </Link>
                            ) : <span />}
                            <Link href={route('register')} style={{ color: '#bfdbfe', fontSize: 14 }}>
                                Create account
                            </Link>
                        </Box>
                    </Stack>
                </form>
            </AuthShell>
        </>
    )
}
