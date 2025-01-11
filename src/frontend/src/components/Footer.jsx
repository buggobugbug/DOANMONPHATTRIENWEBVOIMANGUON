import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, Email } from '@mui/icons-material';

const Footer = () => {
    return (
        <footer>
            <Box
                sx={{
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    py: 5,
                    width: '98vw', // Đảm bảo chiếm toàn bộ chiều rộng màn hình
                    margin: 0, // Xóa khoảng trắng hai bên
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1200,
                        margin: '0 auto',
                        px: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 3,
                            mb: 4,
                            borderBottom: '1px solid #444',
                            pb: 4,
                        }}
                    >
                        {/* Cột 1: Về Bike Shop */}
                        <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                            <Typography variant="h6" gutterBottom>
                                Về Bike Shop
                            </Typography>
                            <Typography variant="body2">
                                Bike Shop là địa chỉ cung cấp xe đạp chính hãng, đa dạng mẫu mã và dịch vụ sửa chữa
                                chuyên nghiệp. Chúng tôi cam kết mang đến sản phẩm tốt nhất cho bạn.
                            </Typography>
                        </Box>

                        {/* Cột 2: Liên hệ */}
                        <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                            <Typography variant="h6" gutterBottom>
                                Liên hệ
                            </Typography>
                            <Typography variant="body2">Email: support@bikeshop.com</Typography>
                            <Typography variant="body2">Hotline: 1900 678 910</Typography>
                            <Typography variant="body2">Địa chỉ: 456 Đường DEF, Quận 3, TP. Hồ Chí Minh</Typography>
                        </Box>

                        {/* Cột 3: Theo dõi chúng tôi */}
                        <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
                            <Typography variant="h6" gutterBottom>
                                Theo dõi chúng tôi
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton href="https://facebook.com" target="_blank" sx={{ color: '#fff' }}>
                                    <Facebook />
                                </IconButton>
                                <IconButton href="https://twitter.com" target="_blank" sx={{ color: '#fff' }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton href="https://instagram.com" target="_blank" sx={{ color: '#fff' }}>
                                    <Instagram />
                                </IconButton>
                                <IconButton href="https://youtube.com" target="_blank" sx={{ color: '#fff' }}>
                                    <YouTube />
                                </IconButton>
                                <IconButton href="mailto:support@bikeshop.com" sx={{ color: '#fff' }}>
                                    <Email />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>

                    {/* Dòng bản quyền */}
                    <Box sx={{ textAlign: 'center', pt: 3 }}>
                        <Typography variant="body2">&copy; 2024 Bike Shop. Tất cả quyền được bảo hộ.</Typography>
                    </Box>
                </Box>
            </Box>
        </footer>
    );
};

export default Footer;
