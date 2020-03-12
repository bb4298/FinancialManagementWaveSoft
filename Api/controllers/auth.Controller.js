const jwt = require('jsonwebtoken')
const paramsObj = require('../config/staticVariable.Config');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
module.exports = {
    KiemTraDangNhap: function (req, res, next) {
        const client = new MongoClient(paramsObj.url, {useNewUrlParser: true, useUnifiedTopology: true});
        //Tạo biến user và pass
        let username = req.body.username;
        let password = req.body.password;
        //Kết nối db
        client.connect(function (err, client) {
            console.log("Connected correctly to server");
            const db = client.db(paramsObj.name);
            const col = db.collection('NguoiDung');
            //Tìm user
            col.find({email: username}).toArray(function (err, docs) {
                client.close(() => {
                    if (err) {
                        res.status(500).json({
                            status:'fail',
                            message:'Lỗi '+ err
                        });
                    }else {
                        //Kiểm tra mảng user có rỗng không và kiểm tra mật khẩu
                        if(docs.length !== 0){
                            if(docs[0].trangThaiKhoa == true){
                                res.status(400).json({
                                    status: "fail",
                                    message: "Tài khoản đã bị khóa, xin vui lòng liên hệ chủ tài khoản để mở lại !",
                                });
                            }else {
                                bcrypt.compare(password,docs[0].password, function(err, result) {
                                    // result == true
                                    if(result){
                                        var SecretKey = process.env.SECRET_KEY;
                                        var payload = {
                                            userId: docs[0]._id,
                                            role:docs[0].vaiTro,
                                            managerId:docs[0].idManager ==undefined?null:docs[0].idManager
                                        };
                                        var token = jwt.sign({payload}, SecretKey, {expiresIn: 60 * 4320}); //Hết hạn trong 3 ngày
                                        // res.cookie('token', token.toString());
                                        // idTK = data.Items[0].ID_NguoiDung.toString();
                                        // tokenTK = token.toString();
                                        //Trả về json
                                        console.log(JSON.stringify(payload));
                                        res.status(200).json({
                                            status: "ok",
                                            message: "Đăng nhập thành công !",
                                            userId: docs[0]._id,
                                            token: token
                                        });
                                    }else {
                                        res.status(400).json({
                                            status: "fail",
                                            message: "Tài khoản hoặc mật khẩu không chính xác !",
                                        });
                                    }

                                });
                            }

                        }else {

                            res.status(400).json({
                                status: "fail",
                                message: "Tài khoản hoặc mật khẩu không chính xác !",
                            });
                        }

                    }


                });
            });
        });
    },

    KiemTraTokenAdmin: function (req, res, next) {
        try {
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                // req.user = payload;
                // res.json(payload);
                if (payload.payload.role == 0) {
                     next();
                } else {
                    res.status(400).json({
                        status: "fail",
                        message: 'Token không hợp lệ !',
                    });
                    return;
                }
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: 'Token không hợp lệ !'
            });
        }
    },

    KiemTraTokenManager: function (req, res, next) {
        try {
            let token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                // req.user = payload;
                // res.json(payload);
                // console.log(payload.payload.role);
                if (payload.payload.role == 1) {
                    next();
                } else {
                    res.status(400).json({
                        status: "fail",
                        message: 'Token không hợp lệ !',
                    });
                    return;
                }
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: err.toString()
            });
        }
    },

    KiemTraTokenUser: function (req, res, next) {
        try {
            var token = req.query.token;
            jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
                // req.user = payload;
                // res.json(payload);
                if (payload.payload.role == 2) {
                    next();
                } else {
                    res.status(400).json({
                        status: "fail",
                        message: 'Token không hợp lệ !',
                    });
                    return;
                }
            });
        } catch (err) {
            res.status(400).json({
                status: "fail",
                message: err.toString()
            });
        }
    }
}
