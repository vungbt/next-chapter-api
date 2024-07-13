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
    name: process.env.NAME ?? 'NextChapterApp',
  },
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? 5432,
    name: process.env.DB_NAME ?? 'next_chapter_api',
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    dialect: process.env.DB_DIALECT ?? 'postgres',
  },
  folder: {
    temp: process.env.FILE_FOLDER_TEMP ?? 'temp',
    assets: process.env.FILE_FOLDER_ASSETS ?? 'assets',
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME ?? 'CLOUDINARY_NAME',
    key: process.env.CLOUDINARY_API_KEY ?? 'CLOUDINARY_API_KEY',
    secret: process.env.CLOUDINARY_API_SECRET ?? 'CLOUDINARY_API_SECRET',
    domain: process.env.CLOUDINARY_DOMAIN ?? 'CLOUDINARY_DOMAIN',
  },
}
