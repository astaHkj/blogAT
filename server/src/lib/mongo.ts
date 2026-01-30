import Mongolass from 'mongolass'
import moment from 'moment'
import objectIdToTimestamp from 'objectid-to-timestamp'
import config from '../config'

const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

// 根据 ObjectId 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results: any[]) {
    results.forEach(function (item) {
      if (item._id) {
        item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
      }
    })
    return results
  },
  afterFindOne: function (result: any) {
    if (result && result._id) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

export default mongolass
export { Mongolass }
