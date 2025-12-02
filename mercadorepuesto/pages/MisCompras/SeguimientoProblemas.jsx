import Container from "../../components/layouts/Container";
import { Dialog, Grid, useMediaQuery, useTheme } from "@mui/material";

import { Table, TableHead, TableBody, TableCell, TableContainer } from "@mui/material";
import { TableRow, Paper } from "@mui/material";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import firebase from "../../utilities/firebase";
import { getAuth, signOut } from "firebase/auth";
import {
    URL_BD_MR,
    URL_IMAGES_RESULTS,
    URL_IMAGES_RESULTSSMS,
} from "../../helpers/Constants";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";

export default function SeguimientoProblemas() {
    const router = useRouter();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const irA = useRef(null);
    const [messages, setMessages] = useState([]);
    const [zoomImgUno, setZoomImgUno] = useState("imageresultsms");
    const [zoomImgDos, setZoomImgDos] = useState("imageresultsms");
    const [zoomImgTres, setZoomImgTres] = useState("imageresultsms");
    const [zoomImgCuatro, setZoomImgCuatro] = useState("imageresultsms");
    const [zoomImgCinco, setZoomImgCinco] = useState("imageresultsms");

    const [arrayNotificacion, setArrayNotificacion] = useState([]);
    const [arrayNotificacionAll, setArrayNotificacionAll] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [userData, setUserData] = useState(null);

    // Función para abrir el diálogo con la imagen seleccionada
    const handleClickOpen = (image) => {
        setSelectedImage(image);
        setOpenDialog(true);
    };

    // Función para cerrar el diálogo
    const handleClose = () => {
        setOpenDialog(false);
    };

    let datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const rowsPerPage = 10;

    // Avoid a layout jump when reaching the last page with empty rows.
    let page;
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayNotificacion?.length) : 0;

    const imgImgUnoAmpliar = async () => {
        setZoomImgUno("imageresultsms zoomproblem");
    };

    const imgImgUnoDisminuir = async () => {
        setZoomImgUno("imageresultsms");
    };

    const imgImgDosAmpliar = async () => {
        setZoomImgDos("imageresultsms zoomproblem");
    };

    const imgImgDosDisminuir = async () => {
        setZoomImgDos("imageresultsms");
    };

    const imgImgTresAmpliar = async () => {
        setZoomImgTres("imageresultsms zoomproblem");
    };

    const imgImgTresDisminuir = async () => {
        setZoomImgTres("imageresultsms");
    };

    const imgImgCuatroAmpliar = async () => {
        setZoomImgCuatro("imageresultsms zoomproblem");
    };

    const imgImgCuatroDisminuir = async () => {
        setZoomImgCuatro("imageresultsms");
    };

    const imgImgCincoAmpliar = async () => {
        setZoomImgCinco("imageresultsms zoomproblem");
    };

    const imgImgCincoDisminuir = async () => {
        setZoomImgCinco("imageresultsms");
    };

    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let producto = null;
    let uiduser = null;
    let origen = false;
    let ctlredirigir = null;

    if (typeof window !== "undefined") {

        if (router.query.origen) {
            const auth = getAuth(firebase);
            signOut(auth).then(() => {
                console.log("Sesión Cerrada")
            }).catch((error) => {
                console.log("Error Cerrando Sesión")
            });

            producto = JSON.parse(router.query.producto);
            uiduser = JSON.parse(router.query.uidcomprador);
            origen = JSON.parse(router.query.origen);
            //console.log("UDICOMPRA  : ", router.query.uidcomprador)

            // Guardar los datos en el almacenamiento local
            localStorage.setItem("producto", JSON.stringify(producto));
        } else if (router.query.producto) {
            //datosusuarios = useSelector((state) => state.userlogged.userlogged);
            producto = JSON.parse(router.query.producto);
            ctlredirigir = JSON.stringify("0246810"),
                //console.log("PRODDAAAA  : ", producto);
                // Guardar los datos en el almacenamiento local
                localStorage.setItem("producto", JSON.stringify(producto));
        } else {
            // Recuperar los datos del almacenamiento local
            //datosusuarios = useSelector((state) => state.userlogged.userlogged);
            const data = localStorage.getItem("producto");
            if (data) {
                producto = JSON.parse(data);
            }
        }
    }

    console.log("PRD191 : ", producto)

    const HistorialDevolucion = (datapqr) => {
        const datauser = JSON.parse(localStorage.getItem("datauser"));
        setUserData(datauser);

        console.log("Error leyendo mensajes:", messages);

        //console.log("PRSASA : ", producto.idproducto)

        if (datauser && messages) {
            const leerNotificacionesActivas = async () => {

                let idorigen = 0;
                messages &&
                    messages?.map((item, index) => {
                        if (item?.idproducto == producto?.idproducto) {
                            idorigen = item?.idmicompra;
                        }
                    });

                console.log("ITEMXXX: ", idorigen)

                //console.log("USER ID:", params);
                const leerData = async () => {

                    let params = {
                        uidusuario: datauser?.uid,
                        idorigen: idorigen,
                        tiponotificacion: 2
                    }

                    await axios({
                        method: "post",
                        url: URL_BD_MR + "292",
                        params,
                    })
                        .then((res) => {
                            if (res?.data?.type === 1) {

                                let datanotificacion = res?.data?.listarnotificaciones;

                                let array = [];
                                datanotificacion &&
                                    datanotificacion.map((item, index) => {
                                        //console.log("NOTIFI ACTIVAS:", item);
                                        if (item?.uidusuario == datauser?.uid) {
                                            array.push(item);
                                        }
                                    });

                                const compare = (b, a) => {
                                    if (a.fechacreacion < b.fechacreacion) {
                                        return -1;
                                    }
                                    if (a.fechacreacion > b.fechacreacion) {
                                        return 1;
                                    }
                                    return 0;
                                };

                                if (array.length > 0) array.sort(compare);

                                setArrayNotificacion(array);
                                setArrayNotificacionAll(array);
                            } else if (res.data.type === 0 || res.data === "ERROR de notificaciones") {
                                console.error("Error notificaciones activas:", res.data);
                            } else {
                                console.error("Respuesta inesperada notificaciones activas:", res.data);
                            }
                        })
                        .catch(function (error) {
                            console.error("Error petición notificaciones activas:", error);
                        });
                }

                leerData();
            };

            leerNotificacionesActivas();
        };

        //console.log("XXXXXXX: ", array);
    }

    useEffect(() => {
        HistorialDevolucion();
    }, [messages])

    // Función para leer mensajes
    const leerMensajes = async () => {
        let params = null;

        if (!datosusuarios)
            origen = true;

        if (origen) {
            params = {
                estado: 81,
                idcomprador: uiduser,
            };
        } else
            if (ctlredirigir) {
                params = {
                    estado: 81,
                    idcomprador: producto.uidcomprador,
                };
            } else {
                params = {
                    estado: 81,
                    idcomprador: datosusuarios.uid,
                };
            }

        //console.log("PARAMS:", params);

        try {
            const response = await axios({
                method: "post",
                url: `${URL_BD_MR}291`,
                params,
            });

            const mensajes = response.data.listardevoluciones;

            console.log("Respuesta 291:", mensajes);
            //console.log("Respuesta Mensajes:",response.data.listardevoluciones);
            // Obtener el nombre y apellido del usuario para cada mensaje
            const mensajesConNombres = await Promise.all(
                mensajes.map(async (mensaje) => {
                    if (mensaje?.idaprobacioncompra == producto?.numerodeaprobacion) {
                        //console.log("291 ZZZZZ : ", mensaje?.idaprobacioncompra)
                        const {
                            nombreUsuario,
                            SegundoNombreUsuarioC,
                            correo,
                            primerApellidoComprador,
                            segundoApellidoComprador,
                            teléfonoComprador,
                        } = await obtenerNombreUsuario(mensaje?.usuariocompra);
                        return {
                            ...mensaje,
                            nombreUsuario,
                            SegundoNombreUsuarioC,
                            correo,
                            primerApellidoComprador,
                            segundoApellidoComprador,
                            teléfonoComprador,
                        };
                    }
                })
            );

            // Ordenar los mensajes por fecha de creación
            const mensajesOrdenados = mensajesConNombres.sort(
                (b, a) => new Date(a.fechacreacion) - new Date(b.fechacreacion)
            );

            // Actualizar el estado con los mensajes recibidos
            setMessages(mensajesOrdenados);
        } catch (error) {
            console.error("Error leyendo mensajes:", error);
        }
    };

    // Efecto para cargar mensajes al montar y actualizar
    useEffect(() => {
        leerMensajes();
    }, [uiduser]);

    // Función para obtener el nombre y apellido del usuario
    async function obtenerNombreUsuario(uidcomprador) {
        let params = {
            usuario: uidcomprador,
        };

        try {
            const res = await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            });

            const nombreUsuario = res.data[0].primernombre;
            const SegundoNombreUsuarioC = res.data[0].segundonombre;
            const primerApellidoComprador = res.data[0].primerapellido;
            const segundoApellidoComprador = res.data[0].segundoapellido;
            const correo = res.data[0].email;
            const teléfonoComprador = res.data[0].celular;
            return {
                nombreUsuario,
                SegundoNombreUsuarioC,
                correo,
                primerApellidoComprador,
                segundoApellidoComprador,
                teléfonoComprador,
            };
        } catch (error) {
            console.error("Error al obtener el nombre del usuario", error);
        }
    }

    //TopPage
    useEffect(() => {
        setTimeout(() => {
            irA.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    }, []);

    return (
        <>
            <div ref={irA}>
                <div>
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <div className="titleTproblema">
                                        <p>Seguimiento de mi problema</p>
                                    </div>

                                    {messages &&
                                        messages.map((mensaje) => (
                                            <div>
                                                {mensaje?.idproducto ==
                                                    producto.idproducto ? (
                                                    <div className="divverproblemasusuarios">
                                                        <div className="divSeguProblemasProduct">
                                                            <span>
                                                                <p>Producto</p>
                                                            </span>
                                                            <div className="divProductoMobile">
                                                                <div className="divProductoMobileImg">
                                                                    <img
                                                                        src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`}
                                                                    />
                                                                </div>
                                                                <div className="divProductoMobileImgInfo">
                                                                    <h3>{producto.nombreProducto}</h3>
                                                                    <p>Unidades compradas: {producto.cantidad}</p>
                                                                    <p>Número de compra: {producto.numerodeaprobacion}</p>
                                                                    <p>{producto.fechacompra}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Grid
                                                            container
                                                            spacing={1}>
                                                            <Grid
                                                                item
                                                                xs={isMdDown ? 12 : 6} // Ajuste condicional del tamaño del Grid
                                                                md={6}
                                                                lg={6}>
                                                                <div className="datasProblPersonas">
                                                                    <p className="datasProblPersonasP">
                                                                        Fecha de
                                                                        la
                                                                        solicitud: {mensaje?.fechasolicitud
                                                                            .toString()
                                                                            .slice(
                                                                                0,
                                                                                10
                                                                            )}
                                                                    </p>
                                                                </div>
                                                                <div className="datasProblPersonas">
                                                                    <p className="datasProblPersonasP">
                                                                        ID
                                                                        solicitud: {
                                                                            mensaje?.idmensaje
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="datasProblPersonas">
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            1
                                                                        }>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                            md={
                                                                                12
                                                                            }
                                                                            lg={
                                                                                12
                                                                            }>
                                                                            {
                                                                                <div className="textosolicitados mt-5">
                                                                                    Aquí
                                                                                    podrás
                                                                                    ver
                                                                                    el
                                                                                    estado
                                                                                    de
                                                                                    la
                                                                                    gestión
                                                                                    de
                                                                                    tu
                                                                                    solicitud,
                                                                                    cuando
                                                                                    haya
                                                                                    una
                                                                                    respuesta
                                                                                    tambien
                                                                                    la
                                                                                    podrás
                                                                                    ver
                                                                                    aquí
                                                                                </div>
                                                                            }
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }>
                                                                            <div className="botonrespuestavende">
                                                                                {
                                                                                    mensaje?.estadosolicitud
                                                                                }
                                                                            </div>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <div className="datasProblPersonas">
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            1
                                                                        }>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                            md={
                                                                                12
                                                                            }
                                                                            lg={
                                                                                12
                                                                            }>
                                                                            <div className="textosolicita mt-5">
                                                                                Descripción
                                                                                de
                                                                                mi
                                                                                problema:
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                            md={
                                                                                6
                                                                            }
                                                                            lg={
                                                                                6
                                                                            }>
                                                                            <p className="textocomentarioproblema">
                                                                                {
                                                                                    mensaje?.comentario
                                                                                }
                                                                            </p>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                                <div className="datasProblPersonas3">
                                                                    <p className="datasProblPersonasP2">
                                                                        Fotos
                                                                        agregadas:
                                                                    </p>
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            1
                                                                        }>
                                                                        <Grid
                                                                            item
                                                                            xs={2}
                                                                            md={2}
                                                                            lg={2}>
                                                                            {mensaje?.nombreimagen1 ? (
                                                                                <img
                                                                                    className={zoomImgUno}
                                                                                    src={URL_IMAGES_RESULTSSMS + mensaje?.nombreimagen1}
                                                                                    alt="First slide"
                                                                                    onClick={() => handleClickOpen(URL_IMAGES_RESULTSSMS + mensaje?.nombreimagen1)} // Añadir onClick para abrir el diálogo
                                                                                />
                                                                            ) : null}
                                                                        </Grid>

                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                2
                                                                            }
                                                                            md={
                                                                                2
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }>
                                                                            {mensaje?.nombreimagen2 ? (
                                                                                <img
                                                                                    className={zoomImgUno}
                                                                                    src={URL_IMAGES_RESULTSSMS + mensaje?.nombreimagen2}
                                                                                    alt="First slide"
                                                                                    onClick={() => handleClickOpen(URL_IMAGES_RESULTSSMS + mensaje?.nombreimagen2)} // Añadir onClick para abrir el diálogo
                                                                                />
                                                                            ) : null}
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                2
                                                                            }
                                                                            md={
                                                                                2
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }>
                                                                            {mensaje?.nombreimagen3 ? (
                                                                                <img
                                                                                    className={zoomImgUno}
                                                                                    src={URL_IMAGES_RESULTSSMS + mensaje?.nombreimagen3}
                                                                                    alt="First slide"
                                                                                    onClick={() => handleClickOpen(URL_IMAGES_RESULTSSMS + mensaje?.nombreimagen3)} // Añadir onClick para abrir el diálogo
                                                                                />
                                                                            ) : null}
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                2
                                                                            }
                                                                            md={
                                                                                2
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }>
                                                                            {mensaje?.nombreimagen4 ? (
                                                                                <img
                                                                                    className={zoomImgUno}
                                                                                    src={URL_IMAGES_RESULTSSMS + mensaje?.nombreimagen4}
                                                                                    alt="First slide"
                                                                                    onClick={() => handleClickOpen(URL_IMAGES_RESULTSSMS + mensaje?.nombreimagen4)} // Añadir onClick para abrir el diálogo
                                                                                />
                                                                            ) : null}
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                2
                                                                            }
                                                                            md={
                                                                                2
                                                                            }
                                                                            lg={
                                                                                2
                                                                            }>
                                                                            {mensaje?.nombreimagen5 ? (
                                                                                <img
                                                                                    className={zoomImgUno}
                                                                                    src={URL_IMAGES_RESULTSSMS + mensaje?.nombreimagen5}
                                                                                    alt="First slide"
                                                                                    onClick={() => handleClickOpen(URL_IMAGES_RESULTSSMS + mensaje?.nombreimagen5)} // Añadir onClick para abrir el diálogo
                                                                                />
                                                                            ) : null}
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </Grid>
                                                            <div className="mtmenos20 none900px">
                                                                <Grid
                                                                    item
                                                                    xs={4}
                                                                    md={4}
                                                                    lg={4}>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                        md={12}
                                                                        lg={12}>
                                                                        <div className="titleTproblemaPto">
                                                                            <p>
                                                                                Producto
                                                                            </p>
                                                                        </div>
                                                                    </Grid>
                                                                    <div className="mtmenos20">
                                                                        <Grid
                                                                            container
                                                                            spacing={
                                                                                1
                                                                            }
                                                                            className="productCompradoCuatro">
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    5
                                                                                }
                                                                                md={
                                                                                    5
                                                                                }
                                                                                lg={
                                                                                    5
                                                                                }
                                                                                className="imageresultproblema">
                                                                                <img
                                                                                    src={`${URL_IMAGES_RESULTS}${producto.nombreImagen}`}
                                                                                />
                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    7
                                                                                }
                                                                                md={
                                                                                    7
                                                                                }
                                                                                lg={
                                                                                    7
                                                                                }>
                                                                                <Grid className="subContMiscompras">
                                                                                    <p className="tituloprdproblema">
                                                                                        {
                                                                                            producto.nombreProducto
                                                                                        }
                                                                                    </p>
                                                                                    <div className="divNcompraDos">
                                                                                        <p className="UnidCompradasdos">
                                                                                            Unidades
                                                                                            compradas: {
                                                                                                producto.cantidad
                                                                                            }

                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="divNcompraDos">
                                                                                        <p className="UnidCompradasdos">
                                                                                            {" "}
                                                                                            Número
                                                                                            de
                                                                                            compra: {
                                                                                                producto.numerodeaprobacion
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                    <p className="dateCompra">
                                                                                        {
                                                                                            producto.fechacompra
                                                                                        }
                                                                                    </p>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="divhistorialdevol none760px">
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <div className="textotitulopqr">Historial de la Devolución</div>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <TableContainer
                                            component={Paper}
                                            sx={{
                                                boxShadow: "none",
                                            }}
                                        >
                                            <Table
                                                aria-label="custom pagination table"
                                                className="dark-table tableSeguProblema"
                                            >
                                                <TableHead
                                                    sx={{
                                                        "& th": {
                                                            color: "#2D2E83",
                                                            fontSize: "14px",
                                                            backgroundColor: "#F1F2F6",
                                                        },
                                                    }}>
                                                    <TableRow>
                                                        <TableCell
                                                            sx={{
                                                                width: "100px",
                                                            }}>
                                                            Fecha
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                width: "700px",
                                                            }}>
                                                            Descripción
                                                        </TableCell>

                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {arrayNotificacion &&
                                                        arrayNotificacion.map((row, index) => (
                                                            <TableRow key={row.id}>
                                                                <TableCell
                                                                    style={{
                                                                        width: '250px',
                                                                        borderBottom: "1px solid #F7FAFF",
                                                                        fontSize: "14px",
                                                                        padding: "10px",
                                                                        paddingLeft: '18px',
                                                                        color: '#2D2E83',
                                                                    }}
                                                                >
                                                                    {row.fechacreacion}
                                                                </TableCell>
                                                                <TableCell
                                                                    style={{
                                                                        width: '500px',
                                                                        borderBottom: "1px solid #F7FAFF",
                                                                        fontSize: "14px",
                                                                        padding: "10px",
                                                                        paddingLeft: '15px',
                                                                        color: '#2D2E83',
                                                                    }}
                                                                >
                                                                    {row.comentario}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}

                                                    {emptyRows > 0 && (
                                                        <TableRow style={{ height: 53 * emptyRows }}>
                                                            <TableCell
                                                                colSpan={3}
                                                                style={{ borderBottom: "1px solid #F7FAFF" }}
                                                            />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </div>

                            <div className="newTableSeguiProblemas">
                                <CardsWrapper>
                                    {arrayNotificacion &&
                                        arrayNotificacion.map((row, index) => (
                                            <Card key={row.id}>
                                                <Row>
                                                    <Label>Fecha:</Label>
                                                    <Value>{row?.fechacreacion}</Value>
                                                </Row>
                                                <Row>
                                                    <Label>Descripción:</Label>
                                                    <Value>{row?.comentario}</Value>
                                                </Row>
                                            </Card>
                                        ))}
                                </CardsWrapper>
                            </div>


                        </div>
                    </Container>
                </div >
            </div >

            <Dialog open={openDialog} onClose={handleClose}>
                <div className="dialogImageContainer">
                    <img src={selectedImage} alt="Imagen ampliada" style={{ maxWidth: "100%", maxHeight: "80vh" }} />
                    <button className="dialogCloseButton" onClick={handleClose}>
                        <IoIosClose />
                    </button>
                </div>
            </Dialog>
        </>
    );
}



const CardsWrapper = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Card = styled.div`
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
`;

const Row = styled.div`
    display: flex; 
    margin-bottom: 0.5rem;
    gap: 1rem;
    align-items: center;
`;

const Label = styled.div`
    font-weight: bold;
    color: #2D2E83; 
`;

const Value = styled.div` 
    word-break: break-word;
    color: #2D2E83;
    font-size: 14px;
    .icon {
        font-size: 20px;
        color: #2D2E83;
        cursor: pointer;
    }
`;