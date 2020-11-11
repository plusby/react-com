import React,{ useContext, FunctionComponentElement, useState } from "react"
import classNames from 'classNames'
import { MenuContext } from '../../common/createContext.ts'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from '../Icon/index.tsx'
import Transition from '../Transition/index.tsx'

library.add(fas)

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string;
  iconClassName?: string;
  disabled?: boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({index, className, iconClassName, title, children, disabled }) => {
  // 使用上下文
  const context = useContext(MenuContext)
  console.log('context',context,context.defaultOpenArr)
  const defaultOpenArr = context.defaultOpenArr as Array<string>
  // 默认展开
  const openArr = (defaultOpenArr && defaultOpenArr.includes(index)) || false
  // 点击子菜单
  const [ isOpen,setOpen ] = useState(openArr)
  console.log('isOpen',isOpen)
  // 合并class
  const classes = classNames("com-sub-menu",className,{
    'com-menu-item-disable': disabled,
    'com-menu-item-active': context.index === index,
    'menu-vertical': context.mode === 'vertical',
    'open-item': isOpen,
    'horizontal': context.mode !== 'vertical',
  })

  const iconClasses = classNames("com-menu-item-icon",iconClassName,{
    'open-item': isOpen,
    'horizontal': context.mode !== 'vertical',
  })

  // 点击展开
  const clickOpen = (e:React.events,flag:boolean) => {
    setOpen(flag)
  }

  // 经过展开
  const timer:any = ''
  const hoverOpen = (e:React.events,flag:boolean) => {
    timer && clearTimeout(timer)
    setTimeout(()=>{
      setOpen(flag)
    },200)
  }

  const hoverHandler = {
    'onMouseEnter': (e: React.MouseEvent) => { context.mode !== 'vertical' && hoverOpen(e,true) },
    'onMouseLeave': (e: React.MouseEvent) => { context.mode !== 'vertical' && hoverOpen(e,false) },
  }

  const clickHandler = {
    'onClick': (e: React.MouseEvent) => { context.mode === 'vertical' && clickOpen(e,!isOpen) },
  }

  // 渲染子组件
  const renderChildren = () => {
    const childCom = React.Children.map(children,(child,i)=>{
      if(child.type.displayName === 'MenuItem'){
        return React.cloneElement(child,{index: Number(''+index+i)})
      } else {
        console.log('This is must a MenuItem Element')
      }
    })
    return (
      <Transition
        in={isOpen}
        timeout={300}
        animation={context.mode === 'vertical' ? "zoom-in-left" : "zoom-in-top" }
      >
        <ul className={classes}>
          {childCom}
        </ul>
      </Transition>
    )
  }

  return (
    <li key={index} className='com-menu-item' {...hoverHandler} >
      <div {...clickHandler}>{title}</div>
      <Icon theme="primary" icon="angle-down" className={iconClasses} />
      {renderChildren()}
    </li>
  )

}

SubMenu.displayName = 'SubMenu'

export default SubMenu
