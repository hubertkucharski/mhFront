import React, {useEffect, useState} from "react";
import {MyCollection} from "../MyCollection/MyCollection";
import {AddForm} from "../AddForm/AddForm";
import './Header.css'
import {validateCurrUserAsync} from "../../redux/features/userSlice";
import {useAppDispatch, useAppSelector} from "../../redux/app/hooks";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config/apiUrl";

export const Header = () => {

    const dispatch = useAppDispatch();
    const [isShown, setIsShown] = useState('AddForm');
    const userState = useAppSelector((state) => (state.user.user));

    useEffect(() => {
        dispatch(validateCurrUserAsync());
    }, []);

    const logOut = async () => {
        const res = await fetch(`${apiUrl}/auth/logout`, {
            credentials: 'include',
        });
        const resJson = await res.json();
        if (resJson.message === 'Wylogowano') {
            await dispatch(validateCurrUserAsync());
            window.location.reload();
        }
    };

    return (
        <>
            <h1>Place where you can exchange board games</h1>
            <div className='container contact__container'>
                <button type='button' className='btn btn-primary' onClick={
                    () => setIsShown('AddForm')}>
                    Add games to collection
                </button>
                <button type='button' className='btn btn-primary' onClick={
                    () => setIsShown('MyCollection')}>
                    Show my collection
                </button>
                {!userState ?
                    <Link to='/login'>
                        <button type='button' className='btn btn-primary'>
                            Login
                        </button>
                    </Link>
                    :
                    <button type='button' className='btn btn-primary' onClick={logOut}>
                        Logout
                    </button>
                }
            </div>
            {isShown === 'AddForm' && <AddForm/>}
            {isShown === 'MyCollection' && <MyCollection/>}
        </>
    );
}
