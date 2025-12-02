import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";
import { URL_IMAGES_RESULTS, URL_IMAGES_RESULTSSMS } from "../../../helpers/Constants";

function AyudaResptaComprUno(props) {
    const router = useRouter();
    const [nivelAyuda, setNivelAyuda] = useState();

    let infoCompras = null;
    if (typeof window !== "undefined") {
        if (router.query.dato) {
            let dato = JSON.parse(router.query.dato);
            console.log("DATOWWW : ", dato);
            infoCompras = dato;
        } else {
        }
    }

    return (
        <div >
            <div className="textoayudacomprar">
                {infoCompras?.nombreniveldos}
            </div>
            <div className="imagenRespuestaDuda">
                <img src={URL_IMAGES_RESULTSSMS + infoCompras?.nombreimagen1}
                    alt=""
                />
            </div>

            <div>
                <p className="textoayudacomprar">Pasos detallados {infoCompras?.nombreniveldos}:</p>
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
        </div >
    )
}

export default AyudaResptaComprUno;