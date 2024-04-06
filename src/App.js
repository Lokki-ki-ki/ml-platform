// import logo from './logo.svg';
import './App.css';
// import Web3 from 'web3';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Header from './Components/Header';
import router from './Features/router';

class App extends React.Component{
  
  render() {
    return (
      <div className='App'>
        <Header />
        <main className='App-main'>
          <RouterProvider router={router}/>
          {/* <h1>Hello, World! Current is connected to {this.state.account}</h1>\
          <h1>Hello, World! Current is connected to {this.state.account}</h1>\ */}
        </main>
      </div>
    );
  }
}

export default App;
