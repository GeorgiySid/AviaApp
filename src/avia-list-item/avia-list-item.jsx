import React from 'react'

import './avia-list-item.scss'

const AviaListItem = ({ ticket }) => {
  if (!ticket) {
    return null
  }

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  return (
    <div className="avia-list-item">
      <ul className="avia-list-item__header">
        <li className="price">{ticket.price}р</li>
        <img className="aviaLogo" src={`http://pics.avs.io/99/36/${ticket.carrier}.png`} alt="Carrier Logo" />
      </ul>
      <div className="avia-list-item__main">
        <ul className="avia-list-item__city-time">
          {ticket.segments.map((segment, index) => (
            <React.Fragment key={index}>
              <li className="city">
                {segment.origin} - {segment.destination}
              </li>
              <li className="time">
                {formatTime(new Date(segment.date))} -{' '}
                {formatTime(new Date(segment.date.getTime() + segment.duration * 60 * 1000))}
              </li>
            </React.Fragment>
          ))}
        </ul>
        <ul className="avia-list-item__travel-time">
          {ticket.segments.map((segment, index) => (
            <React.Fragment key={index}>
              <li className="travel">В ПУТИ</li>
              <li className="travel-time">
                {Math.floor(segment.duration / 60)}ч {segment.duration % 60}мин
              </li>
            </React.Fragment>
          ))}
        </ul>
        <ul className="avia-list-item__change-avia">
          {ticket.segments.map((segment, index) => {
            const stops = segment.stops.join(',')
            return (
              <React.Fragment key={index}>
                <li className="change">
                  {segment.stops.length > 0
                    ? `${segment.stops.length} Пересад${segment.stops.length === 1 ? 'ка' : 'ки'}`
                    : 'Без пересадок'}
                </li>
                <li className="country">{stops}</li>
              </React.Fragment>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default AviaListItem
