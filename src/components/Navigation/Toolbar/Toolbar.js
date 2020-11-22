import React from 'react'
import classes from './toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle onClicked ={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated = {props.isAuth}></NavigationItems>
        </nav>
    </header>
)

export default toolbar;