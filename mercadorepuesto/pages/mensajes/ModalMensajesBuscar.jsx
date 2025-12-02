import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { getEditData } from "../../store/editdata/action";
import { getEditDataFind } from "../../store/editdatafind/action";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import SearchInteractiveEdit from "../searchinteractive/searchinteractiveedit";
import { IoMdClose, IoMdInformationCircle } from "react-icons/io";



function ModalMensajesBuscar(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const {
        shown,
        close,
        titulo,
        mensaje,
        setEditarBuscador,
        editarDatos,
        setIsLoading,
        setHabilitarIcono,
        setDatosFaltantes,
    } = props;
    const [clicAqui, setClicAqui] = useState(false);

    useEffect(() => {
        setEditarBuscador("col-md-1 posiciontres");
        dispatch(getEditDataFind(editarDatos));
        let editdata = {
            editar: true,
        };
        //setEditarBuscador("col-md-1 posicionuno");
        dispatch(getEditData(editdata));
    }, [editarDatos]);

    const regresarAlBuscador = () => {
        //localStorage.setItem("editardatosbuscador", JSON.stringify(editarDatos));
        dispatch(getEditDataFind(editarDatos));
        let editdata = {
            editar: true,
        };
        setEditarBuscador("col-md-1 posicionuno");
        dispatch(getEditData(editdata));
        router.push("/searchinteractive/searchinteractive");
        //location.reload();
    };

    useEffect(() => {
        if (clicAqui) {
            setEditarBuscador("col-md-1 posiciontres");
            dispatch(getEditDataFind(editarDatos));
            let editdata = {
                editar: true,
            };
            setClicAqui(false);
            dispatch(getEditData(editdata));
            router.push("/searchinteractive/searchinteractive");
        }
    }, [clicAqui]);

    const cerrar = () => {
        let editar = {
            editarCombustible: false,
            editarTraccion: false,
            editarTransmision: false,
            editarCilindraje: false,
        };

        dispatch(getEditDataFind(editar));
        close(false);
    };

    return shown ? (
        <div
            className="modal-fondo" 
        >
            <div
                className="modal-mensajes-buscar-edit-searchh redondearventamensajes "
                onClick={(e) => { 
                    e.stopPropagation(); 
                }}> 
                <div className="topModalBsucIntEdit">
                    <span className="infoModalBsucIntEdit">
                        <IoMdInformationCircle />
                    </span>
                    <p>{titulo}</p>
                    <span className="closeModalBsucIntEdit" onClick={() => cerrar(false)}>
                        <IoMdClose />
                    </span>
                </div>
                <div className="msjModalEditInt">
                    <p>{mensaje}</p>
                </div> 
                <SearchInteractiveEdit
                    close={close}
                    setIsLoading={setIsLoading}
                    setClicAqui={setClicAqui}
                    setHabilitarIcono={setHabilitarIcono}
                    setDatosFaltantes={setDatosFaltantes}
                />
            </div>
        </div>
    ) : null;
}

export default ModalMensajesBuscar;
