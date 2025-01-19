/* eslint-disable prettier/prettier */
import { SET_SORT_ORDER, TOGGLE_CHECKBOX, TOGGLE_ALL_CHECKBOXES, SET_TICKETS } from './actions'

const initialState = {
  sortOrder: 'cheapest',
  tickets:[],
  sortedTickets:[],
  checkboxes: {
    all: true,
    direct: true,
    one: true,
    two: true,
    three: true,
  },
}

const sortTickets = (tickets, sortBy) => {
  if (sortBy === 'cheapest') {
    return [...tickets].sort((a, b) => a.price - b.price)
  }
  if (sortBy === 'fastest') {
    return [...tickets].sort((a, b) => a.segments[0].duration - b.segments[0].duration)
  }
  return tickets
}

const filterTickets = (tickets, checkboxes) => {
  if (checkboxes.all) {
    return tickets
  }

  const filteredTickets = tickets.filter((ticket) => {
    let validTicket = false

    for (const segment of ticket.segments) {
      const stopsCount = segment.stops.length
      if (checkboxes.direct && stopsCount === 0) {
        validTicket = true
      } else if(checkboxes.one && stopsCount === 1) {
        validTicket = true
      } else if(checkboxes.two && stopsCount === 2) {
        validTicket = true
      } else if(checkboxes.three && stopsCount === 3) {
        validTicket = true
      }
      if(validTicket) break
    }
    return validTicket
  })

  return filteredTickets.length > 0 ? filteredTickets : []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_SORT_ORDER:{
    const sortedTicketsForSortOrder =  sortTickets(state.sortedTickets, action.payload)
    return {
      ...state,
      sortOrder: action.payload,
      sortedTickets: sortedTicketsForSortOrder,
    }
  }
  case SET_TICKETS: {
    const sorted = sortTickets(action.payload, state.sortOrder)
    const filteredTicketsSetTickets =  filterTickets(sorted,state.checkboxes)
    return {
      ...state,
      tickets: sorted,
      sortedTickets: filteredTicketsSetTickets,
    }
  }
  case TOGGLE_CHECKBOX: {
    const id = action.payload
    const updatedCheckboxes = { ...state.checkboxes }
    if (id === 'all') {
      updatedCheckboxes.all = !updatedCheckboxes.all
      updatedCheckboxes.direct = updatedCheckboxes.all
      updatedCheckboxes.one = updatedCheckboxes.all
      updatedCheckboxes.two = updatedCheckboxes.all
      updatedCheckboxes.three = updatedCheckboxes.all
    } else {
      updatedCheckboxes[id] = !updatedCheckboxes[id]
      if (!updatedCheckboxes[id] && updatedCheckboxes.all) {
        updatedCheckboxes.all = false
      }
      const allChecked = ['direct', 'one', 'two', 'three'].every((key) => updatedCheckboxes[key])
      if (allChecked) {
        updatedCheckboxes.all = true
      }
    }
    const filteredTicketsToggle = filterTickets(state.tickets, updatedCheckboxes)
    return {
      ...state,
      checkboxes: updatedCheckboxes,
      sortedTickets: filteredTicketsToggle,
    }
  }
  case TOGGLE_ALL_CHECKBOXES: {
    const allValue = !state.checkboxes.all
    const filteredTicketsToggleAll =  filterTickets(state.tickets,{
      all: allValue,
      direct: allValue,
      one: allValue,
      two: allValue,
      three: allValue,
    })
    return {
      ...state,
      checkboxes: {
        all: allValue,
        direct: allValue,
        one: allValue,
        two: allValue,
        three: allValue,
      },
      sortedTickets: filteredTicketsToggleAll,
    }
  }
  default:
    return state
  }
}

export default reducer
