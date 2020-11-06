import React, { useEffect, useState } from "react";
import EmpleadosForm from "./EmpleadosForm";
import { firestore } from "../../firebase";
import { toast } from "react-toastify";

const Empleados = () => {
    const [Empleados, setEmpleados] = useState([]);
    const [currentId, setCurrentId] = useState("");
  
    const getEmpleados = async () => {
        firestore.collection("Empleados").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setEmpleados(docs);
      });
    };
  
    const onDeleteEmpleado = async (id) => {
      if (window.confirm("are you sure you want to delete this Empleado?")) {
        await firestore.collection("Empleados").doc(id).delete();
        toast("Se elimino un Empleado", {
          type: "error",
          //autoClose: 2000
        });
      }
    };
  
    useEffect(() => {
      getEmpleados();
    }, []);
  
    const addOrEditEmpleado = async (EmpleadoObject) => {
      try {
        if (currentId === "") {
          await firestore.collection("Empleados").doc().set(EmpleadoObject);
          toast("Se agrego un Empleado", {
            type: "success",
          });
        } else {
          await firestore.collection("Empleados").doc(currentId).update(EmpleadoObject);
          toast("Se actualizo un Empleado", {
            type: "info",
          });
          setCurrentId("");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>    
        <div className="col-md-4 p-2">
          <h2>Agregar Empleados</h2>
          <br/>
          <EmpleadosForm {...{ addOrEditEmpleado, currentId, Empleados }} />
        </div>
        <div className="col-md-8 p-2">
          <div class="container">
            <h2>Lista Empleados</h2>
            <br/>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Horas</th>
                  <th>ISSS</th>
                  <th>AFP</th>
                  <th>Renta</th>
                  <th>Sueldo Liquido</th>
                  <th>Total</th>
                  <th>Aciones</th>
                </tr>
              </thead>
              <tbody>
                {Empleados.map((Empleado) => (
                  <tr key={Empleado.id}>
                    <td>{Empleado.codigo}</td>
                    <td>{Empleado.nombre}</td>
                    <td>{Empleado.horas}</td>
                    <td>{Empleado.isss}</td>
                    <td>{Empleado.afp}</td>
                    <td>{Empleado.renta}</td>
                    <td>{Empleado.sueldol}</td>
                    <td>{Empleado.sueldon}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => setCurrentId(Empleado.id)}>Editar</button>
                      &nbsp;
                      &nbsp;
                      <button className="btn btn-danger" onClick={() => onDeleteEmpleado(Empleado.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  export default Empleados;