import React, { useEffect, useState, useRef } from "react";
import ShopSearchInterative from "~/components/partials/shop/ShopSearchInterative";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroupInteractive from "~/hooks/useProductGroupInteractive";
import ShopInteractivoHeader from "../search/shopinteractivoheader";

import { getUbicarProducto } from "../../store/ubicarproducto/action";
import { getNumberPages } from "../../store/numberpages/action";
import { getPageSelect } from "../../store/pageselect/action";
import { getFilterSearchInteractive } from "../../store/filtersearchinteractive/action";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import CustomPaginationSearch from "../../components/elements/basic/CustomPaginationSearch";
import ShopSearchInterativeItems from "../../components/partials/shop/ShopSearchInterativeItems";
import ShopSearchInterativeItemsNoPage from "../../components/partials/shop/ShopSearchInterativeItemsnopage";
import { Box, Grid, Button, item, ImageList, ImageListItem } from "@mui/material";
import Link from "next/link";
import { myNumber } from "../../utilities/ArrayFunctions"
import { URL_IMAGES_RESULTS } from "../../helpers/Constants"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled as muiStyled } from '@mui/material/styles';

const breadcrumb = [
    {
        id: 1,
        text: "Home",
        url: "/",
    },
    {
        id: 2,
        text: "Shop",
    },
];

let data = [];
let dataPrdtItems = [];
let dataPrdtItemsAll = [];
let dataGenericos = [];

