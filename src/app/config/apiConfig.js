const env = process.env.NODE_ENV || 'development';

const configs = {
    development: {
        domain: {
            blogService: 'http://api-internal-uat.nimbus.com.vn',
            authService: 'http://auth-uat.nimbus.com.vn',
            imageService: 'http://api-internal-uat.nimbus.com.vn/image-service'
        }
    },
    uat: {
        domain: {
            blogService: 'http://api-internal-uat.nimbus.com.vn',
            authService: 'http://auth-uat.nimbus.com.vn',
            imageService: 'http://api-internal-uat.nimbus.com.vn/image-service'
        }
    },
    production: {
        domain: {
            blogService: 'https://api-internal.nimbus.com.vn/blog-service',
            authService: 'https://api-internal.nimbus.com.vn/auth-service',
            imageService: 'https://api-internal.nimbus.com.vn/image-service',
        }
    },
}[env];

export default configs;