<!-- resources/views/create.blade.php -->
@extends('layouts.app')

@section('content')
    <h1 class="mb-4">Thêm sản phẩm mới</h1>

    <form action="/san_pham" method="POST" enctype="multipart/form-data">
        @csrf
        <div class="mb-3">
            <label for="ten" class="form-label">Tên sản phẩm</label>
            <input type="text" class="form-control" id="ten" name="ten" required>
        </div>
        <div class="mb-3">
            <label for="mo_ta" class="form-label">Mô tả</label>
            <textarea class="form-control" id="mo_ta" name="mo_ta"></textarea>
        </div>
        <div class="mb-3">
            <label for="gia" class="form-label">Giá</label>
            <input type="number" class="form-control" id="gia" name="gia" required>
        </div>
        <div class="mb-3">
            <label for="so_luong" class="form-label">Số lượng</label>
            <input type="number" class="form-control" id="so_luong" name="so_luong" required>
        </div>
        <div class="mb-3">
            <label for="hinh_anh" class="form-label">Tải hình ảnh</label>
            <input type="file" class="form-control" id="hinh_anh" name="hinh_anh" accept="image/*" required>
        </div>
        <button type="submit" class="btn btn-primary">Thêm sản phẩm</button>
    </form>
@endsection
