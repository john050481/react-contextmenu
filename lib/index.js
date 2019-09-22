"use strict";

exports.__esModule = true;
exports.default = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.fas);

function MenuItem(props) {
  var className = props.item.className ? " " + props.item.className : "";
  var icon = props.item.icon ? _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { className: "fa", icon: props.item.icon }) : null;
  return _react2.default.createElement(
    "li",
    { className: "menu-item" + className, "data-data": props.item.data },
    _react2.default.createElement(
      "button",
      { type: "button", className: "menu-btn" },
      icon,
      _react2.default.createElement(
        "span",
        { className: "menu-text" },
        props.item.title
      )
    )
  );
}
function MenuSeparator(props) {
  var className = props.item.className ? " " + props.item.className : "";
  return _react2.default.createElement("li", { className: "menu-separator" + className });
}
function MenuSubmenu(props) {
  var className = props.item.className ? " " + props.item.className : "";
  var icon = props.item.icon ? _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { className: "fa", icon: props.item.icon }) : null;
  return _react2.default.createElement(
    "li",
    { className: "menu-item submenu" + className, "data-data": props.item.data },
    _react2.default.createElement(
      "button",
      { type: "button", className: "menu-btn" },
      icon,
      _react2.default.createElement(
        "span",
        { className: "menu-text" },
        props.item["title"]
      )
    ),
    props.createMenu(props.item["submenu"], true)
  );
}

var ContextMenu = function (_Component) {
  _inherits(ContextMenu, _Component);

  function ContextMenu() {
    var _temp, _this, _ret;

    _classCallCheck(this, ContextMenu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onClickMenu = function (e) {
      var parentLiElem = e.target.closest("li.menu-item");
      if (parentLiElem) {
        _this.props.callbackOnClickMenu(parentLiElem.dataset.data, parentLiElem);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ContextMenu.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var menu = document.querySelector('menu');
    if (!menu) return;

    var widthWindow = document.documentElement.clientWidth;
    var heightWindow = document.documentElement.clientHeight;
    var coordsMenu = menu.getBoundingClientRect();

    if (widthWindow < coordsMenu.x + coordsMenu.width) {
      menu.style.left = widthWindow - coordsMenu.width + 'px';
    };
    if (heightWindow < coordsMenu.y + coordsMenu.height) {
      menu.style.top = heightWindow - coordsMenu.height + 'px';
    };

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
      };
      if (heightWindow < coordsMenu.y + coordsMenu.height) {
        menu.classList.add('menuBottom');
        menu.classList.remove('menuTop');
      };
    });
  };

  ContextMenu.prototype.createMenu = function createMenu(arrMenuItem) {
    var _this2 = this;

    var submenu = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!submenu && !this.props.visible) {
      return [];
    }
    return _react2.default.createElement(
      "menu",
      {
        className: submenu ? "menu" : "menu show-menu",
        style: submenu ? null : { left: this.props.pageXY[0], top: this.props.pageXY[1] },
        onClick: submenu ? null : function (e) {
          return _this2.onClickMenu(e);
        }
      },
      arrMenuItem.map(function (item, i, arr) {
        if (item["type"] === "item") {
          return _react2.default.createElement(MenuItem, { key: i, item: item });
        } else if (item["type"] === "separator") {
          return _react2.default.createElement(MenuSeparator, { key: i, item: item });
        } else if (item["type"] === "submenu") {
          return _react2.default.createElement(MenuSubmenu, { key: i, item: item, createMenu: _this2.createMenu });
        } else {
          return _react2.default.createElement(
            "div",
            { key: i },
            item["type"]
          );
        }
      })
    );
  };

  ContextMenu.prototype.render = function render() {
    var contextMenu = this.createMenu(this.props.items);
    return _react2.default.createElement(
      "div",
      null,
      contextMenu
    );
  };

  return ContextMenu;
}(_react.Component);

exports.default = ContextMenu;


ContextMenu.defaultProps = {
  visible: false,
  pageXY: [0, 0],
  items: [{ type: "item", title: "defItem1", data: "defdata1", icon: "check-square" }, {
    type: "item",
    title: "defItem2",
    data: "defdata2",
    className: "disabled"
  }, { type: "separator" }, {
    type: "submenu",
    title: "defSubMenu1",
    submenu: [{ type: "item", title: "defItemSubMenu1", data: "defdataSubMenu1" }, {
      type: "submenu",
      title: "defSubMenu2",
      submenu: [{
        type: "item",
        title: "defItemSubSubMenu1",
        data: "defdataSubSubMenu1"
      }]
    }, { type: "item", title: "defItemSubMenu2", data: "defdataSubMenu2" }]
  }],
  callbackOnClickMenu: function callbackOnClickMenu(data, parentLiElem) {
    console.log("default callbackOnClickMenu = ", data, parentLiElem);
  }
};

ContextMenu.propTypes = process.env.NODE_ENV !== "production" ? {
  visible: _propTypes2.default.bool,
  pageXY: _propTypes2.default.array,
  items: _propTypes2.default.array,
  callbackOnClickMenu: _propTypes2.default.func
} : {};
MenuItem.propTypes = process.env.NODE_ENV !== "production" ? {
  item: _propTypes2.default.object.isRequired
} : {};
MenuSeparator.propTypes = process.env.NODE_ENV !== "production" ? {
  item: _propTypes2.default.object.isRequired
} : {};
MenuSubmenu.propTypes = process.env.NODE_ENV !== "production" ? {
  item: _propTypes2.default.object.isRequired,
  createMenu: _propTypes2.default.func.isRequired
} : {};
module.exports = exports["default"];