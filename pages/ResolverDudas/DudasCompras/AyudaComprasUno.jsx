import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";
import { URL_IMAGES_RESULTS, URL_IMAGES_RESULTSSMS, URL_BD_MR } from "../../../helpers/Constants";
import axios from "axios";
import { AiOutlineRight } from 'react-icons/ai';
import { GrNext } from "react-icons/gr";

function AyudaComprasUno(props) {
    const router = useRouter();
    const [nivelAyuda, setNivelAyuda] = useState();
    const [indicesAleatorios, setIndicesAleatorios] = useState([]);
    const [datos, setDatos] = useState([]);

    let infoCompras = null;
    if (typeof window !== "undefined") {
        if (router.query.dato) {
            let dato = JSON.parse(router.query.dato);
            console.log("DATOXX : ", dato);
            infoCompras = dato;
        } else {
        }
    }

    const { dato } = router.query;
    const datoParsed = dato ? JSON.parse(dato) : true;


    // Luego, en el efecto de React, pasa el valor de nombreniveluno a la función
    useEffect(() => {
        const obtenerYSeleccionarDatos = async () => {
            // Si la página se recarga, pasa null a obtenerDatos
            const datosObtenidos = await obtenerDatos(null);
            console.log("datosObtenidos : ", datosObtenidos)
            setDatos(datosObtenidos);

            let indices = [];
            if (datosObtenidos.length >= 3) {
                while (indices.length < 3) {
                    let indice = Math.floor(Math.random() * datosObtenidos.length);
                    if (!indices.includes(indice)) {
                        indices.push(indice);
                    }
                }
            }
            setIndicesAleatorios(indices);
        };

        obtenerYSeleccionarDatos();
    }, []);

    const obtenerDatos = async (nombreniveldos) => {
        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "116",
            });
            // Si nombreniveluno es null, retorna todos los datos
            if (!nombreniveldos) {
                return res.data.resolverdudasdos;
            }
            // Si nombreniveluno no es null, filtra los datos
            return res.data.resolverdudasdos.filter(dato => dato.nombreniveldos === nombreniveldos);
        } catch (error) {
            console.error("Error al leer los datos", error);
            return [];
        }
    };

    return (
        <div >

            <div
                className="modalayudacomprar"
            >
                <div className="textoayudacomprar">
                    {infoCompras?.descripcionniveluno}
                </div>
                <div className="imagenRespuestaDuda">
                    <img src={URL_IMAGES_RESULTSSMS + infoCompras?.nombreimagen1}
                        alt=""
                    />

                </div>

                <div>
                    <p className="textoayudacomprar">Pasos detallados:</p>

                    <div className="flex mt-[20px] justify-center ">
                        {
                            //datoParsed?.linkpdf ?
                            datoParsed ?
                                <a className="linkmensajesayuda"
                                    href={URL_IMAGES_RESULTSSMS + datoParsed?.linkpdf}
                                    target="_blank"
                                >
                                    Ir al documento
                                </a>
                                :
                                null
                        }
                    </div>
                    <p className="textoayudacomprar">1. Cómo y cuándo calificar al vendedor:</p>
                    <p className="textoayudacomprar2">
                        Tienes 7 días a partir de recibir la compra, para calificar y puedes hacerlo desde tu listado de Compras.
                    </p>
                    <p className="textoayudacomprar">2. Por que debes calificar al venedor:</p>
                    <p className="textoayudacomprar2">
                        A través de tu calificación, sabremos si tuviste algún problema con la compra y te ayudaremos a resolverlo. Por eso, califica después de recibir y revisar el producto (no antes), o cuando hayan pasado algunos días y estés seguro de que la compra no se concretará
                    </p>
                    <p className="textoayudacomprar">3. Verificar el producto:</p>
                    <p className="textoayudacomprar2">
                        Una vez que encuentres el producto, haz clic en él para ver la descripción, las especificaciones, las imágenes y las opiniones de otros compradores. Asegúrate de que el producto cumple con tus necesidades y que el vendedor tiene buena reputación.
                    </p>
                </div>
            </div>
            {/*Otras dudas relacionadas contenedor */}
            <div className="sobreComprarDudas sobreMiCuentaCont">
                <div className="contTitulo ">
                    <p>Te podría interesar</p>
                </div>
                {indicesAleatorios.map((indice, i) => {
                    // Verifica si el dato existe antes de intentar acceder a nombreniveldos
                    const dato = datos[indice];
                    if (!dato) {
                        return null; // Retorna null o algún componente de relleno
                    }

                    let className = "contTitulosDudas";
                    if (i === 0) {
                        className += " startContDudas"; // Agrega la clase al primer elemento
                    } else if (i === indicesAleatorios.length - 1) {
                        className += " endContDudas"; // Agrega la clase al último elemento
                    }
                    return (
                        <div key={indice}
                            onClick={() => {
                                router.replace({
                                    pathname: `./RespuestaCompras`,
                                    query: { dato: JSON.stringify(dato) }
                                })
                            }} className={className}>
                            <p>{dato.nombreniveldos}</p>
                            <AiOutlineRight size={27} />
                            {
                                //.then(() => window.location.reload());
                            }
                        </div>
                    );
                })}
            </div>
        </div >
    )
}

export default AyudaComprasUno;