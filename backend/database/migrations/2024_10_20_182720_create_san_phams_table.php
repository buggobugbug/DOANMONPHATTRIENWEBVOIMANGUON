<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('san_phams', function (Blueprint $table) {
            $table->id('ma_san_pham');  // Khóa chính
            $table->string('ten');      // Tên sản phẩm
            $table->text('mo_ta')->nullable();  // Mô tả sản phẩm
            $table->decimal('gia', 10, 2);  // Giá sản phẩm
            $table->integer('so_luong');    // Số lượng sản phẩm
            $table->string('hinh_anh')->nullable();  // Hình ảnh sản phẩm
            $table->timestamps();  // created_at và updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('san_phams');
    }
};
