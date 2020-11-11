import React from 'react'
import { render, fireEvent, RenderResult, cleanup, wait } from '@testing-library/react'
import Menu,{ MenuProps } from './index.tsx'
import MenuItem from './MenuItem'
import SubMenuItem from './SubMenu'

const menuProps:MenuProps = {
  defaultIndex: 0,
  className: 'test',
  onSelect: jest.fn(),
}

const menuVerticalProps:MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
  onSelect: jest.fn(),
}

const renderMenu = (props: menuProps) => {
  return (
    <Menu {...props} >
      <MenuItem index={0}>active</MenuItem>
      <MenuItem index={1} disabled>disabled</MenuItem>
      <MenuItem index={2}>菜单3</MenuItem>
      <SubMenuItem title="子菜单1">
        <MenuItem>drop1</MenuItem>
        <MenuItem>子菜单4</MenuItem>
      </SubMenuItem>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .com-sub-menu{
      display: none;
    }
    .com-sub-menu,.open-item{
      display: block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult, menuElement:HTMLElement, activeElement:HTMLElement, disableElement:HTMLElement;
describe('test Menu and MenuItem component',()=>{
  // 在执行it前执行的代码
  beforeEach(()=>{
    // 渲染menu组件
    wrapper = render(renderMenu(menuProps))
    // 样式添加到文档中
    wrapper.container.append(createStyleFile())
    // 获取menu元素
    menuElement = wrapper.getByTestId('test-menu')
    // 获取具有active元素
    activeElement = wrapper.getByText('active')
    // 获取具有disbaled元素
    disableElement = wrapper.getByText('disabled')
  })
  it('渲染menu和menuItem和其的默认属性',()=>{
    // menuElement元素是否被渲染
    expect(menuElement).toBeInTheDocument()
    // 是否具有指定的class
    expect(menuElement).toHaveClass('com-menu test')
    // 判断指定的元素的个数是否等于指定的值
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    // active元素是否具有相应的class
    expect(activeElement).toHaveClass('com-menu-item com-menu-item-active')
    expect(disableElement).toHaveClass('com-menu-item com-menu-item-disable')
  })
  it('点击item,class应为active并且执行select函数',()=>{
    // 获得text为菜单3的元素
    const item = wrapper.getByText('菜单3')
    // 点击item元素
    fireEvent.click(item)
    // 点击的这个元素上是否具有这个class
    expect(item).toHaveClass('com-menu-item-active')
    // activeElement元素上是否没有这个class
    expect(activeElement).not.toHaveClass('com-menu-item-active')
    // 这个函数是否被执行了2次
    expect(menuProps.onSelect).toHaveBeenCalledWith(2)
    // 点击disableElement元素
    fireEvent.click(disableElement)
    // 指定函数没有被执行
    expect(menuProps.onSelect).not.toHaveBeenCalledWith(1)
  })
  it('设置mode为vertival应该渲染为纵向模式',()=>{
    // 清空之前创建的组件
    cleanup()
    // 渲染menu组件
    const wrapper = render(renderMenu(menuVerticalProps))
    // 获取menu元素
    const menuElement = wrapper.getByTestId('test-menu')
    // 判断这个元素的class上是否具有menu-vertical
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('鼠标经过子菜单标题的时候应该显示对应的子菜单',async ()=>{
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('子菜单1')
    // 鼠标进入事件触发
    fireEvent.mouseEnter(dropdownElement)
    // 等待显示出来之后
    await wait(()=>{
      // drop1元素应该显示出来
      expect(wrapper.queryByText('drop1')).toBeVisible()
    })
    fireEvent.click(wrapper.queryByText('drop1'))
    expect(menuVerticalProps.onSelect).toHaveBeenCalledWith('30')
    // 鼠标离开之后
    fireEvent.mouseLeave(dropdownElement)
    await wait(()=>{
      // 不显示
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })
})
