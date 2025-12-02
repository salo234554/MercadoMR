import React from "react";
import { Row, Col, Card, Tooltip, Overlay } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { IoIosInformationCircle, IoMdClose } from "react-icons/io";
import { Button } from "@mui/material";

function ModalInformacionSearch(props) {
    const {
        shown,
        close,
        textoTituloInformacion,
        textoUnoModalInformacion,
        textoDosModalInformacion,
    } = props;

    return shown ? (
        <div
            className="modal-fondo"
            onClick={() => {
                close();
            }}>
            <div className="modalmensajesMiu redondearventamensajes"
                onClick={(e) => {
                    e.stopPropagation();
                }}>
                <div className="mainModalMsj">
                    <div className="topModalMsjs">
                        <IoIosInformationCircle />
                        <p>{textoTituloInformacion}</p>
                        <IoMdClose onClick={close} className="Cursorpointer" />
                    </div>

                    <div className="modalTextoIntSeach">
                        <div className="msjModalMsjIntSearch mb-20">
                            <p>{textoUnoModalInformacion}</p>
                        </div>
                        <div className="msjModalMsjIntSearch">
                            <p>{textoDosModalInformacion}</p>
                        </div>
                    </div>

                    <div className="closeModalMsj">
                        <button 
                            className="closeButtonModalMsjIntSs"
                            onClick={() => close()}
                        >
                            Cerrar
                        </button>
                    </div> 
                </div> 
            </div>
        </div>
    ) : null;
}

export default ModalInformacionSearch;
