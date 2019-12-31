// pages/personal/coupon/index.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    currentStatus:'ACTIVATION',
    tabs:[
      { "id": 1, "title": "可使用", "count": 0, "status": "ACTIVATION" },
      { "id": 2, "title": "未领取", "count": 0, "status": "NON_ACTIVATION" },
      { "id": 3, "title": "已使用", "count": 0, "status": "USED" },
      { "id": 4, "title": "已失效", "count": 0, "status": "OVERDUE" }
    ],
    couponList:[],
    pageNumber:1,
    pageSize:10
  },

  //tab切换
  onChange(event) {
    var selectIndex = event.detail.index;
    var status = "";
    if (selectIndex == 0){
      status = "ACTIVATION"
    } else if (selectIndex == 1) {
      status = "NON_ACTIVATION"
    } else if (selectIndex == 2) {
      status = "USED"
    } else if (selectIndex == 3) {
      status = "OVERDUE"
    }
    this.setData({
      active: selectIndex,
      currentStatus: status
    })
    this.getCoupons(status, 1, 10)

  },

  //获取优惠券
  getCoupons(status, pageNumber, pageSize){
    var that = this
    app.webapi.getCoupons(status, pageNumber, pageSize)
      .then(res => {
        wx.hideLoading()
        var data = res.data
        if (data.status_code === 0) {
          var tabsData = that.data.tabs
          tabsData[0].count = data.data.ACTIVATION > 0 ? data.data.ACTIVATION : 0;
          tabsData[1].count = data.data.NON_ACTIVATION > 0 ? data.data.NON_ACTIVATION : 0;
          tabsData[2].count = data.data.USED > 0 ? data.data.USED : 0;
          tabsData[3].count = data.data.OVERDUE > 0 ? data.data.OVERDUE : 0;
          that.setData({
            tabs: tabsData,
          })
          if ( data.data.coupons.length > 0 ){
            that.couponTypeChecked(data.data.coupons, pageNumber)
          }else{
            this.setData({
              couponList: data.data.coupons
            })
          }
        }
      })
      .catch(res => {
        console.log("getCoupons--catch--res==", res)
        wx.hideLoading()
      })
  },

  //判断优惠券类型
  couponTypeChecked(cList, pageNumber) {

    var couponList = [];
    cList.map((item, index) => {
      var money = item.money;
      var discount = item.discount;
      var type = item.type;
      if (money > 0 && type == 'ORDER') {
        item.isMoney = true;
        item.isDiscount = false;
        item.couponTypeName = "代金券";
        return item;
      }

      if (discount > 0 && type == 'ORDER') {
        item.isMoney = false;
        item.isDiscount = true;
        item.couponTypeName = "打折券";
        return item;
      }

      if (type == 'PRODUCT') {
        item.isMoney = true;
        item.isDiscount = false;
        item.couponTypeName = "专用券";
        return item;
      }

    })
    if (pageNumber > 1) {
      couponList = this.data.couponList.concat(cList)
    } else {
      couponList = cList
    }
    this.setData({
      couponList: couponList
    })
  },

  // 激活优惠券
  activeCoupon(e){
    var id = e.currentTarget.dataset.id;
    var that = this
    app.webapi.activeCoupon(id)
      .then(res => {
        wx.hideLoading()
        var data = res.data
        if (data.status_code === 0) {
          wx.showToast({
            title: "激活成功",
            icon: "none",
            duration: 1500
          })
          this.getCoupons("NON_ACTIVATION", 1, 10)
        } else if (data.status_code === 1 && data.message == "user.must.be.followed"){
          wx.showToast({
            title: "激活失败，需要关注公众号",
            icon: "none",
            duration: 1500
          })
        }
      })
      .catch(res => {
        wx.showToast({
          title: "激活失败",
          icon: "none",
          duration: 1500
        })
        console.log("activeCoupon--catch--res==", res)
        wx.hideLoading()
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getCoupons("ACTIVATION", 1, 10)
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
    var that = this;
    that.getCoupons(that.data.currentStatus, 1, 10);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.data.pageNumber += 1;
    that.getProduct(that.data.currentStatus, that.data.pageNumber, 10)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})