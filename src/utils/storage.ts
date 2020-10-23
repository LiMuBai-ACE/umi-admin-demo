// 公共存储方法 
import cookie from 'react-cookies';  // cookie方法库
import CryptoJS from 'crypto-js'; //'

// 自定义加密密钥
const KEY = 'javascript';

// 加密
const encrypt = (data: any) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), KEY);
};

// 解密
const decrypt = (data: any) => {
    const bytes = CryptoJS.AES.decrypt(data, KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};

const StorageHelper = {
    localGet: (key: string) => {
        try {
            const formatted = decrypt(JSON.parse(localStorage.getItem(key) || ''));
            return formatted;
        } catch (e) {
            return undefined;
        }
    },
    localSet: (key: string, value: any) => {

        localStorage.setItem(key, JSON.stringify(encrypt(value)));
    },
    localRemove: (key: string) => {
        localStorage.removeItem(key);
    },
    localClear: () => {
        localStorage.clear();
    },
};
const CookieHelper = {
    cookieGet: (key: string) => {
        try {
            const formatted = decrypt(cookie.load(key));
            return formatted;
        } catch (e) {
            return undefined;
        }
    },
    // hour  小时
    cookieSet: (key: string, value: any, hour: number) => {
        // 有限制时间的cookie存储
        if (hour) {
            let timer = new Date(
                new Date().getTime() + hour * 3600 * 1000,
            )
            cookie.save(key, encrypt(value), { expires: timer });
        } else {
            // 无限制时间的cookie存储
            cookie.save(key, encrypt(value));
        }
    },
    cookieRemove: (key: string) => {
        cookie.remove(key);
    },
};

export default { ...CookieHelper, ...StorageHelper };