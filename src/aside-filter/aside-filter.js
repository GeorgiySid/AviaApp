import React from 'react'
import './aside-filter.scss'
import { connect } from 'react-redux'

import { toggleAllCheckboxes, toggleCheckbox } from '../actions'

const AsideFilter = ({ checkboxes, toggleCheckbox, toggleAllCheckboxes }) => {
  const handleCheckboxChange = (id) => {
    toggleCheckbox(id)
  }

  const handleToggleAllCheckboxes = () => {
    toggleAllCheckboxes()
  }
  return (
    <div className="aside-filter">
      <ul className="aside-filter-list">
        <li className="filter-title">КОЛИЧЕСТВО ПЕРЕСАДОК</li>
        <div className="filter-checkBox-list">
          <label className="checkbox-item">
            <input
              type="checkbox"
              className="all-ticket"
              checked={checkboxes.all}
              onChange={() => handleToggleAllCheckboxes()}
            />
            <span className="custom-checkbox" />
            Все
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              className="checkbox without-transfer"
              checked={checkboxes.direct}
              onChange={() => handleCheckboxChange('direct')}
            />
            <span className="custom-checkbox" />
            Без пересадок
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              className="checkbox one-transfer"
              checked={checkboxes.one}
              onChange={() => handleCheckboxChange('one')}
            />
            <span className="custom-checkbox" />1 пересадка
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              className="checkbox two-transfer"
              checked={checkboxes.two}
              onChange={() => handleCheckboxChange('two')}
            />
            <span className="custom-checkbox" />2 пересадки
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              className="checkbox three-transfer"
              checked={checkboxes.three}
              onChange={() => handleCheckboxChange('three')}
            />
            <span className="custom-checkbox" />3 пересадки
          </label>
        </div>
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({
  checkboxes: state.checkboxes,
})

const mapDispatchToProps = {
  toggleCheckbox,
  toggleAllCheckboxes,
}

export default connect(mapStateToProps, mapDispatchToProps)(AsideFilter)
