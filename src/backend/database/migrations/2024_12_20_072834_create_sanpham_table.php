<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSanphamTable extends Migration
{
    public function up()
    {
        Schema::create('sanpham', function (Blueprint $table) {
            $table->id('masanpham');
            $table->string('tensanpham');
            $table->integer('gia');
            $table->text('mota')->nullable();
            $table->string('hinh')->nullable();
            $table->integer('soluong')->default(0);

            // Khóa ngoại
            $table->unsignedBigInteger('maloai');
            $table->unsignedBigInteger('manhasanxuat');

            $table->foreign('maloai')->references('maloai')->on('loaisanpham')->onDelete('cascade');
            $table->foreign('manhasanxuat')->references('manhasanxuat')->on('nhasanxuat')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sanpham');
    }
}
