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
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import LogoutIcon from '@mui/icons-material/Logout'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskIcon from '@mui/icons-material/Task'
import { useEffect, useMemo, useState } from 'react'

const statCards = [
    { key: 'totalProjects', label: 'Projects', icon: <AssignmentIcon fontSize="small" /> },
    { key: 'totalTasks', label: 'Tasks', icon: <TaskIcon fontSize="small" /> },
    { key: 'completedTasks', label: 'Completed', icon: <CheckCircleIcon fontSize="small" /> },
]

export default function Dashboard({
    stats = {},
    projects = [],
    activity = [],
}) {
    const [localProjects, setLocalProjects] = useState(projects)
    const [newTask, setNewTask] = useState({})
    const [loadingTaskIds, setLoadingTaskIds] = useState([])
    const [creatingTaskFor, setCreatingTaskFor] = useState(null)
    const [deletingProjectId, setDeletingProjectId] = useState(null)
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
    const glassCardSx = {
        borderRadius: 3,
        background: alpha('#ffffff', 0.78),
        backdropFilter: 'blur(12px)',
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
    }

    useEffect(() => {
        setLocalProjects(projects)
    }, [projects])

    const hasProjects = useMemo(() => localProjects.length > 0, [localProjects])

    const calculateProgress = (project) => {
        const total = project.tasks_count ?? project.tasks?.length ?? 0
        if (!total) return 0
        const completed = project.completed_tasks_count ?? project.tasks?.filter((task) => task.completed).length ?? 0
        return Math.round((completed / total) * 100)
    }

    const toggleTask = (taskId) => {
        setLoadingTaskIds((prev) => [...prev, taskId])
        setLocalProjects((prev) => prev.map((project) => {
            let delta = 0

            const tasks = project.tasks?.map((task) => {
                if (task.id !== taskId) return task
                const nextCompleted = !task.completed
                delta = nextCompleted ? 1 : -1
                return { ...task, completed: nextCompleted }
            })

            return {
                ...project,
                completed_tasks_count: Math.max(0, (project.completed_tasks_count ?? 0) + delta),
                tasks,
            }
        }))

        router.patch(route('tasks.toggle', taskId), {}, {
            preserveScroll: true,
            onError: () => setSnackbar({ open: true, message: 'Failed to update task.', severity: 'error' }),
            onFinish: () => setLoadingTaskIds((prev) => prev.filter((id) => id !== taskId)),
        })
    }

    const createTask = (projectId) => {
        const title = (newTask[projectId] ?? '').trim()
        if (!title) return

        setCreatingTaskFor(projectId)
        router.post(route('tasks.store'), { project_id: projectId, title }, {
            preserveScroll: true,
            onSuccess: () => {
                setNewTask((prev) => ({ ...prev, [projectId]: '' }))
                setSnackbar({ open: true, message: 'Task created.', severity: 'success' })
            },
            onError: () => setSnackbar({ open: true, message: 'Failed to create task.', severity: 'error' }),
            onFinish: () => setCreatingTaskFor(null),
        })
    }

    const deleteTask = (taskId) => {
        router.delete(route('tasks.destroy', taskId), {
            preserveScroll: true,
            onSuccess: () => setSnackbar({ open: true, message: 'Task deleted.', severity: 'success' }),
            onError: () => setSnackbar({ open: true, message: 'Failed to delete task.', severity: 'error' }),
        })
    }

    const deleteProject = (projectId) => {
        setDeletingProjectId(projectId)
        setLocalProjects((prev) => prev.filter((project) => project.id !== projectId))

        router.delete(route('projects.destroy', projectId), {
            preserveScroll: true,
            onError: () => setSnackbar({ open: true, message: 'Failed to delete project.', severity: 'error' }),
            onFinish: () => {
                setDeletingProjectId(null)
                setConfirmDeleteId(null)
            },
        })
    }

    return (
        <>
            <Head title="Dashboard" />

            <Box
                sx={{
                    minHeight: '100vh',
                    py: { xs: 4, md: 6 },
                    background: 'linear-gradient(145deg, #fef7ec 0%, #f3f8ff 55%, #eff9f2 100%)',
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={4}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
                            <Typography variant="h4" fontWeight={800}>Dashboard</Typography>
                            <Stack direction="row" spacing={1.5}>
                                <Button variant="contained" startIcon={<AddIcon />} component={Link} href={route('projects.index')} sx={{ textTransform: 'none' }}>
                                    Manage Projects
                                </Button>
                                <Button variant="outlined" color="inherit" startIcon={<LogoutIcon />} onClick={() => router.post(route('logout'))} sx={{ textTransform: 'none' }}>
                                    Logout
                                </Button>
                            </Stack>
                        </Stack>

                        <Grid container spacing={2}>
                            {statCards.map((item) => (
                                <Grid item xs={12} md={4} key={item.key}>
                                    <Card sx={glassCardSx}>
                                        <CardContent>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Box>
                                                    <Typography color="text.secondary">{item.label}</Typography>
                                                    <Typography variant="h5" fontWeight={800}>{stats[item.key] ?? 0}</Typography>
                                                </Box>
                                                <Chip icon={item.icon} label="Live" size="small" />
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {!hasProjects && (
                            <Card sx={{ ...glassCardSx, border: (theme) => `1px dashed ${alpha(theme.palette.text.primary, 0.25)}` }}>
                                <CardContent>
                                    <Stack spacing={2} alignItems="center" py={2}>
                                        <Typography variant="h6" fontWeight={700}>No projects yet</Typography>
                                        <Typography color="text.secondary">Create your first project to start tracking work.</Typography>
                                        <Button variant="contained" component={Link} href={route('projects.index')} startIcon={<AddIcon />} sx={{ textTransform: 'none' }}>
                                            Create Project
                                        </Button>
                                    </Stack>
                                </CardContent>
                            </Card>
                        )}

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8}>
                                <Stack spacing={3}>
                                    {localProjects.map((project) => {
                                        const progress = calculateProgress(project)

                                        return (
                                            <Card key={project.id} sx={glassCardSx}>
                                                <CardContent>
                                                    <Stack spacing={2}>
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                            <Typography variant="h6" fontWeight={700}>{project.title}</Typography>
                                                            <Chip label={`${progress}%`} color={progress === 100 ? 'success' : 'default'} />
                                                        </Stack>

                                                        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 8 }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {project.completed_tasks_count ?? 0}/{project.tasks_count ?? project.tasks?.length ?? 0} completed
                                                        </Typography>

                                                        <Stack spacing={1}>
                                                            {project.tasks?.length === 0 && (
                                                                <Typography variant="body2" color="text.secondary">No tasks yet.</Typography>
                                                            )}
                                                            {project.tasks?.map((task) => {
                                                                const isLoading = loadingTaskIds.includes(task.id)

                                                                return (
                                                                    <Stack key={task.id} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1, borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.04) }}>
                                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                                            <IconButton size="small" onClick={() => toggleTask(task.id)} disabled={isLoading}>
                                                                                {task.completed ? <CheckCircleIcon color="success" fontSize="small" /> : <RadioButtonUncheckedIcon fontSize="small" />}
                                                                            </IconButton>
                                                                            <Typography sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</Typography>
                                                                        </Stack>
                                                                        <IconButton size="small" color="error" onClick={() => deleteTask(task.id)}>
                                                                            <DeleteIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </Stack>
                                                                )
                                                            })}
                                                        </Stack>

                                                        <Stack direction="row" spacing={1}>
                                                            <TextField
                                                                size="small"
                                                                fullWidth
                                                                placeholder="Add task"
                                                                value={newTask[project.id] ?? ''}
                                                                onChange={(event) => setNewTask((prev) => ({ ...prev, [project.id]: event.target.value }))}
                                                                onKeyDown={(event) => {
                                                                    if (event.key === 'Enter') createTask(project.id)
                                                                }}
                                                            />
                                                            <Button variant="contained" onClick={() => createTask(project.id)} disabled={creatingTaskFor === project.id} sx={{ textTransform: 'none' }}>
                                                                Add
                                                            </Button>
                                                        </Stack>

                                                        <Divider />
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                            <Button size="small" component={Link} href={route('projects.show', project.id)} startIcon={<OpenInNewIcon />} sx={{ textTransform: 'none' }}>
                                                                Open
                                                            </Button>
                                                            <Button size="small" color="error" startIcon={<DeleteIcon />} disabled={deletingProjectId === project.id} onClick={() => setConfirmDeleteId(project.id)} sx={{ textTransform: 'none' }}>
                                                                Delete
                                                            </Button>
                                                        </Stack>
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                        )
                                    })}
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Card sx={glassCardSx}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight={700} mb={2}>Recent Activity</Typography>
                                        <Stack spacing={1}>
                                            {activity.length === 0 && (
                                                <Typography variant="body2" color="text.secondary">No recent activity.</Typography>
                                            )}
                                            {activity.map((task) => (
                                                <Stack key={task.id} sx={{ p: 1.2, borderRadius: 2, backgroundColor: (theme) => alpha(theme.palette.text.primary, 0.04) }}>
                                                    <Typography variant="body2" fontWeight={600}>{task.title}</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {task.completed ? 'Completed' : 'In progress'}
                                                    </Typography>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Stack>
                </Container>
            </Box>

            <Dialog open={Boolean(confirmDeleteId)} onClose={() => setConfirmDeleteId(null)}>
                <DialogTitle>Delete Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This will permanently remove the project and all of its tasks.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={() => deleteProject(confirmDeleteId)}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
        </>
    )
}
