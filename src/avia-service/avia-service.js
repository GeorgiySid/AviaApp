/* eslint-disable prettier/prettier */
import React from 'react'

export default class AviaService extends React.Component {
  getSearchId = async () => {
    try {
      const res = await fetch('https://aviasales-test-api.kata.academy/search')
      if (!res.ok) {
        throw new Error('Ошибка при получении ID')
      }
      const data = await res.json()
      return data.searchId
    } catch (error) {
      console.error('Ошибка при получении ID', error)
      throw error
    }
  }

  getTickets = async (searchId) => {
    try {
      const res = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
      if (!res.ok) {
        if (res.status >= 500 && res.status < 600) {
          console.log(`Получена ошибка ${res.status}. Повторная попытка через 1 секунду.`)
          await new Promise((res) => setTimeout(res, 1000))
          return await this.getTickets(searchId)
        }
        throw new Error(`Ошибка: ${res.status}`)
      }
      const data = await res.json()
      const tickets = data.tickets.map((ticket) => ({
        ...ticket,
        segments: ticket.segments.map((segment) => ({
          ...segment,
          date: new Date(segment.date),
        })),
      }))
      return {
        tickets: tickets,
        stop: data.stop,
      }
    } catch (error) {
      console.error('Ошибка:', error)
      throw error
    }
  }
}
