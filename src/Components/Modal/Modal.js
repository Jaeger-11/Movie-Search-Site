import { useGlobalContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaTimes } from "react-icons/fa";
import './modal.css';

const Modal = ({title, text, button, to, icon}) => {
    const navigate = useNavigate();
    const {setModal} = useGlobalContext();

    const handleClick = () => {
        navigate(to);
        setModal(false)
    }
    const  handleTimes = () => {
        setModal(false)
    }

    return(
        <div className='modal-container'>
            <section className='modal'>
                <p className='times' > <FaTimes onClick={handleTimes} /> </p>
                <p > {icon ?? <FaThumbsUp/>} </p>
                <h3 className='title'>{title}</h3>
                <p style={{color: '#0C0114'}} >{text}</p>
                <button onClick={handleClick} > {button} </button>
            </section>
        </div>
    )
}

export default Modal;