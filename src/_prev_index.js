import React, { Component } from "react";
import "./index.css";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function MenuItem({item}) {
    return (
        <li className={ "menu-item" + (item.className ? ` ${item.className}` : "") } data-data={item.data}>
            <button type="button" className="menu-btn">
                {
                    item.icon
                        ? <FontAwesomeIcon className="fa" icon={item.icon} />
                        : null
                }
                <span className="menu-text">{item.title}</span>
            </button>
        </li>
    );
}
function MenuSeparator({item}) {
    return <li className={ "menu-separator" + (item.className ? ` ${item.className}` : "") } />;
}
function MenuSubmenu({item, createMenu}) {
    return (
        <li className={ "menu-item submenu" + (item.className ? ` ${item.className}` : "") } data-data={item.data}>
            <button type="button" className="menu-btn">
                {
                    item.icon
                        ? <FontAwesomeIcon className="fa" icon={item.icon} />
                        : null
                }
                <span className="menu-text">{item["title"]}</span>
            </button>
            {createMenu(item["submenu"], true)}
        </li>
    );
}

export default class ContextMenu extends Component {
    constructor(props) {
        super(props);

        this.createMenu = this.createMenu.bind(this);
        this.onClickMenu = this.onClickMenu.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        let menu = document.querySelector('menu');
        if (!menu) return;

        let widthWindow = document.documentElement.clientWidth;
        let heightWindow = document.documentElement.clientHeight;
        let coordsMenu = menu.getBoundingClientRect();

        if (widthWindow < coordsMenu.x + coordsMenu.width) {
            menu.style.left = widthWindow - coordsMenu.width + 'px';
        };
        if (heightWindow < coordsMenu.y + coordsMenu.height) {
            menu.style.top = heightWindow - coordsMenu.height + 'px';
        };

        let menus = Array.from(document.querySelectorAll('menu')).slice(1);
        menus.forEach( (menu, i) => {
            menu.classList.remove('menuRight');
            menu.classList.add('menuLeft');
            menu.classList.remove('menuBottom');
            menu.classList.add('menuTop');
            coordsMenu = menu.getBoundingClientRect();
            if (coordsMenu.x < 0) {
                menu.classList.remove('menuRight');
                menu.classList.add('menuLeft');
            } else if (widthWindow < coordsMenu.x + coordsMenu.width) {
                menu.classList.add('menuRight');
                menu.classList.remove('menuLeft');
            };
            if (heightWindow < coordsMenu.y + coordsMenu.height) {
                menu.classList.add('menuBottom');
                menu.classList.remove('menuTop');
            };
        } );
    }

    onClickMenu = e => {
        let parentLiElem = e.target.closest("li.menu-item");
        if (parentLiElem) {
            this.props.callbackOnClickMenu(parentLiElem.dataset.data, parentLiElem);
        }
    };

    createMenu(arrMenuItem, submenu = false) {
        return (
            <menu
                className={submenu ? "menu" : "menu show-menu"}
                style={
                    submenu
                        ? null
                        : { left: this.props.pageXY[0], top: this.props.pageXY[1] }
                }
                onClick={submenu ? null : e => this.onClickMenu(e)}
            >
                {arrMenuItem.map((item, i, arr) => {
                    if (item["type"] === "item") {
                        return <MenuItem key={i} item={item} />;
                    } else if (item["type"] === "separator") {
                        return <MenuSeparator key={i} item={item} />;
                    } else if (item["type"] === "submenu") {
                        return (
                            <MenuSubmenu key={i} item={item} createMenu={this.createMenu} />
                        );
                    } else {
                        return <div key={i}>{item["type"]}</div>;
                    }
                })}
            </menu>
        );
    }

    render() {
        if (!this.props.visible) return false;

        let contextMenu = this.createMenu(this.props.items);
        return <div className='react-contextmenu'>{contextMenu}</div>;
    }
}

ContextMenu.defaultProps = {
    visible: false,
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

ContextMenu.propTypes = {
    visible: PropTypes.bool,
    pageXY: PropTypes.array,
    items: PropTypes.array,
    callbackOnClickMenu: PropTypes.func
};
MenuItem.propTypes = {
    item: PropTypes.object.isRequired
};
MenuSeparator.propTypes = {
    item: PropTypes.object.isRequired
};
MenuSubmenu.propTypes = {
    item: PropTypes.object.isRequired,
    createMenu: PropTypes.func.isRequired
};
