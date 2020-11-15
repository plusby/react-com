import '../src/styles/index.scss'
import { configure, addDecorator, addParameters } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import React from 'react'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const styles: React.CSSProperties = {
  textAlign: 'center'
}

const CenterDescorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

configure(CenterDescorator,module)
addDecorator(withInfo) // 使用描述插件
addParameters({ // 添加描述信息
  info: {
      // text: `
      //     这是一个按钮组件，
      //     ## this is a header
      //     ~~~js
      //     const a = 'hello'
      //     ~~~
      // `,
      inline: true, //默认展开
  }
})