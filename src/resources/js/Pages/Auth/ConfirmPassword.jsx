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

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' })

    const submit = (event) => {
        event.preventDefault()
        post(route('password.confirm'), { onFinish: () => reset('password') })
    }

    return (
        <>
            <Head title="Confirm Password" />
            <AuthShell title="Confirm Password" subtitle="Please confirm your password before continuing." width={420}>
                <form onSubmit={submit}>
                    <Stack spacing={2.5}>
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
                        <Button type="submit" variant="contained" disabled={processing} sx={{ textTransform: 'none', py: 1.2 }}>
                            {processing ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Confirm'}
                        </Button>
                    </Stack>
                </form>
            </AuthShell>
        </>
    )
}
