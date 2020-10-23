import { defineConfig } from 'umi';
// import proxy from './proxy'

export default defineConfig({
  title: '个人网站',
  favicon:
    'https://immisso-upload.oss-cn-hangzhou.aliyuncs.com/20200517/rc-upload-1589714215963-2.png',
  ...require('./init.config'),
  ...require('./router.config'),
  ...require('./Plugins.config'),
});
