// pages/personal/team/award.js
const app = getApp()
const nowDate = new Date()
const Y = nowDate.getFullYear()
const M = nowDate.getMonth() + 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commissionTotal: 0,
    commissionOrder: [],
    fetch_date: "",
    end_date: Y+"-"+M,
    awardDetails: [
      {
        id: 1,
        order_time: "2019-05-05",
        recommend_ally: "李四",
        order_price: 2000.0,
        order_holder: 400.0,
        holder_status: 1,
        status: 1,
      },
      {
        id: 2,
        order_time: "2019-05-05",
        recommend_ally: "李四",
        order_price: 2000.0,
        order_holder: 400.0,
        holder_status: 0,
        status: 0,
      },
      {
        id: 3,
        order_time: "2019-05-05",
        recommend_ally: "李四",
        order_price: 2000.0,
        order_holder: 400.0,
        holder_status: 1,
        status: 1,
      }
    ]
  },
  bindDateChange(e) {
    console.log('bindDateChange--e==', e)
    this.setData({
      fetch_date: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var allianceData = app.globalData.allianceData;
    console.log("allianceData==", allianceData)
    if (allianceData) {
      that.setData({
        commissionOrder: allianceData.commissionOrder || [],
        commissionTotal: allianceData.commissionTotal
      })
    }
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