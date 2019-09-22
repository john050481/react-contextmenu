import React, {Component} from 'react'
import {render} from 'react-dom'
import { ExampleComponent } from "./ExampleComponent";

class Demo extends Component {
  render() {
    return <div>
      <h1>react-contextmenu Demo</h1>
      <ExampleComponent/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))