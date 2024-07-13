import { FileControllers } from '@/controllers'
import { authenticateToken } from '@/middlewares/authMiddleware'
import { EUserRole } from '@/types'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get(
  '/sign-upload-url',
  authenticateToken([EUserRole.Admin]),
  FileControllers.getSignUrlUpload,
)
router.get(
  '/sign-upload-urls',
  authenticateToken([EUserRole.Admin]),
  FileControllers.getSignUrlUploads,
)

export default router
