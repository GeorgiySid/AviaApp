import React, { useState } from 'react'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'

import AviaListItem from '../avia-list-item/avia-list-item'

import './avia-list.scss'

const AviaList = ({ tickets }) => {
  const [showTicket, setShowTicket] = useState(5)
  const checkboxes = useSelector((state) => state.checkboxes)
  const handleShowMore = () => {
    setShowTicket((prev) => prev + 5)
  }
  if (tickets.length === 0 && !checkboxes.all) {
    return <div className="no-tickets">Рейсов, подходящих под заданные фильтры, не найдено</div>
  }
  if (!tickets || tickets.length === 0) {
    return <Spin className="spinner" />
  }
  return (
    <div className="avia-list">
      {tickets.slice(0, showTicket).map((ticket, index) => (
        <AviaListItem key={index} ticket={ticket} />
      ))}
      {tickets.length > showTicket ? (
        <button className="more" onClick={handleShowMore}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      ) : null}
    </div>
  )
}
export default AviaList
