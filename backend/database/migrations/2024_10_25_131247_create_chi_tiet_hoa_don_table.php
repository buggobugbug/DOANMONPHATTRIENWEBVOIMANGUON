<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChiTietHoaDonTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chi_tiet_hoa_don', function (Blueprint $table) {
            $table->id('ma_chi_tiet_hoa_don'); // Tạo khóa chính
            $table->foreignId('ma_hoa_don')->constrained('hoa_don', 'ma_hoa_don'); // Khóa ngoại
            $table->foreignId('ma_san_pham')->constrained('san_phams', 'ma_san_pham'); // Khóa ngoại
            $table->integer('so_luong'); // Số lượng
            $table->decimal('don_gia', 10, 2); // Đơn giá
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chi_tiet_hoa_don');
    }
}
