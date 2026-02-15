<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::firstOrCreate([
            'email' => 'test@example.com',
        ], [
            'name' => 'Test User',
            'password' => bcrypt('password'),
        ]);

        $demoUser = User::firstOrCreate([
            'email' => 'demo@tracker.test',
        ], [
            'name' => 'Demo Manager',
            'password' => bcrypt('password'),
        ]);

        if ($demoUser->projects()->exists()) {
            return;
        }

        $projectBlueprints = [
            [
                'title' => 'Website Redesign',
                'description' => 'Modernize the public website and ship the new brand system.',
                'tasks' => [
                    ['title' => 'Audit current pages', 'completed' => true],
                    ['title' => 'Build UI component library', 'completed' => true],
                    ['title' => 'Migrate landing page', 'completed' => false],
                    ['title' => 'QA cross-browser issues', 'completed' => false],
                ],
            ],
            [
                'title' => 'Mobile App MVP',
                'description' => 'Launch a basic iOS and Android app with onboarding and project sync.',
                'tasks' => [
                    ['title' => 'Define API contracts', 'completed' => true],
                    ['title' => 'Implement authentication flow', 'completed' => false],
                    ['title' => 'Build dashboard screen', 'completed' => false],
                    ['title' => 'Prepare TestFlight build', 'completed' => false],
                ],
            ],
            [
                'title' => 'Ops Automation',
                'description' => 'Reduce release friction by automating deployment and monitoring.',
                'tasks' => [
                    ['title' => 'Set up CI pipeline', 'completed' => true],
                    ['title' => 'Add staging smoke tests', 'completed' => true],
                    ['title' => 'Configure rollback script', 'completed' => false],
                    ['title' => 'Create on-call runbook', 'completed' => false],
                ],
            ],
        ];

        foreach ($projectBlueprints as $blueprint) {
            $project = Project::create([
                'user_id' => $demoUser->id,
                'title' => $blueprint['title'],
                'description' => $blueprint['description'],
            ]);

            foreach ($blueprint['tasks'] as $task) {
                Task::create([
                    'project_id' => $project->id,
                    'title' => $task['title'],
                    'completed' => $task['completed'],
                ]);
            }
        }
    }
}
