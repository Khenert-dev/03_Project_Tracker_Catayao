import { Head, Link, router, useForm } from '@inertiajs/react'
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { alpha } from '@mui/material/styles'
import { colors } from '@/theme/colors'
import { useState } from 'react'

const PRIORITY_OPTIONS = ['low', 'medium', 'high']
const STATUS_PENDING = 'pending'
const STATUS_COMPLETED = 'completed'

export default function Index({ tasks, projects = [] }) {
    const [editTask, setEditTask] = useState(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const taskList = tasks?.data ?? []
    const form = useForm({
        project_id: projects[0]?.id ?? '',
        title: '',
        description: '',
        priority: 'medium',
    })

    const createTask = (event) => {
        event.preventDefault()
        form.post(route('tasks.store'), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('title', 'description', 'priority')
                form.setData('priority', 'medium')
                setSnackbar({ open: true, message: 'Task created.', severity: 'success' })
            },
        })
    }

    const updateTask = () => {
        if (!editTask) return
        router.put(route('tasks.update', editTask.id), {
            title: editTask.title,
            description: editTask.description ?? '',
            priority: editTask.priority,
            status: editTask.status,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditTask(null)
                setSnackbar({ open: true, message: 'Task updated.', severity: 'success' })
            },
        })
    }

    return (
        <>
            <Head title="Tasks" />
            <Box sx={{ minHeight: '100vh', py: 5, background: colors.background.surfaceGradient }}>
                <Container maxWidth="md">
                    <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Button component={Link} href={route('dashboard')} startIcon={<ArrowBackIcon />}>Dashboard</Button>
                                <Typography variant="h4" fontWeight={800}>Tasks</Typography>
                            </Stack>
                            <Button component={Link} href={route('projects.index')} variant="outlined">Projects</Button>
                        </Stack>

                        <Card sx={{ borderRadius: 3, background: alpha(colors.white, 0.78), backdropFilter: 'blur(12px)' }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} mb={2}>Add Task</Typography>
                                <form onSubmit={createTask}>
                                    <Stack spacing={2}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="project_id_label">Project</InputLabel>
                                            <Select
                                                labelId="project_id_label"
                                                label="Project"
                                                value={form.data.project_id}
                                                onChange={(event) => form.setData('project_id', event.target.value)}
                                            >
                                                {projects.map((project) => (
                                                    <MenuItem key={project.id} value={project.id}>{project.title}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField label="Title" value={form.data.title} onChange={(event) => form.setData('title', event.target.value)} fullWidth />
                                        <TextField label="Description" value={form.data.description} onChange={(event) => form.setData('description', event.target.value)} multiline minRows={2} fullWidth />
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="priority_label">Priority</InputLabel>
                                            <Select
                                                labelId="priority_label"
                                                label="Priority"
                                                value={form.data.priority}
                                                onChange={(event) => form.setData('priority', event.target.value)}
                                            >
                                                {PRIORITY_OPTIONS.map((option) => (
                                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <Button type="submit" variant="contained">Create Task</Button>
                                    </Stack>
                                </form>
                            </CardContent>
                        </Card>

                        <Stack spacing={2}>
                            {taskList.map((task) => (
                                <Card key={task.id}>
                                    <CardContent>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                            <Stack spacing={0.5}>
                                                <Typography fontWeight={700}>{task.title}</Typography>
                                                <Typography variant="body2" color="text.secondary">{task.description || 'No description'}</Typography>
                                                <Stack direction="row" spacing={1}>
                                                    <Chip size="small" label={task.priority} variant="outlined" />
                                                    <Chip size="small" label={task.status} color={task.status === STATUS_COMPLETED ? 'success' : 'default'} />
                                                    <Chip size="small" label={task.project?.title ?? 'Project'} />
                                                </Stack>
                                            </Stack>
                                            <Stack direction="row" spacing={0.5}>
                                                <IconButton onClick={() => router.patch(route('tasks.toggle', task.id))}>
                                                    {task.status === STATUS_COMPLETED ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon />}
                                                </IconButton>
                                                <Button size="small" onClick={() => setEditTask(task)}>Edit</Button>
                                                <IconButton color="error" onClick={() => router.delete(route('tasks.destroy', task.id))}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>

                        {tasks?.last_page > 1 && (
                            <Stack direction="row" spacing={1} justifyContent="center">
                                <Button component={Link} href={tasks.prev_page_url ?? '#'} disabled={!tasks.prev_page_url}>Previous</Button>
                                <Chip label={`Page ${tasks.current_page} of ${tasks.last_page}`} />
                                <Button component={Link} href={tasks.next_page_url ?? '#'} disabled={!tasks.next_page_url}>Next</Button>
                            </Stack>
                        )}
                    </Stack>
                </Container>
            </Box>

            {editTask && (
                <Card sx={{ position: 'fixed', bottom: 16, right: 16, width: { xs: 'calc(100% - 32px)', sm: 420 } }}>
                    <CardContent>
                        <Typography fontWeight={700} mb={1}>Edit Task</Typography>
                        <Stack spacing={1.5}>
                            <TextField size="small" label="Title" value={editTask.title} onChange={(event) => setEditTask((prev) => ({ ...prev, title: event.target.value }))} />
                            <TextField size="small" label="Description" value={editTask.description ?? ''} onChange={(event) => setEditTask((prev) => ({ ...prev, description: event.target.value }))} multiline minRows={2} />
                            <FormControl size="small">
                                <InputLabel id="edit_priority_label">Priority</InputLabel>
                                <Select labelId="edit_priority_label" label="Priority" value={editTask.priority} onChange={(event) => setEditTask((prev) => ({ ...prev, priority: event.target.value }))}>
                                    {PRIORITY_OPTIONS.map((option) => (
                                        <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl size="small">
                                <InputLabel id="edit_status_label">Status</InputLabel>
                                <Select labelId="edit_status_label" label="Status" value={editTask.status} onChange={(event) => setEditTask((prev) => ({ ...prev, status: event.target.value }))}>
                                    <MenuItem value={STATUS_PENDING}>pending</MenuItem>
                                    <MenuItem value={STATUS_COMPLETED}>completed</MenuItem>
                                </Select>
                            </FormControl>
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Button onClick={() => setEditTask(null)}>Cancel</Button>
                                <Button variant="contained" onClick={updateTask}>Save</Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            )}

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
                <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
        </>
    )
}
