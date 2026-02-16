<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->index(['user_id', 'created_at'], 'projects_user_created_idx');
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->index(['project_id', 'created_at'], 'tasks_project_created_idx');
            $table->index(['project_id', 'status'], 'tasks_project_status_idx');
        });
    }

    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropIndex('tasks_project_created_idx');
            $table->dropIndex('tasks_project_status_idx');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropIndex('projects_user_created_idx');
        });
    }
};
