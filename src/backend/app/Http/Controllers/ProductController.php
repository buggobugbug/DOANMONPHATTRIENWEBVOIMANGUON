<?php

namespace App\Http\Controllers;

use App\Models\SanPham;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'soluong' => 'required|integer',
            'maloai' => 'required|exists:loaisanpham,maloai',
            'manhasanxuat' => 'required|exists:nhasanxuat,manhasanxuat',
            'hinh' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate file ảnh
        ]);

        // Xử lý upload file
        $filePath = null;
        if ($request->hasFile('hinh')) {
            $filePath = $request->file('hinh')->store('products', 'public');
        }

        $product = SanPham::create(array_merge(
            $request->all(),
            ['hinh' => $filePath]
        ));

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
            'hinh' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate file ảnh
            'soluong' => 'required|integer',
            'maloai' => 'required|exists:loaisanpham,maloai',
            'manhasanxuat' => 'required|exists:nhasanxuat,manhasanxuat',
        ]);

        // Xử lý upload file mới
        if ($request->hasFile('hinh')) {
            // Xóa ảnh cũ nếu tồn tại
            if ($product->hinh) {
                Storage::disk('public')->delete($product->hinh);
            }

            $filePath = $request->file('hinh')->store('products', 'public');
            $product->hinh = $filePath;
        }

        $product->update($request->except(['hinh']));

        return response()->json([
            'message' => 'Sản phẩm được cập nhật thành công!',
            'data' => $product,
        ]);
    }

    public function destroy($id)
    {
        $product = SanPham::findOrFail($id);

        // Xóa ảnh nếu tồn tại
        if ($product->hinh) {
            Storage::disk('public')->delete($product->hinh);
        }

        $product->delete();

        return response()->json([
            'message' => 'Sản phẩm đã được xóa thành công!',
        ]);
    }
}
