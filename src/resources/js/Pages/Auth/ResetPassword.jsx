import AuthShell from '@/Components/AuthShell'
import { Head, useForm } from '@inertiajs/react'
import { Button, CircularProgress, Stack, TextField } from '@mui/material'

const fieldSx = {
    input: { color: '#fff' },
    '& .MuiFormHelperText-root': { color: '#fecaca' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.7)' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.72)' },
}

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    })

    const submit = (event) => {
        event.preventDefault()
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        })
    }

    return (
        <>
            <Head title="Reset Password" />
            <AuthShell title="Reset Password" subtitle="Set your new account password.">
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
                            label="New Password"
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
                            {processing ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Reset Password'}
                        </Button>
                    </Stack>
                </form>
            </AuthShell>
        </>
    )
}
