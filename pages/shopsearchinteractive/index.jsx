import React, { useEffect, useState, useRef } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import ShopInteractivoHeader from "../search/shopinteractivoheader";

import { getUbicarProducto } from "../../store/ubicarproducto/action";
import { getNumberPages } from "../../store/numberpages/action";
import { getPageSelect } from "../../store/pageselect/action";
import { getResetDataSearch } from "~/store/resetdatasearch/action";
import { getChangePartVeh } from "~/store/changepartveh/action";
import { getDeleteItemFind } from "~/store/deleteitemfind/action";
import { getFilterSearchInteractive } from "~/store/filtersearchinteractive/action";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import CustomPaginationSearch from "../../components/elements/basic/CustomPaginationSearch";
import {
    Box,
    Grid,
    Button,
    item,
    ImageList,
    ImageListItem,
} from "@mui/material";
import { myNumber } from "../../utilities/ArrayFunctions";
import { URL_IMAGES_RESULTS } from "../../helpers/Constants";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LoadingMotorEectrico from "~/components/elements/Loading/LoadingSearchResult";

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

let dataFiltrada = [];
let dataPrdtItems = [];
let dataPrdtItemsAll = [];
let arrayPrd = [];
let dataPrdGenericos = [];
let itemsIni = 0;
let itemsFin = 9;
let control = false;

