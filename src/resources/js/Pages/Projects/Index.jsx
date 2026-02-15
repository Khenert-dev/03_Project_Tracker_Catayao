import { Head, Link, router, useForm } from '@inertiajs/react'
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
    LinearProgress,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useEffect, useMemo, useState } from 'react'

export default function Index({ projects = [] }) {
    const projectCollection = Array.isArray(projects) ? projects : (projects?.data ?? [])
    const [localProjects, setLocalProjects] = useState(projectCollection)
    const [taskInputs, setTaskInputs] = useState({})
    const [editProject, setEditProject] = useState(null)
    const [editTask, setEditTask] = useState(null)
    const [deleteProjectId, setDeleteProjectId] = useState(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const glassCardSx = {
        borderRadius: 4,
        background: alpha('#ffffff', 0.78),
        backdropFilter: 'blur(12px)',
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
    }

    const projectForm = useForm({ title: '', description: '' })
    useEffect(() => {
        setLocalProjects(projectCollection)
    }, [projectCollection])

    const hasProjects = useMemo(() => localProjects.length > 0, [localProjects])

    const calculateProgress = (project) => {
        const total = project.tasks_count ?? project.tasks?.length ?? 0
        if (!total) return 0
        const completed = project.completed_tasks_count ?? project.tasks?.filter((task) => task.completed).length ?? 0
        return Math.round((completed / total) * 100)
    }

    const createProject = (event) => {
        event.preventDefault()
        projectForm.post(route('projects.store'), {
            preserveScroll: true,
            onSuccess: () => {
                projectForm.reset()
                setSnackbar({ open: true, message: 'Project created.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to create project.', severity: 'error' }),
        })
    }

    const updateProject = () => {
        if (!editProject?.title?.trim()) return

        router.put(route('projects.update', editProject.id), {
            title: editProject.title,
            description: editProject.description ?? '',
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditProject(null)
                setSnackbar({ open: true, message: 'Project updated.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to update project.', severity: 'error' }),
        })
    }

    const createTask = (projectId) => {
        const title = (taskInputs[projectId] ?? '').trim()
        if (!title) return

        router.post(route('tasks.store'), { project_id: projectId, title }, {
            preserveScroll: true,
            onSuccess: () => {
                setTaskInputs((prev) => ({ ...prev, [projectId]: '' }))
                setSnackbar({ open: true, message: 'Task created.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to create task.', severity: 'error' }),
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

    const deleteProject = (projectId) => {
        router.delete(route('projects.destroy', projectId), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteProjectId(null)
                setSnackbar({ open: true, message: 'Project deleted.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to delete project.', severity: 'error' }),
        })
    }

    const deleteTask = (taskId) => {
        router.delete(route('tasks.destroy', taskId), {
            preserveScroll: true,
            onSuccess: () => setSnackbar({ open: true, message: 'Task deleted.', severity: 'success' }),
            onError: () => setSnackbar({ open: true, message: 'Failed to delete task.', severity: 'error' }),
        })
    }

    const toggleTask = (taskId) => {
        router.patch(route('tasks.toggle', taskId), {}, {
            preserveScroll: true,
            onError: () => setSnackbar({ open: true, message: 'Failed to update status.', severity: 'error' }),
        })
    }

    return (
        <>
            <Head title="Projects" />

            <Box
                sx={{
                    minHeight: '100vh',
                    py: { xs: 4, md: 6 },
                    background: 'linear-gradient(150deg, #fff8f1 0%, #f2f7ff 50%, #edf7f1 100%)',
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={4}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Button component={Link} href={route('dashboard')} startIcon={<ArrowBackIcon />} sx={{ textTransform: 'none' }}>
                                    Dashboard
                                </Button>
                                <Typography variant="h4" fontWeight={800}>Projects</Typography>
                            </Stack>
                            <Chip label={`${projects?.total ?? localProjects.length} total`} sx={{ fontWeight: 700 }} />
                        </Stack>

                        <Card sx={glassCardSx}>
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} mb={2}>Create Project</Typography>
                                <form onSubmit={createProject}>
                                    <Stack spacing={2}>
                                        <TextField
                                            label="Project title"
                                            value={projectForm.data.title}
                                            onChange={(event) => projectForm.setData('title', event.target.value)}
                                            error={Boolean(projectForm.errors.title)}
                                            helperText={projectForm.errors.title}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Description"
                                            multiline
                                            minRows={3}
                                            value={projectForm.data.description}
                                            onChange={(event) => projectForm.setData('description', event.target.value)}
                                            error={Boolean(projectForm.errors.description)}
                                            helperText={projectForm.errors.description}
                                            fullWidth
                                        />
                                        <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ alignSelf: 'flex-start', textTransform: 'none' }}>
                                            Create Project
                                        </Button>
                                    </Stack>
                                </form>
                            </CardContent>
                        </Card>

                        {!hasProjects && (
                            <Card sx={glassCardSx}>
                                <CardContent>
                                    <Typography color="text.secondary">No projects yet. Use the form above to create your first project.</Typography>
                                </CardContent>
                            </Card>
                        )}

                        <Stack spacing={3}>
                            {localProjects.map((project) => {
                                const progress = calculateProgress(project)

                                return (
                                    <Card key={project.id} sx={glassCardSx}>
                                        <CardContent>
                                            <Stack spacing={2}>
                                                <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                                                    <Stack spacing={0.5}>
                                                        <Typography variant="h6" fontWeight={700}>{project.title}</Typography>
                                                        <Typography color="text.secondary">{project.description || 'No description provided.'}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={1}>
                                                        <Button component={Link} href={route('projects.show', project.id)} size="small" startIcon={<OpenInNewIcon />} sx={{ textTransform: 'none' }}>
                                                            Open
                                                        </Button>
                                                        <IconButton onClick={() => setEditProject({ id: project.id, title: project.title, description: project.description ?? '' })}>
                                                            <EditIcon fontSize="small" />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => setDeleteProjectId(project.id)}>
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    </Stack>
                                                </Stack>

                                                <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 8 }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {progress}% completed ({project.completed_tasks_count ?? 0}/{project.tasks_count ?? project.tasks?.length ?? 0})
                                                </Typography>
                                                <Divider />

                                                <Stack spacing={1.2}>
                                                    {project.tasks?.map((task) => (
                                                        <Stack key={task.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1, borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.04) }}>
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <IconButton size="small" onClick={() => toggleTask(task.id)}>
                                                                    {task.completed ? <CheckCircleIcon color="success" fontSize="small" /> : <RadioButtonUncheckedIcon fontSize="small" />}
                                                                </IconButton>
                                                                <Typography sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</Typography>
                                                            </Stack>
                                                            <Stack direction="row" spacing={0.5}>
                                                                <IconButton size="small" onClick={() => setEditTask({ id: task.id, title: task.title })}>
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                                <IconButton size="small" color="error" onClick={() => deleteTask(task.id)}>
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </Stack>
                                                        </Stack>
                                                    ))}
                                                    <Stack direction="row" spacing={1}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            placeholder="New task"
                                                            value={taskInputs[project.id] ?? ''}
                                                            onChange={(event) => setTaskInputs((prev) => ({ ...prev, [project.id]: event.target.value }))}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Enter') {
                                                                    createTask(project.id)
                                                                }
                                                            }}
                                                        />
                                                        <Button variant="contained" onClick={() => createTask(project.id)} sx={{ textTransform: 'none' }}>
                                                            Add
                                                        </Button>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </Stack>
                        {!Array.isArray(projects) && projects?.last_page > 1 && (
                            <Stack direction="row" spacing={1} justifyContent="center">
                                <Button
                                    component={Link}
                                    href={projects.prev_page_url ?? '#'}
                                    preserveScroll
                                    disabled={!projects.prev_page_url}
                                    variant="outlined"
                                    sx={{ textTransform: 'none' }}
                                >
                                    Previous
                                </Button>
                                <Chip label={`Page ${projects.current_page} of ${projects.last_page}`} />
                                <Button
                                    component={Link}
                                    href={projects.next_page_url ?? '#'}
                                    preserveScroll
                                    disabled={!projects.next_page_url}
                                    variant="outlined"
                                    sx={{ textTransform: 'none' }}
                                >
                                    Next
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                </Container>
            </Box>

            <Dialog open={Boolean(editProject)} onClose={() => setEditProject(null)} fullWidth maxWidth="sm">
                <DialogTitle>Edit Project</DialogTitle>
                <DialogContent sx={{ pt: 1 }}>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Title"
                            value={editProject?.title ?? ''}
                            onChange={(event) => setEditProject((prev) => ({ ...prev, title: event.target.value }))}
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            multiline
                            minRows={3}
                            value={editProject?.description ?? ''}
                            onChange={(event) => setEditProject((prev) => ({ ...prev, description: event.target.value }))}
                            fullWidth
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditProject(null)}>Cancel</Button>
                    <Button variant="contained" onClick={updateProject}>Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={Boolean(editTask)} onClose={() => setEditTask(null)} fullWidth maxWidth="xs">
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent sx={{ pt: 1 }}>
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

            <Dialog open={Boolean(deleteProjectId)} onClose={() => setDeleteProjectId(null)}>
                <DialogTitle>Delete Project</DialogTitle>
                <DialogContent>
                    <Typography color="text.secondary">This also removes all tasks in this project.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteProjectId(null)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={() => deleteProject(deleteProjectId)}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
                <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
        </>
    )
}
