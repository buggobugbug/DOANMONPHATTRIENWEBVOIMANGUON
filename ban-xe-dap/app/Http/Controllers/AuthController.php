<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{

    public function register(Request $request)
{
    // Validate dữ liệu
    $request->validate([
        'ten_dang_nhap' => 'required|string|unique:nguoi_dung',
        'mat_khau' => 'required|string|min:6',
        'email' => 'required|email|unique:nguoi_dung',
        'ho_ten' => 'required|string',
        'ma_vai_tro' => 'required|integer',
    ]);

    // Tạo user mới
    $user = User::create([
        'ten_dang_nhap' => $request->ten_dang_nhap,
        'mat_khau' => Hash::make($request->mat_khau), // Mã hóa mật khẩu
        'email' => $request->email,
        'ho_ten' => $request->ho_ten,
        'ma_vai_tro' => $request->ma_vai_tro,
    ]);

    return response()->json([
        'message' => 'Đăng ký thành công!',
        'user' => $user,
    ], 201);
}

    

    /**
     * Đăng nhập và lưu token vào cookies.
     */
    public function login(Request $request)
    {
        // Validate dữ liệu
        $request->validate([
            'ten_dang_nhap' => 'required|string',
            'mat_khau' => 'required|string|min:6',
        ]);
    
        // Lấy user
        $user = User::where('ten_dang_nhap', $request->ten_dang_nhap)->first();
    
        // Kiểm tra user và mật khẩu
        if (!$user || !Hash::check($request->mat_khau, $user->mat_khau)) {
            return response()->json(['message' => 'Tên đăng nhập hoặc mật khẩu không chính xác!'], 401);
        }
    
        // Debug để kiểm tra cột 'ma_nguoi_dung'
        if (!$user->ma_nguoi_dung) {
            return response()->json(['message' => 'Không thể xác định ID người dùng!'], 500);
        }
    
        // Tạo token
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'token' => $token,
            'user' => $user,
        ]);
    }
    
    



    public function logout(Request $request)
    {
        // Xóa tất cả token của người dùng
        $request->user()->tokens()->delete();

        // Xóa cookie
        $cookie = Cookie::forget('token');

        return response()->json(['message' => 'Đăng xuất thành công!'])->withCookie($cookie);
    }
}
