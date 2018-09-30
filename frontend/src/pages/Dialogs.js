import React from 'react'
import { Helmet } from 'react-helmet'
import AdminChat from '../containers/AdminChat'
import DialogSelector from '../containers/DialogSelector'

const Dialogs = () => {
  const content = {
    title: 'Welcome to CRRS-APP',
  }

  return [
    <Helmet>
      <meta name="description" content={content.article}/>
    </Helmet>,
    <main className="p-dialogs">
      <DialogSelector/>
      <AdminChat/>
    </main>
  ]
}

export default Dialogs
