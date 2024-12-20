<?php

namespace App\Http\Controllers;

use App\Models\LoaiSanPham;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = LoaiSanPham::all();
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tenloai' => 'required|string|max:255',
            'trangthai' => 'required|integer',
        ]);

        $category = LoaiSanPham::create($request->only(['tenloai', 'trangthai']));

        return response()->json([
            'message' => 'Loại sản phẩm được tạo thành công!',
            'data' => $category,
        ], 201);
    }

    public function show($id)
    {
        $category = LoaiSanPham::findOrFail($id);
        return response()->json($category);
    }

    public function update(Request $request, $id)
    {
        $category = LoaiSanPham::findOrFail($id);

        $request->validate([
            'tenloai' => 'required|string|max:255',
            'trangthai' => 'required|integer',
        ]);

        $category->update($request->only(['tenloai', 'trangthai']));

        return response()->json([
            'message' => 'Loại sản phẩm được cập nhật thành công!',
            'data' => $category,
        ]);
    }

    public function destroy($id)
    {
        $category = LoaiSanPham::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Loại sản phẩm đã được xóa thành công!',
        ]);
    }
}
