import React, { useEffect,  useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import crud from '../../conexiones/crud';
import Header from '../Header';
import Sidebar from '../Sidebar';
import VistaProductos from './VistaProductos';

const HomeProductos = () => {

  const {idCategoria} = useParams();
  const navigate = useNavigate();

  //Hook
  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem('token')
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }

    autenticarUsuario()
  },[navigate]);// [] Hace que sólo se ejecute una vez el useEffect

  const [productos, setProductos] = useState([]);
  
  const cargarProductos = async () => {
    const response = await crud.GET(`/api/producto/${idCategoria}`);
    setProductos(response);
  }
  //console.log(productos);
  useEffect(() => {
    cargarProductos();
  },[]);


    return (

      <>
        <Header/>
        <div className=' bg-sky-200 md:flex md:min-h-screen'>
         <Sidebar/>
         <main className='flex-1'>
          <div className='mt-10 flex justify-center'>
            <h1 className="bg-sky-200 text-black bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Listado de Productos
            </h1>
          </div>
         <div className='px-5 py-10'>
          <Link
            to={`/crear-producto/${idCategoria}`}
            className='bg-blue-200 w-full p-3 text-black uppercase font-bold mt-5 text-center rounded-lg'
          >Crear Producto</Link>
         </div>

         <div className="bg-sky-200 shadow mt-10 rounded-lg">
          {
            productos.map( producto =>
              <VistaProductos
                key={producto._id}
                producto ={producto}
              />
            )
          }
        </div>

        </main>
        </div>
      </>
    );
}

export default HomeProductos;