import React, {useEffect, useState} from "react";
import {MyCollection} from "../MyCollection/MyCollection";
import {AddForm} from "../AddForm/AddForm";
import './Header.css'
import {validateCurrUserAsync} from "../../redux/features/userSlice";
import {useAppDispatch, useAppSelector} from "../../redux/app/hooks";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config/apiUrl";
import {Alert, Snackbar} from "@mui/material";

export const Header = () => {

    const dispatch = useAppDispatch();
    const [isShown, setIsShown] = useState('AddForm');
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const userState = useAppSelector((state) => (state.user.user));

    useEffect(() => {
        dispatch(validateCurrUserAsync());
    }, []);

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false);
        window.location.reload();
    };

    const logOut = async () => {
        const res = await fetch(`${apiUrl}/auth/logout`, {
            credentials: 'include',
        });
        const resJson = await res.json();
        if (resJson.message === 'Wylogowano') {
            await dispatch(validateCurrUserAsync());
            setOpenConfirmation(true);
        }
    };

    return (
        <>
            <h1>Place where you can exchange board games</h1>
            <Snackbar open={openConfirmation} autoHideDuration={3330} onClose={handleCloseConfirmation}>
                <Alert onClose={handleCloseConfirmation} severity="success" sx={{ width: '100%' }}>
                    You have been successfully logged out!
                </Alert>
            </Snackbar>
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
