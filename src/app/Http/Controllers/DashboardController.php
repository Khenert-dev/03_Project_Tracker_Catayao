<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $projects = Project::with('tasks')
            ->where('user_id', $user->id)
            ->get();

        $projectIds = $projects->pluck('id');

        $totalProjects = $projects->count();

        $totalTasks = Task::whereIn('project_id', $projectIds)->count();

        $completedTasks = Task::whereIn('project_id', $projectIds)
            ->where('completed', true)
            ->count();

        $overdueTasks = 0;

        $activity = Task::whereIn('project_id', $projectIds)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalProjects' => $totalProjects,
                'totalTasks' => $totalTasks,
                'completedTasks' => $completedTasks,
                'overdueTasks' => $overdueTasks,
            ],
            'projects' => $projects,
            'activity' => $activity,
        ]);
    }
}