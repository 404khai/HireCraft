import React from 'react'
import { IoCaretForward } from "react-icons/io5";
import './Breadcrumbs.css'
import { Link } from 'react-router-dom';

const Breadcrumbs = (props) => {
  return (
    <div className='breadcrumb'>
        <Link to={props.link}>{props.firstLink}</Link>
        <i><IoCaretForward /></i>
        <Link to={props.link2}>{props.secondLink}</Link>
    </div>
  )
}

export default Breadcrumbs