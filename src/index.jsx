'use strict';

import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Todos todos={[{done: true, text: 'hoge'}]}></Todos>
    )
  }
}

class Todos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <ul>
        {this.props.todos.map((todo, i) => {
          return(
            <li key={i}>
              <input type='number' className='orders' />
              <input type='checkbox' defaultChecked={todo.done} className='done'/>
              <input type='text' defaultValue={todo.text} className='text' />
            </li>
          )
        })}
      </ul>
    )
  }
}

render(<App/>, document.getElementById('app'));
