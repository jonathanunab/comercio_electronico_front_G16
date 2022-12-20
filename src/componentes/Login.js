import React, { useState }  from 'react';
import { Link , useNavigate} from 'react-router-dom';
import crud from '../conexiones/crud';
import swal from 'sweetalert'; 

const Login = () => {
  
  const navigate = useNavigate(); 

  const [usuario, setUsuario] = useState({
    email:'',
    password:''
  })

  const { email, password} = usuario;

  const onChange = (e) =>{
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }
  
  const autenticarUsuario = async () =>{
    const data = {
      email: usuario.email,
      password: usuario.password
    }
   
    const response = await crud.POST(`/api/auth`, data);
      const mensaje = response.msg;
      //console.log(mensaje);
      if(mensaje === 'el usuario no existe'){
        const mensaje = "El usuario no existe";
        swal({
          title: 'Error',
          text: mensaje,
          icon: 'error',
          buttons:{
            confirm:{
              text:'OK',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        })
      }else if(mensaje === 'password incorrecto'){
        const mensaje = "La contraseña ingresada es incorrecta.";
        swal({
          title: 'Error',
          text: mensaje,
          icon: 'error',
          buttons:{
            confirm:{
              text:'OK',
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
        
        
        //redireccionar a la pantalla de admistrador
         navigate("/admin");
      }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    autenticarUsuario();
  }
  
  
  
  return (
      <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
         <div>
            <h1 className="bg-sky-800 text-white bg-clip-text font-display text-5xl tracking-tight text-transparent ">
              Inicio de sesión E-commerce
            </h1>

            <form 
              className='my-10 bg-white shadow rounded-lg p-10 '
              onSubmit={onSubmit}
            >
              <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl font-bold' >Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Email de Registro'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={email}
                  onChange={onChange}
                />

            <label className='uppercase text-gray-600 block text-xl font-bold' >password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder='Password de Registro'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={password}
                  onChange={onChange}
                />
              </div>

              <input 
                type="submit"
                value="Iniciar Sesión"
                className="bg-blue-200 mb-5 w-full py-3 text-black uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
            />
            <Link 
            to={"/crear-cuenta"}
            className="block text-center my-5 text-gray-500 uppercase text-sm"
            >Crear Cuenta</Link>

            </form>


         </div>
      </main>
    );
}

export default Login;