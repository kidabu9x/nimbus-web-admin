const env = process.env.NODE_ENV || 'development';

const configs = {
    // development: {
    //     domain: {
    //         blogService: 'http://localhost:8089',
    //         authService: 'http://localhost:8080',
    //         imageService: 'https://api-internal.nimbus.com.vn/image-service',
    //         courseService: 'https://api-internal.nimbus.com.vn/course-service',
    //     }
    // },
    development: {
        domain: {
            blogService: 'https://api-internal.nimbus.com.vn/blog-service',
            authService: 'https://api-internal.nimbus.com.vn/auth-service',
            imageService: 'https://api-internal.nimbus.com.vn/image-service',
            courseService: 'http://localhost:8080',
        }
    },
    production: {
        domain: {
            blogService: 'https://api-internal.nimbus.com.vn/blog-service',
            authService: 'https://api-internal.nimbus.com.vn/auth-service',
            imageService: 'https://api-internal.nimbus.com.vn/image-service',
            courseService: 'https://api-internal.nimbus.com.vn/course-service',
        }
    },
}[env];

export default configs;