import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNote } from '../actions';
import Button from "./Button"

function NotesButton() {

  const dispatch = useDispatch()

  const noteState = useSelector(state=>state.notes)

   const noteToggle = () =>{
    dispatch(setNote())  
  }

  return ( <Button className={noteState? " noteActive " : ""} clickHandler={noteToggle} label={"Note"}/> );
}

export default NotesButton;