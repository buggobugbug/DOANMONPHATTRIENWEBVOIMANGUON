<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GioHang extends Model
{
    use HasFactory;

    protected $table = 'gio_hang'; // Tên bảng
    protected $primaryKey = 'ma_gio_hang'; // Khóa chính
    protected $fillable = ['ma_khach_hang', 'ma_san_pham', 'so_luong']; // Các trường có thể được gán hàng loạt

    // Quan hệ với bảng khach_hang
    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'ma_khach_hang', 'ma_khach_hang');
    }

    // Quan hệ với bảng san_pham
    public function sanPham()
    {
        return $this->belongsTo(SanPham::class, 'ma_san_pham', 'ma_san_pham');
    }
}
