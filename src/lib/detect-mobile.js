/**
 * 检测是否为移动设备
 * @returns {boolean} 是否为移动设备
 */
export const detectIsMobile = () => {
    // 检测触摸设备
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    
    // 检测用户代理
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // 移动设备正则表达式
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;
    
    // 平板设备正则表达式
    const tabletRegex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i;
    
    // 检查是否为移动设备或平板设备
    const isMobile = mobileRegex.test(userAgent);
    const isTablet = tabletRegex.test(userAgent);
    
    // 检查屏幕尺寸
    const isSmallScreen = window.innerWidth <= 768;
    
    // 综合判断：有触摸功能且是移动设备/平板，或者是小屏幕设备
    return (hasTouch && (isMobile || isTablet)) || isSmallScreen;
};

/**
 * 检测是否为iOS设备
 * @returns {boolean} 是否为iOS设备
 */
export const detectIsIOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
};

/**
 * 检测是否为Android设备
 * @returns {boolean} 是否为Android设备
 */
export const detectIsAndroid = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android/i.test(userAgent);
};

/**
 * 检测是否为平板设备
 * @returns {boolean} 是否为平板设备
 */
export const detectIsTablet = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const tabletRegex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i;
    return tabletRegex.test(userAgent);
};