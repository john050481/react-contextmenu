import "./index.css";
import React, { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useOnClickOutside } from './useOnClickOutside';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function MenuItem(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/React.createElement("li", {
    className: "menu-item" + (item.className ? " " + item.className : ""),
    "data-data": item.data
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "menu-btn"
  }, item.icon ? /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    className: "fa",
    icon: item.icon
  }) : null, /*#__PURE__*/React.createElement("span", {
    className: "menu-text"
  }, item.title)));
}

function MenuSeparator(_ref2) {
  var item = _ref2.item;
  return /*#__PURE__*/React.createElement("li", {
    className: "menu-separator" + (item.className ? " " + item.className : "")
  });
}

function MenuSubmenu(_ref3) {
  var item = _ref3.item,
      createMenu = _ref3.createMenu;
  return /*#__PURE__*/React.createElement("li", {
    className: "menu-item submenu" + (item.className ? " " + item.className : ""),
    "data-data": item.data
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "menu-btn"
  }, item.icon ? /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    className: "fa",
    icon: item.icon
  }) : null, /*#__PURE__*/React.createElement("span", {
    className: "menu-text"
  }, item["title"])), createMenu(item["submenu"], true));
}

export default function ContextMenu(props) {
  var menuElem = useRef(null);
  useOnClickOutside(menuElem, props.hideMenu);
  useLayoutEffect(function () {
    console.log('useEffect', menuElem.current, props);
    if (!menuElem.current) return;
    var widthWindow = document.documentElement.clientWidth;
    var heightWindow = document.documentElement.clientHeight;
    var coordsMenu = menuElem.current.getBoundingClientRect();

    if (widthWindow < coordsMenu.x + coordsMenu.width) {
      menuElem.current.style.left = widthWindow - coordsMenu.width + 'px';
    }

    ;

    if (heightWindow < coordsMenu.y + coordsMenu.height) {
      menuElem.current.style.top = heightWindow - coordsMenu.height + 'px';
    }

    ;
    var submenus = Array.from(document.querySelectorAll('menu')).slice(1);
    submenus.forEach(function (submenu) {
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
      }

      ;

      if (heightWindow < coordsMenu.y + coordsMenu.height) {
        submenu.classList.add('menuBottom');
        submenu.classList.remove('menuTop');
      }

      ;
    });
  });

  function onClickMenu(e) {
    var parentLiElem = e.target.closest("li.menu-item:not(.submenu)");

    if (parentLiElem) {
      props.callbackOnClickMenu(parentLiElem.dataset.data, parentLiElem);
      props.hideMenu();
    }

    ;
  }

  ;

  function createMenu(arrMenuItem, submenu) {
    if (submenu === void 0) {
      submenu = false;
    }

    return /*#__PURE__*/React.createElement("menu", {
      ref: submenu ? null : menuElem,
      className: submenu ? "menu" : "menu show-menu",
      style: submenu ? null : {
        left: props.pageXY[0],
        top: props.pageXY[1]
      },
      onClick: submenu ? null : function (e) {
        return onClickMenu(e);
      }
    }, arrMenuItem.map(function (item, i) {
      if (item["type"] === "item") {
        return /*#__PURE__*/React.createElement(MenuItem, {
          key: i,
          item: item
        });
      } else if (item["type"] === "separator") {
        return /*#__PURE__*/React.createElement(MenuSeparator, {
          key: i,
          item: item
        });
      } else if (item["type"] === "submenu") {
        return /*#__PURE__*/React.createElement(MenuSubmenu, {
          key: i,
          item: item,
          createMenu: createMenu
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: i
        }, item["type"]);
      }
    }));
  }

  return props.visible ? /*#__PURE__*/React.createElement("div", {
    className: "react-contextmenu"
  }, createMenu(props.items)) : null;
}
ContextMenu.defaultProps = {
  visible: false,
  hideMenu: function hideMenu() {},
  pageXY: [0, 0],
  items: [{
    type: "item",
    title: "defItem1",
    data: "defdata1",
    icon: "check-square"
  }, {
    type: "item",
    title: "defItem2",
    data: "defdata2",
    className: "disabled"
  }, {
    type: "separator"
  }, {
    type: "submenu",
    title: "defSubMenu1",
    submenu: [{
      type: "item",
      title: "defItemSubMenu1",
      data: "defdataSubMenu1"
    }, {
      type: "submenu",
      title: "defSubMenu2",
      submenu: [{
        type: "item",
        title: "defItemSubSubMenu1",
        data: "defdataSubSubMenu1"
      }]
    }, {
      type: "item",
      title: "defItemSubMenu2",
      data: "defdataSubMenu2"
    }]
  }],
  callbackOnClickMenu: function callbackOnClickMenu(data, parentLiElem) {
    console.log("default callbackOnClickMenu = ", data, parentLiElem);
  }
};
ContextMenu.propTypes = process.env.NODE_ENV !== "production" ? {
  visible: PropTypes.bool,
  hideMenu: PropTypes.func,
  pageXY: PropTypes.array,
  items: PropTypes.array,
  callbackOnClickMenu: PropTypes.func
} : {};
MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  item: PropTypes.object.isRequired
} : {};
MenuSeparator.propTypes = process.env.NODE_ENV !== "production" ? {
  item: PropTypes.object.isRequired
} : {};
MenuSubmenu.propTypes = process.env.NODE_ENV !== "production" ? {
  item: PropTypes.object.isRequired,
  createMenu: PropTypes.func.isRequired
} : {};