<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SanPham extends Model
{
    use HasFactory;

    protected $table = 'san_phams';

    // Chỉ định khóa chính
    protected $primaryKey = 'ma_san_pham';

    // Các cột có thể điền được (fillable)
    protected $fillable = [
        'ten',
        'mo_ta',
        'gia',
        'so_luong',
        'hinh_anh',
    ];
}
