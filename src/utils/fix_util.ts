export function closest(el: any, selector: any) {
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

/** 修复在IOS系统上背景可以滚动的问题 */
export function fixIosBackgroundScroll(e: any) {
  // fix touch to scroll background page on iOS
  if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
    return;
  }
  const pNode = closest(e.target, ".am-modal-content");
  if (!pNode) {
    e.preventDefault();
  }
}

/** 修复ios键盘唤起后收起页面不归位的问题 */
export function fixIosInputBlurBug() {
  const u = navigator.userAgent;
  // , app = navigator.appVersion;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    setTimeout(() => {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop || 0;
      window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 200);
  }
}

/** 修复安卓弹出的键盘遮盖文本框 */
export function fixAndroidInputFocus() {
  const u = navigator.userAgent;
  // ,app = navigator.appVersion;
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
  if (isAndroid) {
    setTimeout(() => {
      const doc: any = document.activeElement;
      if (doc) {
        doc.scrollIntoViewIfNeeded();
        doc.scrollIntoView();
      }
    }, 500);
  }
}

/** 修复用qs.stringify后把数组转成对象的问题，并去重 */
export function fixObejctToArray(sendToUserIds: any) {
  if (!sendToUserIds) {
    return [];
  }
  if (!Array.isArray(sendToUserIds)) {
    const arr: any = [];
    for (const key in sendToUserIds) {
      if (sendToUserIds.hasOwnProperty(key)) {
        const element = +sendToUserIds[key];
        arr.push(element);
      }
    }
    return Array.from(new Set(arr));
  } else {
    return Array.from(new Set(sendToUserIds));
  }
}
