const express = require('express');
const router = express.Router();
const User = require('../models/User');
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  optionsSuccessStatus: 200 // một số trình duyệt cũ có thể gặp sự cố với 204
};
// Trang thêm người dùng mới
router.get('/add', (req, res) => {
    res.sendFile('addUser.html', { root: './views' });
});


// router.get('/', async (req, res) => {
//     const users = await User.findAll();
//     res.render('index', { users });
// });

router.get('/', async (req, res) => {
  try {
      const users = await User.findAll();
      res.json(users); // Trả về dữ liệu dưới dạng JSON
  } catch (error) {
      console.error('Failed to fetch users:', error);
      res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users); // Trả về dữ liệu dưới dạng JSON
});

router.get('/api/user', async (req, res) => {
  try {
      const users = await User.findAll();
      res.json(users); // Trả về dữ liệu dưới dạng JSON
  } catch (error) {
      console.error('Failed to fetch users:', error);
      res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/create', async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
          return res.status(400).send('Name and email are required');
        }
        const newUser = await User.create({ name, email });
        res.send(`User ${newUser.name} added successfully!`);
      } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Error adding user');
      }
  });

router.post('/delete', async (req, res) => {
    try {
      const id = req.body.id; // Sử dụng req.body thay vì req.params
      const deleted = await User.destroy({
        where: { id: id }
      });
  
      if (deleted) {
        res.send('User deleted');
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Error deleting user');
    }
});

router.get('/edit/:id', async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id);
      if (user) {
          res.render('edit_user', { user });
      } else {
          res.status(404).send('User not found');
      }
  } catch (error) {
      console.error('Error finding user:', error);
      res.status(500).send('Error finding user');
  }
});


// Xử lý form sửa thông tin người dùng
router.post('/edit', async (req, res) => {
  try {
      const { id, name, email } = req.body;
      const updated = await User.update({ name, email }, {
          where: { id: id }
      });

      if (updated) {
          res.send('User updated successfully');
      } else {
          res.status(404).send('User not found');
      }
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Error updating user');
  }
});



module.exports = router;
