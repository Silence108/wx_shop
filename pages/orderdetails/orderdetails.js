// pages/orderdetails/orderdetails.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IP:'',
    status:'待付款',
    ordnum:'1245612',
    createtime:'2018-01-06 18:02',
    receiver:'刘德华',
    phone:'15236245212',
    provname:'山西省',
    cityname:'太原市',
    areaname:'小店区',
    address:'锦东国际商务A座28层 哆来咪科技',
    img: 'https://img.alicdn.com/imgextra/i1/628189716/TB2KviRo.lnpuFjSZFjXXXTaVXa_!!628189716.jpg_430x430q90.jpg',
    name: '憨豆熊 碧根果208g 坚果零食长寿果干果奶油口味果仁食品',
    model: '奶油味',
    classify: '500g',
    vipprice: '29.9',
    num: '1',
    totalprice: '29.9',
    freight:'',
    total:'29.9',
    payway:'微信',
    way:'送货上门'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this,
      IP = app.globalData.IP,
      openid = wx.getStorageSync('LoginSessionKey'),
      uuid = options.uuid;
    that.setData({
      IP: IP,
      uuid: uuid,
      openid: openid
    });
    // console.log(uuid)
    // console.log(openid)
    that.getOrderInfo()
  },
  // 通过uuid获取订单详情
  getOrderInfo:function(){
    var that = this,
      IP = app.globalData.IP,
      openid = wx.getStorageSync('LoginSessionKey'),
      uuid = that.data.uuid;
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
        that.setData({
          status: res.data.status,  //状态
          ordnum: res.data.ordnum,  //订单编号
          createtime: res.data.createtime,  //下单时间
          receiver: res.data.receiver,    //收货人
          phone: res.data.phone,   //收货人电话
          provname: res.data.provname,   //省
          cityname: res.data.cityname,   //市
          areaname: res.data.areaname,   //区
          address: res.data.address,    //详细地址
          img: res.data.img,     //产品图片
          name: res.data.name,   //产品名称
          model: res.data.model,   //型号
          classify: res.data.classify,   //分类
          vipprice: res.data.vipprice,   //单价
          num: res.data.num,    //数量
          freight: res.data.freight,    //运费
          total: res.data.total,   //合计
          totalprice: totalprice   //商品总价
        })
      }
    })
  },
  // 更改订单状态
  changeStatus: function (e) {
    var that = this,
      IP = that.data.IP,
      typeid = e.target.dataset.id,
      uuid = e.target.dataset.value,
      typeactive = that.data.typeActive,
      title = '';
    console.log(typeid)
    console.log(uuid)
    if (typeid == 1) {
      title = '确定取消订单吗？'
    } else if (typeid == 2) {
      title = '确定要收货吗？'
    } else if (typeid == 3) {
      title = '确定要申请退货吗？'
    }
    // 更新订单状态（包括 取消订单 和 确认订单）
    wx.showModal({
      title: title,
      confirmColor: '#a70202',
      cancelColor: '#333',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.request({
            url: IP + 'ysjapplet/order/updateOrderStatusByUuid',
            data: {
              type: typeid,  //1:取消订单； 2 确认订单
              uuid: uuid    //* uuid 订单唯一标识
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
              console.log(res.data)
              if (res.data == 'success') {
                that.getOrderInfo()
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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