// pages/personal/normalProblem/index.js

var WxParse = require('../../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '1',
    problemList: [],
    show:false,
    problemData: "",
    problemDes: ""
  },

  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  },

  // 获取常见问题列表
  getNormalProblems(){

    app.webapi.getNormalProblems()
      .then(res => {
        wx.hideLoading()
        var data = res.data
        if (data.status_code === 0) {
          // console.log("problems == ", data.data)
          this.setData({
            problemList: data.data
          })
        }
      })
      .catch(res => {
        console.log("getNormalProblems--catch--res==", res)
        wx.hideLoading()
      })
    
  },
  

  showProblemById(id) {
  },

  // 显示遮罩层
  onClickShow(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log("id == ", id)
    app.webapi.getNormalProblemById(id)
      .then(res => {
        wx.hideLoading()
        var data = res.data
        if (data.status_code === 0) {
          var problemData = data.data.length > 0 ? data.data[0] : "";
          that.data.description = problemData.content
          var problemDes = problemData.content;
          if (problemDes) {
            WxParse.wxParse('problemDes', 'html', problemDes, that, 5);
          }
          this.setData({
            problemData: problemData,
            show: true
          })
        }
      })
      .catch(res => {
        console.log("getNormalProblemById--catch--res==", res)
        wx.hideLoading()
      })


  },

  // 隐藏遮罩层
  onClickHide() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getNormalProblems();
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