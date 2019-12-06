import request from '@/utils/request'
// 公共异步获取方法
// const prefix = '/common'  // 可以取别名

export const getConsultationDetails = (params) => {
    return request({
        url: '/app/notice/article_details',
        method: 'POST',
        data: params
    })
}
