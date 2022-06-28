import React, {useState} from "react";
import {MyCollection} from "../MyCollection/MyCollection";
import {AddForm} from "../AddForm/AddForm";
import './Header.css'

export const Header = () => {

    const [isShown, setIsShown] = useState('AddForm');

    return (
        <>
            <h1>Place where you can exchange games</h1>
            <div className='container contact__container'>
                <button type='button' className='btn btn-primary' onClick={
                    ()=>setIsShown('AddForm')}>
                    Add games to collection
                </button>
                <button type='button' className='btn btn-primary' onClick={
                    ()=>setIsShown('MyCollection')}>
                    Show my collection
                </button>
            </div>
            {isShown === 'AddForm' && <AddForm />}
            {isShown === 'MyCollection' && <MyCollection />}
        </>
    );
}
