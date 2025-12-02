import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import { useNavigate } from "react-router-dom";
import { Router } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { IoMdReturnRight } from "react-icons/io";
import ModalMensajes from "../mensajes/ModalMensajes";
import { FaCheckCircle } from "react-icons/fa";
import CtlrInputData from "../CtlrInputData";
import { getCtlrLongCadena } from "~/store/ctlrlongcadena/action";

export default function OtraPreg() {
    //Consts measured, 80% and in md 100%.
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();
    const Router = useRouter();
    //PosiciónTopPage
    const irA = useRef(null);
    const { nombreImagen, nombreProducto, uidcomprador, uidvendedor, idproducto } = router.query;
    const [comentario, setComentario] = useState('');
    const [inputDataCtlr, setInputDataCtlr] = useState(null);

    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [emailVendedor, setEmailVendedor] = useState(null);
    const ctlrlongcadena = useSelector((state) => state.ctlrlongcadena.ctlrlongcadena);

    const [confirmationOpen, setConfirmationOpen] = useState(false); //Modal de confirmación si ingresó los datos
    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    //console.log('uidcomprador:', uidcomprador);
    //console.log('uidvendedor:', uidvendedor);
    //console.log('idproducto:', idproducto);

    // Nueva validación para palabras no permitidas
    const palabrasProhibidas = ["www", "carrera", "avenida", "#", "N°", "@", ".com", ".co", ".net", "contactanos", "contacto", "llama", "llamar", "telefono", "celular", "movil", "email", "gmail"];

    const validarComentario = () => {
        // Verifica que el comentario no esté vacío
        if (comentario.length === 0) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Tu mensaje está vacío. Por favor, escribe tu pregunta.');
            setShowModal(true);
            return false;
        }

        // Verifica que el comentario no sea demasiado largo
        if (comentario.length > 130) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas.');
            setShowModal(true);
            return false;
        }

        // Verifica que el comentario no contenga palabras prohibidas
        for (let palabra of palabrasProhibidas) {
            if (comentario.toLowerCase().includes(palabra)) {
                setTituloMensajes('Validación de mensaje');
                setTextoMensajes('Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas.');
                setShowModal(true);
                return false;
            }
        }

        // Verifica que el comentario no contenga 5 números seguidos
        const numerosSeguidos = comentario.match(/\d{5,}/);
        if (numerosSeguidos) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Por tu seguridad y la de tu compra, te recomendamos no incluir datos de contacto dentro de tus preguntas.');
            setShowModal(true);
            return false;
        }

        return true;
    };

    useEffect(() => {
        const leerDatosUsuario = async () => {
            let params = {
                usuario: uidcomprador,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });

                //console.log("UIDSSSS: ", res.data);
                setEmailVendedor(res.data[0].email)

            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };

        leerDatosUsuario();
    }, [uidcomprador]);

    const enviarPregunta = async () => {
        if (!validarComentario()) {
            return;
        }

        const idpregunta = Math.floor(Math.random() * 10000000); // Genera un número aleatorio de hasta 7 dígitos

        let params = {
            idprd: idproducto, // Reemplaza esto con el idprd correspondiente
            uidcomprador: uidcomprador,
            uidvendedor: uidvendedor,
            idpregunta: idpregunta.toString(),
            comentario: comentario,
            estado: 80
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "51", // Reemplaza esto con la URL correcta
                params,
            });

            // Aquí puedes manejar la respuesta del servidor
            console.log(res.data);
            if (res.data.type == 1) {
                confirmarCrearCuenta();
            }

            // Muestra el diálogo de confirmación
            setConfirmationOpen(true);

        } catch (error) {
            console.error("Error al enviar la pregunta", error);
        }
    };

    function confirmarCrearCuenta() {
        //alert("entre")
        //console.log("DATXX : ", datosToken)
        //return
        let mensaje = "Pregunta relacionada con el producto : " + nombreProducto + ", " + comentario;
        const dataCreaUsr = {
            "remitente": emailVendedor,
            "asunto": "¡MENSAJE DEL COMPRADOR!",
            "plantilla": "info",
            "to": "Mercado Repuesto",
            "contenido_html": {
                "title": "Pregunta comprador",
                "subtitle": "Recibiste un mensaje del comprador",
                "body": mensaje,
                "tipo": "01"
            }
        };

        const config = {
            headers: {
                "Authorization": "$2y$10$hc8dShHM0E71/08Tcjq3nOdq.hCmOcn5mEH5a/UZ9Lk0eBptD8CeG",
                "Content-Type": "application/json" || x < z
            }
        };

        const sendMessage = async () => {
            try {
                const response = await axios.post("https://mercadorepuesto.gimcloud.com/api/endpoint/mail", dataCreaUsr, config);
                console.log(response.data);
            } catch (error) {
                console.error('Errorxx:', error);
            }
        }
        sendMessage();
    }

    //router push si los datos son colocados correctamente sale esto en el dialog
    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };

    useEffect(() => {
        sessionStorage.setItem("urlVerPregRealiz", Router.pathname)
        localStorage.setItem('cameFromPregRealiz', 'true');
    }, []);

    const handleComentarioChange = (event) => {
        const nuevoComentario = event.target.value.slice(0, 180); // Limitar a 180 caracteres

        window.addEventListener("keydown", (event) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (event.code == "Space") {
                dispatch(getCtlrLongCadena(false));
            }
        });

        window.addEventListener("keydown", (event) => {
            /* El código "Space" representa la pulsación de la barra espaciadora */
            if (event.code == "Backspace" && ctlrlongcadena) {
                dispatch(getCtlrLongCadena(false));
            }
        });

        if (event.target.value.length <= 180) {

            if (ctlrlongcadena) {
                setTituloMensajes("Revisar Datos");
                setTextoMensajes("Tienes palabras con una longitud mayor a 23 caracteres!");
                setShowModal(true);

                dispatch(getCtlrLongCadena(false));
                let newcadena = comentario.substring(0, comentario.length - 2);
                setInputDataCtlr(newcadena + " ");
                setComentario(newcadena + " ");
            } else {
                if (event.target.value.length > 23)
                    event.target.value.substring(0, 23);
                setInputDataCtlr(event.target.value);
                setComentario(event.target.value);
            }

        }
    };

    return (
        <div ref={irA}>
            <div>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"></div>
                            <div className="ps-page__content ps-account">
                                <div className="infoLeftMsjVendedor">
                                    <div className="MaininfoLeftMsjVendedorImgOtt">
                                        <div className="infoLeftMsjVendedorImg">
                                            <img src={`${URL_IMAGES_RESULTS}${nombreImagen}`} alt={nombreProducto} onClick={() => router.push(`/product/${idproducto}`)} />
                                        </div>
                                        <div className="infoLeftMsjVendedorData">
                                            <h4 onClick={() => router.push(`/product/${idproducto}`)}>
                                                {nombreProducto}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                                <Grid container spacing={2}>
                                    <Grid className="subcprinccalific" item xs={12} sm={8} md={7} sx={{ width: isMdDown ? '100%' : '90%' }} flexDirection={'column'}>
                                        <div className='titleTproblemaPregRealz'>
                                            <p>Preguntar al vendedor</p>
                                        </div>
                                        <Grid className="MainContOtraPreg" item xs={12} md={12} sx={{ width: isMdDown ? '100%' : '90%' }} flexDirection={'column'} >
                                            <div className="OtraPregContainer">
                                                <p className="titleOtraPregContainer">Escribe tu pregunta para el vendedor aquí</p>
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={comentario}
                                                        onChange={(e) => handleComentarioChange(e)}
                                                    />
                                                    <button onClick={enviarPregunta}>
                                                        Enviar
                                                    </button>
                                                </div>
                                                <div className="textOtraPreg">
                                                    <p>
                                                        * Recuerda que para poder seguir siendo tu apoyo en el proceso de compra debes abstenerte de escribir información de contacto como telefono, direcciones, correos electrónicos, entre otros.
                                                    </p>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container className="contInfoProdComprCalifOttt none600px" item xs={12} sm={4} md={5}>
 
                                            <Grid item xs={12} md={4} className="contImgRighCalifOtraPreg none600px" mt={'2rem'}>
                                                <img src={`${URL_IMAGES_RESULTS}${nombreImagen}`} alt={nombreProducto} onClick={() => router.push(`/product/${idproducto}`)} />
                                            </Grid> 
                                            <Grid item xs={12} md={8} className="continfocalifimg none600px" flexDirection={'column'}>
                                                <p className="pNameProductCalif" onClick={() => router.push(`/product/${idproducto}`)}>{nombreProducto}</p>
                                            </Grid>
 

                                    </Grid>


                                    <ModalMensajes
                                        shown={showModal}
                                        close={handleModalClose}
                                        titulo={tituloMensajes}
                                        mensaje={textoMensajes}
                                        tipo="error"
                                    />
                                    <Dialog
                                        className='dialogDatsGuardados'
                                        open={confirmationOpen}
                                        PaperProps={{
                                            style: {
                                                width: isMdDown ? '80%' : '35%',
                                                backgroundColor: 'white',
                                                border: '2px solid gray',
                                                padding: '1.4rem',
                                                borderRadius: '10px'
                                            },
                                        }}
                                    >
                                        <DialogTitle className='dialogtitleDtsGUardados' >
                                            <FaCheckCircle size={37} style={{ color: '#10c045', marginLeft: '-17px', marginRight: '8px' }} />
                                            <p className='dialogtituloP'>Pregunta enviada con exito!</p>
                                        </DialogTitle>
                                        <DialogContent className='dialogContentDatsGuardados'>
                                            <p className='PdialogContent'>Tu pregunta fue enviada con exito.</p>
                                        </DialogContent>
                                        <DialogActions className='DialogActionsDatsGuardados'>
                                            <div className='div1buttonDialog' >
                                                <button className='button2DialogDatsGuardados' onClick={handleConfirmationSuccess('./preguntasRealizadasPorUsuario')} >
                                                    Ir a mis preguntas
                                                </button>
                                            </div>
                                            <div className='div1buttonDialog' >
                                                <button className='button1DialogDatsGuardados' onClick={handleConfirmationSuccess('/')} >
                                                    Ir al inicio
                                                </button>
                                            </div>
                                        </DialogActions>
                                    </Dialog>


                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <CtlrInputData
                datainput={inputDataCtlr}
            />
        </div>
    )
}