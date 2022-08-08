import { FaHeart } from 'react-icons/fa';

const FavModal = ({text})=> {

    return(
        <div className="favAdded">
           <FaHeart/> {text}
        </div>
    )
}

export default FavModal;