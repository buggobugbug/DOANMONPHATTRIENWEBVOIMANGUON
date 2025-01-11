<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('ma_vai_tro', 2)->get(); // Lấy danh sách người dùng bình thường
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'ten_dang_nhap' => 'required|string|unique:nguoi_dung',
            'mat_khau' => 'required|string|min:6',
            'email' => 'required|email|unique:nguoi_dung',
            'ho_ten' => 'required|string',
            'so_dien_thoai' => 'nullable|string',
            'dia_chi' => 'nullable|string',
            'anh_dai_dien' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'ma_vai_tro' => 'required|integer',
        ]);

        $filePath = null;
        if ($request->hasFile('anh_dai_dien')) {
            $filePath = $request->file('anh_dai_dien')->store('users', 'public');
        }

        $user = User::create([
            'ten_dang_nhap' => $request->ten_dang_nhap,
            'mat_khau' => Hash::make($request->mat_khau),
            'email' => $request->email,
            'ho_ten' => $request->ho_ten,
            'so_dien_thoai' => $request->so_dien_thoai,
            'dia_chi' => $request->dia_chi,
            'anh_dai_dien' => $filePath,
            'ma_vai_tro' => $request->ma_vai_tro,
        ]);

        return response()->json([
            'message' => 'Người dùng được thêm thành công!',
            'data' => $user,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Log dữ liệu để kiểm tra
        \Log::info('Dữ liệu nhận được từ frontend:', $request->all());

        $request->validate([
            'ten_dang_nhap' => 'required|string|unique:nguoi_dung,ten_dang_nhap,' . $id . ',ma_nguoi_dung',
            'email' => 'required|email|unique:nguoi_dung,email,' . $id . ',ma_nguoi_dung',
            'ho_ten' => 'required|string',
            'so_dien_thoai' => 'nullable|string',
            'dia_chi' => 'nullable|string',
            'anh_dai_dien' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('anh_dai_dien')) {
            if ($user->anh_dai_dien) {
                Storage::disk('public')->delete($user->anh_dai_dien);
            }
            $filePath = $request->file('anh_dai_dien')->store('users', 'public');
            $user->anh_dai_dien = $filePath;
        }

        $user->update($request->only([
            'ten_dang_nhap', 'email', 'ho_ten', 'so_dien_thoai', 'dia_chi', 'ma_vai_tro'
        ]));

        return response()->json([
            'message' => 'Người dùng được cập nhật thành công!',
            'data' => $user,
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user->anh_dai_dien) {
            Storage::disk('public')->delete($user->anh_dai_dien);
        }

        $user->delete();

        return response()->json([
            'message' => 'Người dùng đã được xóa thành công!',
        ]);
    }

    public function show($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Người dùng không tồn tại!'], 404);
        }

        return response()->json($user);
    }
}
