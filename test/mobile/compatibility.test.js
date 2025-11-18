/**
 * 移动端兼容性测试
 * 验证React 16.x与Capacitor的兼容性
 */

describe('Mobile Compatibility Tests', () => {
  
  test('React 16.x should be compatible with Capacitor', () => {
    // 检查React版本
    const reactVersion = require('react/package.json').version;
    expect(reactVersion).toMatch(/^16\./);
    
    // 检查Capacitor核心依赖
    const capacitorCore = require('@capacitor/core/package.json');
    expect(capacitorCore).toBeDefined();
    
    // 检查移动端检测功能
    const detectMobile = require('../../src/lib/detect-mobile.js');
    expect(typeof detectMobile.detectIsMobile).toBe('function');
    expect(typeof detectMobile.detectIsIOS).toBe('function');
    expect(typeof detectMobile.detectIsAndroid).toBe('function');
    expect(typeof detectMobile.detectIsTablet).toBe('function');
  });
  
  test('Mobile entry point should load correctly', () => {
    // 检查移动端入口文件是否存在
    const fs = require('fs');
    const path = require('path');
    
    const mobileEntryPath = path.join(__dirname, '../../src/playground/mobile.jsx');
    expect(fs.existsSync(mobileEntryPath)).toBe(true);
    
    const mobileEntryContent = fs.readFileSync(mobileEntryPath, 'utf8');
    expect(mobileEntryContent).toContain('ReactDOM.render');
    expect(mobileEntryContent).toContain('mobile');
  });
  
  test('Capacitor configuration should be valid', () => {
    const fs = require('fs');
    const path = require('path');
    
    const capacitorConfigPath = path.join(__dirname, '../../capacitor.config.json');
    expect(fs.existsSync(capacitorConfigPath)).toBe(true);
    
    const capacitorConfig = JSON.parse(fs.readFileSync(capacitorConfigPath, 'utf8'));
    expect(capacitorConfig.appId).toBe('com.scratch.gui');
    expect(capacitorConfig.appName).toBe('Scratch 3.0 GUI');
    expect(capacitorConfig.webDir).toBe('build');
  });
  
  test('Mobile build process should work', () => {
    // 检查移动端构建脚本
    const packageJson = require('../../package.json');
    expect(packageJson.scripts['mobile:build']).toBeDefined();
    expect(packageJson.scripts['mobile:android']).toBeDefined();
    expect(packageJson.scripts['mobile:ios']).toBeDefined();
    
    // 检查Capacitor相关脚本
    expect(packageJson.scripts['capacitor:sync']).toBeDefined();
    expect(packageJson.scripts['capacitor:open:android']).toBeDefined();
    expect(packageJson.scripts['capacitor:open:ios']).toBeDefined();
  });
  
  test('Mobile-specific features should be available', () => {
    // 模拟移动设备环境
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
      configurable: true
    });
    
    Object.defineProperty(window, 'innerWidth', {
      value: 375,
      configurable: true
    });
    
    Object.defineProperty(window, 'innerHeight', {
      value: 667,
      configurable: true
    });
    
    // 测试触摸支持
    expect('ontouchstart' in window).toBe(true);
    
    // 测试移动设备检测
    const detectMobile = require('../../src/lib/detect-mobile.js');
    expect(detectMobile.detectIsMobile()).toBe(true);
    expect(detectMobile.detectIsIOS()).toBe(true);
  });
});