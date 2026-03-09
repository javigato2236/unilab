import { useNavigate } from "react-router-dom";
import logout from "../hoosk/logoutReutilizable";

function LabQuimica () {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(navigate)

    }
    return(
        <div>
            <h1>Laboratorio de quimica</h1>
            <button onClick={handleLogout}>cerrar sesíon</button>


        </div>
    )


}


export default LabQuimica;