import React,{ useContext } from 'react'
import classNames from 'classNames'
import { MenuContext } from '../../common/createContext.ts'



export interface MenuItemProps {
  index?: number;  // 当前元素的下标
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {

  const { children, className, styles, index, disabled } = props
  // 获取祖先元素传递来的数据
  const MenuContextVal = useContext(MenuContext)
  const classes = classNames('com-menu-item', className, {
    'com-menu-item-disable': disabled,
    'com-menu-item-active': MenuContextVal.index === index
  })

  const handleSelect = () => {
    if(!disabled && MenuContextVal.onSelect){
      MenuContextVal.onSelect(index)
    }
  }

  return(
    <li className={classes} style={styles} onClick={handleSelect}>{children}</li>
  )
}

MenuItem.defaultProps = {
  defaultIndex: 0,
  disabled: false,
}

MenuItem.displayName = "MenuItem"

export default MenuItem;
