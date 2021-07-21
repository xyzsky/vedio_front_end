import request from '@/utils/request'

export default {

  // 演員列表，分頁查詢
  getActorList(current, limit, actorQuery) {
    return request({
      url: `actor/pageActorCondition/${current}/${limit}`,
      method: 'post',
      // data 表示把对象转为 json 格式
      data: actorQuery
    })
  },
  // 删除演员
  deleteActorById(id) {
    return request({
      url: `actor/deleteById/${id}`,
      method: 'delete'
    })
  },

  addActor(actor) {
    return request({
      url: `actor/addActor/`,
      method: 'post',
      data: actor
    })
  },

  getActorInfo(id) {
    return request({
      url: `actor/getActorById/${id}`,
      method: 'get'
    })
  },

  updateActor(actor) {
    return request({
      url: `actor/updateActor/`,
      method: 'post',
      data: actor
    })
  }
}
