import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import crud from '../conexiones/crud';

const CrearCuenta = () => {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    const { nombre, email, password, confirmar } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const crearCuenta = async() =>{
        /*
        const data = {
            nombre: usuario.nombre,
            email: usuario.email,
            password: usuario.password
        }
        console.log(data);
        */
        if(password !== confirmar){
            console.log("El password no coincide");
            const mensaje = "La contraseña no coincide.";
            swal({
                title: 'Error',
                text: mensaje,
                icon: 'error',
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
        }else{
            const data = {
                nombre: usuario.nombre,
                email: usuario.email,
                password: usuario.password
            }
            console.log(data); 
            const response = await crud.POST(`/api/usuarios`, data);
            const mensaje = response.msg;
           // console.log(mensaje);
            if(mensaje === 'El usuario ya existe'){
                const mensaje = "El usuario ya existe.";
                swal({
                    title: 'Error',
                    text: mensaje,
                    icon: 'error',
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
            }else{
                     const mensaje = "El usuario fue creado correctamente.";
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

                     setUsuario({
                        nombre: '',
                        email: '',
                        password: '',
                        confirmar: ''
                     })

                     // Redireccionar después de crear el usuario a la pantalla de Login
                     navigate("/login");
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearCuenta();
    }

    return(
        /*
        <div>
            <h1>Crear ccuenta</h1>
            <h2>Ingresar los datos del usuario</h2>
            <input placeholder="Nombre"/> 
            <input placeholder="E-mail"/>
            <input placeholder="Password"/> 
            <input placeholder="Confirmar Password"/>
            <button>Crear Cuenta</button>   
            <Link to = {'/'}>Regresar</Link>      

        </div>  
        */
        <main className = 'container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
        <div>
        {/* <h1>G13</h1>
            <h1>Inicio Sesión</h1>
        */}
            <h1 className="bg-sky-800 text-white bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Crear cuenta - Ecommerce
            </h1>
            <form onSubmit={onSubmit} className='my-10 bg-white shadow-orange-500 rounded-lg p-10'>
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                    <input 
                    name="nombre"
                    id="nombre"
                    type="nombre" 
                    placeholder='Ingrese su nombre'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={nombre}
                    onChange={onChange}/>
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                    <input 
                    name="email"
                    id="email"
                    type="email" 
                    placeholder='Email de registro'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={email}
                    onChange={onChange}/>
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                    <input type="password" 
                    name="password"
                    id="password"
                    placeholder='Password de registro'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={password}
                    onChange={onChange}/>
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Confirmación password</label>
                    <input
                    type="password" 
                    name="confirmar"
                    id="confirmar"
                    placeholder='Escriba de nuevo su password'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={confirmar}
                    onChange={onChange}/>
                </div>

                <input
                type="submit"
                value="Crear Cuenta"
                className="bg-blue-200 mb-5 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                 />

                <Link to={"/"}
                className='block text-center my-5 text-gray-500 uppercase text-sm'>Regresar</Link>
            </form>
        </div>
       </main>
    );
}

export default CrearCuenta;