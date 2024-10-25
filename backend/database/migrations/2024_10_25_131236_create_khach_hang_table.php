<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKhachHangTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('khach_hang', function (Blueprint $table) {
            $table->id('ma_khach_hang'); // Tạo khóa chính
            $table->string('ten', 255); // Tên khách hàng
            $table->string('email', 255)->unique(); // Địa chỉ email
            $table->string('mat_khau', 255); // Mật khẩu
            $table->string('so_dien_thoai', 20)->nullable(); // Số điện thoại
            $table->string('dia_chi')->nullable(); // Địa chỉ
            $table->foreignId('ma_phan_quyen')->nullable()->constrained('phan_quyen', 'ma_phan_quyen'); // Khóa ngoại
            $table->timestamps(); // Thời gian tạo và cập nhật
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('khach_hang');
    }
}
