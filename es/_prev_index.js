function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import "./index.css";
import PropTypes from "prop-types";
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

var ContextMenu = /*#__PURE__*/function (_Component) {
  _inheritsLoose(ContextMenu, _Component);

  function ContextMenu(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClickMenu", function (e) {
      var parentLiElem = e.target.closest("li.menu-item");

      if (parentLiElem) {
        _this.props.callbackOnClickMenu(parentLiElem.dataset.data, parentLiElem);
      }
    });

    _this.createMenu = _this.createMenu.bind(_assertThisInitialized(_this));
    _this.onClickMenu = _this.onClickMenu.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ContextMenu.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var menu = document.querySelector('menu');
    if (!menu) return;
    var widthWindow = document.documentElement.clientWidth;
    var heightWindow = document.documentElement.clientHeight;
    var coordsMenu = menu.getBoundingClientRect();

    if (widthWindow < coordsMenu.x + coordsMenu.width) {
      menu.style.left = widthWindow - coordsMenu.width + 'px';
    }

    ;

    if (heightWindow < coordsMenu.y + coordsMenu.height) {
      menu.style.top = heightWindow - coordsMenu.height + 'px';
    }

    ;
    var menus = Array.from(document.querySelectorAll('menu')).slice(1);
    menus.forEach(function (menu, i) {
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
      }

      ;

      if (heightWindow < coordsMenu.y + coordsMenu.height) {
        menu.classList.add('menuBottom');
        menu.classList.remove('menuTop');
      }

      ;
    });
  };

  _proto.createMenu = function createMenu(arrMenuItem, submenu) {
    var _this2 = this;

    if (submenu === void 0) {
      submenu = false;
    }

    return /*#__PURE__*/React.createElement("menu", {
      className: submenu ? "menu" : "menu show-menu",
      style: submenu ? null : {
        left: this.props.pageXY[0],
        top: this.props.pageXY[1]
      },
      onClick: submenu ? null : function (e) {
        return _this2.onClickMenu(e);
      }
    }, arrMenuItem.map(function (item, i, arr) {
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
          createMenu: _this2.createMenu
        });
      } else {
        return /*#__PURE__*/React.createElement("div", {
          key: i
        }, item["type"]);
      }
    }));
  };

  _proto.render = function render() {
    if (!this.props.visible) return false;
    var contextMenu = this.createMenu(this.props.items);
    return /*#__PURE__*/React.createElement("div", {
      className: "react-contextmenu"
    }, contextMenu);
  };

  return ContextMenu;
}(Component);

export { ContextMenu as default };
ContextMenu.defaultProps = {
  visible: false,
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