<?php

namespace App\Http\Controllers;

use App\Models\SanPham;
use Illuminate\Http\Request;

class SanPhamController extends Controller
{
    // Lấy danh sách tất cả sản phẩm (API)
    public function index()
    {
        return response()->json(SanPham::all(), 200);
    }

    // Lấy danh sách tất cả sản phẩm và hiển thị trong bảng (Giao diện)
    public function showIndex()
    {
        $sanPhams = SanPham::all();
        return view('index', compact('sanPhams'));  // Hiển thị tất cả sản phẩm trong bảng
    }

    // Hiển thị form thêm sản phẩm
    public function create()
    {
        return view('create');  // Hiển thị form thêm mới sản phẩm
    }

    // Tạo sản phẩm mới
    public function store(Request $request)
    {
        // Validation cho tất cả các trường
        $validatedData = $request->validate([
            'ten' => 'required|string|max:255',
            'mo_ta' => 'nullable|string',
            'gia' => 'required|numeric',
            'so_luong' => 'required|integer',
            'hinh_anh' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Kiểm tra file hình ảnh
        ]);

        // Xử lý hình ảnh
        if ($request->hasFile('hinh_anh')) {
            $file = $request->file('hinh_anh');
            $filename = time() . '.' . $file->getClientOriginalExtension(); // Tạo tên file duy nhất
            $file->move(public_path('uploads'), $filename); // Di chuyển file vào thư mục 'public/uploads'
        }

        // Tạo sản phẩm mới với tất cả các trường
        $sanPham = SanPham::create([
            'ten' => $validatedData['ten'],
            'mo_ta' => $validatedData['mo_ta'],
            'gia' => $validatedData['gia'],
            'so_luong' => $validatedData['so_luong'],
            'hinh_anh' => 'uploads/' . $filename, // Lưu đường dẫn hình ảnh vào cơ sở dữ liệu
        ]);

        return redirect('/')->with('success', 'Sản phẩm đã được thêm');
    }

    // Lấy thông tin chi tiết sản phẩm (API)
    public function show($id)
    {
        $sanPham = SanPham::find($id);

        if (!$sanPham) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        return response()->json($sanPham);
    }

    // Hiển thị form chỉnh sửa sản phẩm
    public function edit($id)
    {
        $sanPham = SanPham::findOrFail($id);
        return view('edit', compact('sanPham'));  // Hiển thị form để chỉnh sửa sản phẩm
    }

    // Cập nhật sản phẩm
    public function update(Request $request, $id)
    {
        $sanPham = SanPham::findOrFail($id);

        // Validation cho các trường
        $validatedData = $request->validate([
            'ten' => 'required|string|max:255',
            'mo_ta' => 'nullable|string',
            'gia' => 'required|numeric',
            'so_luong' => 'required|integer',
            'hinh_anh' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Kiểm tra file hình ảnh
        ]);

        // Xử lý hình ảnh nếu có
        if ($request->hasFile('hinh_anh')) {
            // Xóa hình ảnh cũ nếu cần
            if ($sanPham->hinh_anh) {
                $oldImagePath = public_path($sanPham->hinh_anh); // Đường dẫn tới hình ảnh cũ
                if (file_exists($oldImagePath)) { // Kiểm tra xem file có tồn tại không
                    unlink($oldImagePath); // Xóa hình ảnh cũ
                }
            }

            // Lấy file hình ảnh mới
            $file = $request->file('hinh_anh');
            $filename = time() . '.' . $file->getClientOriginalExtension(); // Tạo tên file duy nhất
            $file->move(public_path('uploads'), $filename); // Di chuyển file vào thư mục 'public/uploads'
            $validatedData['hinh_anh'] = 'uploads/' . $filename; // Lưu đường dẫn hình ảnh mới vào cơ sở dữ liệu
        } else {
            $validatedData['hinh_anh'] = $sanPham->hinh_anh; // Giữ nguyên hình ảnh cũ nếu không có hình ảnh mới
        }

        // Cập nhật sản phẩm với dữ liệu mới
        $sanPham->update($validatedData);

        return redirect('/')->with('success', 'Sản phẩm đã được cập nhật');
    }

    // Xóa sản phẩm
    public function destroy($id)
    {
        $sanPham = SanPham::findOrFail($id);
        $sanPham->delete();

        return redirect('/')->with('success', 'Sản phẩm đã được xóa');
    }
}
