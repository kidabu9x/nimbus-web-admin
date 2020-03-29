import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import { useMediaQuery, Theme } from '@material-ui/core';
import { DashboardMenuItem, MenuItemLink } from 'react-admin';

import products from '../products';
import categories from '../categories';
import SubMenu from './SubMenu';
import { AppState } from '../types';

type MenuName = 'menuCatalog' | 'menuSales' | 'menuCustomers';

interface Props {
    dense: boolean;
    logout: () => void;
    onMenuClick: () => void;
}

const Menu: FC<Props> = ({ onMenuClick, dense, logout }) => {
    const [state, setState] = useState({
        menuCatalog: false,
        menuSales: false,
        menuCustomers: false,
    });
    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
    useSelector((state: AppState) => state.theme); // force rerender on theme change

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <div>
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <SubMenu
                handleToggle={() => handleToggle('menuCatalog')}
                isOpen={state.menuCatalog}
                sidebarIsOpen={open}
                name="Categories"
                icon={<products.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/post`}
                    primaryText={'Posts'}
                    leftIcon={<products.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/user`}
                    primaryText={'Users'}
                    leftIcon={<categories.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={'Configuration'}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </div>
    );
};

export default Menu;
