import React, { useState } from 'react';
import './index.less';

function Index() {
    const [obj, setObj] = useState<any>({})
    return (
        <div>
            <h1 className="title">{obj['index'] || ''}11111111111111</h1>
        </div>
    );
}
export default Index