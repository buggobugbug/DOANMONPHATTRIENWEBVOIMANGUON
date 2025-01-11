<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanPham extends Model
{
    use HasFactory;

    protected $table = 'sanpham';
    protected $primaryKey = 'masanpham';

    protected $fillable = [
        'tensanpham',
        'gia',
        'mota',
        'hinh',
        'soluong',
        'maloai',
        'manhasanxuat',
    ];

    public function loaisanpham()
    {
        return $this->belongsTo(LoaiSanPham::class, 'maloai', 'maloai');
    }

    public function nhasanxuat()
    {
        return $this->belongsTo(NhaSanXuat::class, 'manhasanxuat', 'manhasanxuat');
    }
}
