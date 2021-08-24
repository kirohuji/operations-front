import { api } from '@/utils/http'
import { DicmanageService } from '@/modules/dicmanage'
import { OrganizationService } from '@/modules/organization'
import { UserService } from '@/modules/user'
import { RoleService } from '@/modules/role'
import { InfomanageService } from '@/modules/infomanage'
import { PrpgdEduService } from '@/modules/prpgd_edu'
import { ActiveService } from '@/modules/active'
import { NewsService } from '@/modules/news'
import { AuthService } from '@/modules/auth'
import { PortraitService } from '@/modules/portrait'
export const serviceContainer = {
  dicmanageService: new DicmanageService({ api }),
  organizationService: new OrganizationService({ api }),
  userService: new UserService({ api }),
  roleService: new RoleService({ api }),
  infomanageService: new InfomanageService({ api }),
  prpgdEduService: new PrpgdEduService({ api }),
  activeService: new ActiveService({ api }),
  newsService: new NewsService({ api }),
  authService: new AuthService({ api }),
  portraitService: new PortraitService({ api })
}
