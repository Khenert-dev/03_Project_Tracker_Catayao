import { Head, Link, router } from '@inertiajs/react'
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Snackbar,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

export default function Show({ project }) {
    const [newTask, setNewTask] = useState('')
    const [editProject, setEditProject] = useState(false)
    const [editProjectData, setEditProjectData] = useState({
        title: project.title,
        description: project.description ?? '',
    })
    const [editTask, setEditTask] = useState(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

    const completedTasks = project.tasks?.filter((task) => task.completed).length || 0
    const totalTasks = project.tasks?.length || 0

    const createTask = () => {
        if (!newTask.trim()) return

        router.post(route('tasks.store'), {
            project_id: project.id,
            title: newTask.trim(),
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setNewTask('')
                setSnackbar({ open: true, message: 'Task created.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to create task.', severity: 'error' }),
        })
    }

    const updateProject = () => {
        router.put(route('projects.update', project.id), editProjectData, {
            preserveScroll: true,
            onSuccess: () => {
                setEditProject(false)
                setSnackbar({ open: true, message: 'Project updated.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to update project.', severity: 'error' }),
        })
    }

    const updateTask = () => {
        if (!editTask?.title?.trim()) return

        router.put(route('tasks.update', editTask.id), { title: editTask.title }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditTask(null)
                setSnackbar({ open: true, message: 'Task updated.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to update task.', severity: 'error' }),
        })
    }

    const toggleTask = (taskId) => {
        router.patch(route('tasks.toggle', taskId), {}, { preserveScroll: true })
    }

    const deleteTask = (taskId) => {
        router.delete(route('tasks.destroy', taskId), {
            preserveScroll: true,
            onSuccess: () => setSnackbar({ open: true, message: 'Task deleted.', severity: 'success' }),
            onError: () => setSnackbar({ open: true, message: 'Failed to delete task.', severity: 'error' }),
        })
    }

    return (
        <>
            <Head title={project.title} />

            <Box sx={{ minHeight: '100vh', py: 6, background: 'linear-gradient(150deg, #fff8f1 0%, #f2f7ff 50%, #edf7f1 100%)' }}>
                <Container maxWidth="md">
                    <Button
                        component={Link}
                        href={route('projects.index')}
                        startIcon={<ArrowBackIcon />}
                        sx={{ mb: 3 }}
                    >
                        Back to projects
                    </Button>

                    <Card
                        sx={{
                            borderRadius: 4,
                            background: alpha('#ffffff', 0.78),
                            backdropFilter: 'blur(12px)',
                            border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
                        }}
                    >
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="h5" fontWeight={800}>{project.title}</Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Chip label={`${completedTasks}/${totalTasks} completed`} color="success" variant="outlined" />
                                    <IconButton onClick={() => setEditProject(true)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>

                            <Typography color="text.secondary" mb={2}>
                                {project.description || 'No description available.'}
                            </Typography>

                            <Divider sx={{ mb: 2 }} />

                            <Stack spacing={1.5}>
                                {project.tasks?.map((task) => (
                                    <Stack
                                        key={task.id}
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ p: 1.5, borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.05) }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <IconButton onClick={() => toggleTask(task.id)}>
                                                {task.completed ? <CheckCircleIcon color="success" /> : <RadioButtonUncheckedIcon />}
                                            </IconButton>
                                            <Typography sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                                {task.title}
                                            </Typography>
                                        </Stack>

                                        <Stack direction="row" spacing={0.5}>
                                            <IconButton onClick={() => setEditTask({ id: task.id, title: task.title })}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton onClick={() => deleteTask(task.id)} sx={{ color: '#dc2626' }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                ))}

                                <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        placeholder="Add a task"
                                        value={newTask}
                                        onChange={(event) => setNewTask(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                createTask()
                                            }
                                        }}
                                    />
                                    <Button variant="contained" onClick={createTask} startIcon={<AddIcon />} sx={{ textTransform: 'none' }}>
                                        Add
                                    </Button>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Box>

            <Dialog open={editProject} onClose={() => setEditProject(false)} fullWidth maxWidth="sm">
                <DialogTitle>Edit Project</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Title"
                            value={editProjectData.title}
                            onChange={(event) => setEditProjectData((prev) => ({ ...prev, title: event.target.value }))}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            multiline
                            minRows={3}
                            value={editProjectData.description}
                            onChange={(event) => setEditProjectData((prev) => ({ ...prev, description: event.target.value }))}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditProject(false)}>Cancel</Button>
                    <Button variant="contained" onClick={updateProject}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={Boolean(editTask)} onClose={() => setEditTask(null)} fullWidth maxWidth="xs">
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Task title"
                        value={editTask?.title ?? ''}
                        onChange={(event) => setEditTask((prev) => ({ ...prev, title: event.target.value }))}
                        fullWidth
                        sx={{ mt: 1 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditTask(null)}>Cancel</Button>
                    <Button variant="contained" onClick={updateTask}>Save</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
                <Alert variant="filled" severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </>
    )
}
