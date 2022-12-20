import React from "react";
import { Link } from "react-router-dom";
import crud from "../../conexiones/crud";
import swal from "sweetalert";

export const ViewProductos = ({ producto }) => {
    
    const borrarProducto = async (producto) => {
    
        swal({
        title: "Estas seguro de eliminar el producto?",
        text: "una vez eliminado, no se podra recuperar este producto",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        }).then((willDelete) => {
        if (willDelete) {
            const response = crud.DELETE(`/api/producto/${producto._id}`);

            if (response) {
            swal("Tu producto ha sido borrado correctamente", {
                icon: "success",
            });
            }
            console.log(producto.categoriaId)
            window.location.reload();
            //navigate(`/home-productos/${producto.categoriaId}`);
        } else {
            swal("se cancelo la acción");
        }
        });
    };

  const { nombre, descripcion, stock, precio, imagen } = producto;
  //console.log(producto._id)
  return (
    <div className="border-r p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl text-gray-50">nombre:{nombre}</p>
        <p className="mb-1 text-xl text-gray-50 uppercase">
          descripción:{descripcion}
        </p>
        <p className="mb-1 text-xl text-gray-50">stock:{stock}</p>
        <p className="mb-1 text-xl text-gray-50">precio:{precio}</p>
        <img src={imagen} width="150" height="150"></img>
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        <Link
          to={`/actualizar-producto/${producto._id}`}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Editar
        </Link>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => borrarProducto(producto)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ViewProductos;
