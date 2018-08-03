// pages/orderlist/orderlist.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IP: '',
    page: 1,
    num: 3,
    hasOrder: true,
    orderlist:[
      { ordnum:'121313',
        status:'待付款',
        img:'https://img.alicdn.com/imgextra/i1/628189716/TB2KviRo.lnpuFjSZFjXXXTaVXa_!!628189716.jpg_430x430q90.jpg',
        name:'憨豆熊 碧根果208g 坚果零食长寿果干果奶油口味果仁食品',
        model:'奶油味',
        classify:'500g',
        vipprice:'29.9',
        num:'1',
        total:'29.9',
        freight:'',
      }, {
        ordnum: '121sd313',
        status: '待发货',
        img: 'https://img.alicdn.com/imgextra/i1/628189716/TB2KviRo.lnpuFjSZFjXXXTaVXa_!!628189716.jpg_430x430q90.jpg',
        name: '憨豆熊 碧根果208g 坚果零食长寿果干果奶油口味果仁食品',
        model: '奶油味',
        classify: '500g',
        vipprice: '29.9',
        num: '1',
        total: '29.9',
        freight: '',
      }, {
        ordnum: '121sd313',
        status: '待收货',
        img: 'https://img.alicdn.com/imgextra/i1/628189716/TB2KviRo.lnpuFjSZFjXXXTaVXa_!!628189716.jpg_430x430q90.jpg',
        name: '憨豆熊 碧根果208g 坚果零食长寿果干果奶油口味果仁食品',
        model: '奶油味',
        classify: '500g',
        vipprice: '29.9',
        num: '1',
        total: '29.9',
        freight: '',
      }, {
        ordnum: '121sd313',
        status: '待评价',
        img: 'https://img.alicdn.com/imgextra/i1/628189716/TB2KviRo.lnpuFjSZFjXXXTaVXa_!!628189716.jpg_430x430q90.jpg',
        name: '憨豆熊 碧根果208g 坚果零食长寿果干果奶油口味果仁食品',
        model: '奶油味',
        classify: '500g',
        vipprice: '29.9',
        num: '1',
        total: '29.9',
        freight: '',
      }, {
        ordnum: '121sd313',
        status: '交易成功',
        img: 'https://img.alicdn.com/imgextra/i1/628189716/TB2KviRo.lnpuFjSZFjXXXTaVXa_!!628189716.jpg_430x430q90.jpg',
        name: '憨豆熊 碧根果208g 坚果零食长寿果干果奶油口味果仁食品',
        model: '奶油味',
        classify: '500g',
        vipprice: '29.9',
        num: '1',
        total: '29.9',
        freight: '',
      }, {
        ordnum: '121sd313',
        status: '交易关闭',
        img: 'https://img.alicdn.com/imgextra/i1/628189716/TB2KviRo.lnpuFjSZFjXXXTaVXa_!!628189716.jpg_430x430q90.jpg',
        name: '憨豆熊 碧根果208g 坚果零食长寿果干果奶油口味果仁食品',
        model: '奶油味',
        classify: '500g',
        vipprice: '29.9',
        num: '1',
        total: '29.9',
        freight: '',
      },
    ]
  },
  // 获取订单列表
  getOrders:function(typeid,page,num){
    var that = this,
      IP = that.data.IP,
      orderlist = that.data.orderlist,
      openid = wx.getStorageSync('LoginSessionKey');
    wx.request({
      url: IP + 'ysjapplet/order/getOrders',
      data: {
        type: typeid,
        page: page,
        num: num,
        openid: openid
      },
      success:function(res){
        console.log(res.data);
        var tolNum = '',
          tolPage = '';
        if (orderlist == '' || orderlist == null || orderlist == undefined) {
          if (page == 1 && res.data == '' || res.data == null || res.data == undefined) {
            that.setData({
              hasOrder: false
            })
          } else {
            that.setData({
              hasOrder: true
            })
            tolNum = res.data[0].count
            that.setData({
              orderlist: res.data,
              hasRefresh: false
            })
            tolPage = Math.ceil(Number(tolNum) / Number(num))
            that.setData({
              tolPage: tolPage
            })
            console.log(tolPage)
            if (page < tolPage) {
              that.setData({
                hasPage: true,
                hasLoading: false
              })
            }
          }
        } else {
          tolNum = res.data[0].count
          if (page == 1) {
            orderlist = res.data
          } else {
            orderlist = orderlist.concat(res.data);
          }
          that.setData({
            orderlist: orderlist,
            hasRefresh: false,
            hasGoods: true
          })
          tolPage = Math.ceil(Number(tolNum) / Number(num))
          that.setData({
            tolPage: tolPage
          })
          console.log(tolPage)
          if (page < tolPage) {
            that.setData({
              hasPage: true,
              hasLoading: false
            })
          }
        }
      }
    })
  },
  // 下拉加载
  downLoad: function (e) {
    var that = this,
      page = that.data.page,
      num = that.data.num;
    console.log(that.data.hasPage)
    console.log(that.data.hasLoading)
    if (page >= that.data.tolPage) {
      that.setData({
        showLoadding: true,
        hasLoading: true//禁止下拉
      })
    }
    if (!that.data.hasLoading && that.data.hasPage) {
      that.setData({
        hasLoading: true//禁止下拉
      })
      console.log("====下拉====")
      //显示加载
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        duration: 500
      });
      page = Number(page) + 1;
      that.setData({
        page: page
      })
      that.getOrders(that.data.typeActive, page, num);
    } else {
      if (page >= that.data.tolPage) {
        that.setData({
          showLoadding: true
        })
      }
    }
  },
  //上滑刷新
  refresh: function (e) {
    var that = this;
    if (!that.data.hasRefresh) {
      that.setData({
        hasRefresh: true,
        page: 1,
        goodslist: ''
      })
      //显示加载
      wx.showToast({
        title: '刷新中...',
        icon: 'loading',
        duration: 500
      });
      that.getOrders(that.data.typeActive, 1, that.data.num );
    }
  },
  // 监听滚动条事件
  scroll: function (e) {
    var that = this;
    that.setData({
      scrollTop: e.detail.scrollTop
    })
  },
  // 选择状态
  // changeType:function(e){
  //   var that = this,
  //     typeid = e.target.dataset.id,
  //     typeActive = that.data.typeActive;
  //   if (typeid == typeActive){
  //     return false;
  //   }else {
  //     // console.log(typeid)
  //     that.setData({
  //       typeActive: typeid,
  //       page: 1,
  //       orderlist: ''
  //     });
  //     // that.getOrders(typeid, 1, that.data.num)
  //   }
  // },
  changeOrder:function(uuid){
    var that = this,
      IP = app.globalData.IP,
      openid = wx.getStorageSync('LoginSessionKey');
    wx.request({
      url: IP + 'ysjapplet/order/getOrderInfoByUuid',
      data: {
        uuid: uuid,   //订单的唯一标识
        openid: openid   //用户的唯一标识
      },
      success: function (res) {
        console.log(res.data);
        var totalprice = '',
          vipprice = Number(res.data.vipprice),
          num = Number(res.data.num);
        totalprice = Number(vipprice * num)
        var orderlist = that.data.orderlist;
        for(var i = 0; i < orderlist.length; i++){
          if(orderlist[i].uuid == res.data.uuid){
            orderlist[i].status = res.data.status;
          }
        }
        console.log(orderlist);
        that.setData({
          orderlist: orderlist
        })
      }
    })
  },
  // 更改订单状态
  changeStatus: function(e){
    var that = this,
      IP = that.data.IP,
      typeid = e.target.dataset.id,
      uuid = e.target.dataset.value,
      typeactive = that.data.typeActive,
      title = '';
    if(typeid == 4){
      wx.navigateTo({
        url: '/pages/evaluate_add/evaluate_add',
      })
    }
    // console.log(typeid)
    // console.log(uuid)
    // if (typeid == 1){
    //   title = '确定取消订单吗？'
    // } else if (typeid == 2){
    //   title = '确定要收货吗？'
    // } else if (typeid == 3){
    //   title = '确定要申请退货吗？'
    // }
    // // 更新订单状态（包括 取消订单 和 确认订单）
    // wx.showModal({
    //   title: title,
    //   confirmColor: '#a70202',
    //   cancelColor: '#333',
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定');
    //       wx.request({
    //         url: IP + 'ysjapplet/order/updateOrderStatusByUuid',
    //         data: {
    //           type: typeid,  //1:取消订单； 2 确认订单
    //           uuid: uuid    //* uuid 订单唯一标识
    //         },
    //         method: 'POST',
    //         header: { 'content-type': 'application/x-www-form-urlencoded' },
    //         success: function (res) {
    //           console.log(res.data)
    //           if (res.data == 'success'){
    //             that.changeOrder(uuid)
    //           }
    //         }
    //       })
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      IP = app.globalData.IP;
    that.setData({
      IP: IP,
      typeActive: 0
    });
    // that.getOrders(0,1,that.data.num)
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
    // that.getOrders(0, 1, that.data.num)
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