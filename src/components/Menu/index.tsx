import React, { useState } from 'react'
import classNames from 'classNames'
import { MenuContext } from '../../common/createContext.ts'
import { MenuElementProps } from './MenuItem'

type MenuMode = 'vertical' | 'horizontal'
type onSelect = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  styles?: React.CSSProperties;
  onSelect?: onSelect;
  defaultOpenArr?: array;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { className, defaultIndex, mode, styles, onSelect, children, defaultOpenArr } = props
  const [ activeIndex, setActiveIndex ] = useState(0)
  const classes = classNames('com-menu', className, {  // 合并class
    'menu-vertical': mode === 'vertical'
  })

  // 点击选项事件
  const hadleSelect = (index:number) => {
    setActiveIndex(index)
    onSelect && onSelect(index)
  }
  // 像子组件注入的数据
  const MenuContextVal: MenuContext = {
    index: activeIndex || 0,
    onSelect: hadleSelect,
    mode,
    defaultOpenArr: defaultOpenArr,
  }

  // 渲染子组件
  const renderChildren = () => {
    // 使用React.Children.map()进行遍历children，不能直接遍历children是因为children可能是数组可能是对象或者null
    // 是一个不透明的数据结构
    return React.Children.map(children,(child,index)=>{
      console.log('child',child)
      // const childElement = child as React.FunctionComponentElement<MenuElementProps>
      // console.log('childElement',childElement)
      if(child.type.displayName === "MenuItem" || child.type.displayName === 'SubMenu'){ // 只有MenuITem或SubMenu才进行渲染
        return React.cloneElement(child,{index}) // React.cloneElement克隆一个元素，并且合并新旧属性
      }else{
        console.log('This is not a menuItem Element')
      }
    })
  }

  return (
    <ul className={classes} style={styles} data-testid='test-menu'>
      // 向子组件注入数据
      <MenuContext.Provider value={MenuContextVal}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu;
