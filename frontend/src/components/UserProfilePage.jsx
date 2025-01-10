import React, { useEffect, useState } from 'react';
import { fetchCurrentUser, updateUser, changePassword } from '../services/api'; // Sử dụng hàm changePassword từ api.js
import './UserProfilePage.css';

const UserProfilePage = () => {
    const [userData, setUserData] = useState({
        ten_dang_nhap: '',
        ho_ten: '',
        email: '',
        so_dien_thoai: '',
        dia_chi: '',
        anh_dai_dien: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password: '',
        confirm_new_password: '',
    });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const user = await fetchCurrentUser();
                setUserData(user);
            } catch (err) {
                setError('Không thể tải thông tin người dùng.');
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setUserData({ ...userData, anh_dai_dien: URL.createObjectURL(file) });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleUpdateProfile = async () => {
        const formData = new FormData();

        formData.append('ten_dang_nhap', userData.ten_dang_nhap);
        formData.append('email', userData.email);
        formData.append('ho_ten', userData.ho_ten);
        formData.append('so_dien_thoai', userData.so_dien_thoai || '');
        formData.append('dia_chi', userData.dia_chi || '');

        if (selectedFile) {
            formData.append('anh_dai_dien', selectedFile);
        }

        try {
            await updateUser(userData.ma_nguoi_dung, formData);
            alert('Cập nhật thông tin thành công!');
        } catch (err) {
            console.error(err.response?.data?.errors);
            alert('Lỗi khi cập nhật thông tin. Vui lòng kiểm tra lại.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const toggleChangePasswordForm = () => {
        setShowChangePasswordForm(!showChangePasswordForm);
    };

    const handleChangePassword = async () => {
        try {
            const response = await changePassword({
                current_password: passwordData.current_password,
                new_password: passwordData.new_password,
                new_password_confirmation: passwordData.confirm_new_password,
            });
    
            // Hiển thị thông báo thành công
            alert(response.data.message || 'Đổi mật khẩu thành công!');
            setShowChangePasswordForm(false);
        } catch (err) {
            console.error('Error changing password:', err.response?.data);
            alert(err.response?.data?.message || 'Lỗi khi đổi mật khẩu.');
        }
    };
    

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile-container">
            <div className="profile-header">Thông Tin Cá Nhân</div>
            <div className="profile-avatar">
                <img
                    src={
                        selectedFile
                            ? URL.createObjectURL(selectedFile)
                            : `http://127.0.0.1:8000/storage/${userData.anh_dai_dien}`
                    }
                    alt="Avatar"
                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <input type="file" onChange={handleFileChange} />
            </div>
            <div className="profile-form">
                <div className="profile-field">
                    <label>Tên đăng nhập:</label>
                    <input
                        type="text"
                        name="ten_dang_nhap"
                        value={userData.ten_dang_nhap}
                        readOnly
                    />
                </div>
                <div className="profile-field">
                    <label>Họ và tên:</label>
                    <input
                        type="text"
                        name="ho_ten"
                        value={userData.ho_ten}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="profile-field">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="profile-field">
                    <label>Số điện thoại:</label>
                    <input
                        type="text"
                        name="so_dien_thoai"
                        value={userData.so_dien_thoai}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="profile-field">
                    <label>Địa chỉ:</label>
                    <textarea
                        name="dia_chi"
                        value={userData.dia_chi}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="profile-buttons">
                    <button onClick={handleUpdateProfile}>Cập Nhật</button>
                    <button onClick={toggleChangePasswordForm}>Đổi Mật Khẩu</button>
                    <button onClick={handleLogout}>Đăng Xuất</button>
                </div>
            </div>

            {showChangePasswordForm && (
                <div className="change-password-form">
                    <h3>Đổi Mật Khẩu</h3>
                    <div className="profile-field">
                        <label>Mật khẩu hiện tại:</label>
                        <input
                            type="password"
                            name="current_password"
                            value={passwordData.current_password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="profile-field">
                        <label>Mật khẩu mới:</label>
                        <input
                            type="password"
                            name="new_password"
                            value={passwordData.new_password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="profile-field">
                        <label>Nhập lại mật khẩu mới:</label>
                        <input
                            type="password"
                            name="confirm_new_password"
                            value={passwordData.confirm_new_password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button onClick={handleChangePassword}>Xác Nhận</button>
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;
