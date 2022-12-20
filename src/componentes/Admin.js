import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import crud from "../conexiones/crud";
import swal from "sweetalert";

const Admin = () => {
  const navigate = useNavigate();
  const [categoria, setCategorias] = useState([]);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      //console.log(token)
      if (!token) {
        navigate("/login");
      }
    };
    autenticarUsuario();
  }, [navigate]); // [] hacen que solo se ejecute una vez el useEffect

  const cargarCategorias = async () => {
    const response = await crud.GET(`/api/categoria`);
    //console.log(response);
    setCategorias(response);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const borrarCategoria = async (idCategoria) => {
    swal({
      title: "¿Está seguro de eliminar la categoría?",
      text: "Al eliminarla no se podrá recuperar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const response = crud.DELETE(`/api/categoria/${idCategoria}`);

        if (response) {
          swal("La categoría ha sido borrada correctamente", {
            icon: "success",
          });
        }
        cargarCategorias();
      } else {
        swal("Acción cancelad");
      }
    });
  };

  return (
    <>
      <Header />
      <div className=" bg-sky-200 md:flex md:min-h-screen">
        <Sidebar />
        <main className="flex-1">
          <h1 className="bg-sky-900 text-black bg-clip-text font-display text-5xl tracking-tight text-transparent">
            Listado de categorias
          </h1>
          <br/>
          <br/>
          <table className="table table-bordered">
            <thead className="bg-sky-200 text-black text-center">
              <tr>
                <th style={{ width: "25%" }}>Imagen</th>
                <th style={{ width: "20%" }}>Nombre</th>
                <th style={{ width: "55%" }}>Opciones</th>
              </tr>
            </thead>

            <tbody className="bg-sky-200 text-black text-center">
              {categoria != null
                ? categoria.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img src={item.imagen}></img>
                      </td>
                      <td className="text-center font-mono text-blue-800 text-lg font-bold capitalize hover:uppercase">{item.nombre}</td>
                      <td>
                        <Link to={`/home-productos/${item._id}`} className="text-black bg-blue-200 hover:bg-blue-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Visualizar Productos
                        </Link>
                        <br/>
                        <br/>
                        <Link to={`/actualizar-categoria/${item._id}`} className="text-black bg-orange-300 hover:bg-orange-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                          Editar
                        </Link>
                        <br/>
                        <br/>
                        <button
                          className="text-black bg-red-600 hover:bg-red-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          onClick={() => borrarCategoria(item._id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                : console.log("No hay elementos")}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default Admin;
