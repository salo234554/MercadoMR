import React, { useEffect, useState, useRef } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroupSearch from "~/hooks/useProductGroupSearch";
import { useRouter } from "next/router";
import ModuleShopActionsInteractivo from "~/components/partials/shop/modules/ModuleShopActionsInteractivo";
import { useSelector, useDispatch } from "react-redux";
import { cond } from "lodash";
import { getDataCityPrd } from "../../store/datacityprd/action";
import { getViewSearch } from "../../store/viewsearch/action";
import { getNumberPages } from "../../store/numberpages/action";
import CustomPaginationSearch from "~/components/elements/basic/CustomPaginationSearch";
import { getPageSelect } from "~/store/pageselect/action";
import { getCloseOpenVehSearch } from "~/store/closeopenvehsearch/action";
import { getValFltrCiudad } from "~/store/validarfiltrociudad/action";
import ViewFilterSelect from "../search/viewfilterselect";
import { Dialog, Grid } from "@mui/material";
import ViewPrd from "../product/ViewPrd";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import LoadingMotorEectrico from "../../components/elements/Loading/LoadingMotorEectrico";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const breadcrumb = [
    {
        id: 1,
        text: "Inicio",
        url: "/",
    },
    {
        id: 2,
        text: "Tienda",
        url: "/shop",
    },
    {
        id: 3,
        text: "Resultado de la búsqueda",
    },
];

let productosfiltrados = [];
let productosfiltradoscity = [];
let arrayciud = [];
let viewSearch = null;
let registrosPorPagina = 20;
let allprd2 = [];

