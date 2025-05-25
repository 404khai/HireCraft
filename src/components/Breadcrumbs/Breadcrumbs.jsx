import React from 'react'
import { IoCaretForward } from "react-icons/io5";
import './Breadcrumbs.css'

const Breadcrumbs = (props) => {
  return (
    <div className='breadcrumb'>
        <p>{props.firstLink}</p>
        <i><IoCaretForward /></i>
        <p>{props.secondLink}</p>
    </div>
  )
}

export default Breadcrumbs