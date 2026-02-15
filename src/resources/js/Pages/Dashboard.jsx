import { Head, router, Link } from '@inertiajs/react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Grid,
    Card,
    CardContent,
    Stack,
    LinearProgress,
    Chip,
    Divider,
    TextField,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Snackbar,
    Alert,
    Skeleton,
    Fade
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import AddIcon from '@mui/icons-material/Add'
import { useEffect, useMemo, useState } from 'react'

export default function Dashboard({
    auth,
    stats = {},
    projects = [],
    activity = []
}) {
    const [localProjects, setLocalProjects] = useState(projects)
    const [newTask, setNewTask] = useState({})
    const [loadingTaskIds, setLoadingTaskIds] = useState([])
    const [creatingTaskFor, setCreatingTaskFor] = useState(null)
    const [deletingProjectId, setDeletingProjectId] = useState(null)
    const [confirmDeleteId, setConfirmDeleteId] = useState(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

    useEffect(() => {
        setLocalProjects(projects)
    }, [projects])

    const calculateProgress = (project) => {
        if (!project.tasks?.length) return 0
        const completed = project.tasks.filter(t => t.completed).length
        return Math.round((completed / project.tasks.length) * 100)
    }

    const toggleTask = (taskId) => {
        setLoadingTaskIds(prev => [...prev, taskId])

        setLocalProjects(prev =>
            prev.map(project => ({
                ...project,
                tasks: project.tasks?.map(task =>
                    task.id === taskId
                        ? { ...task, completed: !task.completed }
                        : task
                )
            }))
        )

        router.patch(route('tasks.toggle', taskId), {}, {
            preserveScroll: true,
            onError: () => {
                setSnackbar({
                    open: true,
                    message: 'Failed to update task.',
                    severity: 'error'
                })
            },
            onFinish: () => {
                setLoadingTaskIds(prev => prev.filter(id => id !== taskId))
            }
        })
    }

    const createTask = (projectId) => {
        const title = newTask[projectId]?.trim()
        if (!title) return

        setCreatingTaskFor(projectId)

        router.post(route('tasks.store'), {
            project_id: projectId,
            title
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setNewTask(prev => ({ ...prev, [projectId]: '' }))
                setSnackbar({
                    open: true,
                    message: 'Task created successfully.',
                    severity: 'success'
                })
            },
            onError: () => {
                setSnackbar({
                    open: true,
                    message: 'Failed to create task.',
                    severity: 'error'
                })
            },
            onFinish: () => {
                setCreatingTaskFor(null)
            }
        })
    }

    const deleteProject = (id) => {
        setDeletingProjectId(id)

        setLocalProjects(prev => prev.filter(p => p.id !== id))

        router.delete(route('projects.destroy', id), {
            preserveScroll: true,
            onError: () => {
                setSnackbar({
                    open: true,
                    message: 'Failed to delete project.',
                    severity: 'error'
                })
            },
            onFinish: () => {
                setDeletingProjectId(null)
                setConfirmDeleteId(null)
            }
        })
    }

    const hasProjects = useMemo(() => localProjects?.length > 0, [localProjects])

    return (
        <>
            <Head title="Dashboard" />

            <Container maxWidth="lg">
                <Box py={6}>

                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5}>
                        <Typography
                            variant="h4"
                            fontWeight={800}
                            sx={{ letterSpacing: -0.5 }}
                        >
                            Dashboard
                        </Typography>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            component={Link}
                            href={route('projects.index')}
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                px: 3
                            }}
                        >
                            Add Project
                        </Button>
                    </Stack>

                    {!hasProjects && (
                        <Card
                            sx={{
                                borderRadius: 3,
                                border: theme => `1px dashed ${alpha(theme.palette.text.primary, 0.2)}`,
                                backgroundColor: theme => alpha(theme.palette.primary.main, 0.02)
                            }}
                        >
                            <CardContent>
                                <Stack spacing={2} alignItems="center" py={4}>
                                    <Typography variant="h6" fontWeight={700}>
                                        No projects yet
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Start by creating your first project.
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href={route('projects.index')}
                                        startIcon={<AddIcon />}
                                        sx={{ textTransform: 'none', borderRadius: 2 }}
                                    >
                                        Create Project
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    )}

                    <Grid container spacing={4}>
                        {localProjects.map(project => {
                            const progress = calculateProgress(project)

                            return (
                                <Grid item xs={12} md={6} key={project.id}>
                                    <Fade in timeout={300}>
                                        <Card
                                            sx={{
                                                borderRadius: 3,
                                                transition: '0.25s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-4px)',
                                                    boxShadow: 6
                                                }
                                            }}
                                        >
                                            <CardContent>
                                                <Stack spacing={3}>

                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Typography fontWeight={700} variant="h6">
                                                            {project.title}
                                                        </Typography>

                                                        <Chip
                                                            label={`${progress}%`}
                                                            color={progress === 100 ? 'success' : 'default'}
                                                            sx={{ fontWeight: 600 }}
                                                        />
                                                    </Stack>

                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={progress}
                                                        sx={{
                                                            height: 8,
                                                            borderRadius: 5
                                                        }}
                                                    />

                                                    <Stack spacing={1.5}>
                                                        {project.tasks?.length === 0 && (
                                                            <Typography variant="body2" color="text.secondary">
                                                                No tasks yet.
                                                            </Typography>
                                                        )}

                                                        {project.tasks?.map(task => {
                                                            const isLoading = loadingTaskIds.includes(task.id)

                                                            return (
                                                                <Stack
                                                                    key={task.id}
                                                                    direction="row"
                                                                    justifyContent="space-between"
                                                                    alignItems="center"
                                                                >
                                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={() => toggleTask(task.id)}
                                                                            disabled={isLoading}
                                                                        >
                                                                            {task.completed
                                                                                ? <CheckCircleIcon color="success" fontSize="small" />
                                                                                : <RadioButtonUncheckedIcon fontSize="small" />
                                                                            }
                                                                        </IconButton>

                                                                        <Typography
                                                                            sx={{
                                                                                textDecoration: task.completed ? 'line-through' : 'none',
                                                                                color: task.completed ? 'text.secondary' : 'text.primary'
                                                                            }}
                                                                        >
                                                                            {task.title}
                                                                        </Typography>
                                                                    </Stack>
                                                                </Stack>
                                                            )
                                                        })}
                                                    </Stack>

                                                    <Stack direction="row" spacing={1}>
                                                        <TextField
                                                            size="small"
                                                            fullWidth
                                                            placeholder="New task..."
                                                            value={newTask[project.id] || ''}
                                                            onChange={(e) =>
                                                                setNewTask(prev => ({
                                                                    ...prev,
                                                                    [project.id]: e.target.value
                                                                }))
                                                            }
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    createTask(project.id)
                                                                }
                                                            }}
                                                        />

                                                        <Button
                                                            variant="contained"
                                                            disabled={creatingTaskFor === project.id}
                                                            onClick={() => createTask(project.id)}
                                                            sx={{ textTransform: 'none', borderRadius: 2 }}
                                                        >
                                                            Add
                                                        </Button>
                                                    </Stack>

                                                    <Divider />

                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Button
                                                            size="small"
                                                            component={Link}
                                                            href={route('projects.show', project.id)}
                                                            startIcon={<OpenInNewIcon />}
                                                            sx={{ textTransform: 'none' }}
                                                        >
                                                            Open
                                                        </Button>

                                                        <Button
                                                            size="small"
                                                            color="error"
                                                            startIcon={<DeleteIcon />}
                                                            disabled={deletingProjectId === project.id}
                                                            onClick={() => setConfirmDeleteId(project.id)}
                                                            sx={{ textTransform: 'none' }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Stack>

                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                </Grid>
                            )
                        })}
                    </Grid>

                </Box>
            </Container>

            <Dialog
                open={Boolean(confirmDeleteId)}
                onClose={() => setConfirmDeleteId(null)}
            >
                <DialogTitle>Delete Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone. All associated tasks will be permanently removed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteId(null)}>
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        onClick={() => deleteProject(confirmDeleteId)}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    )
}