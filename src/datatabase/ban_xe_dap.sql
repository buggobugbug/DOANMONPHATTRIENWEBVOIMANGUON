-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 09, 2025 lúc 02:03 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ban_xe_dap`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giohang`
--

CREATE TABLE `giohang` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `manguoidung` bigint(20) UNSIGNED NOT NULL,
  `masanpham` bigint(20) UNSIGNED NOT NULL,
  `so_luong` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `giohang`
--

INSERT INTO `giohang` (`id`, `manguoidung`, `masanpham`, `so_luong`, `created_at`, `updated_at`) VALUES
(2, 5, 1, 5, '2025-01-08 23:12:14', '2025-01-08 23:12:46');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `maloai` bigint(20) UNSIGNED NOT NULL,
  `tenloai` varchar(255) NOT NULL,
  `trangthai` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `loaisanpham`
--

INSERT INTO `loaisanpham` (`maloai`, `tenloai`, `trangthai`, `created_at`, `updated_at`) VALUES
(1, 'Fixed gear', 1, '2025-01-08 22:58:48', '2025-01-08 22:58:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_12_17_063830_create_vai_tro_table', 1),
(6, '2024_12_17_063950_create_nguoi_dung_table', 1),
(7, '2024_12_20_072106_create_loaisanpham_table', 1),
(8, '2024_12_20_072757_create_nhasanxuat_table', 1),
(9, '2024_12_20_072834_create_sanpham_table', 1),
(10, '2025_01_09_045056_create_gio_hangs_table', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nguoi_dung`
--

CREATE TABLE `nguoi_dung` (
  `ma_nguoi_dung` bigint(20) UNSIGNED NOT NULL,
  `ten_dang_nhap` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `so_dien_thoai` varchar(255) DEFAULT NULL,
  `dia_chi` text DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) NOT NULL,
  `ma_vai_tro` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nguoi_dung`
--

INSERT INTO `nguoi_dung` (`ma_nguoi_dung`, `ten_dang_nhap`, `mat_khau`, `email`, `so_dien_thoai`, `dia_chi`, `anh_dai_dien`, `ho_ten`, `ma_vai_tro`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$ukw7pgtU22oiOy1eynQOB.zNApGSXcfNi1hWy7Rhsnq.wDy2sf6oW', 'admin@example.com', NULL, NULL, NULL, 'Admin User', 1, '2024-12-16 17:14:43', '2024-12-16 17:14:43'),
(5, 'user3', '$2y$10$FPxj5huGu4yGYnq8Xdsnj.d8Obk.wUotFqz9mz6VcDFli./3ZCoAC', 'pinsherlock@gmail.com', '0363507787', 'Trà Vinh', 'avatars/4XpLjmsfIrQTotzv5lqaYtfEMFgAZXYL0BOnHCaG.jpg', 'Huỳnh Nhựt Huy', 2, '2024-12-18 20:00:59', '2024-12-18 20:00:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhasanxuat`
--

CREATE TABLE `nhasanxuat` (
  `manhasanxuat` bigint(20) UNSIGNED NOT NULL,
  `tennhasanxuat` varchar(255) NOT NULL,
  `trangthai` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nhasanxuat`
--

INSERT INTO `nhasanxuat` (`manhasanxuat`, `tennhasanxuat`, `trangthai`, `created_at`, `updated_at`) VALUES
(1, 'Gray', 1, '2025-01-08 22:58:57', '2025-01-08 22:58:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '49c59e826285eaa67855e4e431b2ac8a91aa07acb65bd11e9c9c58c37652391c', '[\"*\"]', '2025-01-08 22:59:23', '2025-01-08 22:58:17', '2025-01-08 22:59:23'),
(2, 'App\\Models\\User', 5, 'auth_token', 'b071d78ffaa2aeb1db8bfed80cf1a619986df63916793aaa94bc1440947ce9c9', '[\"*\"]', NULL, '2025-01-09 04:43:56', '2025-01-09 04:43:56'),
(3, 'App\\Models\\User', 5, 'auth_token', 'ccd4493cbeb00176236fb47a18b59f67094057d81d6e83cb9aede5c441960e1a', '[\"*\"]', NULL, '2025-01-09 04:43:57', '2025-01-09 04:43:57');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `masanpham` bigint(20) UNSIGNED NOT NULL,
  `tensanpham` varchar(255) NOT NULL,
  `gia` int(11) NOT NULL,
  `mota` text DEFAULT NULL,
  `hinh` varchar(255) DEFAULT NULL,
  `soluong` int(11) NOT NULL DEFAULT 0,
  `maloai` bigint(20) UNSIGNED NOT NULL,
  `manhasanxuat` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`masanpham`, `tensanpham`, `gia`, `mota`, `hinh`, `soluong`, `maloai`, `manhasanxuat`, `created_at`, `updated_at`) VALUES
(1, 'Xe đạp fixed gear FordWord', 1200000, 'xe đạp', 'products/3na9xnSL6vwiD1hlYLKqvh58PcxhgFioSBNnBrWj.jpg', 10, 1, 1, '2025-01-08 22:59:23', '2025-01-08 22:59:23');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vai_tro`
--

CREATE TABLE `vai_tro` (
  `ma_vai_tro` bigint(20) UNSIGNED NOT NULL,
  `ten_vai_tro` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `vai_tro`
--

INSERT INTO `vai_tro` (`ma_vai_tro`, `ten_vai_tro`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '2024-12-16 16:42:51', '2024-12-16 16:42:51'),
(2, 'User', '2024-12-16 16:42:51', '2024-12-16 16:42:51');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`id`),
  ADD KEY `giohang_manguoidung_foreign` (`manguoidung`),
  ADD KEY `giohang_masanpham_foreign` (`masanpham`);

--
-- Chỉ mục cho bảng `loaisanpham`
--
ALTER TABLE `loaisanpham`
  ADD PRIMARY KEY (`maloai`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`ma_nguoi_dung`),
  ADD UNIQUE KEY `nguoi_dung_ten_dang_nhap_unique` (`ten_dang_nhap`),
  ADD UNIQUE KEY `nguoi_dung_email_unique` (`email`),
  ADD KEY `nguoi_dung_ma_vai_tro_foreign` (`ma_vai_tro`);

--
-- Chỉ mục cho bảng `nhasanxuat`
--
ALTER TABLE `nhasanxuat`
  ADD PRIMARY KEY (`manhasanxuat`);

--
-- Chỉ mục cho bảng `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`masanpham`),
  ADD KEY `sanpham_maloai_foreign` (`maloai`),
  ADD KEY `sanpham_manhasanxuat_foreign` (`manhasanxuat`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Chỉ mục cho bảng `vai_tro`
--
ALTER TABLE `vai_tro`
  ADD PRIMARY KEY (`ma_vai_tro`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `giohang`
--
ALTER TABLE `giohang`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `loaisanpham`
--
ALTER TABLE `loaisanpham`
  MODIFY `maloai` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  MODIFY `ma_nguoi_dung` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `nhasanxuat`
--
ALTER TABLE `nhasanxuat`
  MODIFY `manhasanxuat` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `masanpham` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `vai_tro`
--
ALTER TABLE `vai_tro`
  MODIFY `ma_vai_tro` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `giohang_manguoidung_foreign` FOREIGN KEY (`manguoidung`) REFERENCES `nguoi_dung` (`ma_nguoi_dung`) ON DELETE CASCADE,
  ADD CONSTRAINT `giohang_masanpham_foreign` FOREIGN KEY (`masanpham`) REFERENCES `sanpham` (`masanpham`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD CONSTRAINT `nguoi_dung_ma_vai_tro_foreign` FOREIGN KEY (`ma_vai_tro`) REFERENCES `vai_tro` (`ma_vai_tro`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_maloai_foreign` FOREIGN KEY (`maloai`) REFERENCES `loaisanpham` (`maloai`) ON DELETE CASCADE,
  ADD CONSTRAINT `sanpham_manhasanxuat_foreign` FOREIGN KEY (`manhasanxuat`) REFERENCES `nhasanxuat` (`manhasanxuat`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
