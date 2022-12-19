import React from "react";

export const VistaProductos = ({producto}) => {
    const {nombre, descripcion, stock, precio, imagen} = producto;
    //console.log("Estoy en Vista")
    return(
        <div className="border-r p-5 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-1 text-xl text-black">Nombre: {nombre}</p>
                <p className='mb-1 text-xl text-black'>Descripción: {descripcion}</p>
                <p className='mb-1 text-xl text-black'>Stock: {stock}</p>
                <p className='mb-1 text-xl text-black'>Precio: {precio}</p>
                <img src={imagen} alt="" width="150" height="150"></img>
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
                <button
                    className="bg-orange-300 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    //onClick={() => handleModalEditarTarea(tarea)}
                >Editar</button>
                
                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    // onClick={() => handleModalEliminarTarea(tarea)}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default VistaProductos