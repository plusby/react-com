import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'

import Button from './index';

// 默认按钮
const defaultButton = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    return <Button onClick={action('clicked')}>默认按钮</Button>
}

// 不同大小按钮
const defaultButtonWithSize = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    return <>
        <Button size="lg" onClick={action('clicked')}>larg 按钮</Button>
        <Button size="sm" onClick={action('clicked')}>small 按钮</Button>
    </>
}

// 不同类型
const defaultButtonWithType = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    return <>
        <Button btnType="primary" onClick={action('clicked')}>primary 按钮</Button>
        <Button btnType="danger" onClick={action('clicked')}>danger 按钮</Button>
        <Button btnType="link" onClick={action('clicked')}>link 按钮</Button>
    </>
}

storiesOf('Button', module)
    .add('Button', defaultButton)
    .add('不同大小 Button', defaultButtonWithSize)
    .add('不同类型 Button', defaultButtonWithType)