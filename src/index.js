import "./index.css";
import React, {useLayoutEffect, useRef} from "react";
import PropTypes from "prop-types";

import {useOnClickOutside} from './useOnClickOutside';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function MenuSeparator({item}) {
    return <li className={ "menu-separator" + (item.className ? ` ${item.className}` : "") } />;
}
function MenuItem({item, createSubmenu = false}) {
    return (
        <li className={ "menu-item" + (createSubmenu ? " submenu" : "") + (item.className ? ` ${item.className}` : "") } data-data={item.data}>
            <button type="button" className="menu-btn">
                <FontAwesomeIcon className="fa" icon={ item.icon ? item.icon : 'circle' } />
                <span className="menu-text">{item["title"]}</span>
            </button>
            {createSubmenu && createSubmenu(item["submenu"], true)}
        </li>
    );
}

export default function ContextMenu(props) {

    let menuElem = useRef(null);
    useOnClickOutside(menuElem, props.hideMenu);

    useLayoutEffect( () => {
        //console.log('useEffect', menuElem.current, props);

        if (!menuElem.current) return;

        const widthWindow = document.documentElement.clientWidth;
        const heightWindow = document.documentElement.clientHeight;

        function checkOutWindow(checkedElement, isRootMenu = false) {
            if (!isRootMenu) {
                checkedElement.classList.remove('menuRight');
                checkedElement.classList.add('menuLeft');
                checkedElement.classList.remove('menuBottom');
                checkedElement.classList.add('menuTop');
            }

            const coordsCheckedElement = checkedElement.getBoundingClientRect();

            if (widthWindow < coordsCheckedElement.x + coordsCheckedElement.width) {
                if (isRootMenu)
                    checkedElement.style.left = widthWindow - coordsCheckedElement.width + 'px';

                if (!isRootMenu) {
                    checkedElement.classList.add('menuRight');
                    checkedElement.classList.remove('menuLeft');
                }
            };
            if (heightWindow < coordsCheckedElement.y + coordsCheckedElement.height) {
                if (isRootMenu)
                    checkedElement.style.top = heightWindow - coordsCheckedElement.height + 'px';

                if (!isRootMenu) {
                    checkedElement.classList.add('menuBottom');
                    checkedElement.classList.remove('menuTop');
                }
            };
        };

        // correction of the position of the root menu, if it is outside the window
        checkOutWindow(menuElem.current, true);

        // correction of the position of the submenus, if it is outside the window
        let submenus = Array.from(document.querySelectorAll('menu')).slice(1);
        submenus.forEach( submenu => {
            checkOutWindow(submenu, false);
        } );
    });

    function onClickMenu(e) {
        let parentLiElem = e.target.closest("li.menu-item:not(.submenu)");
        if (parentLiElem) {
            props.callbackOnClickMenu(parentLiElem.dataset.data, parentLiElem);
            props.hideMenu();
        };
    };

    function createMenu(arrMenuItem, submenu = false) {
        return (
            <menu
                ref = {submenu ? null : menuElem}
                className = {submenu ? "menu" : "menu show-menu"}
                style = {submenu ? null : {left: props.pageXY[0], top: props.pageXY[1]}}
                onClick = {submenu ? null : e => onClickMenu(e)}
            >
                {arrMenuItem.map((item, i) => {
                    if (item["type"] === "item")
                        return <MenuItem key={i} item={item} />

                    if (item["type"] === "separator")
                        return <MenuSeparator key={i} item={item} />

                    if (item["type"] === "submenu")
                        return <MenuItem key={i} item={item} createSubmenu={createMenu} />

                    return <div key={i}>{item["type"]}</div>
                })}
            </menu>
        );
    }

    return (
        props.visible
            ? <div className='react-contextmenu'>{createMenu(props.items)}</div>
            : null
    )
}

ContextMenu.propTypes = {
    visible: PropTypes.bool.isRequired,
    hideMenu: PropTypes.func.isRequired,
    pageXY: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    callbackOnClickMenu: PropTypes.func.isRequired
};
MenuSeparator.propTypes = {
    item: PropTypes.object.isRequired
};
MenuItem.propTypes = {
    item: PropTypes.object.isRequired,
    createSubmenu: PropTypes.func
};

// for example
ContextMenu.defaultProps = {
    visible: true,
    hideMenu: () => {},
    pageXY: [0, 0],
    items: [
        { type: "item", title: "defItem1", data: "defdata1", icon: "check-square" },
        {
            type: "item",
            title: "defItem2",
            data: "defdata2",
            className: "disabled"
        },
        { type: "separator" },
        {
            type: "submenu",
            title: "defSubMenu1",
            submenu: [
                { type: "item", title: "defItemSubMenu1", data: "defdataSubMenu1" },
                {
                    type: "submenu",
                    title: "defSubMenu2",
                    submenu: [
                        {
                            type: "item",
                            title: "defItemSubSubMenu1",
                            data: "defdataSubSubMenu1"
                        }
                    ]
                },
                { type: "item", title: "defItemSubMenu2", data: "defdataSubMenu2" }
            ]
        }
    ],
    callbackOnClickMenu: (data, parentLiElem) => {
        console.log("default callbackOnClickMenu = ", data, parentLiElem);
    }
};
