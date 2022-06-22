import {useState} from "react";

import './AddForm.css';

export const AddForm = () =>{

        const [isSend, setIsSend] = useState<number>(100)

    const sendForm = (e: any) => {
        e.preventDefault();

    }
    if (isSend === 200) {
        return(
            <section className="contact">
                <h2>Thank you for adding new game!</h2>
                <h5>Your collection is beautiful.</h5>
            </section>
        )

    }
    return (
        <>
            <section id='contact'>
                <h5>You can add new game to your collection</h5>
                <h2>English names</h2>

                <div className="container contact__container">

                    <form onSubmit={sendForm}>
                        <input type="text" name='name' placeholder='Name of the game' required/>
                        {/*<input type="email" name='email' placeholder='Your Email' required/>*/}

                        <button type='submit' className='btn btn-primary'>Add game</button>
                    </form>
                </div>
            </section>
        </>
    );
};
