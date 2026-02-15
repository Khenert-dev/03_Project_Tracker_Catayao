<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => [
                'required',
                Rule::exists('projects', 'id')->where('user_id', auth()->id()),
            ],
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
        $this->authorize('delete', $task);

        $task->delete();

        return back();
    }

    public function update(Request $request, Task $task)
    {
        $this->authorize('update', $task);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $task->update([
            'title' => $validated['title'],
        ]);

        return back();
    }

    public function toggle(Task $task)
    {
        $this->authorize('update', $task);

        $task->update([
            'completed' => ! $task->completed,
        ]);

        return back();
    }
}
