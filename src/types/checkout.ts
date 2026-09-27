/**订单结算 */
export interface CheckoutDTO {
  /**
   * 订单商品集合
   */
  goods: CheckoutGood[]
  /**
   * 订单总计信息
   */
  summary: CheckoutSummary
  /**
   * 订单内用户地址列表
   */
  userAddresses: UserAddress[]
}

export interface CheckoutGood {
  /**
   * 商品属性
   */
  attrsText: string
  /**
   * 商品数量，购买数量
   */
  count: number
  /**
   * 商品id
   */
  id: string
  /**
   * 商品名字
   */
  name: string
  /**
   * 商品实付单价
   */
  payPrice: string
  /**
   * 商品图片
   */
  picture: string
  /**
   * 商品价格
   */
  price: string
  /**
   * 商品sku的id
   */
  skuId: string
  /**
   * 商品实付价格小计
   */
  totalPayPrice: string
  /**
   * 商品小计总价
   */
  totalPrice: string
  [property: string]: any
}

/**
 * 订单总计信息
 */
export interface CheckoutSummary {
  /**
   * 订单总折扣
   */
  discountPrice: number
  /**
   * 订单总件数
   */
  goodsCount: number
  /**
   * 订单总邮费
   */
  postFee: number
  /**
   * 订单总价格实付
   */
  totalPayPrice: number
  /**
   * 订单总价格
   */
  totalPrice: number
  [property: string]: any
}

export interface UserAddress {
  /**
   * 收货详细地址
   */
  address: string
  /**
   * 收货地址标签，用英文逗号分割
   */
  addressTags: null | string
  /**
   * 收货地址-城市编码
   */
  cityCode: string
  /**
   * 收货人-联系方式
   */
  contact: string
  /**
   * 收货地址-地区编码
   */
  countyCode: string
  /**
   * 收货完整地址
   */
  fullLocation: string
  /**
   * 收货地址id
   */
  id: string
  /**
   * 是否为默认，0是, 1不是
   */
  isDefault: number
  /**
   * 收货方-邮政编码
   */
  postalCode: null | string
  /**
   * 收货地址-省份编码
   */
  provinceCode: string
  /**
   * 收货人-名字
   */
  receiver: string
}

/**提交订单参数 */
export interface CreateOrderParams {
  /**
   * 收货地址id
   */
  addressId: string
  /**
   * 买家备注留言，默认为空字符串即可
   */
  buyerMessage: string
  /**
   * 配送时间，默认为1即可
   */
  deliveryTimeType: number
  /**
   * 订单内商品集合，需要自己携带给后台
   */
  goods: CreateOrderGoodParams[]
  /**
   * 支付渠道，默认为1即可(支付宝支付-此项目只支持支付宝)
   */
  payChannel: number
  /**
   * 支付方式，默认为1即可(在线支付)
   */
  payType: number
}

export interface CreateOrderGoodParams {
  /**
   * 商品数量
   */
  count: number
  /**
   * 商品库存量单位id
   */
  skuId: string
}

/**创建订单结果 */
export interface CreateOrderResult {
  /**
   * 订单倒计时，剩余的秒数 -1 表示已经超时，正数表示倒计时未结束
   */
  countdown: null
  /**
   * 订单创建时间
   */
  createTime: string
  /**
   * 订单id
   */
  id: string
  /**
   * 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消
   */
  orderState: number
  /**
   * 订单支付渠道，1支付宝、2微信
   */
  payChannel: number
  /**
   * 订单付款截止时间，剩余的秒数，前台转换成分钟：秒数
   */
  payLatestTime: string
  /**
   * 订单实付金额
   */
  payMoney: number
  /**
   * 订单支付方式，1为在线支付，2为货到付款
   */
  payType: number
  /**
   * 订单邮费
   */
  postFee: number
  /**
   * 订单商品sku的id集合
   */
  skus: null
  /**
   * 订单金额合计
   */
  totalMoney: number
  /**
   * 订单数量合计
   */
  totalNum: number
}


