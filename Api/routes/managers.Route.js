const express = require('express');
const router = express.Router();

const authController =require('../controllers/auth.Controller');
const managersController = require('../controllers/managers.Controller');
const usersController = require('../controllers/users.Controller');
const usersValidate = require('../validator/users.Validate');
const hopdongsController = require('../controllers/hopDongs.Controller');
//Endpoint:localhost:3000/api/v1/managers/

/*Chức năng CRUD nhân viên------------------------------------------------*/

// Lấy danh sách các nhân viên của chủ cho vay
router.get('/users/:page',authController.KiemTraTokenManager,usersController.LayUserTheoTrang);

// Lấy nhân viên của chủ cho vay theo id
router.get('/users',authController.KiemTraTokenManager,usersController.LayUserTheoId);

// Tìm kiếm nhân viên của chủ cho vay
router.get('/timusers',authController.KiemTraTokenManager,usersController.TimKiemUser);

// Tạo mới nhân viên
router.post('/users', authController.KiemTraTokenManager,usersValidate.Validate_User_KhiThem,usersController.KiemTraUserTonTai_KhiThem,usersController.ThemUser);

// // Cập nhật nhân viên     -bỏ, quản lý ko đc cập nhật nhân viên
// router.put('/users', authController.KiemTraTokenManager,usersValidate.Validate_User_KhiSua,usersController.CapNhatUser);

// Khóa nhân viên
router.put('/lockusers', authController.KiemTraTokenManager,usersValidate.Validate_User_KhiXoa,usersController.KiemTraUserTonTai_KhiXoa,usersController.KhoaUser);

// Mở khóa nhân viên
router.put('/unlockusers', authController.KiemTraTokenManager,usersValidate.Validate_User_KhiXoa,usersController.KiemTraUserTonTai_KhiXoa,usersController.MoKhoaUser);

// Xóa nhân viên
router.delete('/users', authController.KiemTraTokenManager,usersValidate.Validate_User_KhiXoa,usersController.KiemTraUserTonTai_KhiXoa,usersController.XoaUser);


/*Chức năng quản lý hợp đồng------------------------------------------------*/

//Lấy danh sách hợp đồng của chủ cho vay theo trang
 router.get('/hopdongs/:page',authController.KiemTraTokenManager,hopdongsController.Manager_LayTatCaHopDong );

//Thêm hợp đồng bởi chủ cho vay
router.post('/hopdongs',authController.KiemTraTokenManager,hopdongsController.Manager_ThemHopDong );

module.exports = router;
