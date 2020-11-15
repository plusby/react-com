import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from './index'


const defaultProps = {
  onClick: jest.fn()
}

const testProps = {
  className: 'haha'
}

const disableProps = {
  onClick: jest.fn()
}

describe('test Button component',()=>{
  // 查看当前元素是否是button
  it('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>test</Button>)
    const element = wrapper.queryByText('test')
    expect(element).toBeInTheDocument() // 组件是否在文档中
    expect(element.tagName).toEqual('BUTTON')  // 是否是button元素
    fireEvent.click(element) // 触发点击事件
    expect(defaultProps.onClick).toHaveBeenCalled() // 这个时候是否被触发

  })
  it('button上面是否具有指定的属性',()=>{
    const wrapper = render(<Button {...testProps}>test</Button>)
    const element = wrapper.queryByText('test')
    expect(element).toBeInTheDocument() // 组件是否在文档中
    expect(element).toHaveClass('btn btn-primary haha') //  是否具有上面的class属性
  })
  it('button是否是一个a链接',()=>{
    const wrapper = render(<Button btnType="link" href='www.baidu.com' {...testProps}>test</Button>)
    const element = wrapper.queryByText('test')
    expect(element).toBeInTheDocument() // 组件是否在文档中
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link') //  是否具有上面的class属性
  })
  it('button设置disbale为true是否生效',()=>{
    const wrapper = render(<Button disabled {...disableProps}>test</Button>)
    const element = wrapper.queryByText('test') as HTMLButtonElement
    expect(element).toBeInTheDocument() // 组件是否在文档中
    expect(element.disabled).toBeTruthy() // disable属性是否是true
    fireEvent.click(element)  // 执行点击事件
    expect(disableProps.onClick).not.toHaveBeenCalled() //  元素身上的点击事件没有被调用
  })
})
