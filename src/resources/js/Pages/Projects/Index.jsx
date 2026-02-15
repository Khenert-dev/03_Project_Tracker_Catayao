import { useForm, router, Link } from '@inertiajs/react'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    Card,
    CardContent,
    Stack,
    TextField,
    IconButton,
    Divider
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function Index({ projects = [], auth }) {

    const projectForm = useForm({
        title: '',
        description: ''
    })

    const taskForm = useForm({
        project_id: '',
        title: ''
    })

    const createProject = (e) => {
        e.preventDefault()
        projectForm.post(route('projects.store'), {
            onSuccess: () => projectForm.reset()
        })
    }

    const createTask = (projectId) => {
        taskForm.setData('project_id', projectId)

        taskForm.post(route('tasks.store'), {
            onSuccess: () => taskForm.reset()
        })
    }

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    background: alpha('#ffffff', 0.6),
                    backdropFilter: 'blur(14px)',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    color: '#0f172a'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Button
                            component={Link}
                            href={route('dashboard')}
                            startIcon={<ArrowBackIcon />}
                            sx={{ color: '#0f172a' }}
                        >
                            Dashboard
                        </Button>

                        <Typography variant="h6" fontWeight={900}>
                            Projects
                        </Typography>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    minHeight: '100vh',
                    background:
                        'linear-gradient(135deg,#fdfcf8 0%,#f6f1e7 100%)',
                    py: 6
                }}
            >
                <Container maxWidth="lg">

                    {/* CREATE PROJECT */}
                    <Card
                        sx={{
                            mb: 6,
                            background: alpha('#ffffff', 0.75),
                            backdropFilter: 'blur(18px)',
                            border: '1px solid rgba(0,0,0,0.05)',
                            borderRadius: 4
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                fontWeight={800}
                                mb={3}
                                sx={{ color: '#0f172a' }}
                            >
                                Create New Project
                            </Typography>

                            <form onSubmit={createProject}>
                                <Stack spacing={3}>
                                    <TextField
                                        label="Project Title"
                                        value={projectForm.data.title}
                                        onChange={(e) =>
                                            projectForm.setData('title', e.target.value)
                                        }
                                        fullWidth
                                    />

                                    <TextField
                                        label="Description"
                                        value={projectForm.data.description}
                                        onChange={(e) =>
                                            projectForm.setData('description', e.target.value)
                                        }
                                        multiline
                                        rows={3}
                                        fullWidth
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            alignSelf: 'flex-start',
                                            background: '#0f172a',
                                            '&:hover': {
                                                background: '#1e293b'
                                            }
                                        }}
                                    >
                                        Create Project
                                    </Button>
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>

                    {/* PROJECT LIST */}
                    <Stack spacing={4}>
                        {projects.map(project => (
                            <Card
                                key={project.id}
                                sx={{
                                    background: alpha('#ffffff', 0.75),
                                    backdropFilter: 'blur(18px)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    borderRadius: 4
                                }}
                            >
                                <CardContent>

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mb={2}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            sx={{ color: '#0f172a' }}
                                        >
                                            {project.title}
                                        </Typography>

                                        <IconButton
                                            onClick={() =>
                                                router.delete(route('projects.destroy', project.id))
                                            }
                                            sx={{ color: '#dc2626' }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Stack>

                                    <Typography
                                        variant="body2"
                                        sx={{ color: '#475569', mb: 3 }}
                                    >
                                        {project.description}
                                    </Typography>

                                    <Divider sx={{ mb: 3 }} />

                                    {/* TASKS */}
                                    <Stack spacing={2}>
                                        {project.tasks?.map(task => (
                                            <Stack
                                                key={task.id}
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                sx={{
                                                    p: 2,
                                                    background: '#f1f5f9',
                                                    borderRadius: 3
                                                }}
                                            >
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    alignItems="center"
                                                >
                                                    <IconButton
                                                        onClick={() =>
                                                            router.patch(
                                                                route('tasks.toggle', task.id)
                                                            )
                                                        }
                                                        sx={{
                                                            color: task.completed
                                                                ? '#16a34a'
                                                                : '#94a3b8'
                                                        }}
                                                    >
                                                        {task.completed
                                                            ? <CheckCircleIcon />
                                                            : <RadioButtonUncheckedIcon />}
                                                    </IconButton>

                                                    <Typography
                                                        sx={{
                                                            textDecoration:
                                                                task.completed
                                                                    ? 'line-through'
                                                                    : 'none',
                                                            color: '#0f172a'
                                                        }}
                                                    >
                                                        {task.title}
                                                    </Typography>
                                                </Stack>

                                                <IconButton
                                                    onClick={() =>
                                                        router.delete(
                                                            route('tasks.destroy', task.id)
                                                        )
                                                    }
                                                    sx={{ color: '#dc2626' }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        ))}

                                        {/* ADD TASK */}
                                        <Stack direction="row" spacing={2}>
                                            <TextField
                                                size="small"
                                                placeholder="New task"
                                                value={taskForm.data.title}
                                                onChange={(e) =>
                                                    taskForm.setData('title', e.target.value)
                                                }
                                                fullWidth
                                            />

                                            <Button
                                                variant="contained"
                                                sx={{
                                                    background: '#0f172a',
                                                    '&:hover': {
                                                        background: '#1e293b'
                                                    }
                                                }}
                                                onClick={() => createTask(project.id)}
                                            >
                                                Add
                                            </Button>
                                        </Stack>

                                    </Stack>

                                </CardContent>
                            </Card>
                        ))}
                    </Stack>

                </Container>
            </Box>
        </>
    )
}