const ShopScreen = (props) => {
    const {
        setOptionSelect,
        optionSelect,
        maximizarOption,
        setMaximizarOption,
        zoom,
        setZoom,
    } = props;

    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

    const isXs = useMediaQuery(theme.breakpoints.only('xs')); // <600px
    const isSm = useMediaQuery(theme.breakpoints.only('sm')); // 600px - 899px
    const isMd = useMediaQuery(theme.breakpoints.only('md')); // 900px - 1199px
    const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // >=900px

    let colsProducts = 2; // Por defecto, md o menos

    if (isMdUp) {
        colsProducts = 3; // md o más es 2
    }

    let colsProducts2 = 3; // Por defecto, sm o menos

    if (isXs) {
        colsProducts2 = 2; // Solo xs es 2
    }


    //console.log("TIPO DISPLAY : ", optionSelect);
    //console.log("DISPLAY MAXIMIZAR: ", maximizarOption);
    const router = useRouter();
    const { loading, productItems, getProducts } = useGetProducts();
    const [mostrarZoom, setMostrarZoom] = useState("mt-15");
    const [ajustarCaja, setAjustarCaja] = useState("ps-layout__right");
    const [datos, setDatos] = useState([]);
    const [actualiza, setActualiza] = useState(false);
    const [palabra, setPalabra] = useState("a");

    const [registrosPorPagina, setRegistrosPorPagina] = useState(14);
    const [datosBuscar, setDatosBuscar] = useState(null);
    const [orderPrice, setOrderPrice] = useState(null);

    const [products, setProducts] = useState([]);
    const [productsgen, setProductsgen] = useState([]);

    const [itemIni, setitemIni] = useState(1);
    const [itemFin, setItemFin] = useState(40);
    const [numeroPaginas, setNumeroPaginas] = useState(0);

    const { withGrid, withList } = useProductGroupInteractive();
    const dispatch = useDispatch();
    const Router = useRouter();
    const { query } = Router;

    let itemsIni = 0;
    let itemsFin = registrosPorPagina;

    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    const filtersearch = useSelector(
        (state) => state.filtersearch.filtersearch
    );

    const paginaselect = useSelector(
        (state) => state.pageselect.pageselect
    );

    const [page, setPage] = useState(1);
    const cardsRef = useRef(null); // 
    const itemsPerPage = isMdDown ? 6 : 8;

    // Lógica de paginación
    const handleChange = (event, value) => {
        paginarPrd(value);
        setPage(value);
        localStorage.setItem("pageselect", value);
        if (cardsRef.current) {
            cardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    let totPrd = [...products, products];

    const totalPages = Math.ceil(dataPrdtItems.length == 0 ?
        1 : dataPrdtItems.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    let paginatedHistorial = dataPrdtItems.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        localStorage.setItem("esgenerico", JSON.stringify(false));
        if (optionSelect == 1) setAjustarCaja("ml-2 ps-layout__right");
        else setAjustarCaja("ml-8 ps-layout__right");

        let dat = JSON.parse(localStorage.getItem("dataselectsearch"));

        let data = dat.nombremarca + " " + dat.nombremodelo;

        let keyword1 = data.toLowerCase();
        let keyword2 = keyword1.replace(",", "");

        let datfind = keyword2;
        const queries = {
            name_contains: keyword2,
        };

        getProducts(queries);
    }, [optionSelect]);

    useEffect(() => {
        dispatch(getUbicarProducto(maximizarOption));

        if (maximizarOption != 0)
            setMostrarZoom("maximizarbusquedaitems mt-15");
        else setMostrarZoom("mt-15");
    }, [optionSelect, maximizarOption]);

    useEffect(() => {
        if (!palabra) {
            if (dataPrdtItems && dataPrdtItems?.length > 0) setDatos(dataPrdtItems);
        }
    }, [palabra]);

    useEffect(() => {
        if (filtersearch == 0) {
            console.log("productItems : ", productItems)
            dataPrdtItems = productItems;
            dataPrdtItemsAll = productItems;
            sessionStorage.setItem("dataPrdtItemsAll", JSON.stringify(productItems)
            );
        }
    }, [productItems]);

    useEffect(() => {
        if (dataPrdtItems && dataPrdtItems?.length > 0) {
            paginarPrd();
        }
    }, [dataPrdtItems]);

    const paginarPrd = (selPagina) => {

        if (dataPrdtItems && dataPrdtItems?.length > 0) {

            let norepeat = [];
            let array = [];
            let arraygen = [];
            let longitem = dataPrdtItems.length;
            setProducts([]);
            setProductsgen([]);

            let numpag = parseInt(longitem / itemsPerPage);
            let arraypg = [];
            setNumeroPaginas(numpag);

            for (var i = 1; i <= numpag; i++) {
                arraypg.push(i);
            }

            for (var i = 1; i <= numpag; i++) {
                if (selPagina == 1) {
                    itemsIni = 0;
                    itemsFin = itemsPerPage;
                } else
                    if (selPagina == i) {
                        itemsIni = itemsPerPage * i;
                        itemsFin = itemsPerPage * (i + 1);
                    }
            }

            dispatch(getNumberPages(arraypg));
            //console.log("dataPrdtItems : ", dataPrdtItems);

            if (orderPrice == 1 || orderPrice == 2) {
                dataPrdtItems &&
                    dataPrdtItems.map((row, index) => {
                        let long = parseInt(array.length) + parseInt(arraygen.length);
                        if (long <= (itemsPerPage)) {
                            if (row.productogenerico == "No") {
                                array.push(row);
                            } else {
                                arraygen.push(row);
                            }
                        }
                    });
            } else
                if (datosBuscar) {
                    dataPrdtItems &&
                        dataPrdtItems.map((row, index) => {
                            let long = parseInt(array.length) + parseInt(arraygen.length);
                            if (long <= (itemsPerPage)) {
                                if (row.productogenerico == "No") {
                                    array.push(row);
                                } else {
                                    arraygen.push(row);
                                }
                            }
                        });
                }

            if (array.length == 0 && arraygen.length == 0) {
                dataPrdtItems &&
                    dataPrdtItems.map((row, index) => {

                        if (index >= itemsIni && index <= itemsFin) {
                            if (row.productogenerico == "No") {
                                array.push(row);
                            } else {
                                arraygen.push(row);
                            }
                        }
                    });
            }

            //alert(optionSelect)
            //alert(array.length)
            //alert(arraygen.length)

            if (array.length > 0) {

                if (orderPrice == 2) {
                    const compare = (a, b) => {
                        if (b.price < a.price) {
                            return -1;
                        }
                        if (b.price > a.price) {
                            return 1;
                        }
                        return 0;
                    };

                    if (array.length > 0) array.sort(compare);

                    //console.log("ORDENADOS2222 : ", array);
                } else if (orderPrice == 1) {
                    const compare = (a, b) => {
                        if (a.price < b.price) {
                            return -1;
                        }
                        if (a.price > b.price) {
                            return 1;
                        }
                        return 0;
                    };
                    //console.log("ORDENADOS1111 : ", array);
                    if (array.length > 0) array.sort(compare);
                }

                if (optionSelect === 1) {
                    setProducts(array);
                } else if (optionSelect === 2) {
                    setProducts(array);
                } else {
                    setProducts(array);
                }
            } else {
                setProducts([]);
            }

            if (arraygen.length > 0) {

                if (orderPrice == 2) {
                    const compare = (a, b) => {
                        if (b.price < a.price) {
                            return -1;
                        }
                        if (b.price > a.price) {
                            return 1;
                        }
                        return 0;
                    };

                    if (arraygen.length > 0) arraygen.sort(compare);

                    //console.log("ORDENADOS2222 : ", arraygen);
                } else if (orderPrice == 1) {
                    const compare = (a, b) => {
                        if (a.price < b.price) {
                            return -1;
                        }
                        if (a.price > b.price) {
                            return 1;
                        }
                        return 0;
                    };
                    //console.log("ORDENADOS1111 : ", arraygen);
                    if (arraygen.length > 0) arraygen.sort(compare);
                }

                if (optionSelect === 1) {
                    setProductsgen(arraygen);
                } else if (optionSelect === 2) {
                    setProductsgen(arraygen);
                } else {
                    setProductsgen(arraygen);
                }
            } else {
                setProductsgen([]);
            }
        }
    }

    const contactanos = () => {
        alert("Formulario en desarrollo");
    };

    useEffect(() => {
        if (actualiza) {
            setActualiza(false);
            setDatos([]);
            //alert(palabra);
            //let palabra = "Alternador CX5";
            let nvoprod = [];
            dataPrdtItems &&
                dataPrdtItems.map((row, index) => {
                    let nombre = row.name.toLowerCase();
                    let item = {
                        minusculas: nombre,
                        normal: row.name,
                    };
                    nvoprod.push(item);
                });

            let palabraminuscula = palabra.toLowerCase();

            let arr = [];
            if (palabra != "a") {
                arr = palabraminuscula.split(" ");
            } else {
                arr.push("a");
                arr.push("A");
            }
            let datosselect = [];
            arr &&
                arr.map((row, index) => {
                    nvoprod &&
                        nvoprod
                            .filter((item) => item.minusculas.includes(row))
                            .map((filtered) => datosselect.push(filtered));
                });

            //let mayusculas = palabra; //.toUpperCase();
            let fitrodatos = [];
            let primerapalabra = "";
            let long = dataPrdtItems.length;

            datosselect &&
                datosselect.map((row, index) => {
                    for (var i = 0; i < long; i++) {
                        if (dataPrdtItems[i].name == row.normal) {
                            fitrodatos.push(dataPrdtItems[i]);
                            break;
                        }
                    }
                });

            setDatos(fitrodatos);
            setActualiza(false);
        } else if (orderPrice > 0 && datos.length > 0) {
            setActualiza(false);
            let data = datos;
            setDatos([]);

            if (orderPrice == 2) {
                const compare = (a, b) => {
                    if (b.price > a.price) {
                        return -1;
                    }
                    if (b.price < a.price) {
                        return 1;
                    }
                    return 0;
                };

                if (data.length > 0) data.sort(compare);
                //console.log("ORDENADOS : ", menorAmayor);
            } else if (orderPrice == 1) {
                const compare = (a, b) => {
                    if (a.price > b.price) {
                        return -1;
                    }
                    if (a.price < b.price) {
                        return 1;
                    }
                    return 0;
                };

                if (data.length > 0) data.sort(compare);
            }

            setDatos(data);
            setActualiza(false);
        }
    }, [actualiza, orderPrice]);

    useEffect(() => {
        if (filtersearch) {
            let dataposicionprd = JSON.parse(localStorage.getItem("dataposicionprd"));
            let datagenericos = JSON.parse(localStorage.getItem("datagenericos"));
            dataPrdtItemsAll = JSON.parse(sessionStorage.getItem("dataPrdtItemsAll"));

            let array = [];
            if (filtersearch == 1 || filtersearch == 2 || filtersearch == 3) {

                dataposicionprd &&
                    dataposicionprd.map((item, ind) => {
                        if (item.posicion == filtersearch) {
                            dataPrdtItemsAll &&
                                dataPrdtItemsAll.map((row, index) => {
                                    if (row.posicionproducto == item.codigo) {
                                        array.push(row);
                                    }
                                    /*else
                                        if (row.productogenerico == "Si") {
                                            array.push(row);
                                        }*/
                                });
                        }
                    });
            } else {
                dataPrdtItemsAll &&
                    dataPrdtItemsAll.map((row, index) => {
                        if (filtersearch == row.posicionproducto) {
                            array.push(row);
                        }
                    });
            }
            //setProducts(withList(array, loading, 4));
            //console.log("ARRAYXXX : ", array);
            setProducts(array);

            if (datagenericos.length > 0)
                setProductsgen(datagenericos);

            //if (dataGenericos.length > 0)
            //setProducts(withList(dataGenericos, loading, 4));
        }
    }, [filtersearch]);
    //console.log("dataPrdtXXXXX : ", dataPrdtItems)
    //console.log("dataPrdtZZZZZ : ", productsgen)
    //productsgen

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    const optionsIrA = () => {
        localStorage.setItem("ira", JSON.stringify(6));
        localStorage.setItem("rutaira", JSON.stringify(router.pathname));

        const addItemVisita = async () => {
            let params = {
                idproducto: product.id,
                usuario: datosusuarios.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "70",
                params,
            })
                .then((res) => {
                    if (res?.data > 0) {
                        console.log("LEER : ", res?.data)
                    } else console.log("ERROR : ", res?.data)
                })
                .catch(function (error) {
                    console.log("ERROR : ", res?.data)
                    return;
                });
        };
        addItemVisita();

        const addItemHistoryPrd = async () => {
            let datauser = JSON.parse(localStorage.getItem("datauser"));

            let params = {
                idproducto: product.id,
                usuario: datauser?.uid,
                compatible: product.compatible,
            };

            await axios({
                method: "post",
                usuario: datauser?.uid,
                params,
            })
                .then((res) => {
                    if (res?.data > 0) {
                        console.log("LEER : ", res?.data)
                    } else console.log("ERROR : ", res?.data)
                })
                .catch(function (error) {
                    //console.log("ERROR : ", res?.data)
                    return;
                });
        };
        addItemHistoryPrd();
    }

    const verProducto = (data) => {
        router.push({
            pathname: "/product/" + data.id,
            query: {
                ctlredirigir: "91209012",
            },
        })
        //router.push(URL_MK_MR + "product/" + data.idproducto);
    }

    useEffect(() => {
        //sestDatosBuscar(null);
        setOrderPrice(null);
        let array = [];
        dataPrdtItemsAll &&
            dataPrdtItemsAll.map((row, index) => {
                let valid;
                let compara = row.name.toLowerCase();
                let dat = datosBuscar?.toLowerCase();

                valid = compara?.includes(dat);
                if (valid) {
                    array.push(row);
                }
            });
        //console.log("DATCCCC : ", array)
        dataPrdtItems = array;
    }, [datosBuscar]);


    useEffect(() => {
        if (products?.length == 0 && productsgen?.length == 0) {
            setPage(1);
        }
    }, [products, productsgen]);

    return (
        <div>
            {maximizarOption != 0 ? (
                <div className="row mt-2 mbmenos10 botonresultadobusqueda">
                    <div className="col-md-10">
                        <h1 className="titulocantidadproductossearchlist ">
                            (
                            {dataPrdtItems && dataPrdtItems?.length > 0
                                ? dataPrdtItems?.length
                                : 0}
                            ) Productos resultado de tu busqueda:{" "}
                            {datosbuscadorinteractivo?.nombrecarroceria}
                            {";"}
                            {datosbuscadorinteractivo?.nombremarca}
                            {" - "}
                            <a className="textocolorgris">
                                Si no encuentras lo que buscas:
                            </a>
                        </h1>
                    </div>
                    <div
                        className="mt-2 mlmenos15 botoncontactanos col-md-2"
                        onClick={() => contactanos()}>
                        Contáctanos
                    </div>
                </div>
            ) : null}
            <div className={mostrarZoom}>
                <div className="ml-10">
                    <ShopInteractivoHeader
                        optionSelect={optionSelect}
                        setOptionSelect={setOptionSelect}
                        maximizarOption={maximizarOption}
                        setMaximizarOption={setMaximizarOption}
                        zoom={zoom}
                        setZoom={setZoom}
                        setActualiza={setActualiza}
                        setPalabra={setPalabra}
                        setOrderPrice={setOrderPrice}
                        registrosPorPagina={registrosPorPagina}
                        setRegistrosPorPagina={setRegistrosPorPagina}
                        datosBuscar={datosBuscar}
                        setDatosBuscar={setDatosBuscar}
                    />
                </div>
            </div>
            <div className="ps-page__content">
                <Grid container>
                    {
                        optionSelect == 2 ?
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={ajustarCaja}>
                                    <div className="divprincipalviewsearch2">
                                        <ImageList sx={{ width: 470, height: 400 }} cols={3} >
                                            {
                                                products?.length > 0 &&
                                                paginatedHistorial &&
                                                paginatedHistorial.map((item, index) => (
                                                    <div onClick={() => verProducto(item)}>
                                                        <ImageListItem key={index}>
                                                            <img
                                                                className="tamanoimg"
                                                                src={URL_IMAGES_RESULTS + item.images[0].name}
                                                            />
                                                        </ImageListItem>
                                                        <div
                                                            className="margenimgsearch"
                                                        >
                                                            {item.name}
                                                        </div>
                                                        <div
                                                            className="margenimgsearch"
                                                        >
                                                            $ {myNumber(1, item.price, 2)}
                                                        </div>
                                                    </div>

                                                ))}
                                        </ImageList>
                                    </div>
                                </div>

                                {
                                    productsgen?.length > 0 ?
                                        <div className="mensajeprdrecomendados">
                                            <div className="infoprodgenericos4">
                                                ** Estos productos son recomendados
                                                para ti,
                                            </div>

                                            <div className="infoprodgenericos5">
                                                pero pueden no coincidir
                                                exactamente con tu búsqueda **{" "}
                                            </div>
                                        </div>
                                        : null
                                }

                                <div className={ajustarCaja}>
                                    <div className="divprincipalviewsearch2">
                                        <ImageList sx={{ width: 470, height: 400 }} cols={colsProducts}>
                                            {
                                                productsgen?.length > 0 &&
                                                paginatedHistorial &&
                                                paginatedHistorial.map((item, index) => (
                                                    <div onClick={() => verProducto(item)} key={index}>
                                                        <div>
                                                            <ImageListItem>
                                                                <img src={URL_IMAGES_RESULTS + item.images[0].name} />
                                                            </ImageListItem>
                                                        </div>
                                                        <div className="margenimgsearch">{item.name}</div>
                                                        <div className="margenimgsearch">$ {myNumber(1, item.price, 2)}</div>
                                                    </div>
                                                ))}
                                        </ImageList>
                                    </div>
                                    <div className="divprincipalviewsearch2Show">
                                        <ImageList sx={{ width: 470, height: 400 }} cols={colsProducts2}>
                                            {

                                                productsgen?.length > 0 &&
                                                paginatedHistorial &&
                                                paginatedHistorial.map((item, index) => (
                                                    <div onClick={() => verProducto(item)} key={index}>
                                                        <div>
                                                            <ImageListItem>
                                                                <img src={URL_IMAGES_RESULTS + item.images[0].name} />
                                                            </ImageListItem>
                                                        </div>
                                                        <div className="margenimgsearch">{item.name}</div>
                                                        <div className="margenimgsearch">$ {myNumber(1, item.price, 2)}</div>
                                                    </div>
                                                ))}
                                        </ImageList>
                                    </div>
                                </div>
                            </Grid>
                            :
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={ajustarCaja}>
                                    <div className="divprincipalviewsearch">
                                        {
                                            products?.length > 0 &&
                                            paginatedHistorial &&
                                            paginatedHistorial.map((prd) => {
                                                return (
                                                    <div className="viewlistsearch"
                                                        onClick={() => verProducto(prd)}
                                                    >
                                                        <div>
                                                            <p>{prd.name}</p>
                                                        </div>
                                                        <span>
                                                            <p>$</p>
                                                            <p>{myNumber(1, prd.price, 2)}</p>
                                                        </span>
                                                    </div>
                                                );
                                            }
                                            )}
                                    </div>
                                </div>

                                {
                                    productsgen?.length > 0 ?
                                        <div className="mensajeprdrecomendados">
                                            <div className="infoprodgenericos4">
                                                ** Estos productos son recomendados
                                                para ti,  pero pueden no coincidir
                                                exactamente con tu búsqueda **{" "}
                                            </div>
                                        </div>
                                        : null
                                }
                                <div>
                                    <div className="divprincipalviewsearch">
                                        {productsgen?.length > 0 &&
                                            paginatedHistorial &&
                                            paginatedHistorial.map((prd) => {
                                                return (
                                                    <div className="viewlistsearch"
                                                        onClick={() => verProducto(prd)}
                                                    >
                                                        <div>
                                                            <p>{prd.name}</p>
                                                        </div>
                                                        <span className="spanDivListSearch">
                                                            <p>$</p>
                                                            <p>{myNumber(1, prd.price, 2)}</p>
                                                        </span>
                                                    </div>
                                                );
                                            }
                                            )}
                                    </div>
                                </div>
                            </Grid>
                    }
                </Grid>
                  {
                    console.log("PRODUGEN : ", optionSelect)
                }


                {
                    console.log("PRODUGEN : ", productsgen, " - ", products, " - ", paginatedHistorial)
                }

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
        </div>
    );
};

export default ShopScreen;

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
