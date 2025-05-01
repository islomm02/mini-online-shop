import { SetMetadata } from "@nestjs/common"
import { UserRole } from "@prisma/client"

export const KEY = "KEY"
export const RoleD = (...roles: UserRole[])=> SetMetadata(KEY, roles)