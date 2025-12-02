import React, { useEffect, useState, useRef } from "react";
import Rating from "~/components/elements/Rating";
import { Box, Grid, Button, useTheme, useMediaQuery } from "@mui/material";
import SortBySearchInteractiveSeller from "../../../partials/shop/modules/SortBySearchInteractiveSeller";
import axios from "axios";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../../helpers/Constants";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled as muiStyled } from '@mui/material/styles';

const ModuleDetailSeller = (props) => {
    const { product } = props;
    const [listaCalificacionVendedor, setListaCalificacionVendedor] = useState(
        []
    );
    const [prdVendidos, setprdVendidos] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [calificacionPrd, setCalificacionPrd] = useState(0);
    const [datosUsuarios, setDatosUsuarios] = useState("");
    const [undVendidas, setUndVendidas] = useState(0);
    const [ubicacion, setUbicacion] = useState("");
    const [tiempoComoVendedor, setTiempoComoVendedor] = useState("");

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

    //const datosusuarios = useSelector((state) => state.userlogged.userlogged);


    //Función para obtener, nombre de vendedor, número de ventas y tiempo como vendedor
    useEffect(() => {
        const obtenerDatosVendedor = async () => {

            let params = {
                uidvendedor: product.usuario,
            };
            try {
                console.log(
                    "Enviando solicitud a endPoint 106 con params: ",
                    params
                );
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "106",
                    params,
                });
                console.log("Respuesta recibida del endPoint 106: ", res.data);

                // Mapeo de los datos
                if (res.data && res.data.listarmisventas) {
                    // Asumiendo que todos los objetos son ventas del mismo vendedor

                    setUndVendidas(res.data.listarmisventas.length);
                    //const vendedor = res.data.listarmisventas[0];
                    // Asumiendo que vendedor.uid es "1652703118227"

                    const ultimoCincoDigitos = product.usuario.slice(-7);
                    //setNombreVendedor(ultimoCincoDigitos);
                }
            } catch (error) {
                console.error(
                    "Error al leer los datos del vendedor en endPoint 106",
                    error
                );
                // Maneja el error según tus necesidades
            }
        };
        obtenerDatosVendedor();
    }, [product]);

    //Función para calcular el tiempo que lleva como vendedor
    useEffect(() => {
        const fechaCreacionVendedor = async () => {

            let params = {
                usuario: product.usuario,
            };
            try {
                console.log(
                    "Enviando solicitud a tuEndPoint con params: ",
                    params
                );
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                console.log("Respuesta 13: ", res.data);

                if (res.data && res.data.length > 0) {
                    const fechaCreacion = Moment(
                        res.data[0].fechacreacion,
                        "YYYY-MM-DD HH:mm:ss"
                    );

                    if (fechaCreacion.isValid()) {
                        const fechaActual = Moment();
                        const diferenciaEnDias = fechaActual.diff(
                            fechaCreacion,
                            "days"
                        );

                        if (diferenciaEnDias < 365) {
                            setTiempoComoVendedor(`${diferenciaEnDias} días`);
                        } else {
                            const duracion = Moment.duration(
                                diferenciaEnDias,
                                "days"
                            );
                            const years = duracion.years();
                            const remainingDays = duracion.days();

                            setTiempoComoVendedor(
                                `${years} año${years !== 1 ? "s" : ""
                                } y ${remainingDays} día${remainingDays !== 1 ? "s" : ""
                                }`
                            );
                        }
                    } else {
                        console.error("La fecha de creación no es válida.");
                    }
                } else {
                    console.error(
                        "No se encontraron datos del usuario en tuEndPoint."
                    );
                }
            } catch (error) {
                console.error(
                    "Error al leer los datos del usuario en tuEndPoint",
                    error
                );
                // Maneja el error según tus necesidades
            }
        };

        fechaCreacionVendedor();
    }, [product]);


    useEffect(() => {
        const leerCalificacionVendedor = async () => {
            //console.log("PRODUCTO XXXX: ", product)
            let params = {
                uidvendedor: product.usuario,
                uidproducto: product.id,
            };

            //console.log("params: ", params);

            const res = await axios({
                method: "post",
                url:  URL_BD_MR + "50",
                params,
            });

            if (res.data.type == 1) {
                setListaCalificacionVendedor(
                    res.data.listarcalificacionvendprd
                );
                let ventas = res.data.listarcalificacionvendprd.length;
                //console.log("DAT VENTAS: ", ventas);
                setprdVendidos(ventas);

                let totcalificacion = 0;
                res.data.listarcalificacionvendprd &&
                    res.data.listarcalificacionvendprd.map((row, index) => {
                        totcalificacion =
                            parseInt(totcalificacion) +
                            parseInt(row.calificacion);
                    });

                let calprd =
                    totcalificacion /
                    res.data.listarcalificacionvendprd.length;
                //console.log("TOT CALF: ", totcalificacion)
                //console.log("CALIF CEBEDE: ", res.data.listarcalificacionvendprd)
                if (isNaN(calprd)) setCalificacionPrd(0);
                else setCalificacionPrd(calprd);
            } else {
                console.log("Error leyendo calificación al vendedor");
            };
        };
        leerCalificacionVendedor();

        const leerDatosUsuario = async () => {
            let params = {
                usuario: product.usuario,
            };

            const res = await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            })

            if (res.data.type == 1) {
                //console.log("DAT USER XXX: ", res.data);
                setDatosUsuarios(res.data[0]);
            } else {
                console.error("Error al leer los datos del usuario");
            };
        };

        leerDatosUsuario();

        const prdVendidos = async () => {
            let params = {
                uidvendedor: product.usuario,
            };

            const res = await axios({
                method: "post",
                url: URL_BD_MR + "159",
                params,
            });

            if (res.data.type == 1) {
                //console.log("PRD VENDIDOS XXX: ", res.data);
                setUndVendidas(res.data[0].productosvendidos);
            } else {
                console.error("Error al leer los datos del usuario");
            };
        };

        prdVendidos();

        let direccionusuario = localStorage.getItem("direccionenvio");

        if (direccionusuario.length > 0) {
            console.log("DIRECCC : ", direccionusuario)
            direccionusuario = JSON.parse(
                localStorage.getItem("direccionenvio")
            );
        }
        let datubicacion =
            direccionusuario.nombreciudad + " - " + direccionusuario.nombre_dep;
        setUbicacion(datubicacion);
    }, []);

    useEffect(() => {
        if (ordenarPor == 1) {
            let ordenafecha = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenafecha.push(row.id);
                });

            let ordenado = ordenafecha.sort((b, a) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.id) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 2) {
            let ordenafecha = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenafecha.push(row.id);
                });

            let ordenado = ordenafecha.sort((a, b) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.id) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 3) {
            let ordenacalificacion = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenacalificacion.push(row.calificacion);
                });

            let ordenado = ordenacalificacion.sort((b, a) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.calificacion) {
                                result.push(item);
                            }
                        });
                });

            //console.log("ORDENADO MAYOR : ", result);

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 4) {
            let ordenacalificacion = [];

            listaCalificacionVendedor &&
                listaCalificacionVendedor.map((row, index) => {
                    ordenacalificacion.push(row.calificacion);
                });

            let ordenado = ordenacalificacion.sort((a, b) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionVendedor &&
                        listaCalificacionVendedor.map((item, index) => {
                            if (row == item.calificacion) {
                                result.push(item);
                            }
                        });
                });
            //console.log("ORDENADO MENOR : ", result);

            setListaCalificacionVendedor(result);
            //console.log("DATOS : ", result);
        }
    }, [ordenarPor]);


    const [page, setPage] = useState(1);
    const cardsRef = useRef(null); // 
    const itemsPerPage = isMdDown ? 6 : 20;
    useEffect(() => {
        // Recupera el número de página del localStorage
        const pageselect = localStorage.getItem("pageselect");
        if (pageselect) {
            setPage(Number(pageselect));
        }
    }, [])

    // Lógica de paginación
    const handleChange = (event, value) => {
        setPage(value);
        localStorage.setItem("pageselect", value);
        if (cardsRef.current) {
            cardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const totalPages = Math.ceil(listaCalificacionVendedor.length == 0 ?
        1 : listaCalificacionVendedor.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedHistorial = listaCalificacionVendedor.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4.1} >
                    <div className="boxdataseller textosellerdos">
                        {
                            console.log("XXXXX : ",product)
                        }
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <h3 className="textoseller">
                                    Vendedor : {product.nombrevendedor}{" "}{product.apellidovendedor}
                                    {datosUsuarios.primerapellido}
                                </h3>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                Tiempo como vendedor:{" "}
                                <b>{tiempoComoVendedor}</b>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                Número de ventas: {undVendidas}
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                Ubicación : {ubicacion}
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                <Grid item xs={12} md={7} >
                    <div className="cajacalificacionvendedor  mt-20">
                        <Grid item xs={12} md={12} lg={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12} lg={12}>
                                    <a className=" tamañofuentetab colorbase !text-[24px]">
                                        Calificación del vendedor
                                    </a>
                                </Grid>
                            </Grid>
                            <Grid container alignItems={"center"} className="my-[15px]">
                                <Grid item xs="auto" className="pr-[15px]">
                                    <a className="tamañoCalificacionvendedor">
                                        {calificacionPrd}
                                    </a>
                                </Grid>
                                <Grid item xs={9} className="!mt-[15px]">
                                    {calificacionPrd >= 1 && calificacionPrd < 2 ? (
                                        <Grid container >
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellerdos1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdnoselect1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdnoselect2 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdnoselect3 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdnoselect fa fa-cog"></i>
                                            </Grid>
                                        </Grid>
                                    ) : calificacionPrd >= 2 &&
                                        calificacionPrd < 3 ? (
                                        <Grid container spacing={1}>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellerdos1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellertres1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdnoselect2 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdnoselect3 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdnoselect fa fa-cog"></i>
                                            </Grid>
                                        </Grid>
                                    ) : calificacionPrd >= 3 &&
                                        calificacionPrd < 4 ? (
                                        <Grid container spacing={1}>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellerdos1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellertres1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellercuatro1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdnoselect3 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdnoselect fa fa-cog"></i>
                                            </Grid>
                                        </Grid>
                                    ) : calificacionPrd >= 4 &&
                                        calificacionPrd < 5 ? (
                                        <Grid container spacing={1}>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellerdos1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellertres1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellercuatro1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellercinco1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdnoselect fa fa-cog"></i>
                                            </Grid>
                                        </Grid>
                                    ) : calificacionPrd >= 5 ? (
                                        <Grid container spacing={1}>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellerdos1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellertres1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellercuatro1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellercinco1 fa fa-cog"></i>
                                            </Grid>
                                            <Grid xs="auto" className="mr-[10px]">
                                                <i className="ratingprdinfsellerseis1 fa fa-cog"></i>
                                            </Grid>
                                        </Grid>
                                    ) : null}
                                </Grid>
                            </Grid>

                            <Grid contain spacing={1} >
                                <Grid item xs={12} md={12} lg={12}>
                                    <a className="tamañofuentetab colorbase text-[24px]">
                                        {prdVendidos} Calificaciones
                                    </a>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                spacing={1}
                                className=" mtmenos5">
                                <Grid item xs={12} >
                                    <a className="textocomentarioscompradores">
                                        Comentarios de los compradores
                                    </a>
                                </Grid>
                                <Grid item xs={12} >
                                    <SortBySearchInteractiveSeller
                                        setOrdenarPor={setOrdenarPor}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="lineacalificacionvendedordos"></div>
                                </Grid>
                            </Grid>

                            {listaCalificacionVendedor &&
                                listaCalificacionVendedor.length > 0
                                ? listaCalificacionVendedor &&
                                listaCalificacionVendedor.map(
                                    (item, index) => {
                                        return (
                                            <div className="py-[10px]">
                                                {item.calificacion >= 1 &&
                                                    item.calificacion < 2 ? (
                                                    <Grid
                                                        container
                                                        className="!ml-[1px]"
                                                        spacing={1}>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdnoselect2 fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdnoselect1 fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdnoselect4 fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdnoselect5 fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                    </Grid>
                                                ) : item.calificacion >= 2 &&
                                                    item.calificacion < 3 ? (
                                                    <Grid
                                                        container
                                                        className="!ml-[1px]"
                                                        spacing={1}>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellercuatronone fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellercinconone fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfseller fa fa-cog mt-4"></i>
                                                        </Grid>
                                                    </Grid>
                                                ) : item.calificacion >= 3 &&
                                                    item.calificacion < 4 ? (
                                                    <Grid
                                                        container
                                                        className="!ml-[1px]"
                                                        spacing={1}>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellercinconone fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                    </Grid>
                                                ) : item.calificacion >= 4 &&
                                                    item.calificacion < 5 ? (
                                                    <Grid
                                                        container
                                                        className="!ml-[1px]"
                                                        spacing={1}>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                    </Grid>
                                                ) : item.calificacion >= 5 ? (
                                                    <Grid
                                                        container
                                                        className="!ml-[1px]"
                                                        spacing={1}>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                        <Grid
                                                            xs="auto" className="mr-[10px]">
                                                            <i className="ratingprdinfsellerok fa fa-cog mt-4 "></i>
                                                        </Grid>
                                                    </Grid>
                                                ) : null}

                                                <Grid container spacing={1}>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={12}
                                                        lg={12}>
                                                        <div className="textocomentarioscompradoresdos">
                                                            {item.comentario}
                                                        </div>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={12}
                                                        lg={12}>
                                                        <div className="textocomentarioscompradorestres">
                                                            {Moment(
                                                                item.fechacreacion
                                                            ).format(
                                                                "YYYY-MM-DD"
                                                            )}
                                                        </div>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={12}
                                                        lg={12}>

                                                    </Grid>
                                                </Grid>
                                            </div>
                                        );
                                    }
                                )
                                : null}
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Stack spacing={2} alignItems="center" mt={2}>
                <StyledPagination
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </div>
    );
};

