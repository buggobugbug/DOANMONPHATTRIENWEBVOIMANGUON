<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HoaDon extends Model
{
    use HasFactory;

    protected $table = 'hoa_don'; // Tên bảng
    protected $primaryKey = 'ma_hoa_don'; // Khóa chính
    protected $fillable = ['ma_khach_hang', 'tong_tien']; // Các trường có thể được gán hàng loạt

    // Quan hệ với bảng khach_hang
    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'ma_khach_hang', 'ma_khach_hang');
    }

    // Quan hệ với bảng chi_tiet_hoa_don
    public function chiTietHoaDons()
    {
        return $this->hasMany(ChiTietHoaDon::class, 'ma_hoa_don', 'ma_hoa_don');
    }
}
