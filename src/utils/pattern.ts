/** 年龄正则表达式 */
export const agePattern = /^([1-9]|[0-9]{2}|100)$/;

/** 手机正则表达式 */
export const mobilePattern = /^1[123456789]\d{9}$/;

/** 非特殊字符正则表达式 */
export const speciaTextPattern = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;

/** 数字+英文 */
export const numEnTextPattern = /^[0-9a-zA-Z]+$/;

/** 数字+小数点 */
export const numPotTextPattern = /^(\d|\.)+(\.\d+)?$/;

/** 数字 */
export const numPattern = /^\d{1,}$/;

/** 性别 */
export const sex = [
  {
    id: "男",
    name: "男"
  },
  {
    id: "女",
    name: "女"
  }
];
