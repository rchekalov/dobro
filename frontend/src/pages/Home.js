import React from 'react'
import { Helmet } from 'react-helmet'
import Chat from '../containers/Chat'

const HomePage = () => {
  const content = {
    title: 'Welcome to CRRS-APP',
  }

  return [
    <Helmet>
      <meta name="description" content={content.article}/>
    </Helmet>,
    <main className="p-home">
      <Chat/>
    </main>
  ]
}

export default HomePage
