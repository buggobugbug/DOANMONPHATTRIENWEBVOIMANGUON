<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhanQuyen extends Model
{
    use HasFactory;

    protected $table = 'phan_quyen'; // Tên bảng
    protected $primaryKey = 'ma_phan_quyen'; // Khóa chính
    protected $fillable = ['ten_quyen']; // Các trường có thể được gán hàng loạt

    // Quan hệ với bảng khach_hang
    public function khachHangs()
    {
        return $this->hasMany(KhachHang::class, 'ma_phan_quyen', 'ma_phan_quyen');
    }
}
