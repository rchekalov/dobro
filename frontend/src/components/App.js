import React from 'react'
import Header from './Header'

const App = ({children}) =>
   [
      <Header/>,
      <div className="app-wrapper">
         {children}
      </div>
   ]

export default App
