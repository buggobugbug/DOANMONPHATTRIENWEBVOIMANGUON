<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNhasanxuatTable extends Migration
{
    public function up()
    {
        Schema::create('nhasanxuat', function (Blueprint $table) {
            $table->id('manhasanxuat');
            $table->string('tennhasanxuat');
            $table->boolean('trangthai')->default(1); // Trạng thái
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('nhasanxuat');
    }
}
