import React from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent } from "react-pro-sidebar";
import { FaList } from "react-icons/fa";
import { FiHome, FiMenu, FiUser, FiPackage, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { useState } from 'react'
import { Link } from "react-router-dom";
import 'react-pro-sidebar/dist/css/styles.css';


const NavSideBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(true);
  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse);
  }
  const routeList = [
    { id: 1, name: 'Home', path: '/', icon: <FiHome />, active: true },
    { id: 2, name: 'Product', path: '/product', icon: <FiPackage />, active: false },
    { id: 3, name: 'User', path: '/user', icon: <FiUser />, active: false },
    { id: 4, name: 'Category', path: '/category', icon: <FaList />, active: false },
  ]
  return (
    <div id="header">
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <div className="logotext">
            <div>{menuCollapse ?
              <div onClick={menuIconClick} style={{ display: 'flex', justifyContent: 'space-evenly' }}>Open<br />Menu
                <FiArrowRightCircle />
              </div> :
              <div onClick={menuIconClick} style={{ display: 'flex', justifyContent: 'space-evenly' }}>Close<br />Menu
                <FiArrowLeftCircle />
              </div>}</div>
          </div>

        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="sqaure">
            {routeList.map(
              route => (
                <MenuItem key={route.id} active={route.active} icon={route.icon}>
                  {route.name}
                  <Link to={route.path} />
                </MenuItem>))}
            {/* <MenuItem icon={<FiHome />}>Home</MenuItem>
          <MenuItem icon={<FiHome />}>Home</MenuItem>
          <MenuItem icon={<FiHome />}>Home</MenuItem>
          <MenuItem icon={<FiHome />}>Home</MenuItem> */}
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  )


}

export default NavSideBar;