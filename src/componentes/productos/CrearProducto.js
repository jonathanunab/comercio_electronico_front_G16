import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import crud from '../../conexiones/crud';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const CrearProducto = () => {

    const {idCategoria} = useParams();
    const navigate = useNavigate(); 
    const [producto, setProducto] = useState({
        nombre:'',
        descripcion:'',
        stock:'',
        precio:'',
        imagen:'',
        categoriaId:''
    })
    const { nombre, descripcion, stock, precio, imagen } = producto;
    const onChange = (e) =>{
        setProducto({
          ...producto,
          [e.target.name]: e.target.value
        })
    }
    const crearProducto = async () =>{
        const data = {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          stock: producto.stock,
          precio: producto.precio,
          imagen: producto.imagen,
          categoriaId: idCategoria
        }
        const response = await crud.POST(`/api/producto`, data);
        const mensaje = response.msg;
        console.log(mensaje);
        const mensaje1 = "El producto fue creado correctamente.";
                     swal({
                         title: 'Información',
                         text: mensaje1,
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
        navigate(`/home-productos/${idCategoria}`);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearProducto();
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
                    Crear Producto
                </h1>
            </div>
            <div className='mt-10 flex justify-center'>
            <form 
            className='my-10 bg-white shadow-orange-500 rounded-lg p-10'
            onSubmit={onSubmit} 
            >
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre producto</label>
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
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Descripción</label>
                    <input 
                    type="text" 
                    name="descripcion"
                    id="descripcion"
                    placeholder='descripcion'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={descripcion}
                    onChange={onChange}
                    />
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Stock</label>
                    <input 
                    type="number" 
                    name="stock"
                    id="stock"
                    placeholder='stock'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={stock}
                    onChange={onChange}
                    />
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Precio</label>
                    <input 
                    type="number" 
                    name="precio"
                    id="precio"
                    placeholder='precio'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={precio}
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
                 value="Crear Producto"
                 className="bg-blue-200 mb-5 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
                />

                </form>
            </div>
          </main>
         </div>
       </>

    );
}

export default CrearProducto;