<?php

namespace App\Http\Controllers;

use App\Models\SanPham;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = SanPham::with(['loaisanpham', 'nhasanxuat'])->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tensanpham' => 'required|string|max:255',
            'gia' => 'required|numeric',
            'mota' => 'nullable|string',
            'hinh' => 'nullable|string',
            'soluong' => 'required|integer',
            'maloai' => 'required|exists:loaisanpham,maloai',
            'manhasanxuat' => 'required|exists:nhasanxuat,manhasanxuat',
        ]);

        $product = SanPham::create($request->all());

        return response()->json([
            'message' => 'Sản phẩm được tạo thành công!',
            'data' => $product,
        ], 201);
    }

    public function show($id)
    {
        $product = SanPham::with(['loaisanpham', 'nhasanxuat'])->findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = SanPham::findOrFail($id);

        $request->validate([
            'tensanpham' => 'required|string|max:255',
            'gia' => 'required|numeric',
            'mota' => 'nullable|string',
            'hinh' => 'nullable|string',
            'soluong' => 'required|integer',
            'maloai' => 'required|exists:loaisanpham,maloai',
            'manhasanxuat' => 'required|exists:nhasanxuat,manhasanxuat',
        ]);

        $product->update($request->all());

        return response()->json([
            'message' => 'Sản phẩm được cập nhật thành công!',
            'data' => $product,
        ]);
    }

    public function destroy($id)
    {
        $product = SanPham::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Sản phẩm đã được xóa thành công!',
        ]);
    }
}
