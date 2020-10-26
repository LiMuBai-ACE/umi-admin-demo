import React, { FC, useState } from 'react';
import { Layout } from 'antd';
import { Redirect } from 'umi';
const { Content } = Layout;
import HeaderBar from '../header';
import Sidebar from '../sidebar';
import './index.less';
const Index: FC = (props: any) => {
    const [login, setLogin] = useState(true)

    return (
        <Layout style={{ height: '100%' }}>
            <Sidebar {...props} />
            <Layout>
                <HeaderBar {...props} />
                <Content style={{ padding: 30 }}>
                    <div
                        className="site-layout-background"
                    // style={{ padding: 24, minHeight: 360 }}
                    >
                        {login ? props.children : <Redirect to="/login" />}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>博韬后台管理中心</Footer> */}
            </Layout>
        </Layout>
    );
};

export default Index;
