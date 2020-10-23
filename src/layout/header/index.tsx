import React, { FC } from 'react'
import { Layout } from 'antd';
import { Link } from 'umi';
import './index.less';
const { Header } = Layout;


const HeaderBar: FC = () => {
    return (
        <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
        >
            <div style={{ color: 'red' }}></div>
        </Header>
    )
}

export default HeaderBar
