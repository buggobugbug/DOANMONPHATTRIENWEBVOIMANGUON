<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhaSanXuat extends Model
{
    use HasFactory;

    protected $table = 'nhasanxuat';
    protected $primaryKey = 'manhasanxuat';

    protected $fillable = ['tennhasanxuat', 'trangthai'];

    public function sanphams()
    {
        return $this->hasMany(SanPham::class, 'manhasanxuat', 'manhasanxuat');
    }
}
