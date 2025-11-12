import React, { useEffect, useState, useRef } from "react";
import Rating from "~/components/elements/Rating";
import {
    Box,
    Grid,
    Button,
    useTheme,
    useMediaQuery,
    InputAdornment,
    InputBase,
    ImageList,
    ImageListItem

} from "@mui/material";
import SortByViewPrdSingle from "../../../partials/shop/modules/SortByViewPrdSingle";
import axios from "axios";
import Moment from "moment";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled as muiStyled } from '@mui/material/styles';
import { myNumber } from "~/utilities/ArrayFunctions";
import { URL_BD_MR } from "~/helpers/Constants";

const ModuleQualificationPrd = (product) => {
    const [listaCalificacionProducto, setListaCalificacionProducto] = useState([]);
    const [dataBase, setDataBase] = useState([]);
    const [prdVendidos, setprdVendidos] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [calificacionPrd, setCalificacionPrd] = useState(0);
    const [update, setUpdate] = useState(false);

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        //const fechaactual = Moment(datosusuario.fechacreacion).format("YYYY-MM-DD");
        const leerCalificacionProducto = async () => {
            let params = {
                producto: product.product.id,
            };

            const res = await axios({
                method: "post",
                url: URL_BD_MR +"48",
                params,
            })

            if (res.data.type == 1) {
                //console.log("DATA : ", res.data);
                setDataBase(
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
                setOrdenarPor(1);

            } else {
                console.log("Error leyendo calificación al Producto");
            }
        };
        leerCalificacionProducto();
    }, [product]);

    useEffect(() => {
        let ordenados = [];
       

        if (ordenarPor === 2) {
            // Fecha: más antigua a más reciente
            ordenados = [...dataBase].sort((a, b) => new Date(a.fechacreacion) - new Date(b.fechacreacion));
        }
        

        else if (ordenarPor === 1) {
            // Fecha: más reciente a más antigua
            ordenados = [...dataBase].sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion));
        }
    
        else if (ordenarPor === 4) {
            // Calificación: menor a mayor
            ordenados = [...dataBase].sort((a, b) => a.calificacion - b.calificacion);
        }
        else if (ordenarPor === 3) {
            // Calificación: mayor a menor
            ordenados = [...dataBase].sort((a, b) => b.calificacion - a.calificacion);
        }

        setListaCalificacionProducto(ordenados);
    }, [ordenarPor]);

    const [page, setPage] = useState(1);
    const cardsRef = useRef(null); // 
    const itemsPerPage = isMdDown ? 4 : 6;
    useEffect(() => {
        // Recupera el número de página del localStorage
        const pageselect = localStorage.getItem("pageselect");
        if (pageselect) {
            setPage(Number(pageselect));
        }
    }, [])

    const updateData = () => {
        setUpdate(!update);

        setTimeout(() => {
            setUpdate(!update);
        }, 3000);
    }

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
    let paginatedHistorial = listaCalificacionProducto.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="mlmenos23 pl-[30px] mtmenos30">
            <Grid container spacing={1}>
                <Grid item xs={12} md={12} lg={12}>
                    <Grid item xs={12} md={12} lg={12}>
                        <div className="boxdatasellerqualification" ref={cardsRef}>
                            <Grid container spacing={1} className="mb-[15px]">
                                <Grid item xs={12} md={12} lg={12}>
                                    <a className="tamañofuentetab text-[24px] colorbase">
                                        Calificación producto
                                    </a>
                                </Grid>
                            </Grid>
                            {calificacionPrd <= 1 ? (
                                <Grid container spacing={1} className="my-[15px]">
                                    <Grid item xs="auto" className="pr-[15px]"  >
                                        <div className="calificacionprdviewsingle">
                                            {myNumber(1, calificacionPrd, 1)}
                                        </div>
                                    </Grid>

                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog"></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingletot fa fa-cog"></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingletot fa fa-cog"></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingletot fa fa-cog"></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingletot fa fa-cog"></i>
                                    </Grid>
                                </Grid>
                            ) : calificacionPrd <= 2 ? (
                                <Grid container spacing={1}>
                                    <Grid item xs="auto" className="pr-[15px]"  >
                                        <div className="calificacionprdviewsingle">
                                            {myNumber(1, calificacionPrd, 1)}
                                        </div>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingletot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingletot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingletot fa fa-cog "></i>
                                    </Grid>
                                </Grid>
                            ) : calificacionPrd <= 3 ? (
                                <Grid container spacing={1}>
                                    <Grid item xs="auto" className="pr-[15px]"  >
                                        <div className="calificacionprdviewsingle">
                                            {myNumber(1, calificacionPrd, 1)}
                                        </div>
                                    </Grid>

                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingletot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingletot fa fa-cog "></i>
                                    </Grid>
                                </Grid>
                            ) : calificacionPrd <= 4 ? (
                                <Grid container spacing={1}>
                                    <Grid item xs="auto" className="pr-[15px]" >
                                        <div className="calificacionprdviewsingle">
                                            {myNumber(1, calificacionPrd, 1)}
                                        </div>
                                    </Grid>

                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingletot fa fa-cog "></i>
                                    </Grid>
                                </Grid>
                            ) : calificacionPrd <= 5 ? (
                                <Grid container spacing={1}>
                                    <Grid item xs="auto" className="pr-[15px]" >
                                        <div className="calificacionprdviewsingle">
                                            {myNumber(1, calificacionPrd, 1)}
                                        </div>
                                    </Grid>

                                    <Grid xs="auto" className="mr-[10px]" >
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]">
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]">
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]">
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                    <Grid xs="auto" className="mr-[10px]">
                                        <i className="ratingprdsingleviewtot fa fa-cog "></i>
                                    </Grid>
                                </Grid>
                            ) : (
                                <a className="calificacionproducto">
                                    No tiene calificaciones
                                </a>
                            )}
                            <Grid container className="ml-0">
                                <Grid item xs={12} md={12} lg={12}>
                                    <a className="promediocalificacionprd">
                                        {listaCalificacionProducto.length}{" "}
                                        Calificaciones
                                    </a>
                                </Grid>
                            </Grid>
                        </div>

                        <Grid container spacing={1} >
                            <Grid item xs={12} md={7} lg={7}>
                                <a className="textocomentarioscompradores">
                                    Comentarios de los usuarios
                                </a>
                            </Grid>
                            <Grid item xs={12} md={5} lg={5}>
                                <div className="mtmenos9"
                                    onClick={() => updateData()}
                                >
                                    <SortByViewPrdSingle
                                        setOrdenarPor={setOrdenarPor}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <div className="lineacalificacionvendedortres"></div>
                            </Grid>
                        </Grid>
                        {
                            console.log("DATAXXX : ", paginatedHistorial)
                        }

                        {
                            console.log("DATA2222 : ", ordenarPor)
                        }


                        {
                            paginatedHistorial &&
                            paginatedHistorial.map((item, index) => {
                                return (
                                    <div>
                                        {item.calificacion == 1 ? (
                                            <Grid container spacing={1} className="pl-[6px]">
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellertres fa fa-cog"></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfseller fa fa-cog"></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfseller fa fa-cog "></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfseller fa fa-cog "></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfseller fa fa-cog "></i>
                                                </Grid>
                                            </Grid>
                                        ) : item.calificacion == 2 ? (
                                            <Grid container spacing={1} className="pl-[6px]">
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">

                                                    <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>

                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">

                                                    <i className="ratingprdinfsellercuatronone fa fa-cog mt-4"></i>

                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">

                                                    <i className="ratingprdinfsellercinconone fa fa-cog mt-4"></i>

                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">

                                                    <i className="ratingprdinfseller fa fa-cog mt-4"></i>

                                                </Grid>
                                            </Grid>
                                        ) : item.calificacion == 3 ? (
                                            <Grid container spacing={1} className="pl-[6px]">
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">

                                                    <i className="ratingprdinfsellercinconone fa fa-cog mt-4 "></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">

                                                    <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                </Grid>
                                            </Grid>
                                        ) : item.calificacion == 4 ? (
                                            <Grid container spacing={1} className="pl-[6px]">
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfseller fa fa-cog mt-4 "></i>
                                                </Grid>
                                            </Grid>
                                        ) : item.calificacion == 5 ? (
                                            <Grid container spacing={1} className="pl-[6px]">
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellerdos fa fa-cog mt-4"></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">

                                                    <i className="ratingprdinfsellertres fa fa-cog mt-4"></i>

                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellercuatro fa fa-cog mt-4 "></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellercinco fa fa-cog mt-4 "></i>
                                                </Grid>
                                                <Grid xs="auto" className="mr-[10px]">
                                                    <i className="ratingprdinfsellerok fa fa-cog mt-4 "></i>
                                                </Grid>
                                            </Grid>
                                        ) : null}
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} md={7} lg={7}>
                                                <a className="textocomentarioscalificacion">
                                                    Comentarios de la
                                                    calificación
                                                </a>
                                            </Grid>
                                        </Grid>
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
                                                    ).format("YYYY-MM-DD")}
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
                                )
                            })
                        }

                    </Grid>
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

export default ModuleQualificationPrd;

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