const SearchItemsMaximize = (props) => {
    const {
        optionSelect,
        setOptionSelect,
        setMaximizarOption,
        maximizarOption,
        zoom,
        setZoom,
        menorprecio,
        setMenorPrecio,
        mayorprecio,
        setMayorPrecio,
        precioFiltroMinimo,
        setPrecioFiltroMinimo,
        precioFiltroMaximo,
        setPrecioFiltroMaximo,
        filtroPrecio,
        setFiltroPrecio,
        condicionPrd,
        ciudadesPrd,
        dataCitySelect,
        dataPrdItem,
        database,
        precioMin,
        precioMax,
        orderPrice,
        setOrderPrice,
        datosBuscar,
        setDatosBuscar,
        classSearch,
        setclassSearch,
        eraseCitySel,
        setEraseCitySel,
        citySelected,
        setCitySelected,
        filtroCond,
        setFiltroCond,
        condition,
        setCondition,
        marcarCondicion,
        setMarcarCondicion,
        itemSelCond,
        setitemSelCond,
        classCondicion,
        setClassCondicion,
        classCity,
        setClassCity,
        classCitySel,
        setClassCitySel,
        classActionInteractive,
        resetDataSearch,
        setResetDataSearch,
        setCloseWindow,
    } = props;

    const [selCiudad, setSelCiudad] = useState([]);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const irA = useRef(null);
    const [count, setCount] = useState(0);

    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    let dataCity = useSelector((state) => state.cityselect.cityselect);

    viewSearch = useSelector((state) => state.viewsearch.viewsearch);

    let selectviewprd = useSelector(
        (state) => state.selectviewprd.selectviewprd
    );
    let ViewCheckout = useSelector((state) => state.viewcheckout.viewcheckout);
    let changesearchprice = useSelector(
        (state) => state.changesearchprice.changesearchprice
    );

    let paginaselect = useSelector((state) => state.pageselect.pageselect);

    let customvehicle = useSelector(
        (state) => state.customvehicle.customvehicle
    );

    let activarviewprd = useSelector(
        (state) => state.activarviewprd.activarviewprd
    );

    let viewvehprd = useSelector((state) => state.viewvehprd.viewvehprd);

    console.log("paginaselect : ", paginaselect, " - ", numeroPaginas);

    let itemsIni = 0;
    let itemsFin = registrosPorPagina;

    useEffect(() => {
        /* Guardamos la URL de la posición del vehículo seleccionado */
        if (customvehicle == 2) {
            dataPrdItem = JSON.parse(
                sessionStorage.getItem("dataPrdtItemsAll")
            );
        }
    }, [customvehicle]);

    useEffect(() => {
        /* Al limpiar los fintros de busqueda se asigna nuevamente todos los productos */
        let datosbuscar = JSON.parse(localStorage.getItem("datosbuscar"));
        if (!datosbuscar) {
            dataPrdItem = JSON.parse(
                sessionStorage.getItem("dataPrdtItemsAll")
            );
        }
    }, [datosBuscar]);

    useEffect(() => {
        if (dataCity.length > 0) {
            setCitySelected(dataCity);
            setSelCiudad(dataCity);
        } else if (citySelected.length > 0) {
            setCitySelected(citySelected);
            setSelCiudad(citySelected);
        }
    }, [dataCity, citySelected]);

    useEffect(() => {
        let openviewprdsearch = JSON.parse(
            localStorage.getItem("openviewprdsearch")
        );

        if ((optionSelect || orderPrice > 0) && openviewprdsearch) {
            dispatch(getPageSelect(1));
        }
    }, [optionSelect, orderPrice]);

    useEffect(() => {
        if (ViewCheckout) {
            async function leerProducto(idprd) {
                let params = {
                    idarticulo: idprd,
                };

                try {
                    const res = await axios({
                        method: "post",
                        url: URL_BD_MR + "18",
                        params,
                    });

                    //console.log("DATA PRD : ", res.data[0]);
                    setProductView(res.data[0]);
                    dispatch(getViewSearch(true));
                    //dispatch(getSelectViewPrd(77));
                    //setNombreProducto(product.name);
                } catch (error) {
                    console.error("Error leyendo producto", error);
                }
            }
            leerProducto(selectviewprd);
        }
    }, [ViewCheckout]);

    const Router = useRouter();
    const dispatch = useDispatch();
    const { keyword } = Router.query;
    //console.log("QUE BUSCA : ", keyword);
    const { loading, productItems, getProducts } = useGetProducts();
    const [productView, setProductView] = useState(null);
    //console.log("PRODUCT ITEMS : ", dataPrdItem);
    const { withListMaximize } = useProductGroupSearch();
    let ubicacion;

    useEffect(() => {
        dispatch(getValFltrCiudad(1));
        ubicacion = JSON.parse(localStorage.getItem("ubicacionproducto"));
    }, []);

    useEffect(() => {
        const queries = {
            name_contains: "mazda",
        };
        getProducts(queries);
    }, [keyword]);

    const RangoPrecios = (data) => {
        if (data) {
            let precios = [];
            data &&
                data.map((row, index) => {
                    precios.push(row.price);
                });

            let menorAmayor = precios.sort(function (a, b) {
                return a - b;
            });
            let long = menorAmayor.length;

            let item = {
                menorprecio: menorAmayor[0],
                mayorprecio: menorAmayor[long - 1],
            };

            let openviewprdsearch = JSON.parse(
                localStorage.getItem("openviewprdsearch")
            );

            if (openviewprdsearch)
                localStorage.setItem("rangoprecios", JSON.stringify(item));
            // Coloca los datos en state arreglo de años de los vehiculos
            //dispatch(getViewSearch(item));
        }
    };

    let products;
    let productsgen;
    let filtrarciud = [];
    let longprd = 0;

    if (dataPrdItem && dataPrdItem?.length > 0) {
        arrayciud = [];
        let prdciudaduno = [];
        let prdciudaddos = [];

        let dataResultPrd = [];

        let dataresulprd = dataPrdItem?.filter(
            (prd) => prd.productogenerico == "No"
        );

        let dataresulprdgen = dataPrdItem?.filter(
            (prd) => prd.productogenerico == "Si"
        );

        //console.log("ALLPRD XXXX: ", dataresulprd);

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

                if (dataresulprdgen.length > 0) dataresulprdgen.sort(compare);
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

                if (dataresulprdgen.length > 0) dataresulprdgen.sort(compare);
            }
        }

        dataResultPrd = [...dataresulprd, ...dataresulprdgen];

        dataResultPrd &&
            dataResultPrd.map((row, index) => {
                let validar;
                validar = prdciudaduno.includes(row.ciudad);
                if (!validar) {
                    prdciudaduno.push(row.ciudad);
                }
            });

        prdciudaduno &&
            prdciudaduno.map((item) => {
                let numciudades = 0;
                let nombre = "";
                let ind = 0;
                dataResultPrd &&
                    dataResultPrd.map((row, index) => {
                        if (item == row.ciudad) {
                            numciudades = parseInt(numciudades) + 1;
                            nombre = row.nombreciudad;
                            ind = index;
                        }
                    });

                let reg = {
                    id: ind,
                    ciudad: item,
                    nombre_ciu: nombre,
                    cantidad: numciudades,
                };
                arrayciud.push(reg);
            });

        productosfiltrados = [];
        productosfiltradoscity = [];

        if (condicionPrd > 0) {
            dataResultPrd &&
                dataResultPrd.map((item) => {
                    if (condicionPrd == item.condition) {
                        productosfiltrados.push(item);
                    }
                });
        } else productosfiltrados = dataResultPrd;

        //console.log("PRD FILT : ", productosfiltrados);

        if (dataCitySelect) {
            if (dataCitySelect.length > 0) {
                let idciudad = [];
                dataCitySelect &&
                    dataCitySelect.map((reg) => {
                        let validar;
                        validar = idciudad.includes(reg.idciu);
                        if (!validar) {
                            idciudad.push(reg.idciu);
                        }
                    });

                productosfiltrados &&
                    productosfiltrados.map((item) => {
                        if (idciudad.includes(item.ciudad)) {
                            productosfiltradoscity.push(item);
                        }
                    });

                //console.log("XXXXX : ", productosfiltradoscity);
                //console.log("CIUDXXX : ", dataCitySelect);
            } else productosfiltradoscity = productosfiltrados;
        } else productosfiltradoscity = productosfiltrados;

        let prdrangprecio = [];
        let prdrangpreciogen = [];

        //console.log("productosfiltradoscity : ", productosfiltradoscity);
        productosfiltradoscity &&
            productosfiltradoscity.map((item) => {
                if (item.productogenerico == "No") {
                    //alert(precioMin+" - "+precioMax)
                    if (item.price >= precioMin && item.price <= precioMax) {
                        prdrangprecio.push(item);
                    }
                } else {
                    if (item.price >= precioMin && item.price <= precioMax) {
                        prdrangpreciogen.push(item);
                    }
                }
            });

        let allprdciud2 = [];
        let itemciud2 = [];
        allprd2 = [];

        prdrangprecio &&
            prdrangprecio.map((row, index) => {
                allprd2.push(row);
            });

        prdrangpreciogen &&
            prdrangpreciogen.map((row, index) => {
                allprd2.push(row);
            });

        let conditionselect = JSON.parse(
            localStorage.getItem("conditionselect")
        );

        allprd2 &&
            allprd2.map((row, index) => {
                let validar;
                validar = itemciud2.includes(row.ciudad);
                if (!validar) {
                    itemciud2.push(row.ciudad);
                }
            });

        RangoPrecios(allprd2);

        itemciud2 &&
            itemciud2.map((item, ind) => {
                let contador = 0;
                let dat;
                allprd2 &&
                    allprd2.map((row, index) => {
                        if (item == row.ciudad) {
                            contador = parseInt(contador) + 1;
                            dat = {
                                id: index,
                                idciu: row.ciudad,
                                nombreciu: row.nombreciudad,
                                nombre_ciu: row.nombreciudad,
                                productosciudad: contador,
                            };
                        }
                    });
                allprdciud2.push(dat);
            });

        //console.log("XXitemciud2YY : ", allprdciud2)
        // Coloca los datos en state arreglo de años de los vehiculos
        dispatch(getDataCityPrd(allprdciud2));

        longprd = allprd2.length;

        if (!paginaselect) {
            paginaselect = 1;
        }

        for (var i = 1; i <= numeroPaginas; i++) {
            if (paginaselect == 1) {
                itemsIni = 0;
                itemsFin = registrosPorPagina;
            } else if (paginaselect == i) {
                //alert(paginaselect)
                itemsIni = registrosPorPagina * (i - 1) + 1;
                itemsFin = registrosPorPagina * i;
            }
        }

        let contar = 0;
        let productosUno = [];
        let productosDos = [];
        let indice = 0;

        if (prdrangprecio?.length > 0) {
            prdrangprecio &&
                prdrangprecio.map((row, index) => {
                    indice = parseInt(indice) + parseInt(1);
                    if (indice >= itemsIni && indice <= itemsFin) {
                        productosUno.push(row);
                        contar = parseInt(contar) + parseInt(1);
                    }
                });
        }

        if (prdrangpreciogen?.length > 0 && contar < registrosPorPagina) {
            prdrangpreciogen &&
                prdrangpreciogen.map((row, index) => {
                    indice = parseInt(indice) + parseInt(1);
                    if (indice >= itemsIni && indice <= itemsFin) {
                        if (contar < registrosPorPagina) {
                            productosDos.push(row);
                            contar = parseInt(contar) + parseInt(1);
                        }
                    }
                });
        }

        //console.log("NUMPAG : ", prdrangprecio);
        //console.log("NUMPAG111 : ", prdrangpreciogen);
        //console.log("ORDENADOS11 : ", productosUno);

        let ordenarprecio = JSON.parse(localStorage.getItem("orderbyprd"));
        setOrderPrice(ordenarprecio);
        //console.log("orderPrice : ", orderPrice);

        if (orderPrice == 1) {
            const compare = (a, b) => {
                if (b.price > a.price) {
                    return -1;
                }
                if (b.price < a.price) {
                    return 1;
                }
                return 0;
            };

            if (productosUno?.length > 0) productosUno.sort(compare);
            if (productosDos?.length > 0) productosDos.sort(compare);
            //console.log("ORDENADOS : ", productosUno, " - ", productosUno);
        } else if (orderPrice == 2) {
            const compare = (a, b) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            };

            if (productosUno?.length > 0) productosUno.sort(compare);
            if (productosDos?.length > 0) productosDos.sort(compare);
            //console.log("ORDENADOS : ", productosUno, " - ", productosUno);
        }

        if (prdrangprecio.length > 0)
            products = withListMaximize(productosUno, loading, 4);

        if (prdrangpreciogen.length > 0) {
            localStorage.setItem("viewprdgenericos", JSON.stringify(false));
            productsgen = withListMaximize(productosDos, loading, 4);
        } else {
            localStorage.setItem("viewprdgenericos", JSON.stringify(false));
        }
    } else {
        dispatch(getDataCityPrd([]));
        products = <p>Producto no encontrado.</p>;
    }

    const encontrar = () => {
        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        localStorage.setItem("eraseplaceholder", JSON.stringify(0));
        Router.push("/Contactanos/");
    };

    useEffect(() => {
        async function leerProducto(idprd) {
            let params = {
                idarticulo: idprd,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "18",
                    params,
                });

                //console.log("DATA PRD : ", res.data[0])
                setProductView(res.data[0]);
                //setNombreProducto(product.name);
            } catch (error) {
                console.error("Error leyendo producto", error);
            }
        }
        if (!ViewCheckout) leerProducto(selectviewprd);
        //setIrInicio(true);
    }, [selectviewprd]);

    useEffect(() => {
        //alert("BBBBBBBB")
        let ctlrCount = JSON.parse(localStorage.getItem("ctlrCount"));
        
        if (count < 2 || ctlrCount) {
            let numprd = allprd2?.length;
            setCount(count + 1);
            localStorage.setItem("ctlrCount", JSON.stringify(false));
            let numpag = (numprd / registrosPorPagina).toFixed(0);

            let arraypg = [];

            if (numpag < 1) {
                dispatch(getNumberPages([1]));
                setNumeroPaginas(1);
            } else {
                setNumeroPaginas(numpag);
            }
            for (var i = 1; i <= numpag; i++) {
                arraypg.push(i);
            }
            //console.log("productosActuales : ", arraypg);
            let dataExpandirFiltrada = JSON.parse(
                sessionStorage.getItem("dataExpandirFiltrada")
            );

            if (
                dataPrdItem?.length == 0 ||
                !dataPrdItem ||
                dataExpandirFiltrada?.length == 0 ||
                !dataExpandirFiltrada
            ) {
                setNumeroPaginas(1);
                dispatch(getNumberPages([1]));
            } else dispatch(getNumberPages(arraypg));
        }
    }, [allprd2, dataPrdItem]);

    console.log("dataPrdItem : ", dataPrdItem);

    useEffect(() => {
        if (!viewSearch) {
            let urlviewprd = JSON.parse(localStorage.getItem("urlviewprd"));
            Router.push(urlviewprd);
        }
    }, [viewSearch]);

    const OpenCloseVeh = () => {
        dispatch(getCloseOpenVehSearch(1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 500);
        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [paginaselect]);

    const handleClickAway = () => {
        setCount(0);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="mb-100" ref={irA}>
                {isLoading ? (
                    <div className="posicionespinersearch">
                        <LoadingMotorEectrico />
                    </div>
                ) : !viewSearch ? (
                    <div className="tamañoresultadodatosphotossearchinteractive">
                        <div className="mb-10">
                            <h1 className="titulocantidadproductossearchlistnREw">
                                (
                                {productItems && productItems.length > 0
                                    ? longprd
                                    : 0}
                                ) Productos resultado de tu busqueda {ubicacion}{" "}
                                del vehículo
                                {", "}
                                {datosbuscadorinteractivo.nombrecarroceria}
                                {", "}
                                {datosbuscadorinteractivo.nombremarca}
                                {", "}
                                {datosbuscadorinteractivo.nombremodelo}
                            </h1>
                        </div>

                        {selCiudad.length == 0 && filtroCond == 0 ? (
                            <div className="mtmenos1"></div>
                        ) : optionSelect > 0 ? (
                            <div className="positionfiltersearch">
                                <ViewFilterSelect
                                    classSearch={classSearch}
                                    setclassSearch={setclassSearch}
                                    eraseCitySel={eraseCitySel}
                                    setEraseCitySel={setEraseCitySel}
                                    citySelected={citySelected}
                                    setCitySelected={setCitySelected}
                                    filtroCond={filtroCond}
                                    setFiltroCond={setFiltroCond}
                                    condition={condition}
                                    setCondition={setCondition}
                                    marcarCondicion={marcarCondicion}
                                    setMarcarCondicion={setMarcarCondicion}
                                    itemSelCond={itemSelCond}
                                    setitemSelCond={setitemSelCond}
                                    classCondicion={classCondicion}
                                    setClassCondicion={setClassCondicion}
                                    classCity={classCity}
                                    setClassCity={setClassCity}
                                    classCitySel={setClassCity}
                                    setClassCitySel={setClassCitySel}
                                    maximizarOption={maximizarOption}
                                    optionSelect={optionSelect}
                                />
                            </div>
                        ) : null}

                        <div className="ps-page ps-page--shopping">
                            <div
                                className={classActionInteractive}
                                //onClick={() => ViewProduct()}
                            >
                                {" "}
                                <ModuleShopActionsInteractivo
                                    optionSelect={optionSelect}
                                    setOptionSelect={setOptionSelect}
                                    maximizarOption={maximizarOption}
                                    setMaximizarOption={setMaximizarOption}
                                    zoom={zoom}
                                    setZoom={setZoom}
                                    menorprecio={menorprecio}
                                    setMenorPrecio={setMenorPrecio}
                                    mayorprecio={mayorprecio}
                                    setMayorPrecio={setMayorPrecio}
                                    precioFiltroMinimo={precioFiltroMinimo}
                                    setPrecioFiltroMinimo={
                                        setPrecioFiltroMinimo
                                    }
                                    precioFiltroMaximo={precioFiltroMaximo}
                                    setPrecioFiltroMaximo={
                                        setPrecioFiltroMaximo
                                    }
                                    filtroPrecio={filtroPrecio}
                                    setFiltroPrecio={setFiltroPrecio}
                                    orderPrice={orderPrice}
                                    setOrderPrice={setOrderPrice}
                                    datosBuscar={datosBuscar}
                                    setDatosBuscar={setDatosBuscar}
                                    resetDataSearch={resetDataSearch}
                                    setResetDataSearch={setResetDataSearch}
                                />
                                <div onClick={() => OpenCloseVeh()}>
                                    <div>{products}</div>
                                    <div className="mt-10 mb-10">
                                        <div className="infoprodgenericos6Int">
                                            ** Estos productos son recomendados
                                            para ti, pero pueden no coincidir
                                            exactamente con tu búsqueda **{" "}
                                        </div>
                                    </div>
                                    <div>{productsgen}</div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-shop__footer ml-10">
                            <CustomPaginationSearch
                                numeroPaginas={numeroPaginas}
                                setOrderPrice={setOrderPrice}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <ViewPrd
                            producto={productView}
                            optionSelect={optionSelect}
                            setOptionSelect={setOptionSelect}
                            setMaximizarOption={setMaximizarOption}
                            maximizarOption={maximizarOption}
                            viewSearch={viewSearch}
                            setCloseWindow={setCloseWindow}
                            setIsLoading={setIsLoading}
                        />
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default SearchItemsMaximize;
