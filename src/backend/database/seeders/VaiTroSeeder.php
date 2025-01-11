<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VaiTroSeeder extends Seeder
{
    public function run()
    {
        DB::table('vai_tro')->insert([
            ['ten_vai_tro' => 'Admin', 'created_at' => now(), 'updated_at' => now()],
            ['ten_vai_tro' => 'User', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
