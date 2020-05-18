import "./index.css";
import React, {useLayoutEffect, useRef} from "react";
import PropTypes from "prop-types";

import {useOnClickOutside} from './useOnClickOutside';

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

export default function ContextMenu(props) {

  let menuElem = useRef(null);
  useOnClickOutside(menuElem, props.hideMenu);

  useLayoutEffect( () => {
    console.log('useEffect', menuElem.current, props);

    if (!menuElem.current) return;

    let widthWindow = document.documentElement.clientWidth;
    let heightWindow = document.documentElement.clientHeight;
    let coordsMenu = menuElem.current.getBoundingClientRect();

    if (widthWindow < coordsMenu.x + coordsMenu.width) {
      menuElem.current.style.left = widthWindow - coordsMenu.width + 'px';
    };
    if (heightWindow < coordsMenu.y + coordsMenu.height) {
      menuElem.current.style.top = heightWindow - coordsMenu.height + 'px';
    };

    let submenus = Array.from(document.querySelectorAll('menu')).slice(1);
    submenus.forEach( submenu => {
      submenu.classList.remove('menuRight');
      submenu.classList.add('menuLeft');
      submenu.classList.remove('menuBottom');
      submenu.classList.add('menuTop');
      coordsMenu = submenu.getBoundingClientRect();
      if (coordsMenu.x < 0) {
        submenu.classList.remove('menuRight');
        submenu.classList.add('menuLeft');
      } else if (widthWindow < coordsMenu.x + coordsMenu.width) {
        submenu.classList.add('menuRight');
        submenu.classList.remove('menuLeft');
      };
      if (heightWindow < coordsMenu.y + coordsMenu.height) {
        submenu.classList.add('menuBottom');
        submenu.classList.remove('menuTop');
      };
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
        ref={submenu ? null : menuElem}
        className={submenu ? "menu" : "menu show-menu"}
        style={
          submenu
            ? null
            : { left: props.pageXY[0], top: props.pageXY[1] }
        }
        onClick={submenu ? null : e => onClickMenu(e)}
      >
        {arrMenuItem.map((item, i) => {
          if (item["type"] === "item") {
            return <MenuItem key={i} item={item} />;
          } else if (item["type"] === "separator") {
            return <MenuSeparator key={i} item={item} />;
          } else if (item["type"] === "submenu") {
            return (
              <MenuSubmenu key={i} item={item} createMenu={createMenu} />
            );
          } else {
            return <div key={i}>{item["type"]}</div>;
          }
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

ContextMenu.defaultProps = {
  visible: false,
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

ContextMenu.propTypes = {
  visible: PropTypes.bool,
  hideMenu: PropTypes.func,
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
