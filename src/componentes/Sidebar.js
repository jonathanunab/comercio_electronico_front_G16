import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    

    return (
        // <h1 className = 'bg-white'>Este es el sidebar</h1>
        <aside className='md:w-60 lg:w-90 px-5 py-10 bg-sky-800'>
            <p className='text-white text-xl font-bold'>Administrador</p>
            <Link to={"/crear-categorias"}
                className='bg-blue-200 w-full p-3 text-black uppercase font-bold block mt-5 text-center rounded-lg'
            >Crear Categorías</Link>
            
        </aside>
    );
}

export default Sidebar;