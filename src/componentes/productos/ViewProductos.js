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
              swal({
                title: "Información",
                text: "Producto borrado correctamente",
                icon: "success",
                buttons: {
                  confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-primary",
                    closeModal: true,
                  },
                },
              }).then((value) => {
                if (value) {
                  window.location.reload();
                }
              })
          }
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
        <p className="mb-1 text-xl text-black">Nombre: {nombre}</p>
        <p className="mb-1 text-xl text-lack">
          Descripción: {descripcion}
        </p>
        <p className="mb-1 text-xl text-black">Stock: {stock}</p>
        <p className="mb-1 text-xl text-black">Precio: {precio}</p>
        <img src={imagen} width="150" height="150"></img>
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        <Link
          to={`/actualizar-producto/${producto._id}`}
          className="text-black bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Editar
        </Link>
        <button
          className="text-black bg-blue-200 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => borrarProducto(producto)}
        >
          Eliminar
        </button>
      </div>
    </div>
);
};

export default ViewProductos;
