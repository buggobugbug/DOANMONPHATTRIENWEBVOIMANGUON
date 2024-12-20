<?php

namespace App\Http\Controllers;

use App\Models\NhaSanXuat;
use Illuminate\Http\Request;

class ManufacturerController extends Controller
{
    public function index()
    {
        $manufacturers = NhaSanXuat::all();
        return response()->json($manufacturers);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tennhasanxuat' => 'required|string|max:255',
            'trangthai' => 'required|integer',
        ]);

        $manufacturer = NhaSanXuat::create($request->only(['tennhasanxuat', 'trangthai']));

        return response()->json([
            'message' => 'Nhà sản xuất được tạo thành công!',
            'data' => $manufacturer,
        ], 201);
    }

    public function show($id)
    {
        $manufacturer = NhaSanXuat::findOrFail($id);
        return response()->json($manufacturer);
    }

    public function update(Request $request, $id)
    {
        $manufacturer = NhaSanXuat::findOrFail($id);

        $request->validate([
            'tennhasanxuat' => 'required|string|max:255',
            'trangthai' => 'required|integer',
        ]);

        $manufacturer->update($request->only(['tennhasanxuat', 'trangthai']));

        return response()->json([
            'message' => 'Nhà sản xuất được cập nhật thành công!',
            'data' => $manufacturer,
        ]);
    }

    public function destroy($id)
    {
        $manufacturer = NhaSanXuat::findOrFail($id);
        $manufacturer->delete();

        return response()->json([
            'message' => 'Nhà sản xuất đã được xóa thành công!',
        ]);
    }
}
