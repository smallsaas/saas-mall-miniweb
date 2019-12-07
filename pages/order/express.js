// pages/express/express.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    /*express: {
      "openid": "OPENID",
      "delivery_id": "SF",
      "waybill_id": "12345678901234567890",
      "path_item_num": 3,
      "path_item_list": [
        {
          "action_time": 1533052800,
          "action_type": 100001,
          "action_msg": "快递员已成功取件"
        },
        {
          "action_time": 1533062800,
          "action_type": 200001,
          "action_msg": "快件已到达xxx集散中心，准备发往xxx"
        },
        {
          "action_time": 1533072800,
          "action_type": 300001,
          "action_msg": "快递员已出发，联系电话xxxxxx"
        }
      ]
    }*/
    express: null
  },
  getExpressInfo(order_number, express_number) {
    var that = this;
    wx.showLoading({
      title: '',
    })
    app.webapi.getExpressInfo(order_number, express_number)
      .then(res => {
        console.log("getExpressInfo--res==", res)
        if (res.data.status_code === 0) {
          var express = res.data.data;
          for (var i in express.path_item_list) {
            express.path_item_list[i].action_time_s = app.utils.dateTimeFormatter(express.path_item_list[i].action_time)
          }
          that.setData({
            express: express
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 2000
          })
        }
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
      .catch(res => {
        console.log("getExpressInfo--catch--res==", res)
        wx.showToast({
          title: res.data.message,
          icon: "none",
          duration: 2000
        })
        wx.hideLoading()
        wx.stopPullDownRefresh()
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("express--onLoad--options==", options)
    var that = this;
    if (options && options.order_number && options.express_number) {
      that.getExpressInfo(options.order_number, options.express_number)
      that.setData({
        order_number: options.order_number,
        express_number: options.express_number
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '没有找到该改订单物流,返回上一页',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            var pages = getCurrentPages()
            if (pages.length > 1) {
              app.utils.openPage2(1, "back")
            } else {
              app.utils.openPage2("../alliance/index", "switchTab")
            }
          }
        }
      })
      that.setData({
        order_number: "",
        express_number: ""
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    // var express = that.data.express;
    // for (var i in express.path_item_list) {
    //   express.path_item_list[i].action_time_s = app.utils.dateTimeFormatter(express.path_item_list[i].action_time)
    // }
    // console.log("onshow--express==", express)
    // that.setData({
    //   express: express
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.setData({
      express: null
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getExpressInfo(this.data.order_number, this.data.express_number)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})