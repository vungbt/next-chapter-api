const language = process.env.LOCALE_DEFAULT ?? 'en'

const jwt = {
  secret: process.env.JWT_SECRET_KEY ?? 'NextChapter',
  expires: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES) || 60 * 10,
  refreshExpires:
    Number(process.env.JWT_REFRESH_TOKEN_EXPIRES) || 60 * 60 * 24 * 30,
}
export default {
  language,
  jwt,
  server: {
    env: process.env.NODE_ENV ?? 'development',
    host: process.env.HOST ?? 'http://localhost',
    port: process.env.PORT ?? 4001,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME ?? 'CLOUDINARY_NAME',
    key: process.env.CLOUDINARY_API_KEY ?? 'CLOUDINARY_API_KEY',
    secret: process.env.CLOUDINARY_API_SECRET ?? 'CLOUDINARY_API_SECRET',
    domain: process.env.CLOUDINARY_DOMAIN ?? 'CLOUDINARY_DOMAIN',
  },
}
