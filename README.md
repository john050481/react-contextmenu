# react-contextmenu
![menu demo](https://github.com/john050481/react-contextmenu/blob/master/demo.png)

React context menu. Custom menu items, callback function for all menus (delegation). Customizable style, disabled item by condition.
An example of use.
[link to codesandbox!](https://codesandbox.io/s/john0504react-contextmenu-e211k)

# Getting started
```bash
# via npm
npm i @john0504/react-contextmenu
```
# Usage
```jsx
import ContextMenu from "@john0504/react-contextmenu";

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
        title: "Title submenu2",
        data: "dataFromCallback2",
        icon: "folder-plus"
      },
      {
        type: "submenu",
        title: "Title submenu2",
        data: "dataSubmenu2",
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

<ContextMenu
  visible={this.state.visible}
  pageXY={[this.state.pageXY[0], this.state.pageXY[1]]}
  items={items}
  callbackOnClickMenu={(data, parentLiElem) => {
    this.callbackOnClickMenu(data, parentLiElem);
  }}
/>
```
