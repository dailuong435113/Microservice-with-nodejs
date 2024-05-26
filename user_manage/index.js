const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const app = express();
const cors = require('cors');

app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'))
// Kết nối CSDL
sequelize
  .authenticate()
  .then(() => {
    console.log('Kết nối CSDL thành công.');
  })
  .catch(err => {
    console.error('Không thể kết nối CSDL:', err);
  });

app.use(express.json());
app.use('/users', userRouter);

app.use('/', indexRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  console.log(`http://localhost:${PORT}/users/add`);
  console.log(`http://localhost:${PORT}/api/user/`);
});
