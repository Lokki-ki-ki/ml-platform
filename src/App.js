import './App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Header from './Components/Header';
import router from './Features/router';


class App extends React.Component {

  render() {

    return (

      <div className='App'>
        <Header />
        <main className='App-main'>
          <RouterProvider router={router} />
        </main>
      </div>
    );
  }
}

export default App;
