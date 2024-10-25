<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class KhachHang extends Model
{
    use HasFactory, HasApiTokens;

    protected $table = 'khach_hang'; // Tên bảng
    protected $primaryKey = 'ma_khach_hang'; // Khóa chính
    protected $fillable = ['ten', 'email', 'mat_khau', 'so_dien_thoai', 'dia_chi', 'ma_phan_quyen']; // Các trường có thể được gán hàng loạt

    // Quan hệ với bảng phan_quyen
    public function phanQuyen()
    {
        return $this->belongsTo(PhanQuyen::class, 'ma_phan_quyen', 'ma_phan_quyen');
    }

    // Quan hệ với bảng hoa_don
    public function hoaDons()
    {
        return $this->hasMany(HoaDon::class, 'ma_khach_hang', 'ma_khach_hang');
    }

    // Quan hệ với bảng gio_hang
    public function gioHangs()
    {
        return $this->hasMany(GioHang::class, 'ma_khach_hang', 'ma_khach_hang');
    }
}
