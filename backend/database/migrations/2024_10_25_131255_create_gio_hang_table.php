<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGioHangTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gio_hang', function (Blueprint $table) {
            $table->id('ma_gio_hang'); // Tạo khóa chính
            $table->foreignId('ma_khach_hang')->constrained('khach_hang', 'ma_khach_hang'); // Khóa ngoại
            $table->foreignId('ma_san_pham')->constrained('san_phams', 'ma_san_pham'); // Khóa ngoại
            $table->integer('so_luong'); // Số lượng
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gio_hang');
    }
}
