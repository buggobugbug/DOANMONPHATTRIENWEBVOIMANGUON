<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Giohang extends Model
{
    use HasFactory;

    protected $table = 'giohang';

    protected $fillable = [
        'manguoidung',
        'masanpham',
        'so_luong',
    ];

    // Quan hệ với bảng Nguoidung
    public function nguoidung()
    {
        return $this->belongsTo(Nguoidung::class, 'manguoidung', 'ma_nguoi_dung');
    }

    // Quan hệ với bảng Sanpham
    public function sanpham()
    {
        return $this->belongsTo(Sanpham::class, 'masanpham', 'ma_san_pham');
    }
}
