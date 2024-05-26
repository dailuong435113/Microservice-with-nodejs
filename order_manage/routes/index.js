const express = require('express');
const router = express.Router();
// const User = require('../models/User');
const Cart = require('../models/Cart')
const db = require('../config/connect'); // import the database module
const CartDetail = require('../models/CartDetail')
const axios = require('axios');
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.findAll();
        res.render('index', { carts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

router.get('/api/cart', async (req, res) => {
    try {
        const carts = await Cart.findAll();
        res.json(carts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

router.get('/api/cart-details', async (req, res) => {
    try {
        const cartdetail = await CartDetail.findAll();
        res.json(cartdetail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

router.get('/api/cart/list', async (req, res) => {
    try {
        const sql = `
        SELECT
        c.id AS id_cart,
        u.username,
        c.total AS total,
        c.createdAt AS createdAt,
        c.updatedAt AS updatedAt
    FROM
        carts c
    JOIN
        users u ON c.id_user = u.id;
        `;
        const [results, fields] = await db.query(sql);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});

router.get('/api/cart-details/:id_cart', async (req, res) => {
    try {
        const id_cart = req.params.id_cart;
        const sql = `
            SELECT 
                p.id AS product_id, 
                p.name AS productname, 
                cd.quantity AS quantity, 
                cd.price AS price
            FROM 
                cart_details cd
            JOIN 
                products p ON cd.product_id = p.id
            WHERE 
                cd.id_cart = ?;
        `;
        const [results, fields] = await db.query(sql, [id_cart]);
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
});


// router.get('/api/cart', async (req, res) => {
//     try {
//         const carts = await Cart.findAll();
//         const cartsWithUsernames = await Promise.all(carts.map(async (cart) => {
//             // Gửi yêu cầu đến API user để lấy thông tin username dựa vào id_user
//             const response = await axios.get(`http://localhost:3000/api/user/${cart.id_user}`);
//             const username = response.data.user.username;  // Lấy username từ response
//             return {
//                 ...cart.dataValues,
//                 username: username  // Thêm username vào đối tượng cart
//             };
//         }));
//         res.json(cartsWithUsernames);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Đã xảy ra lỗi' });
//     }
// });

router.post('/api/cart/create', async (req, res) => {
    try {
        const { id_user, total } = req.body; // Giả sử total là tổng giá trị của giỏ hàng, id_user là ID người dùng
        if (!id_user) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const newCart = await Cart.create({ id_user, total });
        res.json({ message: `Cart for user ID ${newCart.id_user} added successfully!`, cart: newCart });
    } catch (error) {
        console.error('Error adding cart:', error);
        res.status(500).json({ message: 'Error adding cart' });
    }
});

router.post('/api/cartdetail/create', async (req, res) => {
    const { id_cart, product_id, price, quantity } = req.body;

    // Kiểm tra xem các trường cần thiết có giá trị không
    if (!id_cart || !product_id || !price || !quantity) {
        return res.status(400).json({
            message: 'All fields (id_cart, product_id, price, quantity) are required.'
        });
    }

    try {
        const newCartDetail = await CartDetail.create({
            id_cart,
            product_id,
            price,
            quantity
        });
        res.json({ message: 'Cart detail added successfully!', data: newCartDetail });
    } catch (error) {
        console.error('Error adding cart detail:', error);
        res.status(500).json({ message: 'Error adding cart detail', error: error.message });
    }
});


router.post('/api/cart-details', async (req, res) => {
    try {
      const { id_cart, product_id, price, quantity } = req.body;  // Sửa tên biến cho phù hợp với key trong request body và model
      const newCartDetail = await CartDetail.create({
        id_cart,      // Đổi từ cartId thành id_cart
        product_id,   // Đổi từ productId thành product_id
        price,
        quantity
      });
      res.status(201).send(newCartDetail);
    } catch (error) {
      console.error("Error creating cart detail: ", error);
      res.status(500).send(error.message);
    }
});

  




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
