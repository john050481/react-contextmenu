"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas);

function MenuItem(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: "menu-item" + (item.className ? " " + item.className : ""),
    "data-data": item.data
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "menu-btn"
  }, item.icon ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "fa",
    icon: item.icon
  }) : null, /*#__PURE__*/_react["default"].createElement("span", {
    className: "menu-text"
  }, item.title)));
}

function MenuSeparator(_ref2) {
  var item = _ref2.item;
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: "menu-separator" + (item.className ? " " + item.className : "")
  });
}

function MenuSubmenu(_ref3) {
  var item = _ref3.item,
      createMenu = _ref3.createMenu;
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: "menu-item submenu" + (item.className ? " " + item.className : ""),
    "data-data": item.data
  }, /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "menu-btn"
  }, item.icon ? /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "fa",
    icon: item.icon
  }) : null, /*#__PURE__*/_react["default"].createElement("span", {
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

    return /*#__PURE__*/_react["default"].createElement("menu", {
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
        return /*#__PURE__*/_react["default"].createElement(MenuItem, {
          key: i,
          item: item
        });
      } else if (item["type"] === "separator") {
        return /*#__PURE__*/_react["default"].createElement(MenuSeparator, {
          key: i,
          item: item
        });
      } else if (item["type"] === "submenu") {
        return /*#__PURE__*/_react["default"].createElement(MenuSubmenu, {
          key: i,
          item: item,
          createMenu: _this2.createMenu
        });
      } else {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: i
        }, item["type"]);
      }
    }));
  };

  _proto.render = function render() {
    if (!this.props.visible) return false;
    var contextMenu = this.createMenu(this.props.items);
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "react-contextmenu"
    }, contextMenu);
  };

  return ContextMenu;
}(_react.Component);

exports["default"] = ContextMenu;
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
  visible: _propTypes["default"].bool,
  pageXY: _propTypes["default"].array,
  items: _propTypes["default"].array,
  callbackOnClickMenu: _propTypes["default"].func
} : {};
MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  item: _propTypes["default"].object.isRequired
} : {};
MenuSeparator.propTypes = process.env.NODE_ENV !== "production" ? {
  item: _propTypes["default"].object.isRequired
} : {};
MenuSubmenu.propTypes = process.env.NODE_ENV !== "production" ? {
  item: _propTypes["default"].object.isRequired,
  createMenu: _propTypes["default"].func.isRequired
} : {};
module.exports = exports.default;