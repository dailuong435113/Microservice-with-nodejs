# Sử dụng image cơ bản
FROM node:14

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Copy package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Copy tất cả các file còn lại vào container
COPY . .

# Khai báo cổng mà ứng dụng sẽ chạy trên đó
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD [ "node", "index.js" ]


# # Sử dụng image Node.js chính thức làm base image
# FROM node:14

# # Thiết lập thư mục làm việc trong container
# WORKDIR /usr/src/app

# # Copy các tệp package.json và package-lock.json (nếu có)
# COPY package*.json ./

# # Cài đặt các phụ thuộc của Node.js
# RUN npm install

# # Copy toàn bộ source code của ứng dụng vào trong container
# COPY . .

# # Expose port mà ứng dụng của bạn sử dụng
# EXPOSE 3000

# # Chạy migrations, seed data và sau đó khởi động ứng dụng
# CMD npx sequelize-cli db:migrate && \
#     npx sequelize-cli db:seed:all && \
#     node index.js

