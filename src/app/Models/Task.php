<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    public const PRIORITY_LOW = 'low';
    public const PRIORITY_MEDIUM = 'medium';
    public const PRIORITY_HIGH = 'high';
    public const PRIORITY_OPTIONS = [
        self::PRIORITY_LOW,
        self::PRIORITY_MEDIUM,
        self::PRIORITY_HIGH,
    ];

    public const STATUS_PENDING = 'pending';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_OPTIONS = [
        self::STATUS_PENDING,
        self::STATUS_COMPLETED,
    ];

    protected $fillable = [
        'project_id',
        'title',
        'description',
        'priority',
        'status',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
