import React, { Component } from "react";
import ContextMenu from "../../src";
import "./ExampleComponent.css";

export class ExampleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      name: "",
      value: "",
      visible: false,
      pageXY: [10, 10]
    };
  }

  componentDidMount() {
    document
      .getElementById("demo")
      .addEventListener("contextmenu", this.onContextMenu.bind(this));
    document.addEventListener("click", this.onClick.bind(this));
  }

  componentWillUnmount() {
    document
      .getElementById("demo")
      .removeEventListener("contextmenu", this.onContextMenu.bind(this));
    document.removeEventListener("click", this.onClick.bind(this));
  }

  onClick(e) {
    //this.setState({ visible: false });
  }

  onContextMenu(e) {
    let type, name, value;
    if (e.target.tagName === "TD") {
      type = "TD, cellIndex: " + e.target.cellIndex;
      name = "innerHTML";
      value = Number(e.target.innerHTML) ? e.target.innerHTML : "any string";
    } else if (e.target.id === "disabledAnyItem") {
      type = e.target.getAttribute("type");
      name = e.target.getAttribute("name");
      value = e.target.getAttribute("value");
    }
    type = type ? type : "random: " + String(Math.random()).slice(-4);
    name = name ? name : "random: " + String(Math.random()).slice(-4);
    value = value ? value : "random: " + String(Math.random()).slice(-4);

    this.setState({
      type: type,
      name: name,
      value: value,
      visible: true,
      pageXY: [e.pageX, e.pageY]
    });
    e.preventDefault();
  }

  callbackOnClickMenu(data, parentLiElem) {
    let elem = document.getElementById("valueDataset");
    elem.innerHTML = data;
    console.log("callbackOnClickMenu = ", data, parentLiElem);
  }

  render() {
    let items = [
      {
        type: "item",
        title: "Статистика по сотруднику",
        data: "statsWorker",
        icon: "chalkboard-teacher",
        className:
          this.state.type === "anyType"
            ? "disabled"
            : "" /*type, name or value*/
      },
      {
        type: "item",
        title: "Статистика по работе",
        data: "statsWork",
        icon: "chart-line",
        className:
          this.state.value === "anyValue"
            ? "disabled"
            : "" /*type, name or value*/
      },
      {
        type: "item",
        title: "Статистика общая",
        data: "statsAll",
        icon: "chart-bar"
      },
      { type: "separator" },
      {
        type: "submenu",
        title: "Работы",
        data: "works",
        icon: "hammer",
        className:
          this.state.name === "anyName"
            ? "disabled"
            : "" /*type, name or value*/,
        submenu: [
          {
            type: "item",
            title: "Новая",
            data: "newWork",
            icon: "folder-plus"
          },
          {
            type: "submenu",
            title: "Изменить",
            data: "editWork",
            icon: "edit",
            submenu: [
              { type: "item", title: "Вид", data: "editWorkType" },
              { type: "item", title: "Статус", data: "editWorkStatus" },
              { type: "item", title: "Важность", data: "editWorkImportance" }
            ]
          },
          {
            type: "item",
            title: "Передать другому",
            data: "transferTo",
            icon: "exchange-alt"
          },
          {
            type: "item",
            title: "Удалить",
            data: "deleteWork",
            icon: "folder-minus"
          }
        ]
      },
      { type: "separator" },
      {
        type: "submenu",
        title: "Сотрудники",
        icon: "users",
        submenu: [
          {
            type: "item",
            title: "Новый",
            data: "newWorker",
            icon: "user-plus"
          },
          {
            type: "item",
            title: "Изменить",
            data: "editWorker",
            icon: "user-edit"
          },
          {
            type: "item",
            title: "Распределить работу",
            data: "distributeWork",
            icon: "expand-arrows-alt"
          },
          {
            type: "item",
            title: "Удалить",
            data: "deleteWorker",
            icon: "user-minus"
          }
        ]
      },
      { type: "separator" },
      {
        type: "submenu",
        title: "Фильтр",
        icon: "filter",
        submenu: [
          {
            type: "item",
            title: "По текущей работе",
            data: "filterWork",
            icon: "hammer"
          },
          {
            type: "item",
            title: "По текущему сотруднику",
            data: "filterWorker",
            icon: "user"
          }
        ]
      },
      { type: "separator" },
      {
        type: "item",
        title: "В закладки",
        data: "addToBookmarks",
        icon: "bookmark"
      }
    ];

    return (
      <div>
        <div id="dataset">
          <span>
            Open console and click on menu item (callback will return the menu
            item Data)!
          </span>
          <br />
          <span>value item data: </span>
          <span id="valueDataset" className="value" />
        </div>
        <hr />
        <div id="props">
          <div>STATE (ExampleComponent): </div>
          [type]: <span className="value">{this.state.type}</span>
          <br />
          [name]: <span className="value">{this.state.name}</span>
          <br />
          [value]: <span className="value">{this.state.value}</span>
          <br />
          [visible]: <span className="value">{String(this.state.visible)}</span>
          <br />
          [pageXY]:{" "}
          <span className="value">
            {this.state.pageXY[0]}, {this.state.pageXY[1]}
          </span>
          <br />
          <button
            onClick={e => {
              console.log(this.state);
            }}
          >
            show state in console
          </button>
        </div>
        <hr />
        <div className="exampleRightClick">
          Right click in table (type, name, value):
          <table>
            <tbody>
              <tr>
                <td>1.1</td>
                <td>1.2</td>
                <td>1.3</td>
                <td rowSpan={2}>
                  <div
                    id="disabledAnyItem"
                    className="exampleRightClick"
                    type="anyType"
                    name="anyName"
                    value="anyValue"
                  >
                    Right click me - any item is disable!
                    <br /> (State: type=anyType, name=anyName, value=anyValue;)
                  </div>
                </td>
              </tr>
              <tr>
                <td>2.1</td>
                <td>2.2</td>
                <td>2.3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />
        <ContextMenu
          visible={this.state.visible}
          hideMenu={ () => this.setState({ visible: false }) }
          pageXY={[this.state.pageXY[0], this.state.pageXY[1]]}
          items={items}
          callbackOnClickMenu={(data, parentLiElem) => {
            this.callbackOnClickMenu(data, parentLiElem);
          }}
        />
      </div>
    );
  }
}
