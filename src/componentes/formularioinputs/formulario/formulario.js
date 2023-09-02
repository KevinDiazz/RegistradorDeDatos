import { useEffect, useState } from "react";
import FormularioInputs from "../formularioInputs";
import "./formulario.css";
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "../PdfCreator/pdfCreator";

function Form() {
  //estados de manejo de informacion de inputs
  let [isWrong, setIsWrong] = useState(false);
  let [isDniWrong, setDniWrong] = useState(false);
  let [isBoxesWrong, setBoxesWrong] = useState(false);
  let [dateWrong, setDateWrong] = useState(false);
  let [nameWrong, setNameWrong] = useState(false);
  let [isReady, setIsReady] = useState(false);
  const [formdata, setFormdata] = useState({
    nombre: "",
    dni: "",
    totalCajas: "",
    kilosPrimera: "",
    kilosSegunda: "",
    tara: "",
    totalKilos: "",
    fecha: "",
    numeroSocio: "",
  });

  useEffect(() => {}, [
    isWrong,
    isDniWrong,
    isBoxesWrong,
    dateWrong,
    nameWrong,
    isReady,
  ]);

  //validacion de inputs
  function validarForm(data) {
    let total =
      Number(data.tara) + Number(data.kilosPrimera) + Number(data.kilosSegunda);
    let CounterIsValid = 0;
    if (total && total === Number(data.totalKilos)) {
      console.log("es correcto");
      setIsWrong(false);
      CounterIsValid++;
    } else {
      setIsWrong(true);
    }
    if (data) {
      const regex = /^[a-zA-Z]$/;
      const numbersDni = data.dni.substring(0, 8);
      if (
        data.dni.length === 9 &&
        regex.test(data.dni[8]) &&
        Number(numbersDni)
      ) {
        console.log("dni correcto");
        setDniWrong(false);
        CounterIsValid++;
      } else {
        console.log("dni incorrecto");
        setDniWrong(true);
      }
    }
    if (Number(data.totalCajas)) {
      setBoxesWrong(false);
      CounterIsValid++;
    } else {
      setBoxesWrong(true);
    }
    if (!data.fecha) {
      setDateWrong(true);
    } else {
      setDateWrong(false);
      CounterIsValid++;
    }
    if (!data.nombre) {
      setNameWrong(true);
    } else {
      setNameWrong(false);
      CounterIsValid++;
    }
    console.log(Number(data.numeroSocio));
    if (
      CounterIsValid === 5 &&
      !isNaN(Number(data.numeroSocio)) &&
      data.numeroSocio.length === 5
    ) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }
  //estilos Css
  const estilosError = {
    width: "250px",
    height: "30px",
    borderRadius: "5px",
    border: "2.2px solid",
    borderColor: "#fa5c5c",
    ":focus": {
      borderColor: "#fa5c5c",
      outline: "none",
    },
  };
  const estilosImg = {
    display: "initial",
  };
  const estilosAlert = {
    display: "block",
  };

  //submit de formulario , con validacion
  const handleSubmit = (event) => {
    event.preventDefault();
    validarForm(formdata);
  };

  /* funcion para guardado de informacion de los inputs en un estado
   coge el id del input(que es igual al label de los input) y dependiendo del tipo
   de valor que sea lo guarda en el estado formData*/
  const handleUpdate = (event) => {
    const elegirNombre = (str) => {
      let valores = {
        "NOMBRE DEL CLIENTE": "nombre",
        "DOCUMENTO DE IDENTIDAD": "dni",
        "NUMERO TOTAL DE CAJAS": "totalCajas",
        "KILOS DE PRIMERA CLASE": "kilosPrimera",
        "KILOS DE SEGUNDA CLASE": "kilosSegunda",
        "NUMERO TOTAL KILOS": "totalKilos",
        TARA: "tara",
        FECHA: "fecha",
        "NUMERO DE SOCIO": "numeroSocio",
      };

      for (const clave in valores) {
        if (str === clave) {
          return valores[clave];
        }
      }
    };
    let valor = elegirNombre(event.target.id);
    setFormdata((prev) => ({
      ...prev,
      [valor]: event.target.value,
    }));
    console.log(formdata);
  };

  return (
    <>
      <form action="bbdd" method="post" onSubmit={handleSubmit}>
        <ol>
          <li>
            <FormularioInputs
              valor={handleUpdate}
              type="text"
              name="NOMBRE DEL CLIENTE"
              style={nameWrong ? estilosError : null}
              styleImg={nameWrong ? estilosImg : null}
              styleAlert={nameWrong ? estilosAlert : null}
            ></FormularioInputs>
          </li>
          <li>
            <FormularioInputs
              valor={handleUpdate}
              type="text"
              name="DOCUMENTO DE IDENTIDAD"
              style={isDniWrong ? estilosError : null}
              styleImg={isDniWrong ? estilosImg : null}
              alert={"Escriba el DNI Correctamente"}
              styleAlert={isDniWrong ? estilosAlert : null}
            ></FormularioInputs>
          </li>
          <li>
            <FormularioInputs
              valor={handleUpdate}
              type="text"
              name="NUMERO TOTAL DE CAJAS"
              style={isBoxesWrong ? estilosError : null}
              styleImg={isBoxesWrong ? estilosImg : null}
              alert={"Escriba el numero de Cajas"}
              styleAlert={isBoxesWrong ? estilosAlert : null}
            ></FormularioInputs>
          </li>
          <li>
            <FormularioInputs
              valor={handleUpdate}
              type="text"
              name="KILOS DE PRIMERA CLASE"
              style={isWrong ? estilosError : null}
              styleImg={isWrong ? estilosImg : null}
            ></FormularioInputs>
          </li>
        </ol>
        <ol>
          <li>
            <FormularioInputs
              valor={handleUpdate}
              type="text"
              name="KILOS DE SEGUNDA CLASE"
              style={isWrong ? estilosError : null}
              styleImg={isWrong ? estilosImg : null}
            ></FormularioInputs>
          </li>
          <li>
            <FormularioInputs
              valor={handleUpdate}
              type="text"
              name="TARA"
              style={isWrong ? estilosError : null}
              styleImg={isWrong ? estilosImg : null}
            ></FormularioInputs>
          </li>{" "}
          <li>
            <FormularioInputs
              valor={handleUpdate}
              type="text"
              name="NUMERO TOTAL KILOS"
              styleImg={isWrong ? estilosImg : null}
              style={isWrong ? estilosError : null}
              styleAlert={isWrong ? estilosAlert : null}
              alert={
                "El total de Kilos no coincide con la suma de kilos asignados a las clases de fruta y tara"
              }
            ></FormularioInputs>
          </li>
          <li>
            <FormularioInputs
              valor={handleUpdate}
              type="date"
              name="FECHA"
              styleImg={dateWrong ? estilosImg : null}
              style={dateWrong ? estilosError : null}
              styleAlert={dateWrong ? estilosAlert : null}
              alert={"Selecione una fecha"}
            ></FormularioInputs>
          </li>
          <li className="buttonList">
            {isReady ? null : <button type="submit">Crear PDF</button>}
          </li>
        </ol>
        <div className="identificador">
          <FormularioInputs
            valor={handleUpdate}
            type="text"
            name="NUMERO DE SOCIO"
            styleAlert={estilosAlert}
            alert={"*El numero de socio consta de 5 numeros"}
          ></FormularioInputs>
          
 
        </div>
      </form>
     {isReady ? (
        <div className="containerPdf">
        <PDFDownloadLink document={<PDFDocument dni={formdata.dni}
        nombre={formdata.nombre}
        totalKilos={formdata.totalKilos}
        tara={formdata.tara}
        kilosPrimera={formdata.kilosPrimera}
        kilosSegunda={formdata.kilosSegunda}
        numeroSocio={formdata.numeroSocio}
        fecha={formdata.fecha}/>} fileName="registro.pdf">
          <button
            className="buttonDescargarPdf"
            onClick={() =>
              setTimeout(() => {
                setIsReady(false);
                window.location.reload()
              }, 2000)
            }
          >
            Descargar PDF
          </button>
        </PDFDownloadLink>
        </div>
      ) : null}
    </>
  );
}
export default Form;
