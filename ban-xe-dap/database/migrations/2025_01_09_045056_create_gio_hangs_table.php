<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGiohangsTable extends Migration
{
    public function up()
{
    if (!Schema::hasTable('giohang')) {
        Schema::create('giohang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('manguoidung');
            $table->unsignedBigInteger('masanpham');
            $table->integer('so_luong');
            $table->timestamps();
        
            $table->foreign('manguoidung')->references('ma_nguoi_dung')->on('nguoi_dung')->onDelete('cascade'); // Đảm bảo tên bảng và cột là đúng
            $table->foreign('masanpham')->references('masanpham')->on('sanpham')->onDelete('cascade');
        });
    }
}


    public function down()
    {
        Schema::dropIfExists('giohang');
    }
}
