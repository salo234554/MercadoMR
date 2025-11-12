import React, { useEffect, useState, useRef } from "react";
import Rating from "~/components/elements/Rating";
import { Box, Grid, Button, useTheme, useMediaQuery, } from "@mui/material";
//import SortByViewPrdSingle from "../../../partials/shop/modules/SortByViewPrdSingle";
import SortByViewPrdSingle from "../../components/partials/shop/modules/SortByViewPrdSingle";
import axios from "axios";
import Moment from "moment";
import ContainerPrd from "../../components/layouts/ContainerPrd";
import { useRouter } from "next/router";
import { getUserMenuPrimary } from "../../store/usermenuprimary/action";
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled as muiStyled } from '@mui/material/styles';

function CalificacionPrd(props) {

    const router = useRouter();
    const dispatch = useDispatch();
    const [listaCalificacionProducto, setListaCalificacionProducto] = useState(
        []
    );
    const [prdVendidos, setprdVendidos] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [calificacionPrd, setCalificacionPrd] = useState(0);

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

    let product = 0;
    let imagen = "";
    let titulo = "";

    if (typeof window !== "undefined") {
        if (router.query.product) {
            product = JSON.parse(router.query.product);
            imagen = router.query.imagen;
            titulo = router.query.titulo;
        }
    }
        useEffect(() => {
            sessionStorage.setItem("urlCalificacion", router.pathname)
            localStorage.setItem('cameFromCalificacionPage', 'true');
        }, []);

    useEffect(() => {
        //const fechaactual = Moment(datosusuario.fechacreacion).format("YYYY-MM-DD");
        dispatch(getUserMenuPrimary(false));
        const leerCalificacionProducto = async () => {
            let params = {
                producto: product,
            };

            //console.log("PRODUCTO : ", params);
            await axios({
                method: "post",
                url: URL_BD_MR + "48",
                params,
            })
                .then((res) => {
                    //console.log("DATA : ", res.data);
                    setListaCalificacionProducto(
                        res.data.listarcalificacionprd
                    );

                    let totcalificacion = 0;
                    res.data.listarcalificacionprd &&
                        res.data.listarcalificacionprd.map((row, index) => {
                            totcalificacion =
                                parseInt(totcalificacion) +
                                parseInt(row.calificacion);
                        });
                    if (res.data.listarcalificacionprd.length > 0) {
                        let calprd =
                            totcalificacion /
                            res.data.listarcalificacionprd.length;
                        setCalificacionPrd(calprd);
                    } else setCalificacionPrd(0);

                    //let ventas = res.data.listarcalificacionprd.length;
                    //setprdVendidos(ventas);
                })
                .catch(function (error) {
                    console.log("Error leyendo calificación al Producto");
                });
        };
        leerCalificacionProducto();
    }, [product]);

    useEffect(() => {
        dispatch(getUserMenuPrimary(false));
        if (ordenarPor == 1) {
            let ordenafecha = [];

            listaCalificacionProducto &&
                listaCalificacionProducto.map((row, index) => {
                    ordenafecha.push(row.id);
                });

            let ordenado = ordenafecha.sort((b, a) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionProducto &&
                        listaCalificacionProducto.map((item, index) => {
                            if (row == item.id) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionProducto(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 2) {
            let ordenafecha = [];

            listaCalificacionProducto &&
                listaCalificacionProducto.map((row, index) => {
                    ordenafecha.push(row.id);
                });

            let ordenado = ordenafecha.sort((a, b) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionProducto &&
                        listaCalificacionProducto.map((item, index) => {
                            if (row == item.id) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionProducto(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 3) {
            let ordenacalificacion = [];

            listaCalificacionProducto &&
                listaCalificacionProducto.map((row, index) => {
                    ordenacalificacion.push(row.calificacion);
                });

            let ordenado = ordenacalificacion.sort((b, a) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionProducto &&
                        listaCalificacionProducto.map((item, index) => {
                            if (row == item.calificacion) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionProducto(result);
            //console.log("DATOS : ", result);
        } else if (ordenarPor == 4) {
            let ordenacalificacion = [];

            listaCalificacionProducto &&
                listaCalificacionProducto.map((row, index) => {
                    ordenacalificacion.push(row.calificacion);
                });

            let ordenado = ordenacalificacion.sort((a, b) => {
                return a - b;
            });

            let result = [];
            ordenado &&
                ordenado.map((row, index) => {
                    listaCalificacionProducto &&
                        listaCalificacionProducto.map((item, index) => {
                            if (row == item.calificacion) {
                                result.push(item);
                            }
                        });
                });

            setListaCalificacionProducto(result);
            //console.log("DATOS : ", result);
        }
    }, [ordenarPor]);

    const [page, setPage] = useState(1);
    const cardsRef = useRef(null); // 
    const itemsPerPage = isMdDown ? 4 : 8;
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

    const totalPages = Math.ceil(listaCalificacionProducto.length == 0 ?
        1 : listaCalificacionProducto.length / itemsPerPage);

    const startIndex = (page - 1) * itemsPerPage;
    const paginatedHistorial = listaCalificacionProducto.slice(startIndex, startIndex + itemsPerPage);

    return (
        <ContainerPrd>
            <div className="cajacalificacionprd">
                <Grid container spacing={1}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Grid item xs={12} md={12} lg={12}>
                            <div className="boxdatasellerqualification pl-[15px]">
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <a className="tamañofuentetab colorbase">
                                            Calificación producto
                                        </a>
                                    </Grid>
                                </Grid>
                                {calificacionPrd > 0 ? (
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} md={12} lg={12}>
                                            <div className="tituloimagenescalificacionprd">
                                                {titulo}
                                            </div>
                                        </Grid>

                                        <Grid item xs="auto">
                                            <div className="cajaimagenpost124">
                                                {
                                                    <a
                                                    //href={`/product/${product.id}`}
                                                    //as={`/product/${product.id}`}
                                                    >
                                                        <img
                                                            className="cajaimagencalificacionprd"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                "/" +
                                                                imagen
                                                            }
                                                            alt="First slide"
                                                        />
                                                        {
                                                            //badges(product)
                                                        }
                                                    </a>
                                                }
                                            </div>
                                        </Grid>

                                        <Grid item xs="auto" className="mr-[10px]"  >
                                            <div className="calificaciontotprd">
                                                {calificacionPrd}
                                            </div>
                                            <div className="cajacalificacionespromedioprd">
                                                {listaCalificacionProducto.length}{" "}
                                                Calificaciones
                                            </div>
                                        </Grid>

                                        <Grid item xs="auto" className="mr-[10px]" >
                                            {calificacionPrd > 0 ? (
                                                <i className="calificacionprdtotal fa fa-cog"></i>
                                            ) : (
                                                <i className="calificacionprdtotal3 fa fa-cog"></i>
                                            )}
                                        </Grid>
                                        <Grid  item xs="auto" className="mr-[10px]" >
                                            <div >
                                                {calificacionPrd > 1 ? (
                                                    <i className="calificacionprdtotal fa fa-cog"></i>
                                                ) : (
                                                    <i className="calificacionprdtotal3 fa fa-cog"></i>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item xs="auto" className="mr-[10px]" >
                                            <div >
                                                {calificacionPrd > 2 ? (
                                                    <i className="calificacionprdtotal fa fa-cog"></i>
                                                ) : (
                                                    <i className="calificacionprdtotal3 fa fa-cog"></i>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid  item xs="auto" className="mr-[10px]" >
                                            <div >
                                                {calificacionPrd > 3 ? (
                                                    <i className="calificacionprdtotal fa fa-cog"></i>
                                                ) : (
                                                    <i className="calificacionprdtotal3 fa fa-cog"></i>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item xs="auto" className="mr-[10px]" >
                                            <div >
                                                {calificacionPrd > 4 ? (
                                                    <i className="calificacionprdtotal fa fa-cog"></i>
                                                ) : (
                                                    <i className="calificacionprdtotal3 fa fa-cog"></i>
                                                )}
                                            </div>
                                        </Grid>

                                    </Grid>
                                ) : (
                                    <a className="calificacionproducto">
                                        No tiene calificaciones
                                    </a>
                                )}
                            </div>
                            <Grid container spacing={1} >
                                <Grid item xs={12} md={12} lg={12}>

                                </Grid>
                            </Grid>

                            <div className="mt-30"></div>


                            <Grid
                                container
                                spacing={1}
                                className="ml-1 ">
                                <Grid item xs={12} md={7} lg={7}>
                                    <a className="textocomentarioscompradores">
                                        Comentarios de los usuarios
                                    </a>
                                </Grid>
                                <Grid item xs={8} md={5} lg={5}>
                                    <div className="mtmenos10">
                                        <SortByViewPrdSingle
                                            setOrdenarPor={setOrdenarPor}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <div className="lineacalificacionprd"></div>
                                </Grid>
                            </Grid>

                            {paginatedHistorial.length > 0
                                ? paginatedHistorial &&
                                  paginatedHistorial.map(
                                      (item, index) => {
                                          return (
                                              <div >
                                                  {item.calificacion == 1 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <div>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </div>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion == 2 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <i className="ratingcalificacionprd fa fa-cog"></i>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion == 3 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <i className="ratingcalificacionprd fa fa-cog"></i>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion == 4 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <i className="ratingcalificacionprd fa fa-cog"></i>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd1 fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                      </Grid>
                                                  ) : item.calificacion == 5 ? (
                                                      <Grid
                                                          container
                                                          spacing={1}>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <i className="ratingcalificacionprd fa fa-cog"></i>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog"></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                          <Grid item
                                                              xs="auto" className="mr-[10px]" >
                                                              <a>
                                                                  <i className="ratingcalificacionprd fa fa-cog "></i>
                                                              </a>
                                                          </Grid>
                                                      </Grid>
                                                  ) : null}
                                                  <Grid container spacing={1} className="pl-[18px]">
                                                      <Grid
                                                          item
                                                          xs={12}
                                                          md={7}
                                                          lg={7}>
                                                          <a className="textocomentarioscalificacion">
                                                              Comentarios de la
                                                              calificación
                                                          </a>
                                                      </Grid>
                                                  </Grid>
                                                  <Grid container spacing={1} className="pl-[10px]">
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
                                                          <div className="lineacalificacionvendedor"></div>
                                                      </Grid>
                                                  </Grid>
                                              </div>
                                          );
                                      }
                                  )
                                : null}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Stack spacing={2} alignItems="center" mt={2}>
                <StyledPagination
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    shape="rounded"
                />
            </Stack>
        </ContainerPrd>
    );
}

export default CalificacionPrd;


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
