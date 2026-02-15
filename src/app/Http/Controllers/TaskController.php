<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
        ]);

        Task::create([
            'project_id' => $validated['project_id'],
            'title' => $validated['title'],
            'completed' => false,
        ]);

        return back();
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return back();
    }

    public function toggle(Task $task)
    {
        $task->update([
            'completed' => ! $task->completed
        ]);

        return back();
    }
}