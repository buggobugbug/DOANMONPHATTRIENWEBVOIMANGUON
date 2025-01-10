-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2024 at 07:48 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ban_xe_dap`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
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
-- Table structure for table `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `maloai` bigint(20) UNSIGNED NOT NULL,
  `tenloai` varchar(255) NOT NULL,
  `trangthai` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `loaisanpham`
--

INSERT INTO `loaisanpham` (`maloai`, `tenloai`, `trangthai`, `created_at`, `updated_at`) VALUES
(2, 'Xe đạp fixed gear', 1, '2024-12-20 01:28:27', '2024-12-20 01:28:27');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_12_17_063830_create_vai_tro_table', 1),
(6, '2024_12_17_063950_create_nguoi_dung_table', 1),
(7, '2024_12_20_072106_create_loaisanpham_table', 2),
(8, '2024_12_20_072757_create_nhasanxuat_table', 2),
(9, '2024_12_20_072834_create_sanpham_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `nguoi_dung`
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
-- Dumping data for table `nguoi_dung`
--

INSERT INTO `nguoi_dung` (`ma_nguoi_dung`, `ten_dang_nhap`, `mat_khau`, `email`, `so_dien_thoai`, `dia_chi`, `anh_dai_dien`, `ho_ten`, `ma_vai_tro`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$ukw7pgtU22oiOy1eynQOB.zNApGSXcfNi1hWy7Rhsnq.wDy2sf6oW', 'admin@example.com', NULL, NULL, NULL, 'Admin User', 1, '2024-12-17 00:14:43', '2024-12-17 00:14:43'),
(5, 'user3', '$2y$10$FPxj5huGu4yGYnq8Xdsnj.d8Obk.wUotFqz9mz6VcDFli./3ZCoAC', 'pinsherlock@gmail.com', '0363507787', 'Trà Vinh', 'avatars/4XpLjmsfIrQTotzv5lqaYtfEMFgAZXYL0BOnHCaG.jpg', 'Huỳnh Nhựt Huy', 2, '2024-12-19 03:00:59', '2024-12-19 03:00:59');

-- --------------------------------------------------------

--
-- Table structure for table `nhasanxuat`
--

CREATE TABLE `nhasanxuat` (
  `manhasanxuat` bigint(20) UNSIGNED NOT NULL,
  `tennhasanxuat` varchar(255) NOT NULL,
  `trangthai` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nhasanxuat`
--

INSERT INTO `nhasanxuat` (`manhasanxuat`, `tennhasanxuat`, `trangthai`, `created_at`, `updated_at`) VALUES
(1, 'GRAY', 1, '2024-12-20 01:34:50', '2024-12-20 01:34:50');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
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
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '2251fbc5957b069edb7c7c6c610e8655ee71462218b712685d18b47bc4a14fac', '[\"*\"]', NULL, '2024-12-18 08:35:35', '2024-12-18 08:35:35'),
(2, 'App\\Models\\User', 2, 'auth_token', '32c2efff9093e2fd12b5642852b61772f1ca2c1850c8f84b47288c46bf21894e', '[\"*\"]', NULL, '2024-12-18 08:43:53', '2024-12-18 08:43:53'),
(3, 'App\\Models\\User', 2, 'auth_token', '7ea3e00d84e9b4b6c5207d530119e52b147d62f2df96ab809e269ddcc1fa332a', '[\"*\"]', NULL, '2024-12-19 02:12:02', '2024-12-19 02:12:02'),
(4, 'App\\Models\\User', 5, 'auth_token', '5a92f09795859d1875b83a2b876973e27bce15734ec814ef9b3f1e6dd098d282', '[\"*\"]', NULL, '2024-12-19 03:01:57', '2024-12-19 03:01:57'),
(5, 'App\\Models\\User', 5, 'auth_token', '8b55c9c662a03c93bf839396376cdd0ad5f040701fba498f0466651033d11d39', '[\"*\"]', NULL, '2024-12-19 03:09:33', '2024-12-19 03:09:33'),
(6, 'App\\Models\\User', 5, 'auth_token', '12947ea12167860a353481e455be4ac25b4f7146b906b870f6f16592c0fc4200', '[\"*\"]', NULL, '2024-12-19 03:09:46', '2024-12-19 03:09:46'),
(7, 'App\\Models\\User', 5, 'auth_token', 'c0f34fef80405f73a1e50f22850fb0c216783498fda5f1be9c7b94fe189be114', '[\"*\"]', NULL, '2024-12-19 03:12:53', '2024-12-19 03:12:53'),
(8, 'App\\Models\\User', 1, 'auth_token', 'bd0163f50f75418ec6a808ff9d8d9e6da534730ff7c90d232ba39c1cba35d600', '[\"*\"]', NULL, '2024-12-19 03:13:22', '2024-12-19 03:13:22'),
(9, 'App\\Models\\User', 1, 'auth_token', '6e653668b2a2f930daaf34c2b68acad7b653393d0ba37fafe0c48b43a2504df0', '[\"*\"]', NULL, '2024-12-19 23:50:48', '2024-12-19 23:50:48'),
(10, 'App\\Models\\User', 1, 'auth_token', '16725a5082e0f3749c3fd398f21c0a941593a6ae45c559531be446405ca10d92', '[\"*\"]', NULL, '2024-12-19 23:50:50', '2024-12-19 23:50:50'),
(11, 'App\\Models\\User', 1, 'auth_token', '1f8a375aef261842ec6bb068902e0595f1547ec37b6fbe994a2f64caae27eb15', '[\"*\"]', NULL, '2024-12-19 23:51:39', '2024-12-19 23:51:39'),
(12, 'App\\Models\\User', 1, 'auth_token', '9f3934c6b99dba530d879814f029539f457558fa65e7e7bbc50e534411aad689', '[\"*\"]', '2024-12-20 02:04:32', '2024-12-19 23:53:27', '2024-12-20 02:04:32'),
(13, 'App\\Models\\User', 1, 'auth_token', '49dd9c82c88015f5c7ce1331b525f932d01d7e9eff2dc8b7dbb06a32bbb0c831', '[\"*\"]', NULL, '2024-12-19 23:55:12', '2024-12-19 23:55:12'),
(14, 'App\\Models\\User', 1, 'auth_token', '554463da302cc84140936b1150f9d2ff2379f1cd068c7baedddaed5a058cfdb0', '[\"*\"]', NULL, '2024-12-20 00:00:49', '2024-12-20 00:00:49'),
(15, 'App\\Models\\User', 1, 'auth_token', '1c460ad9d022b150f42f05b431914bb5de3b567bc836fbac8bfb46932aa5f8f1', '[\"*\"]', NULL, '2024-12-20 00:01:13', '2024-12-20 00:01:13'),
(16, 'App\\Models\\User', 1, 'auth_token', 'a5b53217ce70fedffb55ef04bbf3950097ac07eb06703deeeb7bee7b770fbd23', '[\"*\"]', NULL, '2024-12-20 02:10:24', '2024-12-20 02:10:24'),
(17, 'App\\Models\\User', 1, 'auth_token', 'cbce146a1b61fac7e0f53f1fbc5a35abd6b0aabe21cedb4e0e5a6b62409470fb', '[\"*\"]', NULL, '2024-12-20 02:27:19', '2024-12-20 02:27:19'),
(18, 'App\\Models\\User', 5, 'auth_token', 'c12e44b716c6be35681538665774d75c23c1783627171990c1dbf9aa71c00d52', '[\"*\"]', NULL, '2024-12-20 02:28:07', '2024-12-20 02:28:07'),
(19, 'App\\Models\\User', 1, 'auth_token', '21059b323ff2065eeb3969195426aa3015b1f61ad5044afd2d6c3dc5f9f44903', '[\"*\"]', NULL, '2024-12-23 01:30:30', '2024-12-23 01:30:30'),
(20, 'App\\Models\\User', 1, 'auth_token', 'fb5463014e0336489cf39e7d60619014373fcb0cdb698bb24d6b9828e7c9c16a', '[\"*\"]', NULL, '2024-12-23 01:30:31', '2024-12-23 01:30:31'),
(21, 'App\\Models\\User', 1, 'auth_token', '3e006ccc5daee6ee9c5fa487dd45d0cc74cd2f85887f280ec8379c83fce6acb1', '[\"*\"]', NULL, '2024-12-23 01:31:14', '2024-12-23 01:31:14'),
(22, 'App\\Models\\User', 1, 'auth_token', '4db73d99f853a0c1480fe2aba1801f10a2d8dd321c7a5df8391e04de66b7a0a7', '[\"*\"]', NULL, '2024-12-23 01:59:19', '2024-12-23 01:59:19'),
(23, 'App\\Models\\User', 1, 'auth_token', 'f38045db7ef2c4ab3b91d9fa0306ba90c853661db4e6cbb90b9fc1d9dfe6cdc5', '[\"*\"]', NULL, '2024-12-23 01:59:20', '2024-12-23 01:59:20'),
(24, 'App\\Models\\User', 1, 'auth_token', '63152449256774058c291a3f608063ae5f30ab6ae1631a1877b15a6af78101bb', '[\"*\"]', NULL, '2024-12-23 01:59:21', '2024-12-23 01:59:21'),
(25, 'App\\Models\\User', 1, 'auth_token', '328b2578237118142fd77608dd5ce573649a25f74b2244e0df58d91fa891a44c', '[\"*\"]', NULL, '2024-12-25 23:21:36', '2024-12-25 23:21:36'),
(26, 'App\\Models\\User', 1, 'auth_token', '39900d4e91367a0f4118b3aaae24a61ce2045241d4b16dbaa87da3ddde2c43f1', '[\"*\"]', '2024-12-25 23:40:27', '2024-12-25 23:21:38', '2024-12-25 23:40:27'),
(27, 'App\\Models\\User', 1, 'auth_token', '8e142606681b3e0254c4e5cea4fc654619c5ea7f90a690f140e999ce7b843013', '[\"*\"]', NULL, '2024-12-26 23:41:34', '2024-12-26 23:41:34'),
(28, 'App\\Models\\User', 1, 'auth_token', '5990057902c55a1856487fecbf173a35c965ed61fc33f440b77ca3a4704c99f3', '[\"*\"]', NULL, '2024-12-26 23:43:31', '2024-12-26 23:43:31');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
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
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`masanpham`, `tensanpham`, `gia`, `mota`, `hinh`, `soluong`, `maloai`, `manhasanxuat`, `created_at`, `updated_at`) VALUES
(3, 'Xe đạp fixed gear FordWord 1', 1200000, 'Xe Đạp Fixed Gear Forward với thiết kế khung nhôm và tay cong cực cá tính. Màu trắng tĩnh điện sơn 3 lớp được trang bị cho xe càng thêm phần nổi bật.', 'products/cF0c06kaeKFfjPvN2XZuPIibGCYykkKouBCpEge1.jpg', 10, 2, 1, '2024-12-25 23:33:59', '2024-12-25 23:40:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
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
-- Table structure for table `vai_tro`
--

CREATE TABLE `vai_tro` (
  `ma_vai_tro` bigint(20) UNSIGNED NOT NULL,
  `ten_vai_tro` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vai_tro`
--

INSERT INTO `vai_tro` (`ma_vai_tro`, `ten_vai_tro`, `created_at`, `updated_at`) VALUES
(1, 'Admin', '2024-12-16 23:42:51', '2024-12-16 23:42:51'),
(2, 'User', '2024-12-16 23:42:51', '2024-12-16 23:42:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `loaisanpham`
--
ALTER TABLE `loaisanpham`
  ADD PRIMARY KEY (`maloai`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD PRIMARY KEY (`ma_nguoi_dung`),
  ADD UNIQUE KEY `nguoi_dung_ten_dang_nhap_unique` (`ten_dang_nhap`),
  ADD UNIQUE KEY `nguoi_dung_email_unique` (`email`),
  ADD KEY `nguoi_dung_ma_vai_tro_foreign` (`ma_vai_tro`);

--
-- Indexes for table `nhasanxuat`
--
ALTER TABLE `nhasanxuat`
  ADD PRIMARY KEY (`manhasanxuat`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`masanpham`),
  ADD KEY `sanpham_maloai_foreign` (`maloai`),
  ADD KEY `sanpham_manhasanxuat_foreign` (`manhasanxuat`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vai_tro`
--
ALTER TABLE `vai_tro`
  ADD PRIMARY KEY (`ma_vai_tro`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loaisanpham`
--
ALTER TABLE `loaisanpham`
  MODIFY `maloai` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  MODIFY `ma_nguoi_dung` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `nhasanxuat`
--
ALTER TABLE `nhasanxuat`
  MODIFY `manhasanxuat` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `masanpham` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vai_tro`
--
ALTER TABLE `vai_tro`
  MODIFY `ma_vai_tro` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `nguoi_dung`
--
ALTER TABLE `nguoi_dung`
  ADD CONSTRAINT `nguoi_dung_ma_vai_tro_foreign` FOREIGN KEY (`ma_vai_tro`) REFERENCES `vai_tro` (`ma_vai_tro`);

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_maloai_foreign` FOREIGN KEY (`maloai`) REFERENCES `loaisanpham` (`maloai`) ON DELETE CASCADE,
  ADD CONSTRAINT `sanpham_manhasanxuat_foreign` FOREIGN KEY (`manhasanxuat`) REFERENCES `nhasanxuat` (`manhasanxuat`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
