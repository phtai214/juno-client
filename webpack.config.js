const path = require('path');

module.exports = {
    // ... các cấu hình khác của Webpack
    resolve: {
        fallback: {
            "http": require.resolve("stream-http"),
            // Nếu bạn gặp lỗi với các mô-đun khác như 'https', bạn có thể thêm chúng ở đây
            "https": require.resolve("https-browserify"),
            "buffer": require.resolve("buffer/"),
            // Thêm các polyfill khác nếu cần
        },
    },
    // ... các cấu hình khác của Webpack
};
