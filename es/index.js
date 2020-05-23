function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import "./index.css";
import React, { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useOnClickOutside } from './useOnClickOutside';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function MenuSeparator(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/React.createElement("li", {
    className: "menu-separator" + (item.className ? " " + item.className : "")
  });
}

function MenuItem(_ref2) {
  var item = _ref2.item,
      _ref2$createSubmenu = _ref2.createSubmenu,
      createSubmenu = _ref2$createSubmenu === void 0 ? false : _ref2$createSubmenu;
  return /*#__PURE__*/React.createElement("li", {
    className: "menu-item" + (createSubmenu ? " submenu" : "") + (item.className ? " " + item.className : ""),
    "data-data": item.data
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "menu-btn"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    className: "fa",
    icon: item.icon ? item.icon : 'circle'
  }), /*#__PURE__*/React.createElement("span", {
    className: "menu-text"
  }, item["title"])), createSubmenu && createSubmenu(item["submenu"], true));
}

export default function ContextMenu(props) {
  var visible = props.visible,
      hideMenu = props.hideMenu,
      pageXY = props.pageXY,
      items = props.items,
      callbackOnClickMenu = props.callbackOnClickMenu,
      className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["visible", "hideMenu", "pageXY", "items", "callbackOnClickMenu", "className"]);

  var menuElem = useRef(null);
  useOnClickOutside(menuElem, hideMenu);
  useLayoutEffect(function () {
    //console.log('useEffect', menuElem.current, props);
    if (!menuElem.current) return;
    var widthWindow = document.documentElement.clientWidth;
    var heightWindow = document.documentElement.clientHeight;

    function checkOutWindow(checkedElement, isRootMenu) {
      if (isRootMenu === void 0) {
        isRootMenu = false;
      }

      if (!isRootMenu) {
        checkedElement.classList.remove('menuRight');
        checkedElement.classList.add('menuLeft');
        checkedElement.classList.remove('menuBottom');
        checkedElement.classList.add('menuTop');
      }

      var coordsCheckedElement = checkedElement.getBoundingClientRect();

      if (widthWindow < coordsCheckedElement.x + coordsCheckedElement.width) {
        if (isRootMenu) checkedElement.style.left = widthWindow - coordsCheckedElement.width + 'px';

        if (!isRootMenu) {
          checkedElement.classList.add('menuRight');
          checkedElement.classList.remove('menuLeft');
        }
      }

      ;

      if (heightWindow < coordsCheckedElement.y + coordsCheckedElement.height) {
        if (isRootMenu) checkedElement.style.top = heightWindow - coordsCheckedElement.height + 'px';

        if (!isRootMenu) {
          checkedElement.classList.add('menuBottom');
          checkedElement.classList.remove('menuTop');
        }
      }

      ;
    }

    ; // correction of the position of the root menu, if it is outside the window

    checkOutWindow(menuElem.current, true); // correction of the position of the submenus, if it is outside the window

    var submenus = Array.from(document.querySelectorAll('menu')).slice(1);
    submenus.forEach(function (submenu) {
      checkOutWindow(submenu, false);
    });
  });

  function onClickMenu(e) {
    var parentLiElem = e.target.closest("li.menu-item:not(.submenu)");

    if (parentLiElem) {
      callbackOnClickMenu(parentLiElem.dataset.data, parentLiElem);
      hideMenu();
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
      className: submenu ? "menu" : "menu show-menu " + (className ? className : ""),
      style: submenu ? null : {
        left: pageXY[0],
        top: pageXY[1]
      },
      onClick: submenu ? null : function (e) {
        return onClickMenu(e);
      }
    }, arrMenuItem.map(function (item, i) {
      if (item["type"] === "item") return /*#__PURE__*/React.createElement(MenuItem, {
        key: i,
        item: item
      });
      if (item["type"] === "separator") return /*#__PURE__*/React.createElement(MenuSeparator, {
        key: i,
        item: item
      });
      if (item["type"] === "submenu") return /*#__PURE__*/React.createElement(MenuItem, {
        key: i,
        item: item,
        createSubmenu: createMenu
      });
      return /*#__PURE__*/React.createElement("div", {
        key: i
      }, item["type"]);
    }));
  }

  return visible ? /*#__PURE__*/React.createElement("div", _extends({
    className: "react-contextmenu"
  }, rest), createMenu(items)) : null;
}
ContextMenu.propTypes = process.env.NODE_ENV !== "production" ? {
  visible: PropTypes.bool.isRequired,
  hideMenu: PropTypes.func.isRequired,
  pageXY: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  callbackOnClickMenu: PropTypes.func.isRequired
} : {};
MenuSeparator.propTypes = process.env.NODE_ENV !== "production" ? {
  item: PropTypes.object.isRequired
} : {};
MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  item: PropTypes.object.isRequired,
  createSubmenu: PropTypes.func
} : {}; // for example

ContextMenu.defaultProps = {
  visible: true,
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