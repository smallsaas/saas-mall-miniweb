// pages/register/applied.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 0,
    message: ""
  },
  openPage(e) {
    console.log("openPage--e==", e)
    app.utils.openPage(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var status = 0;
    if (options && options.status) {
      status = parseInt(options.status)
    }
    that.setData({
      status: status
    })
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
    wx.hideHomeButton()
    wx.hideShareMenu()
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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