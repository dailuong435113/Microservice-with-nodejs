const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.render('index', { users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

router.get('/api/user', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

// router.post('/api/user/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (!username || !password) {
//             return res.status(400).json({ message: 'Username và password là bắt buộc.' });
//         }

//         // Tìm người dùng bằng username
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
//         }

//         // Kiểm tra password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: 'Sai mật khẩu.' });
//         }

//         // Người dùng đã xác thực
//         res.json({ message: 'Đăng nhập thành công.', user });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng nhập.' });
//     }
// });

router.post('/api/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email và password là bắt buộc.' });
        }

        // Tìm người dùng bằng email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với email đã cung cấp.' });
        }

        // Kiểm tra password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Sai mật khẩu.' });
        }

        // Người dùng đã xác thực
        res.json({ message: 'Đăng nhập thành công.', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng nhập.' });
    }
});



router.post('/api/user/create', async (req, res) => {
    try {
        // Destructure các trường từ req.body
        const { username, email, password, address, sex, phone, groupId } = req.body;

        // Kiểm tra điều kiện bắt buộc của các trường
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Tạo người dùng mới với mật khẩu đã mã hóa
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,  // Lưu mật khẩu đã mã hóa
            address,
            sex,
            phone,
            groupId
        });

        // Phản hồi thành công với thông tin người dùng mới
        res.json({ message: `User ${newUser.username} added successfully!` });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
});


router.post('/api/user/edit', async (req, res) => {
    try {
        const { id, username, email, address, sex, phone } = req.body;
        const updated = await User.update({ username, email, address, sex, phone }, {
            where: { id: id }
        });

        if (updated[0] > 0) { // Sequelize update returns an array with count of affected rows
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
});

router.post('/api/user/delete', async (req, res) => {
    try {
      const id = req.body.id; // Sử dụng req.body thay vì req.params
      const deleted = await User.destroy({
        where: { id: id }
      });
  
      if (deleted) {
        res.json({ message: 'User deleted' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error deleting user' });
    }
});

router.get('/api/user/:id', async (req, res) => {
    try {
        // Tìm người dùng bằng Primary Key (PK)
        const user = await User.findByPk(req.params.id);
        if (user) {
            // Nếu tìm thấy người dùng, trả về dữ liệu người dùng dạng JSON
            res.json({ success: true, user: user });
        } else {
            // Nếu không tìm thấy người dùng, trả về lỗi 404 với JSON
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        // Log lỗi và trả về lỗi 500 với JSON nếu có vấn đề xảy ra trong quá trình truy vấn
        console.error('Error finding user:', error);
        res.status(500).json({ success: false, message: 'Error finding user' });
    }
});


module.exports = router;
