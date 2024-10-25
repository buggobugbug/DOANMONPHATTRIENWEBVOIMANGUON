<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHoaDonTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hoa_don', function (Blueprint $table) {
            $table->id('ma_hoa_don'); // Tạo khóa chính
            $table->foreignId('ma_khach_hang')->constrained('khach_hang', 'ma_khach_hang'); // Khóa ngoại
            $table->decimal('tong_tien', 10, 2); // Tổng tiền
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hoa_don');
    }
}
