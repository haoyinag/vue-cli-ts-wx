import Vue, { VNode } from "vue";

// declare module wx

declare global {
  interface Window {
    wx: any;
  }

  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
    interface Window {
      wx: any;
    }
  }
}

// window.wx = window.wx || {};
