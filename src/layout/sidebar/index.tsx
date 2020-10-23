// 侧边栏

import React, { FC, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';
const { Sider } = Layout;
const { SubMenu } = Menu;
import './index.less';
const Sidebar: FC = (props: any) => {
    const [route, setRoute] = useState<any>({})
    const [key, setKey] = useState<string>('')  // 需要高亮的导航
    const [openKey, setOpenKey] = useState<string>('')  // 需要打开的导航
    useEffect(() => {
        const { location, route } = props
        const { pathname } = location
        const { routes } = route
        setRoute(route)  // 拿到route 进行遍历 渲染侧边栏

        // 区分有无子路由
        let oneRoute: any = {},  // 子路由
            indexArr: Array<number> = []  // 二级路由

        //  第一层的遍历
        routes.map((item: any, index: number) => {
            // 拿到子路由的index
            findRoute(item, index)
        })

        // 便利侧边栏 拿到路由对象 和对应的路由下标
        function findRoute(route: any, index: number) {
            if (route.path === pathname) {
                oneRoute = route
                indexArr.push(index)
            } else if (JSON.stringify(oneRoute) === "{}" && route.routes && route.routes.length > 0) {
                indexArr.push(index)
                route.routes.map((item: any, k: number) => {
                    findRoute(item, k)
                })
            }
        }
        setKey(oneRoute.name)
        let openObj = route;
        indexArr.splice(indexArr.length - 1)
        indexArr.map((num: number) => {
            openObj = openObj.routes[num]
        })
        setOpenKey(openObj.name)
    }, [])

    // 便利侧边栏
    function MapRoute(route: any, name?: string) {
        if (route.routes && route.routes.length > 0) {
            return <SubMenu
                key={route.name}
                title={route.name}
                onTitleClick={() => {
                    // 打开和关闭subMenu
                    route.name === openKey ? setOpenKey('') : setOpenKey(route.name)
                }}
            >
                {route.routes.map((route: any) => {
                    return MapRoute(route, route.name)
                })}
            </SubMenu>
        } else {
            return <Menu.Item
                onClick={() => { setKey(route.name); !name && setOpenKey('') }}
                key={route.name}>
                <Link to={route.path}>{route.name}</Link>
            </Menu.Item>
        }
    }
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
            }}
            onCollapse={(collapsed, type) => {
            }}
        >
            <div className="logo" style={{ height: '64px' }}>
                <img src={require('@/assets/images/logo.jpg')} style={{ width: '100%', height: '100%' }} />
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[key]} openKeys={[openKey]}>
                {route.routes && route.routes.length > 0 && route.routes.map((item: any) => {
                    return MapRoute(item)
                })}
            </Menu>
        </Sider>
    );
};

export default Sidebar;
