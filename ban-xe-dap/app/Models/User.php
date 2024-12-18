<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $table = 'nguoi_dung'; // Trỏ đến bảng 'nguoi_dung'

    protected $primaryKey = 'ma_nguoi_dung'; // Đặt khóa chính là 'ma_nguoi_dung'

    public $incrementing = true; // Đặt true nếu cột khóa chính tự tăng
    protected $keyType = 'int'; // Loại khóa chính

    protected $fillable = [
        'ten_dang_nhap',
        'mat_khau',
        'email',
        'ho_ten',
        'ma_vai_tro',
    ];

    protected $hidden = [
        'mat_khau',
    ];

    public function getAuthPassword()
    {
        return $this->mat_khau; // Trỏ đến cột mật khẩu
    }
}