export default ModuleDetailSeller;

const StyledPagination = muiStyled(Pagination)(({ theme }) => ({
    '& .MuiPaginationItem-root': {
        border: "none",
        backgroundColor: 'transparent', // Sin fondo por defecto
        color: '#2D2E83', // Color azul para los números no seleccionados
        borderRadius: '0', // Sin borde redondeado para los números no seleccionados
        width: '32px',
        height: '32px',
        minWidth: '32px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        '&.Mui-selected': {
            backgroundColor: '#2D2E83', // Fondo azul para el número seleccionado
            color: 'white', // Texto blanco en el número seleccionado
            borderRadius: '50%', // Bordes redondeados en la página seleccionada
            fontWeight: 'bold', // Hacerlo más destacado
        },
        [theme.breakpoints.down('sm')]: {
            width: '26px',
            height: '26px',
            minWidth: '26px',
            fontSize: '1rem',
        },
    },
    '& .MuiPaginationItem-ellipsis': {
        backgroundColor: 'transparent', // Sin fondo en elipsis
        color: '#2D2E83', // Color azul para elipsis
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            width: '26px',
            height: '26px',
            fontSize: '0.75rem',
        },
    },
    // Estilos para los botones "previous" y "next"
    '& .MuiPaginationItem-previousNext': {
        backgroundColor: 'transparent',
        color: '#2D2E83', // azul
        borderRadius: '0', // sin círculos
        fontSize: '1.7rem', // tamaño más grande
        minWidth: 'auto',
        width: 'auto',
        height: 'auto',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.4rem',
        },
    },
}));

