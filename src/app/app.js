/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import './app.scss'
import { Provider  } from 'react-redux'
import { createStore } from 'redux'
import Alert from 'antd/es/alert/Alert'

import { setTickets } from '../actions'
import AppHeader from '../app-header'
import Tabs from '../tabs/tabs'
import reducer from '../reducer'
import AviaService from '../avia-service/avia-service'

const store = createStore(reducer)
const aviaService = new AviaService()

const getTickets = async (dispatch) => {
  const searchId = await aviaService.getSearchId()
  let allTickets = []
  let stop = false
  while (!stop) {
    const { tickets, stop: currentStop } = await aviaService.getTickets(searchId)
    allTickets = allTickets.concat(tickets)
    stop = currentStop
  }
  dispatch(setTickets(allTickets))
}

const App = () => {
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTickets(store.dispatch)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }
    fetchData()
  }, [])
  if (error) {
    return <Alert
      className="error"
      message="ЧТО ТО ПОШЛО НЕ ТАК..."
      description="Возможно у вас нету интернета , а может кто-то прыгает по проводам"
      type="error"
      showIcon
    />
  }

  return (
    <div className="main">
      <Provider store={store}>
        <div className="main">
          <AppHeader />
          <Tabs/>
        </div>
      </Provider>
    </div>
  )
}

export default App