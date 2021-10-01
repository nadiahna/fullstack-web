-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 01 Okt 2021 pada 15.51
-- Versi server: 10.4.18-MariaDB
-- Versi PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fullstack_web`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `performance_reviews`
--

CREATE TABLE `performance_reviews` (
  `id` int(11) NOT NULL,
  `id_reviewer` int(11) DEFAULT NULL,
  `id_reviewer_recipient` int(11) DEFAULT NULL,
  `reviewer` varchar(255) DEFAULT NULL,
  `reviewer_recipient` varchar(255) DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `performance_reviews`
--

INSERT INTO `performance_reviews` (`id`, `id_reviewer`, `id_reviewer_recipient`, `reviewer`, `reviewer_recipient`, `score`, `createdAt`, `updatedAt`) VALUES
(1, 10, 5, 'dona', 'hilal', '99', '2021-09-30 12:58:54', '2021-10-01 12:18:53'),
(2, 4, 6, 'nadiah', 'otniel', NULL, '2021-09-30 12:58:54', '2021-09-30 12:58:54'),
(3, 5, 4, 'hilal', 'nadiah', '5', '2021-09-30 13:43:57', '2021-10-01 11:15:39'),
(5, 3, 4, 'super admin', 'nadiah', '3', '2021-10-01 03:34:09', '2021-10-01 03:34:09'),
(6, 5, 6, 'hilal', 'otniel', NULL, '2021-10-01 03:41:59', '2021-10-01 03:41:59'),
(7, 4, 5, 'nadiah admin', 'hilal', '33', '2021-10-01 03:42:57', '2021-10-01 03:42:57');

-- --------------------------------------------------------

--
-- Struktur dari tabel `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '2021-09-24 15:25:02', '2021-09-24 15:25:02'),
(2, 'user', '2021-09-24 15:25:02', '2021-09-24 15:25:02');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'nadiah admin', 'admin', 'admin@gmail.com', 'admin123', '2021-09-24 17:35:05', '2021-09-24 17:35:05'),
(2, 'user nadiah', 'user', 'user@gmail.com', 'user', '2021-09-24 17:35:05', '2021-09-24 17:35:05'),
(3, 'super admin', 'admin_nadiah', 'admin1@gmail.com', '$2a$08$B6q4aDogDUl0RkTfVDVaR.SV0dkWKqcfqsKMM0IULRicRGxjKxlYO', '2021-09-24 16:44:48', '2021-09-24 16:44:48'),
(4, 'nadiah', 'user_nadiah', 'user1@gmail.com', '$2a$08$RsfnlZBYvYDOZfaHsygrw.DcBKsAzusFEP41OOwBCd4ZXw0xKFriq', '2021-09-24 16:58:49', '2021-09-27 13:15:06'),
(5, 'hilal', 'hilal-arsa', 'hilal@gmail.com', '$2a$08$VvX6YCiMXweDcrNEROmC5.hDH46zYnyrWaZqhzm/nkrMFpZV2j7cW', '2021-09-25 09:46:20', '2021-09-25 09:46:20'),
(6, 'otniel', 'otniel', 'otniel@gmail.com', '$2a$08$E3yrHzBvgqNOtVfg10WCVOSASmUX4zS4Ku643bRrZ.IsNdhA02ZCm', '2021-09-25 13:35:33', '2021-09-25 13:35:33'),
(10, 'dona', 'dona', 'dona@gmail.com', '$2a$08$vYdoE.eFxRcIx.9DYmAvn.CX4tEMp/.tNgzeMf6nQl7YeyXvAfB76', '2021-09-27 13:36:49', '2021-09-27 13:36:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('2021-09-24 17:36:30', '2021-09-24 17:36:30', 1, 1),
('2021-09-24 16:44:48', '2021-09-24 16:44:48', 1, 3),
('2021-09-24 17:36:30', '2021-09-24 17:36:30', 2, 2),
('2021-09-24 16:58:49', '2021-09-24 16:58:49', 2, 4),
('2021-09-25 09:46:20', '2021-09-25 09:46:20', 2, 5),
('2021-09-25 13:35:33', '2021-09-25 13:35:33', 2, 6),
('2021-09-27 13:36:49', '2021-09-27 13:36:49', 2, 10);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `performance_reviews`
--
ALTER TABLE `performance_reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `performance_reviews_id_reviewer_id_reviewer_recipient_unique` (`id_reviewer`,`id_reviewer_recipient`),
  ADD KEY `id_reviewer_recipient` (`id_reviewer_recipient`);

--
-- Indeks untuk tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `performance_reviews`
--
ALTER TABLE `performance_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `performance_reviews`
--
ALTER TABLE `performance_reviews`
  ADD CONSTRAINT `performance_reviews_ibfk_1` FOREIGN KEY (`id_reviewer`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `performance_reviews_ibfk_2` FOREIGN KEY (`id_reviewer_recipient`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
