<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Đăng ký người dùng
    public function register(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'ten' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:khach_hang',
            'mat_khau' => 'required|string|min:8|confirmed', // Yêu cầu xác nhận mật khẩu
            'so_dien_thoai' => 'nullable|string|max:20',
            'dia_chi' => 'nullable|string|max:255',
            'ma_phan_quyen' => 'nullable|integer', // Nếu có phân quyền
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Tạo mới khách hàng
        $khachHang = KhachHang::create([
            'ten' => $request->ten,
            'email' => $request->email,
            'mat_khau' => Hash::make($request->mat_khau), // Mã hóa mật khẩu
            'so_dien_thoai' => $request->so_dien_thoai,
            'dia_chi' => $request->dia_chi,
            'ma_phan_quyen' => $request->ma_phan_quyen,
        ]);

        return response()->json(['message' => 'Đăng ký thành công', 'khach_hang' => $khachHang], 201);
    }

    // Đăng nhập người dùng
    public function login(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'mat_khau' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Kiểm tra thông tin đăng nhập
        $khachHang = KhachHang::where('email', $request->email)->first();

        if (!$khachHang || !Hash::check($request->mat_khau, $khachHang->mat_khau)) {
            return response()->json(['message' => 'Thông tin đăng nhập không chính xác'], 401);
        }

        // Tạo token (có thể dùng JWT hoặc bất kỳ cách nào khác mà bạn muốn)
        $token = $khachHang->createToken('MyApp')->plainTextToken;

        return response()->json(['message' => 'Đăng nhập thành công', 'token' => $token], 200);
    }
}
