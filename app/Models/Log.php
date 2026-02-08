<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $connection = 'sqlite_logs';

    protected $fillable = [
        'user_id',
        'ip_address',
        'user_agent',
        'url',
        'method',];

    public $timestamps = false; // Solo usamos created_at

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
