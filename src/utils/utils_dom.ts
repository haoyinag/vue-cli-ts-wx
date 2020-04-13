/** 隐藏所有指定的元素 */
export const hide = (...el) => [...el].forEach(e => (e.style.display = "none"));
// exp: hide(document.querySelectorAll('img'))

/** 检查元素是否具有指定的类 */
export const hasClass = (el, className: string) =>
  el.classList.contains(className);
// exp: hasClass(document.querySelector('p.special'), 'special') // true
