"use strict";

exports.__esModule = true;
exports["default"] = ContextMenu;

require("./index.css");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useOnClickOutside = require("./useOnClickOutside");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas);

function MenuSeparator(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: "menu-separator" + (item.className ? " " + item.className : "")
  });
}

function MenuItem(_ref2) {
  var item = _ref2.item,
      _ref2$createSubmenu = _ref2.createSubmenu,
      createSubmenu = _ref2$createSubmenu === void 0 ? false : _ref2$createSubmenu;
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: "menu-item" + (createSubmenu ? " submenu" : "") + (item.className ? " " + item.className : ""),
    "data-data": item.data
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "menu-btn"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "fa",
    icon: item.icon ? item.icon : 'circle'
  }), /*#__PURE__*/_react["default"].createElement("span", {
    className: "menu-text"
  }, item["title"])), createSubmenu && createSubmenu(item["submenu"], true));
}

function ContextMenu(props) {
  var visible = props.visible,
      hideMenu = props.hideMenu,
      pageXY = props.pageXY,
      items = props.items,
      callbackOnClickMenu = props.callbackOnClickMenu,
      rest = _objectWithoutPropertiesLoose(props, ["visible", "hideMenu", "pageXY", "items", "callbackOnClickMenu"]);

  var menuElem = (0, _react.useRef)(null);
  (0, _useOnClickOutside.useOnClickOutside)(menuElem, hideMenu);
  (0, _react.useLayoutEffect)(function () {
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

    return /*#__PURE__*/_react["default"].createElement("menu", {
      ref: submenu ? null : menuElem,
      className: submenu ? "menu" : "menu show-menu",
      style: submenu ? null : {
        left: pageXY[0],
        top: pageXY[1]
      },
      onClick: submenu ? null : function (e) {
        return onClickMenu(e);
      }
    }, arrMenuItem.map(function (item, i) {
      if (item["type"] === "item") return /*#__PURE__*/_react["default"].createElement(MenuItem, {
        key: i,
        item: item
      });
      if (item["type"] === "separator") return /*#__PURE__*/_react["default"].createElement(MenuSeparator, {
        key: i,
        item: item
      });
      if (item["type"] === "submenu") return /*#__PURE__*/_react["default"].createElement(MenuItem, {
        key: i,
        item: item,
        createSubmenu: createMenu
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: i
      }, item["type"]);
    }));
  }

  return visible ? /*#__PURE__*/_react["default"].createElement("div", _extends({
    className: "react-contextmenu"
  }, rest), createMenu(items)) : null;
}

ContextMenu.propTypes = process.env.NODE_ENV !== "production" ? {
  visible: _propTypes["default"].bool.isRequired,
  hideMenu: _propTypes["default"].func.isRequired,
  pageXY: _propTypes["default"].array.isRequired,
  items: _propTypes["default"].array.isRequired,
  callbackOnClickMenu: _propTypes["default"].func.isRequired
} : {};
MenuSeparator.propTypes = process.env.NODE_ENV !== "production" ? {
  item: _propTypes["default"].object.isRequired
} : {};
MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  item: _propTypes["default"].object.isRequired,
  createSubmenu: _propTypes["default"].func
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
module.exports = exports.default;