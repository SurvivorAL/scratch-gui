# Scratch GUI 移动端构建指南

本文档详细说明了如何为 Scratch GUI 项目配置和构建移动端应用。

## 概述

Scratch GUI 现在支持通过 Capacitor 构建移动端应用，可以将 Scratch 编辑器打包为原生移动应用，支持 Android 和 iOS 平台。

## 功能特性

- ✅ 移动设备检测和适配
- ✅ 触摸事件优化支持
- ✅ 全屏模式支持
- ✅ Android 应用构建
- ✅ iOS 应用构建
- ✅ 启动屏幕配置
- ✅ 移动端专用样式

## 技术栈

- **React 16.x** - 前端框架
- **Capacitor 7.x** - 跨平台移动应用框架
- **Webpack** - 模块打包工具
- **TypeScript/JavaScript** - 开发语言

## 项目结构

```
scratch-gui/
├── src/playground/mobile.jsx          # 移动端入口文件
├── src/lib/detect-mobile.js          # 移动设备检测工具
├── capacitor.config.json              # Capacitor 配置文件
├── android/                          # Android 项目
├── ios/                              # iOS 项目
└── build/                            # 构建输出目录
```

## 快速开始

### 1. 安装依赖

确保已安装 Node.js 和 npm，然后安装项目依赖：

```bash
npm install
```

### 2. 构建移动端应用

使用以下命令构建移动端应用：

```bash
# 构建并同步到移动平台
npm run mobile:build

# 仅构建 Web 版本
npm run build

# 同步 Capacitor 配置
npm run capacitor:sync
```

### 3. 打开开发环境

```bash
# 打开 Android Studio
npm run mobile:android

# 打开 Xcode (macOS)
npm run mobile:ios
```

## 移动端专用功能

### 设备检测

项目提供了完整的移动设备检测功能：

```javascript
import { detectIsMobile, detectIsIOS, detectIsAndroid, detectIsTablet } from './lib/detect-mobile';

// 检测移动设备
if (detectIsMobile()) {
    // 移动设备特定逻辑
}

// 检测 iOS 设备
if (detectIsIOS()) {
    // iOS 特定逻辑
}

// 检测 Android 设备
if (detectIsAndroid()) {
    // Android 特定逻辑
}

// 检测平板设备
if (detectIsTablet()) {
    // 平板设备特定逻辑
}
```

### 触摸优化

项目已配置触摸事件支持：

- 触摸拖动手势识别
- 触摸事件坐标处理
- 触摸优化的 CSS 样式
- 移动设备专用 meta 标签

### 全屏模式

移动端支持全屏模式，提供更好的用户体验：

```javascript
// 请求全屏模式
if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
} else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
}
```

## 构建配置

### Webpack 配置

Webpack 已配置移动端入口：

```javascript
entry: {
    gui: './src/playground/index.jsx',
    player: './src/playground/player.jsx',
    mobile: './src/playground/mobile.jsx'  // 移动端入口
}
```

### Capacitor 配置

Capacitor 配置文件 (`capacitor.config.json`) 包含：

```json
{
    "appId": "com.scratch.gui",
    "appName": "Scratch 3.0 GUI",
    "webDir": "build",
    "plugins": {
        "SplashScreen": {
            "launchShowDuration": 3000,
            "launchAutoHide": true,
            "backgroundColor": "#ffffff"
        }
    }
}
```

## 可用脚本

| 脚本命令 | 描述 |
|---------|------|
| `npm run mobile:build` | 构建并同步移动端应用 |
| `npm run mobile:android` | 构建并打开 Android 项目 |
| `npm run mobile:ios` | 构建并打开 iOS 项目 |
| `npm run capacitor:sync` | 同步 Capacitor 配置 |
| `npm run capacitor:open:android` | 打开 Android Studio |
| `npm run capacitor:open:ios` | 打开 Xcode |

## 兼容性说明

### React 16.x 兼容性

项目使用 React 16.x，与 Capacitor 7.x 完全兼容。已通过以下测试：

- ✅ React 组件渲染
- ✅ Redux 状态管理
- ✅ 触摸事件处理
- ✅ 移动设备检测
- ✅ 全屏 API 支持

### 浏览器支持

移动端构建支持以下浏览器：

- Chrome for Android
- Safari for iOS
- 其他现代移动浏览器

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本 (推荐 14.x 或更高)
   - 清理缓存: `npm run clean && npm install`

2. **Capacitor 同步失败**
   - 确保已安装 Android Studio 或 Xcode
   - 检查 `capacitor.config.json` 配置

3. **移动设备检测不准确**
   - 更新 `detect-mobile.js` 中的用户代理检测规则
   - 检查设备屏幕尺寸检测逻辑

### 调试技巧

1. **启用开发模式**
   ```bash
   npm start  # 开发服务器
   ```

2. **检查构建输出**
   ```bash
   npm run build  # 检查构建是否成功
   ```

3. **验证移动端入口**
   - 访问 `http://localhost:8601/mobile.html` 测试移动端版本

## 贡献指南

### 添加新的移动端功能

1. 在 `src/lib/` 目录下创建新的工具模块
2. 在 `src/playground/mobile.jsx` 中集成新功能
3. 更新 `MOBILE_SETUP.md` 文档
4. 运行测试确保兼容性

### 测试移动端功能

使用以下命令测试移动端功能：

```bash
# 运行移动端兼容性测试
npm test -- test/mobile/compatibility.test.js

# 运行所有测试
npm test
```

## 许可证

本项目基于 AGPL-3.0 许可证发布。

## 支持

如有问题，请参考：

- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [React 官方文档](https://reactjs.org/docs)
- [Scratch GUI GitHub 仓库](https://github.com/scratchfoundation/scratch-gui)