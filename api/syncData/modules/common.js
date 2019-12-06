/**
 * 使用的接口
 */
import { createAPI } from '../setup'
import hostConfig from '../config'
const common = {
    // 获取 立即邀请好友累计收入与人数
    getInvitationGetlist: (data) => createAPI(`${hostConfig.apiHost}/cdcloud/invited/getlist`, 'POST', data),
    // 获取 分享配置信息
    getShareParams: (data) => createAPI(`${hostConfig.apiHost}/cdcloud/welcome/about`, 'GET', data),
    // 获取 精彩活动页 list
    getActivitylist: (data) => createAPI(`${hostConfig.apiHost}/cdcloud/information/activitys?${data}`, 'GET', data),
    // 获取 用户活动进行状态（活动页）
    getShowStatus: (data) => createAPI(`${hostConfig.apiHost}/cdcloud/WelcomeNewActivity/showStatus?${data}`, 'POST', data),
    // 领取优惠券
    getReceiveCoupon: (data) => createAPI(`${hostConfig.apiHost}/cdcloud/WelcomeNewActivity/receiveCoupon?${data}`, 'POST', data),
    // 获取 code
    getPhoneCode: (data) => createAPI(`${hostConfig.apiHost}/cdcloud/user/yzm?${data}`, 'POST', data),
    // 用户绑定手号
    setPhoneBinding: (data) => createAPI(`${hostConfig.apiHost}/cdcloud/WelcomeNewActivity/phoneBinding?${data}`, 'POST', data)
}
export default common
