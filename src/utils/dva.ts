import { create } from 'dva-core';
import { message } from 'antd';
import createLoading from 'dva-loading';

let app: {
  use: (val: any) => void;
  model: (val: any) => any;
  start: () => void;
  _store: { dispatch: any };
  getStore: () => { dispatch: any };
  dispatch: any;
};
let store: { dispatch: any };
let dispatch;

function createApp(opt: { onError: (err: any) => void; models: any[] }) {
  // redux日志
  // opt.onAction = [createLogger()];
  opt.onError = (err: any) => {
    console.error(err);
    // Taro.hideLoading();
    message.error('服务器错误');
  };
  app = create(opt);
  app.use(createLoading({}));
  opt.models.forEach((model) => app.model(model.default));
  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;

  app.dispatch = dispatch;
  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};
