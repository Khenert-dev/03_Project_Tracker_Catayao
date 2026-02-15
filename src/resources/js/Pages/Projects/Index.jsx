import { useForm, router } from '@inertiajs/react'
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    TextField,
    Stack,
    Select,
    MenuItem,
    IconButton,
    Divider
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

export default function Index({ projects = [] }) {

    const projectForm = useForm({
        title: '',
        description: ''
    })

    const taskForm = useForm({
        project_id: '',
        title: '',
        description: '',
        priority: 'medium'
    })

    const createProject = (e) => {
        e.preventDefault()
        projectForm.post('/projects', {
            onSuccess: () => projectForm.reset()
        })
    }

    const createTask = (projectId) => {
        taskForm.setData('project_id', projectId)

        taskForm.post('/tasks', {
            onSuccess: () => taskForm.reset()
        })
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                p: 6,
                background: 'linear-gradient(135deg,#0f2027,#203a43,#2c5364)'
            }}
        >
            <Typography
                variant="h4"
                sx={{ color: 'white', mb: 4, fontWeight: 700 }}
            >
                Project Tracker
            </Typography>

            {/* Create Project */}
            <Card
                sx={{
                    mb: 5,
                    backdropFilter: 'blur(20px)',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 4,
                    color: 'white'
                }}
            >
                <CardContent>
                    <form onSubmit={createProject}>
                        <Stack spacing={2}>
                            <TextField
                                label="Project Title"
                                value={projectForm.data.title}
                                onChange={e => projectForm.setData('title', e.target.value)}
                                fullWidth
                                InputLabelProps={{ style: { color: '#fff' } }}
                                sx={{ input: { color: 'white' } }}
                            />
                            <TextField
                                label="Description"
                                value={projectForm.data.description}
                                onChange={e => projectForm.setData('description', e.target.value)}
                                fullWidth
                                InputLabelProps={{ style: { color: '#fff' } }}
                                sx={{ input: { color: 'white' } }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    background: 'linear-gradient(45deg,#00c6ff,#0072ff)',
                                    borderRadius: 3
                                }}
                            >
                                Create Project
                            </Button>
                        </Stack>
                    </form>
                </CardContent>
            </Card>

            {/* Projects */}
            <Stack spacing={4}>
                {projects?.map(project => (
                    <Card
                        key={project.id}
                        sx={{
                            backdropFilter: 'blur(25px)',
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: 4,
                            color: 'white',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.4)'
                        }}
                    >
                        <CardContent>

                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography variant="h6" fontWeight={600}>
                                    {project.title}
                                </Typography>

                                <IconButton
                                    onClick={() =>
                                        router.delete(`/projects/${project.id}`)
                                    }
                                    sx={{ color: '#ff6b6b' }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Stack>

                            <Typography
                                variant="body2"
                                sx={{ opacity: 0.8, mb: 3 }}
                            >
                                {project.description}
                            </Typography>

                            <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

                            <Stack spacing={2}>
                                {project.tasks?.map(task => (
                                    <Card
                                        key={task.id}
                                        sx={{
                                            background: 'rgba(0,0,0,0.4)',
                                            borderRadius: 3,
                                            p: 2,
                                            border: '1px solid rgba(255,255,255,0.08)'
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <IconButton
                                                    onClick={() =>
                                                        router.post(`/tasks/${task.id}/toggle-status`)
                                                    }
                                                    sx={{
                                                        color: task.status === 'completed'
                                                            ? '#4caf50'
                                                            : '#aaa'
                                                    }}
                                                >
                                                    {task.status === 'completed'
                                                        ? <CheckCircleIcon />
                                                        : <RadioButtonUncheckedIcon />}
                                                </IconButton>

                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            textDecoration:
                                                                task.status === 'completed'
                                                                    ? 'line-through'
                                                                    : 'none'
                                                        }}
                                                    >
                                                        {task.title}
                                                    </Typography>

                                                    <Typography variant="caption">
                                                        {task.priority?.toUpperCase()}
                                                    </Typography>
                                                </Box>
                                            </Stack>

                                            <IconButton
                                                onClick={() =>
                                                    router.delete(`/tasks/${task.id}`)
                                                }
                                                sx={{ color: '#ff6b6b' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </Card>
                                ))}

                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        size="small"
                                        placeholder="New task"
                                        value={taskForm.data.title}
                                        onChange={e =>
                                            taskForm.setData('title', e.target.value)
                                        }
                                        sx={{ input: { color: 'white' } }}
                                    />

                                    <Select
                                        size="small"
                                        value={taskForm.data.priority}
                                        onChange={e =>
                                            taskForm.setData('priority', e.target.value)
                                        }
                                        sx={{ color: 'white', minWidth: 120 }}
                                    >
                                        <MenuItem value="low">Low</MenuItem>
                                        <MenuItem value="medium">Medium</MenuItem>
                                        <MenuItem value="high">High</MenuItem>
                                    </Select>

                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: 'linear-gradient(45deg,#ff512f,#dd2476)',
                                            borderRadius: 3
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

        </Box>
    )
}