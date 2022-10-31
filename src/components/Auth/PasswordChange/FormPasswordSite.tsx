import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {PasswordChange} from "./PasswordChange";

interface Props {
    activateOrReset?: string;
}

const FormPasswordSite = (props: Props) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const token = searchParams.get('token');
    if (token === null) {
        // useEffect(() => {
            navigate('/login', {replace: true});
        // }, [])
    }
    return (
        <>
            <PasswordChange token={token} activateOrReset={props.activateOrReset}/>
        </>
    );
};

export {FormPasswordSite};
