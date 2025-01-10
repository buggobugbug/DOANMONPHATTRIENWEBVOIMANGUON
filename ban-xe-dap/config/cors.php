<?php

return [

    'paths' => ['api/*'], // Chỉ áp dụng CORS cho các route bắt đầu bằng "api/"

    'allowed_methods' => ['*'], // Cho phép mọi phương thức HTTP (GET, POST, etc.)

    'allowed_origins' => ['http://localhost:3000'], // Chỉ định nguồn gốc được phép

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Chấp nhận mọi header

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // Hỗ trợ cookie và xác thực
];