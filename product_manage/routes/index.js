const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// router.get('/', async (req, res) => {
//     try {
//         const users = await User.findAll();
//         res.render('index', { users });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Đã xảy ra lỗi' });
//     }
// });

router.get('/api/product', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

router.post('/api/product/create', async (req, res) => {
    try {
        const { name, description, image } = req.body;  // Lấy dữ liệu từ body
        if (!name) {  // Kiểm tra trường bắt buộc
          return res.status(400).json({ message: 'Name is required' });
        }

        // Tạo sản phẩm mới với các trường cung cấp
        const newProduct = await Product.create({ name, description, image });
        // Trả về chuỗi JSON với thông tin sản phẩm đã thêm
        res.json({ message: `Product ${newProduct.name} added successfully!`});
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product' });
    }
});

router.post('/api/product/edit', async (req, res) => {
    try {
        const { id, name, description, image } = req.body;
        const updated = await Product.update({ name, description, image }, {
            where: { id: id }
        });
  
        // Sequelize update trả về mảng chứa số lượng hàng đã được cập nhật
        if (updated[0] > 0) {
            res.json({ message: 'Product updated successfully' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product' });
    }
  });
  
  router.get('/api/product/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json({ product });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('Error finding product:', error);
        res.status(500).json({ message: 'Error finding product' });
    }
  });
  
  router.post('/api/product/delete', async (req, res) => {
    try {
        const id = req.body.id; // Lấy ID từ body của request
        const deleted = await Product.destroy({
            where: { id: id }
        });

        if (deleted) {
            res.json({ message: 'Product deleted successfully' }); // Trả về JSON khi xóa thành công
        } else {
            res.status(404).json({ message: 'Product not found' }); // Trả về JSON khi không tìm thấy sản phẩm
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product' }); // Trả về lỗi dưới dạng JSON
    }
});


// router.post('/api/user/create', async (req, res) => {
//     try {
//         const { name, email } = req.body;
//         if (!name || !email) {
//           return res.status(400).json({ message: 'Name and email are required' });
//         }
//         const newUser = await User.create({ name, email });
//         res.json({ message: `User ${newUser.name} added successfully!` });
//     } catch (error) {
//         console.error('Error adding user:', error);
//         res.status(500).json({ message: 'Error adding user' });
//     }
// });

// router.post('/api/user/edit', async (req, res) => {
//     try {
//         const { id, name, email } = req.body;
//         const updated = await User.update({ name, email }, {
//             where: { id: id }
//         });

//         if (updated[0] > 0) { // Sequelize update returns an array with count of affected rows
//             res.json({ message: 'User updated successfully' });
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ message: 'Error updating user' });
//     }
// });

// router.post('/api/user/delete', async (req, res) => {
//     try {
//       const id = req.body.id; // Sử dụng req.body thay vì req.params
//       const deleted = await User.destroy({
//         where: { id: id }
//       });
  
//       if (deleted) {
//         res.json({ message: 'User deleted' });
//       } else {
//         res.status(404).json({ message: 'User not found' });
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       res.status(500).json({ message: 'Error deleting user' });
//     }
// });

module.exports = router;
