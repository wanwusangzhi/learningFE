interface Window {
  [key: string]: any;
  prototype: Window;
  new(): Window;
}
declare function require(moduleName: string): any;
// declare function require(moduleNames: string[], onLoad: (...args: any[]) => void): void;