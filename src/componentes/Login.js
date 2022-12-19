import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import crud from '../conexiones/crud';
import swal from 'sweetalert';

const Login = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })

    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    const autenticarUsuario = async() =>{
        const data = {
            email: usuario.email,
            password: usuario.password
        }
        //console.log(data); 
        const response = await crud.POST(`/api/auth`, data);
        const mensaje = response.msg;
        console.log(mensaje);

        if(mensaje === 'El usuario no existe'){
            const mensaje = "El usuario no existe.";
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
        }else if(mensaje === "password incorrecto"){
            const mensaje = "La contraseña ingresada es incorrecta.";
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
            const jwt = response.token;
            localStorage.setItem('token', jwt);
            

            // Redireccionar a la pantalla de Administrador
            //console.log(data); 
            navigate("/admin");
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        autenticarUsuario();
    }

    return (
        /*
        <div>
            <h1>G13</h1>
            <h1>Inicio Sesión</h1>
            <h2>Bienvenidos, ingrese sus credenciales</h2>
            <input placeholder="E-mail"/>
            <input placeholder="Password"/> 
            <button>Ingresar</button>
            <Link to = {'/crear-cuenta'}>Crear Cuenta</Link>   
        </div>  
        */
       <main className = 'container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
        <div>
        {/* <h1>G13</h1>
            <h1>Inicio Sesión</h1>
        */}
            <h1 className="bg-sky-800 text-white bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Iniciar sesión E-commerce
            </h1>
            <form 
            className='my-10 bg-white shadow-orange-500 rounded-lg p-10'
            onSubmit={onSubmit} >
                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                    <input 
                    type="email" 
                    name="email"
                    id="email"
                    placeholder='Email de registro'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={email}
                    onChange={onChange}/>
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                    <input 
                    type="password" 
                    name="password"
                    id="password"
                    placeholder='Password de registro'
                    className='w-full mt-3 p-3 border rounded-lg bg-gray'
                    value={password}
                    onChange={onChange}/>
                </div>

                <input
                type="submit"
                value="Iniciar Sesión"
                className="bg-blue-200 mb-5 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                 />

                <Link to={"/crear-cuenta"}
                className='block text-center my-5 text-gray-500 uppercase text-sm'>Crear Cuenta</Link>
            </form>
        </div>
       </main>
    );
}

export default Login;