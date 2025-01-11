<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoaisanphamTable extends Migration
{
    public function up()
    {
        Schema::create('loaisanpham', function (Blueprint $table) {
            $table->id('maloai');
            $table->string('tenloai');
            $table->boolean('trangthai')->default(1); // Trạng thái (1: hoạt động, 0: không hoạt động)
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('loaisanpham');
    }
}
