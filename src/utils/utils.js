import axios from 'axios'
export default {
  'preventBodyScroll': function (dom) {
    var isEdge = navigator.userAgent.indexOf('Edge') > -1 // 判断是否IE的Edge浏览器
    var isFirefox = navigator.userAgent.indexOf('Firefox')
    if (isFirefox > 0) {
      dom.addEventListener('DOMMouseScroll', function (event) { // 火狐
        var tscrollHeight = this.scrollHeight // 读取内容区域的真实高度（滚动条高）
        var tscrollTop = this.scrollTop // 读取滚动条的位置
        var tclientHeight = this.clientHeight // 读取元素的高度
        var evt = window.event || arguments[0]
        evt = evt || window.event
        var detail = evt.detail
        if (detail < 0) {
          // console.log('鼠标向下滚动')
          if (Math.floor(tscrollTop) === 0) {
            evt.preventDefault()
          }
        } else {
          // console.log('鼠标向上滚动')
          if (Math.floor(tscrollHeight - tscrollTop) === tclientHeight) {
            evt.preventDefault()
          }
        }
        // if (evt.detail <= -3) {
        //   dom.scrollTop = dom.scrollTop - 10
        // } else if (evt.detail >= 3) {
        //   dom.scrollTop = dom.scrollTop + 10
        // }
        // evt.stopPropagation()
        // evt.preventDefault()
      }, false)
    } else {
      dom.addEventListener('mousewheel', function (event) {
        var tscrollHeight = this.scrollHeight // 读取内容区域的真实高度（滚动条高）
        var tscrollTop = this.scrollTop // 读取滚动条的位置
        var tclientHeight = this.clientHeight // 读取元素的高度
        var evt = window.event || arguments[0]
        var wheelDelta = evt.wheelDelta
        if (wheelDelta > 0) {
          // console.log('鼠标向上滚动')
          if (Math.floor(tscrollTop) === 0) {
            evt.preventDefault()
          }
        } else {
          // console.log('鼠标向下滚动')
          if (isEdge) {
            if (Math.floor((tscrollHeight - tscrollTop) - 1) === tclientHeight) {
              evt.preventDefault()
            }
          } else {
            if (Math.floor(tscrollHeight - tscrollTop) === tclientHeight) {
              evt.preventDefault()
            }
          }
        }
        // evt.stopPropagation()
        // evt.returnValue = false // 屏蔽body滚动事件
        // if (evt.wheelDelta <= -120) {
        //   dom.scrollTop = dom.scrollTop + 40
        // } else if (evt.wheelDelta >= 120) {
        //   dom.scrollTop = dom.scrollTop - 40
        // }
      })
    }
  },
  trainGetJson: function (url, reqdata, okcb, errorcb) {
    axios({
      url: url,
      baseURL: 'http://192.168.2.213:10010/',
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      params: reqdata
    })
      .then(function (response) {
        okcb(response)
      })
      .catch(function (error) {
        errorcb(error)
      })
  },
  trainPostJson: function (url, reqdata, okcb, errorcb) {
    axios({
      url: url,
      baseURL: 'http://192.168.2.213:10010/',
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      data: reqdata
    })
      .then(function (response) {
        okcb(response)
      })
      .catch(function (errormsg) {
        errorcb(errormsg)
      })
  },
  formatStretchTime: function (stime, stretchtime) {
    var timeArr = stretchtime.split(':')
    var nd = new Date(stime)
    nd = nd.valueOf()
    nd = nd + parseInt(timeArr[0]) * 60 * 60 * 1000 + parseInt(timeArr[1]) * 60 * 1000
    nd = new Date(nd)
    var y = nd.getFullYear()
    var m = nd.getMonth() + 1
    var d = nd.getDate()
    var hh = nd.getHours()
    var mm = nd.getMinutes()
    if (m <= 9) m = '0' + m
    if (d <= 9) d = '0' + d
    if (hh <= 9) hh = '0' + hh
    if (mm <= 9) mm = '0' + mm
    var newDate = y + '-' + m + '-' + d + ' ' + hh + ':' + mm
    return new Date(newDate).getTime()
  }
}
