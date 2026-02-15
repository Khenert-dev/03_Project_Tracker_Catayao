import AuthShell from '@/Components/AuthShell'
import { Head, useForm } from '@inertiajs/react'
import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material'

const fieldSx = {
    input: { color: '#fff' },
    '& .MuiFormHelperText-root': { color: '#fecaca' },
    '& .MuiOutlinedInput-root': {
        '& fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
        '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.7)' },
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.72)' },
}

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' })

    const submit = (event) => {
        event.preventDefault()
        post(route('password.email'))
    }

    return (
        <>
            <Head title="Forgot Password" />
            <AuthShell title="Forgot Password" subtitle="Enter your email and we will send a password reset link.">
                {status && <Alert severity="success" sx={{ mb: 2 }}>{status}</Alert>}
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
                        <Button type="submit" variant="contained" disabled={processing} sx={{ textTransform: 'none', py: 1.2 }}>
                            {processing ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Send Reset Link'}
                        </Button>
                    </Stack>
                </form>
            </AuthShell>
        </>
    )
}
