/* eslint-disable prettier/prettier */
export const SET_SORT_ORDER = 'SET_SORT_ORDER'
export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX'
export const TOGGLE_ALL_CHECKBOXES = 'TOGGLE_ALL_CHECKBOXES'
export const SET_TICKETS = 'SET_TICKETS'

export const setSortOrder = (order) => ({
  type: SET_SORT_ORDER,
  payload: order,
})

export const toggleCheckbox = (id) => ({
  type: TOGGLE_CHECKBOX,
  payload: id,
})

export const toggleAllCheckboxes = () => ({
  type: TOGGLE_ALL_CHECKBOXES,
})

export const setTickets = (tickets) => ({
  type: SET_TICKETS,
  payload: tickets,
})