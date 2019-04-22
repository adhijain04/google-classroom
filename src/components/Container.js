import React, { Component } from 'react';
import ClassList from './ClassList';
// import CardDetails from './CardDetails';

class Container extends Component {
  render() {
    return (
      <div className='repo-app-container'>
      	<ClassList />
      </div>
    );
  }
}


export default Container;