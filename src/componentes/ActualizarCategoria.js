import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import crud from '../conexiones/crud';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const ActualizarCategoria = () => {

    const {idCategoria} = useParams();
    //console.log(idCategoria);
    const cargarCategoria = async () =>{
        const response = await crud.GET(`/api/categoria/${idCategoria}`);
        //console.log(response);
        setCategoria(response.categoria);
    }

    useEffect(()=>{
        cargarCategoria();
    },[]);

    const navigate = useNavigate(); 
    const [categoria, setCategoria] = useState({
        nombre:'',
        imagen:''
    })
    const { nombre, imagen } = categoria;
    const onChange = (e) =>{
        setCategoria({
          ...categoria,
          [e.target.name]: e.target.value
        })
    }
    const actualizarCategoria = async () =>{
        const data = {
          nombre: categoria.nombre,
          imagen: categoria.imagen
        }
        const response = await crud.PUT(`/api/categoria/${idCategoria}`, data);
        //const mensaje = response.msg;
        //console.log(response);
        const mensaje = "La categoría se actualizó correctamente.";
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
                     });
        navigate("/admin");
    }

    const onSubmit = (e) => {
        e.preventDefault();
        actualizarCategoria();
    }

    return (
         //<h1 className = 'bg-white'>Crear Categoría</h1>
         <>
         <Header/>
         <div className='md:flex md:min-h-screen'>
          <Sidebar/>
          <main className='flex-1'>
            <div className='mt-10 flex justify-center'>
                <h1 className="bg-sky-800 text-white bg-clip-text font-display text-5xl tracking-tight text-transparent">
                    Actualizar Categoría
                </h1>
            </div>
            <div className='mt-10 flex justify-center'>
            <form 
            className='my-10 bg-white shadow-orange-500 rounded-lg p-10'
            onSubmit={onSubmit} 
            >
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre categoría</label>
                    <input 
                    type="text" 
                    name="nombre"
                    id="nombre"
                    placeholder='Nombre'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={nombre}
                    onChange={onChange}
                    />
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Imagen</label>
                    <input 
                    type="text" 
                    name="imagen"
                    id="imagen"
                    placeholder='Nombre'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={imagen}
                    onChange={onChange}
                    />
                </div>

                <input 
                 type="submit"
                 value="Actualizar Categoría"
                 className="bg-blue-200 mb-5 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                />

                </form>
            </div>
          </main>
         </div>
       </>

    );
}

export default ActualizarCategoria;