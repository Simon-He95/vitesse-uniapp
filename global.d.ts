import { Uni } from '@dcloudio/uni-app';

declare module '@dcloudio/uni-app' {
  interface Uni {
    // 在这里添加你希望扩展的 uni 对象的属性和方法
    myCustomMethod: () => void;
  }
}
