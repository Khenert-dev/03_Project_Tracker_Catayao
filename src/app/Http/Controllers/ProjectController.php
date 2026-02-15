<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::where('user_id', auth()->id())->get();

        return Inertia::render('Projects/Index', [
            'projects' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        Project::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description']
        ]);

        return back();
    }

    public function show(Project $project)
    {
        $project->load('tasks');

        return Inertia::render('Projects/Show', [
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $project->update($validated);

        return back();
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return back();
    }
}