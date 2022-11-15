import {Navigate, useSearchParams} from 'react-router-dom';
import {PasswordChange} from "./PasswordChange";

interface Props {
    activateOrReset?: string;
}

const FormPasswordSite = (props: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const token = searchParams.get('token');

    if (token === null) {
          return  <Navigate to='/login' replace={true}/>
    }
    return (
        <>
            <PasswordChange token={token} activateOrReset={props.activateOrReset}/>
        </>
    );
};

export {FormPasswordSite};
