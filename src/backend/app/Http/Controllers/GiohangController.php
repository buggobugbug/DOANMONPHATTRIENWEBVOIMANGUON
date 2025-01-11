<?php

namespace App\Http\Controllers;

use App\Models\Giohang;
use Illuminate\Http\Request;

class GiohangController extends Controller
{
    // Lấy danh sách sản phẩm trong giỏ hàng của người dùng
    public function index($manguoidung)
    {
        $giohang = Giohang::with('sanpham')
            ->where('manguoidung', $manguoidung)
            ->get();

        return response()->json($giohang);
    }

    // Thêm sản phẩm vào giỏ hàng
    public function store(Request $request)
    {
        $request->validate([
            'manguoidung' => 'required|exists:nguoi_dung,ma_nguoi_dung', // Kiểm tra khóa ngoại người dùng
            'masanpham' => 'required|exists:sanpham,masanpham', // Kiểm tra khóa ngoại sản phẩm
            'so_luong' => 'required|integer|min:1',
        ]);

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        $giohang = Giohang::where('manguoidung', $request->manguoidung)
            ->where('masanpham', $request->masanpham)
            ->first();

        if ($giohang) {
            // Nếu đã tồn tại, tăng số lượng
            $giohang->so_luong += $request->so_luong;
            $giohang->save();
        } else {
            // Nếu chưa tồn tại, tạo mới
            $giohang = Giohang::create($request->all());
        }

        return response()->json(['message' => 'Thêm vào giỏ hàng thành công!', 'data' => $giohang], 201);
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    public function update(Request $request, $id)
    {
        $request->validate([
            'so_luong' => 'required|integer|min:1',
        ]);

        $giohang = Giohang::findOrFail($id);
        $giohang->update(['so_luong' => $request->so_luong]);

        return response()->json(['message' => 'Cập nhật số lượng thành công!', 'data' => $giohang]);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function destroy($id)
    {
        $giohang = Giohang::findOrFail($id);
        $giohang->delete();

        return response()->json(['message' => 'Xóa sản phẩm khỏi giỏ hàng thành công!']);
    }
}
