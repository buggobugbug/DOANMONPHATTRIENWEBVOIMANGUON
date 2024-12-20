<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoaiSanPham extends Model
{
    use HasFactory;

    protected $table = 'loaisanpham';
    protected $primaryKey = 'maloai';

    protected $fillable = ['tenloai', 'trangthai'];

    public function sanphams()
    {
        return $this->hasMany(SanPham::class, 'maloai', 'maloai');
    }
}
