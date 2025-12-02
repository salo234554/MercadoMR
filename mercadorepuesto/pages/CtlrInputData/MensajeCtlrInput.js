import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "~/components/layouts/Container";
import ModalMensajes from "../mensajes/ModalMensajes";

const MensajeCtlrInput = ({ datainput }) => {
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    useEffect(() => {
        setShowModalMensajes(true);
        setTituloMensajes("Revisar Datos");
        setTextoMensajes("Tienes palabras con una longitud mayor a 23 caracteres!");
        return;
    }, []);

    return (
        <div>
            <ModalMensajes
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />
        </div>
    );
};

export default MensajeCtlrInput;