import React, { FC } from 'react';
import './index.less';
import { connect } from 'dva';

const Home: FC = (props: any) => {
  return (
    <div>
      <h1 className="title"> home</h1>
    </div>
  );
};
export default connect()(Home);
// ({ login: { loginInfo, loginToken } }: any) => ({
//     loginInfo,
//     loginToken,
// })
