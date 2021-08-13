//app.js
const utils = require('./utils/util.js')
const webapi = require('./webapi/index.js')
var URL_API = 'https://api.mall.smallsaas.cn/rest'

App({
  utils: utils,
  webapi: webapi,
  onLaunch: function(options) {
    var that = this;
    console.log('app--onLaunch--options==', options)
    var inviteCode = null;
    if (options && options.query && options.query.inviteCode) {
      inviteCode = options.query.inviteCode
    }
    // that.login("", function(res) {
    //   if (res.data.status_code === 0) {
    //   }
    // }, inviteCode)
    wx.getSystemInfo({
      success: function(res) {
        console.log('app--etSystemInfo--res==', res)
        that.screenHeight = res.screenHeight,
          that.screenWidth = res.screenWidth
      }
    })
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },

  onShow(options) {
    console.log('app--onShow--options==', options)
    var that = this;
    // var pages = getCurrentPages()
    // console.log("app--init--pages==", pages)
    // if (pages.length && pages[pages.length - 1].route != "pages/alliance/index") {
    // that.init()
    // }
    that.init()

  },

  isRuning: false,

  //初始化信息
  init() {
    var that = this;
    // if (!that.isRuning) {
    // that.getCategory()
    // that.getAllianceOrder()
    // }

    //TODO
    that.login("", function(res) {
      if (res.data.status_code === 0) {
        // this.utils.openPage2("/pages/register/phone")
        if (!that.isRuning) {
          // that.getCategory()
          // that.getAllianceOrder()
        }
      }
    }, 'app')
    // console.log("app--init--that.isRuning==", that.isRuning)
    // if (!that.isRuning) {
    //   that.getCategory()
    //   that.getAllianceOrder()
    // } else {
    // }
  },

  //商品分类
  getCategory() {
    var that = this;
    that.isRuning = true;
    var categoryData = [];
    that.webapi.getCategory(false)
      .then(res => {
        console.log("getCategory--res==22222", res)
        wx.hideLoading()
        if (res.data.status_code === 0) {
          if (res.data.data) {
            // categoryData = [{
            //   id: -1,
            //   name: '全部'
            // }]
            // categoryData = categoryData.concat(res.data.data)
            that.globalData.categoryData = categoryData
          }
          console.log("res--data---list==22222", categoryData)
          that.isRuning = false;
          wx.setStorageSync('categoryData', categoryData)
        } else {
          throw res
        }
      })
      .catch(res => {
        wx.hideLoading()
        console.log("getCategory--catch--res==", res)
        wx.setStorageSync('categoryData', [])
        that.isRuning = false;
      })
  },

  //登录
  login(userAuth, cb, page) {
    wx.showLoading({
      title: '加载中',
    })
    utils.promisify(wx.login)()
      .then(res => {
        console.log("wx.login--res==", res)
        if (userAuth) {
          wx.setStorageSync("userInfo", userAuth.userInfo)
          return webapi.apiLogin({
            code: res.code,
            encryptedData: userAuth.encryptedData,
            iv: userAuth.iv
          })
        } else {
          return webapi.apiLogin({
            code: res.code
          })
        }
      })
      .then(res => {
        console.log("login--res==", res)
        wx.hideLoading()
        if (res.data.status_code == 0) {
          if (res.data.data.access_token) {
            this.globalData.token = res.data.data.access_token;
            this.globalData.openid = res.data.data.openid;
            if (page) {
              return;
            }
            // if (userAuth) {
            //   this.judgeAlliances("/pages/register/phone")
            // } else {
            //   this.judgeAlliances("/pages/register/index")
            // }
          }
          typeof(cb) == 'function' && cb(res)
        } else if (res.data.status_code == 4001) {
          if (res.data.message === "auth.required") {}
          utils.openPage2("/pages/register/index", "redirect")
          // if (that) {
          //   that.setData({
          //     loginPopup: true
          //   })
          // }
        } else {
          throw res
        }
      })
      .catch(res => {
        wx.hideLoading()
        console.log("wx.login--catch--res==", res)
      })
  },

  //用户信息
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  getAllianceOrder(cb) {
    this.isRuning = true;
    wx.showLoading({
      title: '',
    })
    this.webapi.getAllianceOrder()
      .then(res => {
        console.log("getAllianceOrder--res==", res)
        if (res.data.status_code === 0) {
          if (res.data.data) {
            var commissionOrder = res.data.data.commissionOrder
            var commissionTotal = 0
            commissionOrder.map((item, index) => {
              commissionTotal += item.commission
            })
            res.data.data.commissionTotal = commissionTotal;
            console.log("getAllianceOrder--commissionTotal==", commissionTotal)
          }
          this.globalData.allianceData = res.data.data
          typeof(cb) === 'function' && cb(res.data.data)
        } else {
          typeof(cb) === 'function' && cb('')
        }
        wx.hideLoading()
        wx.stopPullDownRefresh()
        this.isRuning = false;
      })
      .catch(res => {
        console.log("getAllianceOrder--catch--res==", res)
        wx.hideLoading()
        wx.stopPullDownRefresh()
        this.isRuning = false;
        typeof(cb) === 'function' && cb('')
      })
  },

  checkWalletPassword(cb) {
    var that = this;
    // that.webapi
  },

  // 钱包支付；
  walletPay(e, orderData, page, cb) {
    var that = this;
    console.log("walletPay--e==", e)
    console.log("walletPay--orderData==", orderData)
    console.log("walletPay--orderData.order_number==", orderData.order_number)
    var password = e.detail.value.password;
    if (!orderData || password.length === 0) {
      wx.showToast({
        title: "请输入密码",
        icon: "none"
      })
      return
    }
    var post_order = {
      orderNumber: orderData.order_number,
      orderType: "Order",
      // "type": "WALLET",
      password: password
    }
    wx.showLoading({
      title: '加载中',
    })
    that.webapi.walletPay(post_order)
      .then(res => {
        console.log("walletPay--res==", res)
        wx.hideLoading()
        if (res.data.status_code === 0) {
          that.getAllianceOrder()
          wx.showToast({
            title: '支付成功',
          })
          typeof(cb) === "function" && cb(res)
        } else {
          throw res
        }
      })
      .catch(res => {
        console.log("walletPay--catch--res==", res)
        var errorMessage = "支付失败"
        wx.hideLoading()
        if (res.data.message == "incorrect.password") {
          errorMessage = "密码错误"
        } else if (res.data.message == "password.not.set") {
          errorMessage = "未设置支付密码"
        }
        wx.showToast({
          title: errorMessage,
          icon: 'none',
          duration: 3000
        })
      })
  },

  // 请求商品收藏列表；
  getFavorite: function(callback) {
    console.log(159357)
    var that = this
    wx.request({
      url: that.globalData.URL_API + '/product_favorite', //仅为示例，并非真实的接口地址
      data: {},
      method: 'GET',
      header: {
        'Authorization': that.globalData.token,
        'content-type': 'json'
      },
      success: function(res) {
        // console.log("app---getFavorite")
        // console.log(res.data.data)
        // that.globalData.favoriteArr = res.data.data
        // console.log(that.globalData.favoriteArr)
        var data = res.data
        if (data.status_code == 0) {
          that.globalData.favoriteArr = data.data
          callback(res.data.data)
        } else {
          console.log("获取收藏信息失败")
        }

      }
    });
  },
  // 获取收货地址列表；
  getAddressList: function(callback) {
    var that = this
    wx.request({
      url: that.globalData.URL_API + '/contact',
      data: {},
      header: {
        'Authorization': that.globalData.token,
        'content-type': 'json'
      },
      success: function(res) {

        that.globalData.addressArr = res.data.data
        callback(res.data.data)
      }
    })
  },

  // 获取个人信息；
  getProfile(flag, cb) {
    var that = this;
    var userProfile = wx.getStorageSync("user_profile")
    console.log("app--getProfile--userProfile==", userProfile)
    if (flag || !userProfile) {
      that.webapi.getProfile()
        .then(res => {
          console.log("getProfile--res==", res)
          if (res.data.status_code === 0) {
            // if (res.data.status_code === 0 && res.data.data) {
            //   wx.setStorageSync("user_profile", res.data.data)
            //   typeof (cb) == 'function' && cb(res)
            // }
            if (res.data.data) {
              wx.setStorageSync("user_profile", res.data.data)
              typeof(cb) == 'function' && cb(res.data.data)
            } else {
              typeof(cb) == 'function' && cb("")
            }
          }
        })
        .catch(res => {
          console.log("getProfile--catch--res==", res)
        })
    } else {
      typeof(cb) == 'function' && cb(userProfile)
    }
  },

  judgeAlliances(url) {
    var that = this
    webapi.judgeAlliances()
      .then(res => {
        console.log("app--judgeAlliances--res==", res)
        if (res.data.status_code === 0) {
          // utils.openPage2("/pages/register/phone", "redirect")
          utils.openPage2("/pages/alliance/index", "redirect")
        } else if (res.data.status_code === 1) {
          if (url === "/pages/register/phone") {
            utils.openPage2(url, "redirect")
          } else {
            utils.promisify(wx.showModal)({
                title: '提示',
                content: '您不是盟友，请绑定手机号码',
                showCancel: false,
              })
              .then(res => {
                console.log("judgeAlliances--showModal--res==", res)
                if (res.confirm) {
                  utils.openPage2(url, "redirect")
                }
              })
          }
        } else if (res.data.status_code === 2 || res.data.status_code === 4) {
          utils.openPage2("/pages/register/applied?status=" + res.data.status_code, "redirect")
        } else if (res.data.status_code === 3) {
          utils.openPage2("/pages/register/phone", "redirect")
        } else if (res.data.status_code === 5) {
          wx.showModal({
            title: '提示',
            content: res.data.message,
          })
        }
      })
      .catch(res => {
        console.log("app--judgeAlliances--catch--res==", res)
      })
  },

  globalData: {
    userInfo: null,
    categoryData: [],
    // URL_API: 'https://www.kequandian.net/rest',
    URL_API: "https://api.mall.smallsaas.cn/rest",
    // URL_API: "https://biliya.zele.pro/rest",
    favoriteArr: {},
    addressArr: [],
    token: null,
    token: "",
    selCartJson: null,
    selFriend: null,
    allianceData: null,
    allStatusName: {
      "CREATED_PAY_PENDING": "待支付",
      "CLOSED_PAY_TIMEOUT": "支付超时关闭",
      "CLOSED_CANCELED": "已取消",
      "PAID_CONFIRM_PENDING": "已支付",
      "CONFIRMED_DELIVER_PENDING": "待发货",
      "DELIVERING": "发货中",
      "DELIVERED_CONFIRM_PENDING": "已发货",
      "CANCELED_RETURN_PENDING": "待退货",
      "CLOSED_CONFIRMED": "已确认收货",
      "CANCELED_REFUND_PENDING": "待退款",
      "CLOSED_REFUNDED": "已退款",
      "CONFIRMED_PICK_PENDING": "待取货"
    },
    categoryId:0
  }
})