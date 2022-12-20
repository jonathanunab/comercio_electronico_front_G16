import React from 'react'; 
import { useNavigate} from 'react-router-dom';

const Header = () => {

const navigate = useNavigate(); 

const cerrarSesion = () =>{
    localStorage.removeItem("token");
    navigate("/");
    }

  return (
    <header className='px-4 py-5 bg-sky-800 border-b'>
        <div className='md:flex md:justify-between'>
        <h2 className='text-4xl text-white font-bold text-center mb-5 md:mb-0'>
            G16 Panel de administrador
        </h2>
        <div className='flex flex-col md:flex-row items-center gap-4'>
        <input 
                type="submit"
                value="Cerrar Sesión"
                style={{width: "170px"}}
                className="bg-blue-200 mb-5 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                onClick={cerrarSesion}
            />
        </div>
        </div>  
    </header>
   
    );
}

export default Header;