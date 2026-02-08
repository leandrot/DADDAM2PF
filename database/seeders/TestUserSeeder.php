<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'leandrot@gmail.com'],
            [
                'name' => 'Leandro',
                'password' => Hash::make('3tt'),
            ]
        );
    }
}
