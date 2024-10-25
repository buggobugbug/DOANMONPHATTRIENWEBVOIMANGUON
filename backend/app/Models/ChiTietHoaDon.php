<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietHoaDon extends Model
{
    use HasFactory;

    protected $table = 'chi_tiet_hoa_don'; // Tên bảng
    protected $primaryKey = 'ma_chi_tiet_hoa_don'; // Khóa chính
    protected $fillable = ['ma_hoa_don', 'ma_san_pham', 'so_luong', 'don_gia']; // Các trường có thể được gán hàng loạt

    // Quan hệ với bảng hoa_don
    public function hoaDon()
    {
        return $this->belongsTo(HoaDon::class, 'ma_hoa_don', 'ma_hoa_don');
    }

    // Quan hệ với bảng san_pham
    public function sanPham()
    {
        return $this->belongsTo(SanPham::class, 'ma_san_pham', 'ma_san_pham');
    }
}
