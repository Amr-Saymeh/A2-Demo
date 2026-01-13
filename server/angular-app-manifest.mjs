
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/A2-Demo/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/A2-Demo/rest1",
    "route": "/A2-Demo"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-ICFOHZC2.js"
    ],
    "route": "/A2-Demo/cart"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/category/*"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/t/*"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/control-board"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/dashboard"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/stats"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/ManageMenuComponent"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/EditItemComponent"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/kitchen-orders"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/bar-orders"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/hookah-orders"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/ordering-dashboard"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/attendance"
  },
  {
    "renderMode": 0,
    "route": "/A2-Demo/*/add-employee"
  },
  {
    "renderMode": 0,
    "redirectTo": "/A2-Demo",
    "route": "/A2-Demo/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 72298, hash: '0f9601100670a2d31c3f93a8787d916bdabf6a74baf448cc58fd1105f063799a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7311, hash: '68b31f98c78f2c51ec4054d54b349fec71a4b46deca6c33024d73920d7e3056b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-RA7KVTWU.css': {size: 425919, hash: 'y+/ETOflK+s', text: () => import('./assets-chunks/styles-RA7KVTWU_css.mjs').then(m => m.default)}
  },
};
