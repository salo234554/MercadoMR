import { useEffect, useState } from "react";
import ShopSearchInteractive from "~/pages/shopsearchinteractive";
import SearchPhotoMaximize from "~/pages/shopsearchinteractive/searchphotomaximize";
import SearchItemsMaximize from "~/pages/shopsearchinteractive/searchitemsmaximize";
import SearchPhotoItemsMaximize from "~/pages/shopsearchinteractive/searchphotoitemsmaximize";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroup from "~/hooks/useProductGroupInteractive";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getClearCondition } from "../../store/clearcondition/action";
import { getGripSelect } from "../../store/gripselect/action";
import { getOptionSelect } from "../../store/optionselect/action";

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
let dataPrdItem = [];
let database = [];
let viewDataSearch = [];

const SearchInteractiveItems = (props) => {
    const {
        zoomTipoVehiculo,
        setZoomTipoVehiculo,
        zoomBusquedaProductos,
        setZoomBusquedaProductos,
        zoomBusquedaItems,
        setZoomBusquedaItems,
        optionSelect,
        setOptionSelect,
        setMaximizarOption,
        maximizarOption,
        zoom,
        setZoom,
        setCloseWindow,
    } = props;

    const dispatch = useDispatch();
    const Router = useRouter();
    const { keyword } = Router.query;
    const [classSearch, setclassSearch] = useState("ps-page ps-page--shopping");
    const [classActionInteractive, setclassActionInteractive] = useState(
        "ml-30 mt-30 redondearborde ps-layout__right"
    );

    const [showProductInteractivo, setShowProductInteractivo] = useState(false);
    const [menorprecio, setMenorPrecio] = useState(0);
    const [mayorprecio, setMayorPrecio] = useState(0);
    const [precioFiltroMinimo, setPrecioFiltroMinimo] = useState(1);
    const [precioFiltroMaximo, setPrecioFiltroMaximo] = useState(1000000000);
    const [filtroPrecio, setFiltroPrecio] = useState(false);
    const [eraseCitySel, setEraseCitySel] = useState(0);
    const [citySelected, setCitySelected] = useState([]);
    const [orderPrice, setOrderPrice] = useState(0);
    const [datosBuscar, setDatosBuscar] = useState(null);

    const [filtroCond, setFiltroCond] = useState(0);
    const [condition, setCondition] = useState(null);
    const [marcarCondicion, setMarcarCondicion] = useState("");
    const [itemSelCond, setitemSelCond] = useState(null);

    const [precioMin, setPrecioMin] = useState(1);
    const [precioMax, setPrecioMax] = useState(1);

    const [resetDataSearch, setResetDataSearch] = useState(false);
    const [dataBaseVehSelect, setDataBaseVehSelect] = useState([]);

    const [classCity, setClassCity] = useState(
        "colorcerrarselectlocation apuntador"
    );
    const [classCitySel, setClassCitySel] = useState(
        "colorxcerrarfiltro apuntador"
    );

    let { loading, productItems, getProducts } = useGetProducts();
    let dataCitySelect = useSelector((state) => state.cityselect.cityselect);
    const condicionPrd = useSelector(
        (state) => state.selectcondition.selectcondition
    );
    let clearLocation = useSelector(
        (state) => state.clearlocation.clearlocation
    );
    const rangoPrd = useSelector((state) => state.rangosprecio.rangosprecio);
    const changesearchprice = useSelector(
        (state) => state.changesearchprice.changesearchprice
    );
    const filtersearch = useSelector(
        (state) => state.filtersearch.filtersearch
    );

    const { withGrid } = useProductGroup();

    useEffect(() => {
        let datosbuscar = JSON.parse(localStorage.getItem("datosbuscar"));

        if (!datosbuscar) {
            setDatosBuscar(datosbuscar);
        }
        setCitySelected(dataCitySelect);
    }, [dataCitySelect]);

    useEffect(() => {
        if (filtroCond == 0 && citySelected.length == 0)
            setclassActionInteractive(
                "marginleft30pxnone mt-15 redondearborde ps-layout__right newClassPaddigLeftCont"
            );
        else {
            setclassActionInteractive(
                "marginleft30pxnone mt-20 redondearborde ps-layout__right"
            );
        }
    }, [filtroCond, citySelected]);

    useEffect(() => {
        let dat = JSON.parse(localStorage.getItem("dataselectsearch"));
        let dataPrdtItemsAll = JSON.parse(
            sessionStorage.getItem("dataPrdtItemsAll")
        );

        setDataBaseVehSelect(dataPrdtItemsAll);

        let data = dat.nombremarca + " " + dat.nombremodelo;

        let keyword1 = data.toLowerCase();
        let keyword2 = keyword1.replace(",", "");

        let datfind = keyword2;

        const queries = {
            name_contains: keyword2,
        };
        getProducts(queries);
    }, [keyword]);

    let products;

    useEffect(() => {
        if (rangoPrd && rangoPrd != "") {
            let rangoprecios = JSON.parse(localStorage.getItem("rangoprecios"));
            setPrecioMin(rangoprecios?.menorprecio);
            setPrecioMax(rangoprecios?.mayorprecio);
        } else {
            setPrecioMin(1);
            setPrecioMax(100000000);
        }
    }, [rangoPrd]);

    useEffect(() => {
        if (!changesearchprice) {
            setPrecioMin(1);
            setPrecioMax(100000000);
        }
    }, [changesearchprice]);

    //console.log("11111000000 : ", productItems);

    if (productItems && productItems.length > 0) {
        //viewDataSearch = JSON.parse(localStorage.getItem("viewdatasearch"));

        if (!resetDataSearch) {
            viewDataSearch = JSON.parse(
                sessionStorage.getItem("dataExpandirFiltrada")
            );
        } else {
            viewDataSearch = dataBaseVehSelect;
        }

        //console.log("productItems : ", viewDataSearch);

        arrayciud = [];
        let prdciudaduno = [];
        productItems = viewDataSearch;

        database = viewDataSearch;

        if (condicionPrd && citySelected) {
            if (condicionPrd == 0 && citySelected.length == 0) {
                //alert("111");
                dataPrdItem = database;
            }
        } else {
            //alert("2222");
            dataPrdItem = viewDataSearch;
        }

        let allprdciud = [];
        let itemciud = [];

        productItems &&
            productItems.map((row, index) => {
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
                productItems &&
                    productItems.map((row, index) => {
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

        // Coloca los datos en state arreglo de años de los vehiculos
        //dispatch(getDataCityPrd(arrayciud));
        productosfiltrados = [];
        productosfiltradoscity = [];

        if (condicionPrd > 0) {
            productItems &&
                productItems.map((item) => {
                    if (condicionPrd == item.condition) {
                        productosfiltrados.push(item);
                    }
                });
        } else productosfiltrados = productItems;

        if (citySelected) {
            if (citySelected.length > 0) {
                let idciudad = [];
                citySelected &&
                    citySelected.map((reg) => {
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
            }
        } else productosfiltradoscity = productosfiltrados;

        if (productosfiltradoscity.length > 0) {
            //alert("3333");
            dataPrdItem = productosfiltradoscity;
        } else {
            //alert("44444");
            if (productItems?.length > 0) dataPrdItem = productItems;
        }

        let datosfiltrador = [];
        let nvoprod = [];

        let datosbuscar = JSON.parse(localStorage.getItem("datosbuscar"));

        if (datosbuscar) {
            let palabraminuscula = datosbuscar.toLowerCase();
            let dataPrdtItemsAll = JSON.parse(
                sessionStorage.getItem("dataExpandirFiltradaII")
            );
            //alert("000000000")
            //console.log("XXXXXXXX :", dataPrdtItemsAll, " - ", filtersearch)

            if(!filtersearch || filtersearch?.length == 0){
                dataPrdtItemsAll = JSON.parse(
                sessionStorage.getItem("dataPrdtItemsAll"));
            }

            dataPrdtItemsAll &&
                dataPrdtItemsAll?.map((row, index) => {
                    let nombre = row.name.toLowerCase();

                    let validar;
                    validar = nombre.includes(palabraminuscula);
                    if (validar) {
                        nvoprod.push(row);
                    }
                });

            datosfiltrador = nvoprod;
        } else {
            let dataExpandirFiltradaII = JSON.parse(
                sessionStorage.getItem("dataExpandirFiltradaII")
            );
            sessionStorage.setItem(
                "dataExpandirFiltrada",
                JSON.stringify(dataExpandirFiltradaII)
            );
        }

        if (!datosbuscar && filtersearch > 0) {
            //alert("000011111")
            let dataExpandirFiltradaII = JSON.parse(
                sessionStorage.getItem("dataExpandirFiltradaII")
            );
            //alert("00000");
            dataPrdItem = dataExpandirFiltradaII;
            //console.log("111114444444 : ", dataPrdtItemsAll);
        } else if (!datosbuscar && (filtersearch == "0" || !filtersearch)) {
            //alert("0000222222")
            let dataPrdtItemsAll = JSON.parse(
                sessionStorage.getItem("dataPrdtItemsAll")
            );
            //alert("55555");
            dataPrdItem = dataPrdtItemsAll;
            //console.log("111114444444 : ", dataPrdtItemsAll);
        } else if (
            !datosbuscar &&
            datosfiltrador?.length == 0 &&
            filtersearch > 0
        ) {
            //alert("0000333333")
            let dataPrdtItemsAll = JSON.parse(
                sessionStorage.getItem("dataExpandirFiltrada")
            );
            //alert("66666");
            dataPrdItem = dataPrdtItemsAll;
            //console.log("1111122222 : ", dataPrdtItemsAll);
        } else if (datosbuscar && datosfiltrador?.length == 0) {
            //alert("000044444")
            sessionStorage.setItem(
                "dataExpandirFiltrada",
                JSON.stringify(null)
            );
            //console.log("11111333333 : ", "000000000");
        } else if (datosfiltrador.length > 0) {
            dataPrdItem = datosfiltrador;
            //alert("000055555")
            //alert("88888");
            //console.log("111114444444 : ", datosfiltrador);
        }

        //console.log("DATOSXXXX : ", datosbuscar, " - ", datosfiltrador);

        let precios = [];
        dataPrdItem &&
            dataPrdItem?.map((row, index) => {
                precios.push(row.price);
            });

        let ordenarPrecios = [];
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

            if (dataPrdItem?.length > 0) dataPrdItem?.sort(compare);
            //console.log("ORDENADOS : ", menorAmayor);
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

            if (dataPrdItem?.length > 0) dataPrdItem?.sort(compare);
        }

        products = [
            [
                withGrid(
                    productosfiltradoscity,
                    loading,
                    5,
                    showProductInteractivo
                ),
            ],
        ];
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    useEffect(() => {
        //console.log("maximizarOption :  ", maximizarOption);
        //console.log("optionSelect :  ", optionSelect);
        dispatch(getOptionSelect(optionSelect));

        dispatch(getGripSelect(optionSelect));
        setCitySelected([]);
        if (optionSelect === 1 && maximizarOption === 1) {
            setZoomTipoVehiculo("col-md-1 minimizarbusqueda none950px");
            setZoomBusquedaProductos(
                "maximizarbusquedaCol10 maximizarbusqueda"
            );
        }

        if (
            (optionSelect === 1 || optionSelect === 2) &&
            maximizarOption === 0
        ) {
            setZoomTipoVehiculo("col-md-6");
            setZoomBusquedaProductos("col-md-6");
        }

        if (optionSelect === 2 && maximizarOption === 2) {
            setZoomTipoVehiculo("col-md-1 minimizarbusqueda none950px");
            setZoomBusquedaProductos(
                "maximizarbusquedaCol10 maximizarbusqueda"
            );
        }

        if (optionSelect === 3 && maximizarOption === 3) {
            setZoomTipoVehiculo("col-md-1 minimizarbusqueda none950px");
            setZoomBusquedaProductos(
                "maximizarbusquedaCol10 maximizarbusquedaphotoitems"
            );
        }

        if (maximizarOption != 0) {
            setclassSearch("Marginlrft60Int");
        } else if (maximizarOption === 0) {
            setclassSearch("");
        }
    }, [optionSelect, maximizarOption]);

    useEffect(() => {
        if (productItems) {
            let precios = [];
            productItems &&
                productItems.map((row, index) => {
                    precios.push(row.price);
                });

            let menorAmayor = precios.sort(function (a, b) {
                return a - b;
            });
            let long = menorAmayor.length;

            setMenorPrecio(menorAmayor[0]);
            setMayorPrecio(menorAmayor[long - 1]);
            let item = {
                menorprecio: menorAmayor[0],
                mayorprecio: menorAmayor[long - 1],
            };

            let activerangeprice = JSON.parse(
                localStorage.getItem("activerangeprice")
            );
            if (!activerangeprice)
                localStorage.setItem("rangoprecios", JSON.stringify(item));
        }
    }, [productItems]);

    console.log("ProductItems : ", productItems);

    useEffect(() => {
        SelectCondition(condicionPrd);
    }, [condicionPrd]);

    const SelectCondition = (item) => {
        if (item == 1) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(item);
            setMarcarCondicion("");
            dispatch(getClearCondition(1));
        } else if (item == 2) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(item);
            setMarcarCondicion("");
            dispatch(getClearCondition(2));
        } else {
            setCondition(item);
            dispatch(getClearCondition(0));
            //setitemSel(item);
            setFiltroCond(item);
            //setMarcarCondicion("subrayartexto");
        }
    };

    return (
        <div className={classSearch}>
            {maximizarOption == 0 && optionSelect == 1 ? (
                <div className="ps-layout__right">
                    <div className="tamañocajaproductsitems lineaderecha">
                        <ShopSearchInteractive
                            className="ps-shop--grid"
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}>
                            {products}
                        </ShopSearchInteractive>
                    </div>
                </div>
            ) : maximizarOption == 0 && optionSelect == 2 ? (
                <div className="ps-layout__right">
                    <div className="lineaderechaphoto tamañocajaproductsimage">
                        <ShopSearchInteractive
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}>
                            {products}
                        </ShopSearchInteractive>
                    </div>
                </div>
            ) : maximizarOption == 0 && optionSelect == 3 ? (
                <div className="ps-layout__right">
                    <div className="lineaderechaphoto tamañocajaproductsimage">
                        <ShopSearchInteractive
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}>
                            {products}
                        </ShopSearchInteractive>
                    </div>
                </div>
            ) : optionSelect == 1 && maximizarOption == 1 ? (
                <div className="ps-layout__right">
                    <div className="tamañocajashopsearchinteractivephoto">
                        <SearchItemsMaximize
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            menorprecio={menorprecio}
                            setMenorPrecio={setMenorPrecio}
                            mayorprecio={mayorprecio}
                            setMayorPrecio={setMayorPrecio}
                            precioFiltroMinimo={precioFiltroMinimo}
                            setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                            precioFiltroMaximo={precioFiltroMaximo}
                            setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                            filtroPrecio={filtroPrecio}
                            setFiltroPrecio={setFiltroPrecio}
                            dataCitySelect={dataCitySelect}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}
                            orderPrice={orderPrice}
                            setOrderPrice={setOrderPrice}
                            datosBuscar={datosBuscar}
                            setDatosBuscar={setDatosBuscar}
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
                            classCity={classCity}
                            setClassCity={setClassCity}
                            classCitySel={setClassCity}
                            setClassCitySel={setClassCitySel}
                            classActionInteractive={classActionInteractive}
                            resetDataSearch={resetDataSearch}
                            setResetDataSearch={setResetDataSearch}
                            setCloseWindow={setCloseWindow}
                        />
                    </div>
                </div>
            ) : optionSelect == 2 && maximizarOption == 2 ? (
                <div className="ps-layout__right">
                    <div className="tamañocajashopsearchinteractivephoto">
                        <SearchPhotoMaximize
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            menorprecio={menorprecio}
                            setMenorPrecio={setMenorPrecio}
                            mayorprecio={mayorprecio}
                            setMayorPrecio={setMayorPrecio}
                            precioFiltroMinimo={precioFiltroMinimo}
                            setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                            precioFiltroMaximo={precioFiltroMaximo}
                            setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                            filtroPrecio={filtroPrecio}
                            setFiltroPrecio={setFiltroPrecio}
                            dataCitySelect={dataCitySelect}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}
                            orderPrice={orderPrice}
                            setOrderPrice={setOrderPrice}
                            datosBuscar={datosBuscar}
                            setDatosBuscar={setDatosBuscar}
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
                            classCity={classCity}
                            setClassCity={setClassCity}
                            classCitySel={setClassCity}
                            setClassCitySel={setClassCitySel}
                            classActionInteractive={classActionInteractive}
                            resetDataSearch={resetDataSearch}
                            setResetDataSearch={setResetDataSearch}
                            setCloseWindow={setCloseWindow}
                        />
                    </div>
                </div>
            ) : optionSelect == 3 && maximizarOption == 3 ? (
                <div className="ps-layout__right">
                    <div className="tamañocajashopsearchinteractivephoto">
                        <SearchPhotoItemsMaximize
                            setOptionSelect={setOptionSelect}
                            optionSelect={optionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            condicionPrd={condicionPrd}
                            menorprecio={menorprecio}
                            setMenorPrecio={setMenorPrecio}
                            mayorprecio={mayorprecio}
                            setMayorPrecio={setMayorPrecio}
                            precioFiltroMinimo={precioFiltroMinimo}
                            setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                            precioFiltroMaximo={precioFiltroMaximo}
                            setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                            filtroPrecio={filtroPrecio}
                            setFiltroPrecio={setFiltroPrecio}
                            dataCitySelect={dataCitySelect}
                            dataPrdItem={dataPrdItem}
                            database={database}
                            precioMin={precioMin}
                            precioMax={precioMax}
                            orderPrice={orderPrice}
                            setOrderPrice={setOrderPrice}
                            datosBuscar={datosBuscar}
                            setDatosBuscar={setDatosBuscar}
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
                            classCity={classCity}
                            setClassCity={setClassCity}
                            classCitySel={setClassCity}
                            setClassCitySel={setClassCitySel}
                            classActionInteractive={classActionInteractive}
                            resetDataSearch={resetDataSearch}
                            setResetDataSearch={setResetDataSearch}
                            setCloseWindow={setCloseWindow}
                        />
                    </div>
                </div>
            ) : (
                <div className="ps-layout__right lineaderecha">
                    <ShopSearchInteractive
                        className="ps-shop--grid"
                        setOptionSelect={setOptionSelect}
                        optionSelect={optionSelect}
                        maximizarOption={maximizarOption}
                        setMaximizarOption={setMaximizarOption}
                        zoom={zoom}
                        setZoom={setZoom}
                        condicionPrd={condicionPrd}
                        dataPrdItem={dataPrdItem}
                        database={database}
                        precioMin={precioMin}
                        precioMax={precioMax}>
                        {products}
                    </ShopSearchInteractive>
                </div>
            )}
        </div>
    );
};

export default SearchInteractiveItems;
