<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNguoiDungTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('nguoi_dung', function (Blueprint $table) {
        $table->id('ma_nguoi_dung');
        $table->string('ten_dang_nhap')->unique();
        $table->string('mat_khau');
        $table->string('email')->unique();
        $table->string('so_dien_thoai')->nullable();
        $table->text('dia_chi')->nullable();
        $table->string('anh_dai_dien')->nullable();
        $table->string('ho_ten');
        $table->unsignedBigInteger('ma_vai_tro');
        $table->timestamps();

        $table->foreign('ma_vai_tro')->references('ma_vai_tro')->on('vai_tro');
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nguoi_dung');
    }
}
