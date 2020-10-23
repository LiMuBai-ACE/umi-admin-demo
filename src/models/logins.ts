import { message } from 'antd';
import { history } from 'umi';
import storage from '@/utils/storage';
import API from '@/services/index';

export default {
    namespace: 'login',
    state: {
        loginInfo: storage.localGet('info'),
        loginToken: storage.cookieGet('token'),
    },
    effects: {
        // 注册
        *register({ payload }: any, { call }: any) {
            const response = yield call(API.userRegister, payload);
            if (response.code === 200) {
                message.success('注册成功');
                history.push({ pathname: '/login' });
            } else {
                message.warn(response.msg);
            }
        },

        // 登录
        *login({ payload }: any, { call, put }: any) {
            const response = yield call(API.userLogin, payload);
            if (response.code === 200) {
                message.warn(response.msg);
                // 登录成功后需要改变用户信息 不然无法立即获取
                yield put({
                    type: 'setInfo',
                    payload: {
                        loginInfo: response.data,
                        loginToken: response.token,
                    },
                });
                storage.cookieSet('token', response.token, 24);
                storage.localSet('info', response.data);
                history.push({ pathname: '/home' });
            } else {
                message.warn(response.msg);
            }
        },

        // 退出登录
        *logout({ payload }: any, { call, put }: any) {
            const response = yield call(API.logout);
            if (response.code === 200) {
                message.warn(response.msg);
                storage.localClear();
                storage.localRemove('token');
                yield put({
                    type: 'handle',
                    payload: {
                        loginInfo: {},
                        loginToken: '',
                    },
                });
            } else {
                message.warn(response.msg);
            }
        },
    },
    reducers: {
        handle(state: any, { payload }: any) {
            return { ...state, ...payload };
        },
        setInfo(state: any, { payload }: any) {
            return { ...state, ...payload };
        },
    },
};
