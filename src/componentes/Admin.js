import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const Admin = () => {

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

  const [categoria, setCategorias] = useState([]);

  const cargarCategorias = async () => {
       const response = await crud.GET(`/api/categoria`);
      // console.log(response);
       setCategorias(response.categoria);
  }

  useEffect(() => {
       cargarCategorias();
  }, [])
  /*
  const cerrarSesion = () =>{
    localStorage.removeItem('token');
    navigate("/");
  }
  */

  const borrarCategoria = async (idCategoria) => {
    /*console.log(idCategoria);
    const response = await crud.DELETE(`/api/categoria/${idCategoria}`);
    const mensaje = response.msg;
    if(mensaje === "Categoría eliminada"){
      const mensaje = "Categoría eliminada.";
      swal({
        title: 'Información',
        text: mensaje,
        icon: 'success',
        buttons: {
            confirm:{
                text: 'OK',
                value: true,
                visible: true,
                className: 'btn btn-danger',
                closeModal: true
            }
        }
    })
    }

    cargarCategorias();*/

    swal({
      title: "¿Está seguro de eliminar la categoría?",
      text: "Al eliminarla no se podrá recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        const response = crud.DELETE(`/api/categoria/${idCategoria}`);
        const mensaje = response;

        if(response){
          swal("La categoría ha sido borrada correctamente", {
            icon: "success",
          });
        }
        cargarCategorias();
        
      } else {
        swal("Acción cancelada");
      }
    });

  }

    return (
      /*
       <main className = 'container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
         <div className = 'md:w-2/3 lg:w-2/5'>

            <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Panel de Administrador
            </h1> 

            <input
                type="submit"
                value="Cerrar Sesión"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                onClick={cerrarSesion}
             />
         </div>
         
       </main>*/
      <>
        <Header/>
        <div className=' bg-sky-200 md:flex md:min-h-screen'>
         <Sidebar/>
         <main className='flex-1'>
            <h1 className="bg-sky-200 text-black bg-clip-text font-display text-4xl tracking-tight text-transparent">
                Listado de Categorías
            </h1>
            <table className="table table-bordered">
                                <thead className='bg-sky-200 text-black text-center'>
                                    <tr>
                                          <th style={{ width: '25%' }}>Imagen</th>
                                         {/* <th style={{ width: '10%' }}>Id</th> */}
                                          <th style={{ width: '20%' }}>Nombre</th>
                                          <th style={{ width: '55%' }}>Opciones</th>
                                    </tr>
                                </thead>
                                
                               
                                <tbody className="bg-sky-200 text-black text-center">
                                    {
                                        categoria.map(
                                            item =>
                                                <tr key={item._id}>
                                                    <td><img src={item.imagen}></img></td>
                                                    {/*<td>{item._id}</td>*/}
                                                    <td>{item.nombre}</td>
                                                    <td>
                                                        <Link  
                                                          className="bg-blue-200 px-4 py-3 text-black uppercase font-bold text-sm rounded-lg"
                                                          to={`/home-productos/${item._id}`}
                                                        >Visualizar Productos</Link>&nbsp;&nbsp;
                                                        <Link 
                                                          className="bg-orange-300 px-4 py-3 text-black uppercase font-bold text-sm rounded-lg"
                                                          to={`/actualizar-categoria/${item._id}`}
                                                        >Editar</Link>&nbsp;&nbsp;
                                                        <button 
                                                          className="bg-red-600 px-4 py-3 text-black uppercase font-bold text-sm rounded-lg" 
                                                          onClick={()=>borrarCategoria(item._id)}
                                                        >Eliminar</button>
                                                    </td>
                                                </tr>
                                        )
                                    }

                            
                                </tbody>
                                <tbody>
                                

                                </tbody>
             </table>
         </main>
        </div>
      </>
    );
}

export default Admin;