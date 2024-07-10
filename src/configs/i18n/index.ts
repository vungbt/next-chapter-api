import env from '@/configs/env'
import fs from 'fs-extra'
import i18next from 'i18next'
import middleware from 'i18next-http-middleware'
import FsBackend from 'i18next-node-fs-backend'
import path from 'path'

const baseLang = env.language ?? 'en'
const dirBaseLang = path.join(__dirname, `../../language/${baseLang}`)
const ns = fs
  .readdirSync(dirBaseLang)
  .filter((file) => {
    return fs.lstatSync(path.resolve(dirBaseLang, file)).isFile()
  })
  .map((file) => String(file.split('.').shift()))

i18next
  .use(FsBackend)
  .use(middleware.LanguageDetector)
  .init({
    ns: ns,
    defaultNS: 'translation',
    fallbackLng: baseLang,
    backend: {
      loadPath: path.join(__dirname, '../../language/{{lng}}/{{ns}}.json'),
    },
  })

export default middleware.handle(i18next)