const ShopScreen = (props) => {
    const {
        setOptionSelect,
        optionSelect,
        maximizarOption,
        setMaximizarOption,
        zoom,
        setZoom,
    } = props;

    const irA = useRef(null);
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only("xs")); // <600px
    const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 899px
    const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1199px
    const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // >=900px

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
    const [isLoading, setIsLoading] = useState(true);

    const [registrosPorPagina, setRegistrosPorPagina] = useState(9);
    const [datosBuscar, setDatosBuscar] = useState(null);
    const [orderPrice, setOrderPrice] = useState(null);

    const [products, setProducts] = useState([]);
    const [productsgen, setProductsgen] = useState([]);

    const [numeroPaginas, setNumeroPaginas] = useState(0);

    const [enableMessage, setEnableMessage] = useState(null);

    const dispatch = useDispatch();
    const Router = useRouter();
    const { query } = Router;

    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    const filtersearch = useSelector(
        (state) => state.filtersearch.filtersearch
    );

    const deleteitemfind = useSelector(
        (state) => state.deleteitemfind.deleteitemfind
    );

    const resetdatasearch = useSelector(
        (state) => state.resetdatasearch.resetdatasearch
    );

    const changepartveh = useSelector(
        (state) => state.changepartveh.changepartveh
    );

    const paginaselect = useSelector((state) => state.pageselect.pageselect);

    let viewvehprd = useSelector((state) => state.viewvehprd.viewvehprd);

    //console.log("PRODUGEN00000 : ", maximizarOption);
    //console.log("PRODUGEN00000 : ",resetdatasearch," - ",filtersearch," - ",arrayPrd," - ",changepartveh," - ",deleteitemfind," - ",paginaselect," - ",datosBuscar);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 300);
        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        let openviewprdsearch = JSON.parse(
            localStorage.getItem("openviewprdsearch")
        );

        if (openviewprdsearch) dispatch(getPageSelect(1));

        localStorage.setItem("esgenerico", JSON.stringify(false));
        if (optionSelect == 1) setAjustarCaja("ml-2 ps-layout__right");
        else setAjustarCaja("ml-8 ps-layout__right");

        let dat = JSON.parse(localStorage.getItem("dataselectsearch"));

        let data = dat.nombremarca + " " + dat.nombremodelo;

        let keyword1 = data?.toLowerCase();
        let keyword2 = keyword1.replace(",", "");

        let datfind = keyword2;
        const queries = {
            name_contains: keyword2,
        };

        getProducts(queries);
    }, [optionSelect]);

    useEffect(() => {
        let openviewprdsearch = JSON.parse(
            localStorage.getItem("openviewprdsearch")
        );

        if (openviewprdsearch) dispatch(getPageSelect(1));

        let datosbuscar = JSON.parse(localStorage.getItem("datosbuscar"));
        if (filtersearch != "0" || filtersearch > 0) {
            localStorage.setItem("expandirdata", JSON.stringify(false));
            if (!viewvehprd || viewvehprd == "0")
                localStorage.setItem("datosbuscar", JSON.stringify(null));
        }
    }, [filtersearch, orderPrice]);

    useEffect(() => {
        dispatch(getUbicarProducto(maximizarOption));
        let datagenericos = JSON.parse(localStorage.getItem("datagenericos"));
        dataPrdGenericos = datagenericos;

        if (maximizarOption != 0)
            setMostrarZoom("maximizarbusquedaitems mt-15");
        else setMostrarZoom("mt-15");
    }, [optionSelect, maximizarOption]);

    useEffect(() => {
        if (!palabra) {
            if (dataPrdtItems && dataPrdtItems?.length > 0)
                setDatos(dataPrdtItems);
        }
    }, [palabra]);

    useEffect(() => {
        if (filtersearch == 0 && productItems?.length > 0) {
            dataPrdtItems = [];
            dataPrdtItems = [...productItems];
            //dataPrdtItemsAll = [];
            //dataPrdtItemsAll = [...productItems];
            sessionStorage.setItem(
                "dataPrdtItemsAll",
                JSON.stringify(productItems)
            );
        }
    }, [productItems]);

    useEffect(() => {
        const filtrarData = (newData) => {
            console.log("dataPrdtItems00111 : ", newData);
            setProducts([]);
            setProductsgen([]);

            const viewData = (dataPrd) => {
                console.log("dataPrdtItems00222 : ", dataPrd);
                dispatch(getChangePartVeh(false));
                let dataResultPrd = [];
                let dataresulprd = dataPrd.filter(
                    (prd) => prd.productogenerico == "No"
                );

                let dataresulprdgen = [];
                if (filtersearch > 0) {
                    dataresulprdgen = dataPrdGenericos.filter(
                        (prd) => prd.productogenerico == "Si"
                    );
                } else {
                    dataresulprdgen = dataPrd.filter(
                        (prd) => prd.productogenerico == "Si"
                    );
                }

                //console.log("DAT0000XXX : ",dataresulprd," - ",dataresulprdgen);

                if (orderPrice > 0) {
                    if (orderPrice == 2) {
                        const compare = (a, b) => {
                            if (a.price > b.price) {
                                return -1;
                            }
                            if (a.price < b.price) {
                                return 1;
                            }
                            return 0;
                        };

                        if (dataresulprd.length > 0) dataresulprd.sort(compare);

                        if (dataresulprdgen.length > 0)
                            dataresulprdgen.sort(compare);
                    } else if (orderPrice == 1) {
                        const compare = (a, b) => {
                            if (b.price > a.price) {
                                return -1;
                            }
                            if (b.price < a.price) {
                                return 1;
                            }
                            return 0;
                        };

                        if (dataresulprd.length > 0) dataresulprd.sort(compare);

                        if (dataresulprdgen.length > 0)
                            dataresulprdgen.sort(compare);
                    }
                }

                //dataResultPrd = [...dataresulprd, ...dataresulprdgen];
                let expandirdata = JSON.parse(
                    localStorage.getItem("expandirdata")
                );

                if (expandirdata) {
                    let dataExpandirFiltrada = dataFiltrada;
                    dataResultPrd = dataExpandirFiltrada;
                    if (orderPrice > 0) {
                        if (orderPrice == 2) {
                            const compare = (a, b) => {
                                if (a.price > b.price) {
                                    return -1;
                                }
                                if (a.price < b.price) {
                                    return 1;
                                }
                                return 0;
                            };

                            if (dataResultPrd.length > 0)
                                dataResultPrd.sort(compare);
                        } else if (orderPrice == 1) {
                            const compare = (a, b) => {
                                if (b.price > a.price) {
                                    return -1;
                                }
                                if (b.price < a.price) {
                                    return 1;
                                }
                                return 0;
                            };

                            if (dataResultPrd.length > 0)
                                dataResultPrd.sort(compare);
                        }
                    }
                } else {
                    dataResultPrd = [...dataresulprd, ...dataresulprdgen];
                    dataFiltrada = dataResultPrd;
                    //console.log("datosBuscarYYY2222 : ", dataResultPrd);
                    sessionStorage?.setItem(
                        "dataExpandirFiltrada",
                        JSON.stringify(dataResultPrd)
                    );
                }

                console.log("dataFiltradaXXX : ", dataResultPrd);

                let norepeat = [];
                let array = [];
                let arraygen = [];
                let longitem = dataResultPrd?.length;

                setProducts([]);

                let numpag = parseInt(longitem / registrosPorPagina);
                let arraypg = [];
                setNumeroPaginas(numpag);

                for (var i = 1; i <= numpag; i++) {
                    arraypg.push(i);
                }

                for (var i = 1; i <= numpag; i++) {
                    if (paginaselect == 1) {
                        itemsIni = 0;
                        itemsFin = registrosPorPagina;
                        control = false;

                        if (itemsFin % 2 === 0 && optionSelect === 2) {
                            if (dataresulprd?.length > 6)
                                itemsFin = itemsFin - 1;
                            // se resta uno para que muestre solo items par
                            else itemsFin = itemsFin + 1;
                        } else {
                            // Items fin queda con el mismo valor por que es par
                        }
                    } else if (paginaselect == i) {
                        itemsIni = registrosPorPagina * (i - 1);
                        itemsFin = registrosPorPagina * i;

                        if (itemsFin % 2 === 0 && optionSelect === 2) {
                            itemsFin = itemsFin - 1; // e resta uno para que muestre solo items par
                        } else {
                            // Items fin queda con el mismo valor por que es pars
                        }
                    }
                }

                dispatch(getNumberPages(arraypg));

                if (orderPrice == 1 || orderPrice == 2) {
                    array = [];
                    arraygen = [];
                    dataResultPrd &&
                        dataResultPrd?.map((row, index) => {
                            let long =
                                parseInt(array.length) +
                                parseInt(arraygen.length);
                            if (long < registrosPorPagina) {
                                if (row.productogenerico == "No") {
                                    array = [...array, row];
                                } else {
                                    arraygen = [...arraygen, row];
                                }
                            }
                        });
                } else if (datosBuscar) {
                    array = [];
                    arraygen = [];
                    dataResultPrd &&
                        dataResultPrd?.map((row, index) => {
                            let long =
                                parseInt(array.length) +
                                parseInt(arraygen.length);
                            if (long < registrosPorPagina) {
                                if (row.productogenerico == "No") {
                                    array = [...array, row];
                                } else {
                                    arraygen = [...arraygen, row];
                                }
                            }
                        });
                }

                //if (array.length == 0 && arraygen.length == 0) {

                array = [];
                arraygen = [];
                dataResultPrd &&
                    dataResultPrd?.map((row, index) => {
                        if (arraygen?.length % 2 === 1 && !control) {
                            itemsFin = itemsFin + 1;
                            control = true;

                            if (!Number.isInteger(itemsFin / 3)) {
                                itemsFin = itemsFin - 1;
                            }
                        }

                        if (index >= itemsIni && index <= itemsFin) {
                            if (row.productogenerico == "No") {
                                array = [...array, row];
                            } else {
                                arraygen = [...arraygen, row];
                            }
                        }
                    });

                let newarray = [...array, ...arraygen];
                let arraynew = [];

                if (array?.length > 0) {
                    let datosbuscar = JSON.parse(
                        localStorage.getItem("datosbuscar")
                    );

                    array &&
                        array.map((row, index) => {
                            if (datosbuscar) {
                                let valid;
                                let compara = row?.name?.toLowerCase();
                                let dat = datosbuscar?.toLowerCase();

                                valid = compara?.includes(dat);
                                if (valid) {
                                    arraynew.push(row);
                                }
                            } else {
                                arraynew.push(row);
                            }
                        });
                }
                //console.log("ORDENADOS : ", arraynew);

                if (optionSelect === 1) {
                    setProducts(arraynew);
                } else if (optionSelect === 2) {
                    setProducts(arraynew);
                } else {
                    setProducts(arraynew);
                }

                let arraygennew = [];

                if (arraygen.length > 0) {
                    let arraynew = [];

                    arraygen &&
                        arraygen.map((row, index) => {
                            if (datosBuscar) {
                                let valid;
                                let compara = row?.name?.toLowerCase();
                                let dat = datosBuscar?.toLowerCase();

                                valid = compara?.includes(dat);
                                if (valid) {
                                    arraynew.push(row);
                                }
                            } else {
                                arraynew.push(row);
                            }
                        });

                    //console.log("1111111133333333 : ", arraynew);

                    arraygennew = arraynew;
                } else {
                    arraygennew = [];
                }

                if (arraygennew?.length > 0) {
                    if (optionSelect === 1) {
                        setProductsgen(arraygennew);
                    } else if (optionSelect === 2) {
                        setProductsgen(arraygennew);
                    } else {
                        setProductsgen(arraygennew);
                    }
                }
            };

            if (resetdatasearch && dataPrdtItems?.length > 0) {
                console.log("DAT00AAAAAAA : ", dataPrdtItems);
                viewData(dataPrdtItems);
                arrayPrd = [];
            } else if (
                filtersearch == "0" ||
                filtersearch == 1 ||
                filtersearch == 2 ||
                filtersearch == 3
            ) {
                arrayPrd = [];
                if (
                    filtersearch == 1 ||
                    filtersearch == 2 ||
                    filtersearch == 3
                ) {
                    let dataPrdtItemsAll = JSON.parse(
                        sessionStorage.getItem("dataPrdtItemsAll")
                    );

                    let dataItems = [];

                    if (dataPrdtItemsAll?.length > 0) {
                        dataItems = dataPrdtItemsAll;
                    } else {
                        dataItems = dataPrdtItems;
                    }

                    let dataprdposicion = dataItems.filter(
                        (prd) => prd.posicionprd == filtersearch
                    );

                    console.log("DAT00BBBBBBBB", dataprdposicion);
                    viewData(dataprdposicion);
                } else {
                    let dataExpandirBase = JSON.parse(
                        sessionStorage.getItem("dataExpandirBase")
                    );

                    console.log(
                        "DAT00CCCCCCC : ",
                        dataExpandirBase?.length,
                        " - ",
                        dataPrdtItems?.length
                    );

                    if (dataExpandirBase?.length > 0)
                        viewData(dataExpandirBase);
                    else viewData(dataPrdtItems);
                }
            } else {
                console.log("DAT00DDDDDDD : ", newData);
                viewData(newData);
            }
        };

        if (productItems && productItems.length > 0) {
            let dataPrdtFiltrados = [...productItems];

            if (filtersearch >= 1 && filtersearch <= 23) {
                //El codigo del sistema existe en el array de productos
                arrayPrd = [];
                let newarrayprd = [];

                let parteTrenSel = JSON.parse(
                    localStorage.getItem("partetrensel")
                );

                if (changepartveh) {
                    arrayPrd = [...parteTrenSel];
                } else {
                    arrayPrd.push(filtersearch);
                }

                arrayPrd &&
                    arrayPrd.map((prd) => {
                        dataPrdtFiltrados &&
                            dataPrdtFiltrados.map((row, index) => {
                                if (
                                    filtersearch < 4 &&
                                    prd == row.posicionprd
                                ) {
                                    newarrayprd.push(row);
                                } else if (
                                    filtersearch > 3 &&
                                    prd == row.posicionproducto
                                ) {
                                    newarrayprd.push(row);
                                }
                            });
                    });

                console.log("dataPrdt333000000:", newarrayprd);
                filtrarData(newarrayprd);
            } else if (arrayPrd.includes(filtersearch)) {
                //El codigo del sistema existe en el array de productos
                let newarrayprd = [];

                let parteTrenSel = JSON.parse(
                    localStorage.getItem("partetrensel")
                );

                let array = [];
                if (changepartveh || parseInt(filtersearch) > parseInt(300)) {
                    parteTrenSel &&
                        parteTrenSel.map((item) => {
                            array.push(item.sistemasel);
                        });
                } else {
                    array = [...arrayPrd];
                }

                array &&
                    array.map((prd) => {
                        dataPrdtFiltrados &&
                            dataPrdtFiltrados.map((row, index) => {
                                if (
                                    filtersearch < 4 &&
                                    prd == row.posicionprd
                                ) {
                                    newarrayprd.push(row);
                                } else if (
                                    filtersearch > 3 &&
                                    prd == row.posicionproducto
                                ) {
                                    newarrayprd.push(row);
                                }
                            });
                    });

                console.log("dataPrdt333222222:", newarrayprd);
                filtrarData(newarrayprd);
            } else {
                arrayPrd.push(filtersearch);
                let newarrayprd = [];

                let parteTrenSel = JSON.parse(
                    localStorage.getItem("partetrensel")
                );

                let array = [];
                if (changepartveh) {
                    parteTrenSel &&
                        parteTrenSel.map((item) => {
                            array = [...array, item];
                        });
                } else {
                    array = [...arrayPrd];
                }

                array &&
                    array.map((prd) => {
                        dataPrdtFiltrados &&
                            dataPrdtFiltrados.map((row, index) => {
                                if (
                                    filtersearch < 4 &&
                                    prd == row.posicionprd
                                ) {
                                    newarrayprd = [...newarrayprd, row];
                                } else if (
                                    filtersearch > 3 &&
                                    prd == row.posicionproducto
                                ) {
                                    newarrayprd = [...newarrayprd, row];
                                }
                            });
                    });

                console.log("dataPrdt333222222:", newarrayprd);
                filtrarData(newarrayprd);
            }
            //} else {
            //  filtrarData(dataPrdGenericos);
            // }
        }

        //alert(deleteitemfind)
        if (deleteitemfind) {
            let newarrayprd = [];
            let itemselect = [];

            arrayPrd &&
                arrayPrd.map((prd) => {
                    if (parseInt(prd) != parseInt(deleteitemfind)) {
                        itemselect.push(prd);
                    }
                });

            //console.log("NEWARRAY : ", itemselect, " - ", arrayPrd);
            arrayPrd = [];
            itemselect &&
                itemselect.map((prd) => {
                    dataPrdtItems &&
                        dataPrdtItems.map((row, index) => {
                            if (filtersearch < 4 && prd == row.posicionprd) {
                                newarrayprd.push(row);
                            } else if (
                                filtersearch > 3 &&
                                prd == row.posicionproducto
                            ) {
                                newarrayprd.push(row);
                            }
                        });
                });

            console.log("dataPrdt3334444444:", newarrayprd);
            dispatch(getDeleteItemFind(null));
            arrayPrd = itemselect;
            filtrarData(newarrayprd);
        } else {
            //filtrarData([]);
        }
    }, [
        dataPrdtItems,
        productItems,
        paginaselect,
        orderPrice,
        datosBuscar,
        filtersearch,
        deleteitemfind,
        resetdatasearch,
        changepartveh,
    ]);

    //console.log("DATAYYYYY : ", filtersearch);

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
                    let nombre = row?.name?.toLowerCase();
                    let item = {
                        minusculas: nombre,
                        normal: row?.name,
                    };
                    nvoprod.push(item);
                });

            let palabraminuscula = palabra?.toLowerCase();

            let arr = [];
            if (palabra != "a") {
                arr = palabraminuscula?.split(" ");
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
        }
    }, [actualiza]);

    useEffect(() => {
        if (filtersearch == "0") arrayPrd = [];

        if (filtersearch) {
            let dataposicionprd = JSON.parse(
                localStorage.getItem("dataposicionprd")
            );

            dataPrdtItemsAll = JSON.parse(
                sessionStorage.getItem("dataExpandirBase")
            );

            dispatch(getResetDataSearch(false));

            let array = [];
            if (filtersearch == 1 || filtersearch == 2 || filtersearch == 3) {
                dataposicionprd &&
                    dataposicionprd.map((item, ind) => {
                        if (item.posicion == filtersearch) {
                            dataPrdtItemsAll &&
                                dataPrdtItemsAll.map((row, index) => {
                                    if (
                                        filtersearch < 4 &&
                                        item.codigo == row.posicionprd
                                    ) {
                                        array.push(row);
                                    } else if (
                                        filtersearch > 3 &&
                                        item.codigo == row.posicionproducto
                                    ) {
                                        array.push(row);
                                    }
                                });
                        }
                    });
            } else {
                dataPrdtItemsAll &&
                    dataPrdtItemsAll.map((row, index) => {
                        if (filtersearch == row.posicionprd) {
                            array.push(row); // REVISAR AQUI NIVEL 1,2,3
                        }
                    });
            }
        }
    }, [filtersearch]);

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
                        console.log("LEER : ", res?.data);
                    } else console.log("ERROR : ", res?.data);
                })
                .catch(function (error) {
                    console.log("ERROR : ", res?.data);
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
                        console.log("LEER : ", res?.data);
                    } else console.log("ERROR : ", res?.data);
                })
                .catch(function (error) {
                    //console.log("ERROR : ", res?.data)
                    return;
                });
        };
        addItemHistoryPrd();
    };

    const verProducto = (data) => {
        router.push({
            pathname: "/product/" + data.id,
            query: {
                ctlredirigir: "91209012",
            },
        });
        localStorage.setItem("ctlredirigir", JSON.stringify("91209012"));
        //router.push(URL_MK_MR + "product/" + data.idproducto);
    };

    useEffect(() => {
        let datosbuscar = JSON.parse(localStorage.getItem("datosbuscar"));
        //console.log("DATCCXXXXXX : ", datosbuscar, " - ", filtersearch);
        //if (datosbuscar && (!filtersearch || filtersearch == "0")) {
        if (datosbuscar) {
            let dataFiltrar = [];

            dataPrdtItemsAll = JSON.parse(
                sessionStorage.getItem("dataPrdtItemsAll")
            );

            if (dataPrdtItemsAll?.length == 0) dataFiltrar = dataPrdtItems;
            else dataFiltrar = dataPrdtItemsAll;

            //console.log("DAT0000XXXXX : ", dataFiltrar);

            setDatosBuscar(datosbuscar);
            //dispatch(getFilterSearchInteractive(0));
            arrayPrd = [];

            setProductsgen([]);
            setProducts([]);
            let unique = [];

            let array = [];
            dataFiltrar &&
                dataFiltrar.map((row, index) => {
                    let valid;
                    let validunique;

                    validunique = unique?.includes(row?.compatible);

                    if (!validunique) {
                        unique = [...unique, row?.compatible];

                        let compara = row?.name?.toLowerCase();
                        let dat = datosbuscar?.toLowerCase();

                        valid = compara?.includes(dat);
                        if (valid) {
                            array = [...array, row];
                        }
                    }
                });

            //console.log("AAAAAAA11111 : ", array);

            let arraygen = [];
            dataPrdGenericos &&
                dataPrdGenericos.map((row, index) => {
                    let valid;
                    let validunique;

                    validunique = unique?.includes(row?.compatible);

                    if (!validunique) {
                        unique = [...unique, row?.compatible];

                        let compara = row?.name?.toLowerCase();
                        let dat = datosbuscar?.toLowerCase();

                        valid = compara?.includes(dat);
                        if (valid) {
                            arraygen = [...arraygen, row];
                        }
                    }
                });

            //console.log("AAAAAAA222222 : ", arraygen);
            dataPrdGenericos = arraygen;
            dataFiltrada = [...array, ...arraygen];

            //console.log("AAAAAAA333333 : ", dataFiltrada);

            if (array?.length > 0) {
                dataPrdtItems = array;
                let longitem = array?.length;
                let numpag = parseInt(longitem / registrosPorPagina);
                setNumeroPaginas(numpag);
                //console.log("DATCCCC : ", array);
            }
        } else {
            dataPrdGenericos = [];
            let dataPrdtItemsAll = JSON.parse(
                sessionStorage.getItem("dataPrdtItemsAll")
            );
            sessionStorage.setItem(
                "dataExpandirBase",
                JSON.stringify(dataPrdtItemsAll)
            );
            console.log(
                "DAT0000ZZZZZ : ",
                dataPrdtItems,
                " - ",
                dataPrdtItemsAll
            );
            dataPrdtItems = dataPrdtItemsAll;
            let datagenericos = JSON.parse(
                localStorage.getItem("datagenericos")
            );

            dataPrdGenericos = datagenericos;
            let longitem = dataPrdtItems?.length + datagenericos?.length;
            let numpag = parseInt(longitem / registrosPorPagina);
            setNumeroPaginas(numpag);
        }
    }, [datosBuscar]);

    useEffect(() => {
        if (numeroPaginas == 0) {
            setNumeroPaginas(1);
        } else {
            //if (enableMessage) setNumeroPaginas(1);
        }
    }, [numeroPaginas, enableMessage]);

    useEffect(() => {
        if (productsgen?.length === 0 && products?.length === 0) {
            setTimeout(() => {
                setEnableMessage(true);
                /*
                let longitem =
                    parseFloat(productsgen?.length) +
                    parseFloat(products?.length);
                let numpag = parseInt(longitem / registrosPorPagina);
                setNumeroPaginas(numpag);
                */
            }, 2000);
        } else {
            setEnableMessage(false);
        }
    }, [productsgen, products]);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [paginaselect]);

    return (
        <div ref={irA}>
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
                        dataFiltrada={dataFiltrada}
                    />
                </div>
            </div>

            {products?.length == 0 && productsgen?.length == 0 ? (
                <div>
                    {!enableMessage ? (
                        <LoadingMotorEectrico />
                    ) : (
                        <div className="colortextotamaño">
                            No hay resultados para tu busqueda!
                        </div>
                    )}
                </div>
            ) : (
                <div className="ps-page__content">
                    <Grid container>
                        {optionSelect == 2 ? (
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={ajustarCaja}>
                                    <div className="divprincipalviewsearch2">
                                        <ImageList
                                            sx={{ width: 470, height: 400 }}
                                            cols={3}>
                                            {products.map((item, index) => (
                                                <div
                                                    onClick={() =>
                                                        verProducto(item)
                                                    }>
                                                    <ImageListItem key={index}>
                                                        <img
                                                            className="tamanoimg"
                                                            src={
                                                                URL_IMAGES_RESULTS +
                                                                item.images[0]
                                                                    .name
                                                            }
                                                        />
                                                    </ImageListItem>
                                                    <div className="margenimgsearch">
                                                        {item.name}
                                                    </div>
                                                    <div className="margenimgsearch">
                                                        ${" "}
                                                        {myNumber(
                                                            1,
                                                            item.price,
                                                            2
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </ImageList>
                                    </div>
                                </div>
                                {productsgen?.length > 0 ? (
                                    <div className="mensajeprdrecomendados ml-6">
                                        <div className="infoprodgenericos4">
                                            ** Estos productos son recomendados
                                            para ti,
                                        </div>

                                        <div className="infoprodgenericos5">
                                            pero pueden no coincidir exactamente
                                            con tu búsqueda **{" "}
                                        </div>
                                    </div>
                                ) : null}
                                <div className={ajustarCaja}>
                                    <div className="divprincipalviewsearch2">
                                        <ImageList
                                            sx={{ width: 470, height: 400 }}
                                            cols={colsProducts}>
                                            {productsgen.map((item, index) => (
                                                <div
                                                    onClick={() =>
                                                        verProducto(item)
                                                    }
                                                    key={index}>
                                                    <div>
                                                        <ImageListItem>
                                                            <img
                                                                src={
                                                                    URL_IMAGES_RESULTS +
                                                                    item
                                                                        .images[0]
                                                                        .name
                                                                }
                                                            />
                                                        </ImageListItem>
                                                    </div>
                                                    <div className="margenimgsearch">
                                                        {item.name}
                                                    </div>
                                                    <div className="margenimgsearch">
                                                        ${" "}
                                                        {myNumber(
                                                            1,
                                                            item.price,
                                                            2
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </ImageList>
                                    </div>
                                    <div className="divprincipalviewsearch2Show">
                                        <ImageList
                                            sx={{ width: 470, height: 400 }}
                                            cols={colsProducts2}>
                                            {productsgen.map((item, index) => (
                                                <div
                                                    onClick={() =>
                                                        verProducto(item)
                                                    }
                                                    key={index}>
                                                    <div>
                                                        <ImageListItem>
                                                            <img
                                                                src={
                                                                    URL_IMAGES_RESULTS +
                                                                    item
                                                                        .images[0]
                                                                        .name
                                                                }
                                                            />
                                                        </ImageListItem>
                                                    </div>
                                                    <div className="margenimgsearch">
                                                        {item.name}
                                                    </div>
                                                    <div className="margenimgsearch">
                                                        ${" "}
                                                        {myNumber(
                                                            1,
                                                            item.price,
                                                            2
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </ImageList>
                                    </div>
                                </div>
                            </Grid>
                        ) : (
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <div className={ajustarCaja}>
                                    <div className="divprincipalviewsearch">
                                        {products &&
                                            products.map((prd) => {
                                                return (
                                                    <div
                                                        className="viewlistsearch"
                                                        onClick={() =>
                                                            verProducto(prd)
                                                        }>
                                                        <div>
                                                            <p>{prd.name}</p>
                                                        </div>
                                                        <span>
                                                            <p>$</p>
                                                            <p>
                                                                {myNumber(
                                                                    1,
                                                                    prd.price,
                                                                    2
                                                                )}
                                                            </p>
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                                {productsgen?.length > 0 ? (
                                    <div className="mensajeprdrecomendados">
                                        <div className="infoprodgenericos4">
                                            ** Estos productos son recomendados
                                            para ti, pero pueden no coincidir
                                            exactamente con tu búsqueda **{" "}
                                        </div>
                                    </div>
                                ) : null}
                                <div>
                                    <div className="divprincipalviewsearch">
                                        {productsgen &&
                                            productsgen.map((prd) => {
                                                return (
                                                    <div
                                                        className="viewlistsearch ml-6"
                                                        onClick={() =>
                                                            verProducto(prd)
                                                        }>
                                                        <div>
                                                            <p>{prd.name}</p>
                                                        </div>
                                                        <span className="spanDivListSearch">
                                                            <p>$</p>
                                                            <p>
                                                                {myNumber(
                                                                    1,
                                                                    prd.price,
                                                                    2
                                                                )}
                                                            </p>
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </Grid>
                        )}
                    </Grid>
                </div>
            )}
            <div className="ps-shop__footer">
                <CustomPaginationSearch
                    numeroPaginas={numeroPaginas}
                    setOrderPrice={setOrderPrice}
                />
            </div>
        </div>
    );
};

export default ShopScreen;
