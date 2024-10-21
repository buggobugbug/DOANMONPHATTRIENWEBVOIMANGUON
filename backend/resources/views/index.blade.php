<!-- resources/views/index.blade.php -->
@extends('layouts.app')

@section('content')
    <h1 class="mb-4">Danh sách sản phẩm</h1>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Hình ảnh</th>
                <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($sanPhams as $sanPham)
            <tr>
                <td>{{ $sanPham->ma_san_pham }}</td>
                <td>{{ $sanPham->ten }}</td>
                <td>{{ $sanPham->mo_ta }}</td>
                <td>{{ $sanPham->gia }}</td>
                <td>{{ $sanPham->so_luong }}</td>
                <td>
                    @if ($sanPham->hinh_anh)
                        <img src="{{ $sanPham->hinh_anh }}" alt="Hình ảnh sản phẩm" width="100">
                    @else
                        Chưa có hình ảnh
                    @endif
                </td>
                <td>
                    <a href="/san_pham/{{ $sanPham->ma_san_pham }}/edit" class="btn btn-primary btn-sm">Sửa</a>
                    <form action="/san_pham/{{ $sanPham->ma_san_pham }}" method="POST" style="display:inline-block;">
                        @csrf
                        @method('DELETE')
                        <button class="btn btn-danger btn-sm">Xóa</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
@endsection
