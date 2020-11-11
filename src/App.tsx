import React from 'react';
import './styles/index.scss';
import Button from './components/Button/index.tsx'
import Menu from './components/Menu/index.tsx'
import MenuItem from './components/Menu/MenuItem.tsx'
import SubMenuItem from './components/Menu/SubMenu.tsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon/index.tsx'


library.add(fas)
function App() {
  const onSelect = () => {
    alert()
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button disabled onClick={(e)=>{ alert(e.target)}}>提交</Button>
        <Button btnType="link" href='www.baidu.com'>提交</Button>
        <Button btnType="primary" >提交</Button>
        <Button size="lg" >提交</Button>
        <Button btnType="danger" >提交</Button>
        <Button className="haha" btnType="default" onClick={(e)=>{ alert(e.target)}} >提交</Button>
        <Menu onSelect={onSelect}>
          <MenuItem >菜单1</MenuItem>
          <MenuItem  disabled>菜单2</MenuItem>
          <MenuItem >菜单3</MenuItem>
          <SubMenuItem title="子菜单1">
            <MenuItem>子菜单3</MenuItem>
            <MenuItem>子菜单4</MenuItem>
          </SubMenuItem>
        </Menu>
        <Menu onSelect={onSelect} mode='vertical' defaultOpenArr={[2]}>
          <MenuItem >菜单1</MenuItem>
          <MenuItem  disabled>菜单2</MenuItem>
          <SubMenuItem title="子菜单1">
            <MenuItem>子菜单3</MenuItem>
            <MenuItem>子菜单4</MenuItem>
          </SubMenuItem>
          <MenuItem >菜单3</MenuItem>
          <MenuItem >菜单4</MenuItem>
          <MenuItem >菜单5</MenuItem>
          <SubMenuItem title="子菜单2">
            <MenuItem>子菜单22</MenuItem>
            <MenuItem>子菜单23</MenuItem>
          </SubMenuItem>
        </Menu>
      </header>
      <Icon theme="primary" icon="coffee" />
    </div>
  );
}

export default App;
