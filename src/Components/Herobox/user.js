import { useGlobalContext } from "../Context";

const User = () => {
    const {loggedEmail, loggedUser} = useGlobalContext();

    return(
        <div className="user">
            <p className="user-logged">{loggedUser}</p>
            <p className="user-email">{loggedEmail}</p>
        </div>
    )
}

export default User;