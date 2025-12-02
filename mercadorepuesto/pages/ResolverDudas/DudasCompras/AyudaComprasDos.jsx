import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";
import { URL_IMAGES_RESULTS, URL_IMAGES_RESULTSSMS } from "../../../helpers/Constants";

function AyudaComprasDos(props) {
    const router = useRouter();
    const [indicesAleatorios, setIndicesAleatorios] = useState([]);
    const [nivelAyuda, setNivelAyuda] = useState();
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

    const obtenerDatos = async (nombreniveluno) => {
        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "116",
            });
            // Si nombreniveluno es null, retorna todos los datos
            if (!nombreniveluno) {
                return res.data.resolverdudasdos;
            }
            // Si nombreniveluno no es null, filtra los datos
            return res.data.resolverdudasdos.filter(dato => dato.nombreniveluno === nombreniveluno);
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
                    <p className="textoayudacomprar">1. Registrarse o iniciar sesión:</p>
                    <p className="textoayudacomprar2">
                        Si aún no tienes una cuenta en Mercado Libre, regístrate con tu correo electrónico y una contraseña. Si ya tienes una cuenta, inicia sesión con tu correo electrónico y contraseña.
                    </p>
                    <p className="textoayudacomprar">2. Buscar el producto:</p>
                    <p className="textoayudacomprar2"></p>
                    <p className="textoayudacomprar2">
                        Utiliza el buscador en la página principal o en las categorías para encontrar el producto que buscas. También puedes filtrar los resultados por precio, disponibilidad, vendedor, etc.
                    </p>
                    <p className="textoayudacomprar">3. Verificar el producto:</p>
                    <p className="textoayudacomprar2">
                        Una vez que encuentres el producto, haz clic en él para ver la descripción, las especificaciones, las imágenes y las opiniones de otros compradores. Asegúrate de que el producto cumple con tus necesidades y que el vendedor tiene buena reputación.
                    </p>
                    <p className="textoayudacomprar">4. Comprar el producto:</p>
                    <p className="textoayudacomprar2">
                        Si el producto cumple con tus necesidades, haz clic en el botón "Comprar".
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

export default AyudaComprasDos;