/* eslint-disable prettier/prettier */
import React,{useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSortOrder } from '../actions'
import './tabs.scss'
import AviaList from '../avia-list/avia-list'
import AsideFilter from '../aside-filter/aside-filter'

const Tabs = () => {
  const dispatch = useDispatch()
  const sortOrder = useSelector((state) => state.sortOrder)
  const sortedTickets = useSelector((state) => state.sortedTickets)

  const handleSortClick = useCallback((order) => {
    dispatch(setSortOrder(order))
  }, [dispatch])

  return (
    <div className="tabs">
      <div className="tabs-button-container">
        <div className="tab-buttons">
          <button
            className={sortOrder === 'cheapest' ? 'active' : ''}
            onClick={() => handleSortClick('cheapest')}
          >
            САМЫЙ ДЕШЕВЫЙ
          </button>
          <button
            className={sortOrder === 'fastest' ? 'active' : ''}
            onClick={() => handleSortClick('fastest')}
          >
            САМЫЙ БЫСТРЫЙ
          </button>
        </div>
      </div>
      <AsideFilter />
      <AviaList tickets={sortedTickets} />
    </div>
  )
}

export default Tabs