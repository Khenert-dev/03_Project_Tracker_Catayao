import AuthShell from '@/Components/AuthShell'
import { Head, Link, useForm } from '@inertiajs/react'
import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'

const fieldSx = {
    input: { color: '#fff' },
    '& .MuiFormHelperText-root': { color: '#fecaca' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.7)' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.72)' },
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const submit = (event) => {
        event.preventDefault()
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') })
    }

    return (
        <>
            <Head title="Register" />
            <AuthShell title="Create Account" subtitle="Set up your workspace and start managing projects.">
                <form onSubmit={submit}>
                    <Stack spacing={2.5}>
                        <TextField
                            label="Name"
                            value={data.name}
                            onChange={(event) => setData('name', event.target.value)}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            fullWidth
                            sx={fieldSx}
                        />
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
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(event) => setData('password_confirmation', event.target.value)}
                            error={Boolean(errors.password_confirmation)}
                            helperText={errors.password_confirmation}
                            fullWidth
                            sx={fieldSx}
                        />
                        <Button type="submit" variant="contained" disabled={processing} sx={{ textTransform: 'none', py: 1.2 }}>
                            {processing ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Register'}
                        </Button>
                        <Typography textAlign="center" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            Already have an account?{' '}
                            <Link href={route('login')} style={{ color: '#bfdbfe' }}>
                                Login
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </AuthShell>
        </>
    )
}
