
import login from './modules/login'
import user from './modules/user'
import news from './modules/news'
import exchange from './modules/exchange'
import system from './modules/system'
import administrators from './modules/administrators'
import rich from './modules/rich'
export default {
  ...login,
  ...user,
  ...news,
  ...exchange,
  ...system,
  ...administrators,
  ...rich
}

