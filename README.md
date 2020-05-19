# react-contextmenu
![menu demo](https://raw.githubusercontent.com/john050481/react-contextmenu/master/demo.png)

React context menu. Custom menu items, callback function for all menus (delegation). Customizable style, disabled item by condition.
An example of use.

# Example
[link to codesandbox!](https://codesandbox.io/s/john0504react-contextmenu-e211k)

# Getting started
```bash
# via npm
npm i @john0504/react-contextmenu
```
# Usage
```jsx
import ContextMenu from "@john0504/react-contextmenu";

/**
* items - array of object (items)
* @param {string} type - item/separator/submenu
* @param {string} title - title menu
* @param {string} data - return data from callback
* @param {string} icon - icon @fortawesome
* @param {string} className - className
* @param {string} submenu - if type 'submenu', array of item
*/
let items = [
  {
    type: "item",
    title: "Title item1",
    data: "dataFromCallback1",
    icon: "chalkboard-teacher",
    className:
      this.state.type === "anyType" ? "disabled" : "" /*type, name or value*/
  },
  { type: "separator" },
  {
    type: "submenu",
    title: "Title submenu1",
    icon: "hammer",
    className:
      this.state.name === "anyName" ? "disabled" : "" /*type, name or value*/,
    submenu: [
      {
        type: "item",
        title: "Title submenu1",
        data: "dataFromCallbackSub1",
        icon: "folder-plus"
      },
      {
        type: "submenu",
        title: "Title submenu2",
        data: "dataFromCallbackSub2",
        icon: "edit",
        submenu: [
          { type: "item", title: "Title subSubMenu1", data: "dataSubSubMenu1" },
          { type: "item", title: "Title subSubMenu2", data: "dataSubSubMenu2" },
          { type: "item", title: "Title subSubMenu3", data: "dataSubSubMenu3" }
        ]
      }
    ]
  },
  { type: "separator" },
  {
    type: "item",
    title: "Title item2",
    data: "dataFromCallback2",
    icon: "bookmark"
  }
];

...

/**
* ContextMenu - import component
* @param {boolean} visible - if this.state.visible === true, menu visible
* @param {function} hideMenu - function that hides the menu
* @param {array} pageXY - [x, y], coords click mouse (left and top)
* @param {array} items - [object] items menus
* @param {function} callbackOnClickMenu - callbackOnClickMenu for click menu item (return data and parent LI element)
*/
        <ContextMenu
          visible={this.state.visible}
          hideMenu={ () => this.setState({ visible: false }) }
          pageXY={[this.state.pageXY[0], this.state.pageXY[1]]}
          items={items}
          callbackOnClickMenu={(data, parentLiElem) => {
            this.callbackOnClickMenu(data, parentLiElem);
          }}
        />
```
