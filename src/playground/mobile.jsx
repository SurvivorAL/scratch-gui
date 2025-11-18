// Polyfills
import 'es6-object-assign/auto';
import 'core-js/fn/array/includes';
import 'core-js/fn/promise/finally';
import 'intl'; // For Safari 9

import React from 'react';
import ReactDOM from 'react-dom';

import AppStateHOC from '../lib/app-state-hoc.jsx';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import {detectIsMobile} from '../lib/detect-mobile';

const appTarget = document.createElement('div');
appTarget.className = 'app';
document.body.appendChild(appTarget);

// 检测是否为移动设备
const isMobile = detectIsMobile();

// 设置移动端模式
if (isMobile) {
    // 添加移动端样式类
    document.body.classList.add('mobile-mode');
    
    // 设置全屏模式
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen request failed:', err);
        });
    }
}

// 移动端GUI渲染逻辑
export default appTarget => {
    GUI.setAppElement(appTarget);

    const WrappedGui = AppStateHOC(GUI);

    ReactDOM.render(
        <WrappedGui
            canEditTitle
            backpackVisible
            showComingSoon
            canSave={false}
            isMobile={isMobile}
        />,
        appTarget
    );
};

// 立即执行渲染
GUI.setAppElement(appTarget);

const WrappedGui = AppStateHOC(GUI);

ReactDOM.render(
    <WrappedGui
        canEditTitle
        backpackVisible
        showComingSoon
        canSave={false}
        isMobile={isMobile}
    />,
    appTarget
);