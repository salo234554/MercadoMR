import { useEffect, useRef, useState } from "react";
import BreadCrumbSearchContact from "~/components/elements/BreadCrumbSearchContact";
import ShopSearch from "~/components/partials/shop/ShopSearch";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroupInteractive from "~/hooks/useProductGroupInteractive";
import LoadingSearchResult from "~/components/elements/Loading/LoadingSearchResult";
import useProductGroup from "~/hooks/useProductGroup";
import { useRouter } from "next/router";
import ModuleShopResults from "~/components/partials/shop/modules/ModuleShopResults";
import CustomPagination from "~/components/elements/basic/CustomPagination";
import SidebarShopResults from "~/components/shared/sidebar/SidebarShopResults";
import axios from "axios";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled as muiStyled } from "@mui/material/styles";
//Constantes
import { URL_BD_MR } from "../../helpers/Constants";
import { IoClose } from "react-icons/io5";
import { getLongPage } from "../../store/longpage/action";
import { useDispatch, useSelector } from "react-redux";

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

let arraypag = [];
let longitud = 0;
let itemciud = [];
let allprdciud = [];
let nombreres = null;
let basePrecios = [];
let dataProd = [];
let controlItem = 40;
let totitem = 0;
let controlcond = false;
let baseCiudad = [];
let holder = 0;
let datafindcontact = "";
let valdata = 0;
let registrosPorPagina = 2;
let totalPaginas = 0;
let allprdciud2 = [];
let filtrarciud = [];

const SearchContact = (props) => {
    const { dataFind, setDataSearch } = props;
    const dispatch = useDispatch();
    const Router = useRouter();
    const { keyword } = Router.query;
    //console.log("QUE BUSCA : ", dataFind);
    const { loading, getProducts, dataPayload } = useGetProducts();
    //console.log("PAYLOADPROUCT : ", dataFind);
    const { withGrid } = useProductGroup();
    const { withListMaximize } = useProductGroupInteractive();
    const { withList } = useProductGroup();
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    const [resultFind, setResultFind] = useState(false);
    const [wordCambia, setWordCambia] = useState(false);
    const [cantidadPrdCiudad, setCantidadPrdCiudad] = useState([]);
    const [PrdCiudadUno, setPrdCiudadUno] = useState([]);
    const [PrdCiudadDos, setPrdCiudadDos] = useState([]);
    const [allCity, setAllCity] = useState([]);

    const [filtroPrecio, setFiltroPrecio] = useState(false);
    const [activar, setActivar] = useState("habilitar");
    const [selectGrid, setSelectGrid] = useState(1);
    const [pagInicia, setPagInicia] = useState(0);
    const [itemsPaginas, setItemsPaginas] = useState(10);
    const [pagFin, setPagFin] = useState(10);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const [ordenarPor, setOrdenarPor] = useState(0);
    const [menorprecio, setMenorPrecio] = useState(0);
    const [mayorprecio, setMayorPrecio] = useState(0);
    const [selected, setSelected] = useState([]);
    const [marcaSelected, setmarcaSelected] = useState("");
    const [activaCiudad, setActivaCiudad] = useState(true);
    const [condition, setCondition] = useState(null);
    const [marcarCondicion, setMarcarCondicion] = useState("");
    const [paginaSel, setPaginaSel] = useState(1);
    const [itemSel, setitemSel] = useState(null);
    const [itemSelCond, setitemSelCond] = useState(null);
    const [contCond, setContCond] = useState(controlcond);

    const [precioFiltroMinimo, setPrecioFiltroMinimo] = useState(1);
    const [precioFiltroMaximo, setPrecioFiltroMaximo] = useState(100000000);

    const [numProdRel, setNumProdRel] = useState(10);
    const [irInicio, setIrInicio] = useState(false);

    const [filtroCond, setFiltroCond] = useState(0);

    const [cerrarFiltro, setCerrarFiltro] = useState(false);

    const [eraseCitySel, setEraseCitySel] = useState(0);
    const [citySelected, setCitySelected] = useState([]);

    const [classCondicion, setClassCondicion] = useState("ml-1 mt-10 mb-50");
    const [classCity, setClassCity] = useState("colorxcerrarfiltro apuntador");
    const [classCitySel, setClassCitySel] = useState(
        "colorxcerrarfiltro apuntador"
    );

    const [ok, setOk] = useState(false);
    const [clearFiltroCity, setclearFiltroCity] = useState(false);
    const [actCity, setActCiy] = useState(false);
    const [itemIni, setitemIni] = useState(1);
    const [itemFin, setItemFin] = useState(40);
    const [textoOrdenar, setTextoOrdenar] = useState("Ordenar por");
    const [isLoading, setIsLoading] = useState(true);
    const [pagina, setPagina] = useState(1);
    let itemsPorPagina = 8;
    let longpage = useSelector((state) => state.longpage.longpage);

    const isXs = useMediaQuery("(max-width:600px)");
    const isSm = useMediaQuery("(min-width:601px) and (max-width:960px)");
    const isMd = useMediaQuery("(min-width:961px) and (max-width:1580px)");
    const isLg = useMediaQuery("(min-width:1281px)");

    if (selectGrid === 1) {
        if (isXs) itemsPorPagina = 12;
        else if (isMd) itemsPorPagina = 20;
        else itemsPorPagina = 15;
    } else if (selectGrid === 2) {
        if (isXs) itemsPorPagina = 17;
        else if (isMd) itemsPorPagina = 30;
        else itemsPorPagina = 15;
    } else if (selectGrid === 3) {
        if (isXs) itemsPorPagina = 10;
        else if (isMd) itemsPorPagina = 12;
        else itemsPorPagina = 12;
    }

    useEffect(() => {
        if (
            keyword != 1 &&
            keyword != 2 &&
            keyword != 3 &&
            keyword != 4 &&
            keyword != 5 &&
            keyword != 6 &&
            keyword != 7
        ) {
            let row = [];
            let item = {
                word: keyword,
            };
            // word: keyword.trim()
            row.push(item);
            localStorage.setItem("keyword", JSON.stringify(row));
        }

        let datax = JSON.parse(localStorage.getItem("keyword"));

        let datay = "";
        if (datax) datay = datax[0].word;

        valdata = JSON.parse(localStorage.getItem("placeholdersearch"));

        setIsLoading(true);
        if (keyword < 7) {
            cerrarFiltros();
        }
    }, [keyword]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearInterval(interval);
    }, [isLoading]);

    useEffect(() => {
        // Lee numero de items de la consulta //
        datafindcontact = JSON.parse(localStorage.getItem("placeholdersearch"));
        const leebdprd = async () => {
            if (dataProd.length == 0) {
                await axios({
                    method: "post",
                    url: URL_BD_MR + "43",
                }).then((res) => {
                    let datos = [];
                    datos = res.data.cantidadprdciudad;
                    baseCiudad = datos;
                    const compare = (a, b) => {
                        if (a.nombre_ciu < b.nombre_ciu) {
                            return -1;
                        }
                        if (a.nombre_ciu > b.nombre_ciu) {
                            return 1;
                        }
                        return 0;
                    };
                    if (datos.length > 0) datos.sort(compare);

                    let prdciudaduno = [];
                    let prdciudaddos = [];
                    let allcity = [];
                    datos &&
                        datos.map((row, index) => {
                            if (index % 2 == 0) {
                                let item = {
                                    id: index,
                                    ciudad: row.ciudad,
                                    nombre_ciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    nombreciu: row.nombreciu,
                                };

                                prdciudaduno.push(item);
                                allcity.push(ciud);
                            } else {
                                let item = {
                                    id: index,
                                    ciudad: row.ciudad,
                                    nombre_ciu: row.nombre_ciu,
                                    productosciudad: row.productosciudad,
                                };

                                let ciud = {
                                    id: index,
                                    idciu: row.ciudad,
                                    nombreciu: row.nombreciu,
                                };

                                prdciudaddos.push(item);
                                allcity.push(ciud);
                            }
                        });

                    setPrdCiudadUno(prdciudaduno);
                    setPrdCiudadDos(prdciudaddos);
                    setAllCity(allcity);
                    setCantidadPrdCiudad(datos);
                });
                setOk(false);
                if (dataFind) {
                    let numpag = dataFind.length / itemsPaginas + 0.9;
                    let numpaginas = Math.trunc(numpag);

                    let array = [];
                    for (var i = 1; i <= numpaginas; i++) {
                        array.push(i);
                    }

                    setNumeroPaginas(array);
                    arraypag = array;
                }
            }
        };
        leebdprd();
    }, []);

    useEffect(() => {
        if (clearFiltroCity && filtroCond == 0) {
            let arrayciud = [];
            let prdciudaduno = [];
            let prdciudaddos = [];

            allprdciud = [];
            itemciud = [];
            dataFind &&
                dataFind.map((row, index) => {
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        //selectedall.push(ciud);
                    }
                });

            itemciud &&
                itemciud.map((row, index) => {
                    let contador = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;
                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: row,
                        ciudad: row,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const compare = (a, b) => {
                if (a.nombre_ciu < b.nombre_ciu) {
                    return -1;
                }
                if (a.nombre_ciu > b.nombre_ciu) {
                    return 1;
                }
                return 0;
            };
            if (prdciudaduno.length > 0) prdciudaduno.sort(compare);

            if (prdciudaddos.length > 0) prdciudaddos.sort(compare);

            if (arrayciud.length > 0) arrayciud.sort(compare);

            if (arrayciud.length > 0) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
            setActCiy(false);
            setclearFiltroCity(true);
        }
    }, [clearFiltroCity]);

    const cambiar = () => {
        setActivaCiudad(false);
    };

    useEffect(() => {
        if (dataProd.length > 0) {
            totitem = dataProd.length;
            localStorage.setItem("prdcontactresult", JSON.stringify(dataProd));
        }
        cambiar();
        setActCiy(false);
    }, [dataProd, filtroCond, clearFiltroCity, actCity, eraseCitySel]);

    useEffect(() => {
        // Lee numero de items de la consulta //
        let arrayciud = [];
        let prdciudaduno = [];
        let prdciudaddos = [];

        if (filtroCond == 0 && citySelected.length == 0) {
            allprdciud = [];
            itemciud = [];
            dataProd = [];

            dataFind &&
                dataFind.map((row, index) => {
                    if (row.genericos != "productosgenericos") {
                        dataProd.push(row);
                    } else {
                        dataProd.push(row);
                    }
                });

            dataProd &&
                dataProd.map((row, index) => {
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        //selectedall.push(ciud);
                    }
                });

            itemciud &&
                itemciud.map((row, index) => {
                    let contador = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;
                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: row,
                        ciudad: row,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const compare = (a, b) => {
                if (a.nombre_ciu < b.nombre_ciu) {
                    return -1;
                }
                if (a.nombre_ciu > b.nombre_ciu) {
                    return 1;
                }
                return 0;
            };
            if (prdciudaduno.length > 0) prdciudaduno.sort(compare);

            if (prdciudaddos.length > 0) prdciudaddos.sort(compare);

            if (arrayciud.length > 0) arrayciud.sort(compare);

            if (arrayciud.length > 0) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
            setActCiy(false);
        } else if (citySelected.length > 0 && filtroCond > 0) {
            let dataalter = dataProd;
            dataProd = [];

            citySelected &&
                citySelected.map((item, index) => {
                    dataalter &&
                        dataalter.map((row, index) => {
                            if (
                                row.ciudad == item.idciu &&
                                filtroCond == row.condition
                            ) {
                                dataProd.push(row);
                            }
                        });
                });
        } else if (itemciud.length > 0 && filtroCond > 0) {
            allprdciud = [];
            itemciud = [];

            dataProd &&
                dataProd.map((row, index) => {
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        //selectedall.push(ciud);
                    }
                });

            itemciud &&
                itemciud.map((row, index) => {
                    let contador = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;
                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: row,
                        ciudad: row,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            const compare = (a, b) => {
                if (a.nombre_ciu < b.nombre_ciu) {
                    return -1;
                }
                if (a.nombre_ciu > b.nombre_ciu) {
                    return 1;
                }
                return 0;
            };
            if (prdciudaduno.length > 0) prdciudaduno.sort(compare);

            if (prdciudaddos.length > 0) prdciudaddos.sort(compare);

            if (arrayciud.length > 0) arrayciud.sort(compare);

            if (arrayciud.length > 0) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
            setActCiy(false);
        } else if (citySelected.length > 0 && filtroCond == 0) {
            let contador = 0;
            allprdciud = [];
            itemciud = [];
            dataProd = [];

            citySelected &&
                citySelected.map((item, index) => {
                    dataFind &&
                        dataFind.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                allprdciud.push(row.ciudad);
                                let validar;
                                validar = itemciud.includes(row.ciudad);
                                dataProd.push(row);
                                if (!validar) {
                                    itemciud.push(row.ciudad);
                                }
                            }
                        });
                });

            itemciud &&
                itemciud.map((row, index) => {
                    let contador = 0;
                    allprdciud &&
                        allprdciud.map((item, index) => {
                            if (item == row) {
                                contador = contador + 1;
                            }
                        });

                    let nombreciudad;
                    baseCiudad &&
                        baseCiudad.map((base, index) => {
                            if (base.ciudad == row) {
                                nombreciudad = base.nombre_ciu;
                            }
                        });
                    let ciud = {
                        id: index,
                        idciu: row,
                        ciudad: row,
                        nombre_ciu: nombreciudad,
                        nombreciu: nombreciudad,
                        productosciudad: contador,
                    };

                    if (index % 2 == 0) {
                        prdciudaduno.push(ciud);
                    } else {
                        prdciudaddos.push(ciud);
                    }
                    arrayciud.push(ciud);
                });

            if (arrayciud.length > 0) {
                setPrdCiudadUno(prdciudaduno);
                setPrdCiudadDos(prdciudaddos);
                setAllCity(arrayciud);
                setCantidadPrdCiudad(arrayciud);
            }
        }
        setActCiy(false);
    }, [dataFind, actCity, citySelected, filtroCond]);

    useEffect(() => {
        if (basePrecios.length > 0) {
            let precios = [];
            basePrecios &&
                basePrecios.map((row, index) => {
                    precios.push(row.price);
                });

            precios.sort(function (a, b) {
                return a - b;
            });
            setMenorPrecio(precios[0]);
            precios.sort(function (a, b) {
                return b - a;
            });
            setMayorPrecio(precios[0]);
        }
    }, [basePrecios, selectGrid]);

    useEffect(() => {
        if (basePrecios.length > 0) {
            let precios = [];
            basePrecios &&
                basePrecios.map((row, index) => {
                    precios.push(row.price);
                });
        }
    }, [precioFiltroMinimo, precioFiltroMaximo]);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordCambia(true);
        }, 500);
        return () => console.log("actualizar");
    }, [wordCambia]);

    useEffect(() => {
        if (!valdata) {
            holder = JSON.parse(localStorage.getItem("eraseplaceholder"));

            setResultFind("");
            const queries = {
                name_contains: "",
            };
            getProducts(queries);
        } else if (
            (keyword != 1 &&
                keyword != 2 &&
                keyword != 3 &&
                keyword != 4 &&
                keyword != 5 &&
                keyword != 6 &&
                keyword != 7) ||
            !dataFind
        ) {
            const ubiposprod = JSON.parse(
                localStorage.getItem("placeholdersearch")
            );

            holder = JSON.parse(localStorage.getItem("eraseplaceholder"));

            if (ubiposprod && ubiposprod != "" && holder == 1)
                nombreres = ubiposprod;

            if (ubiposprod && holder == 1) setResultFind(ubiposprod);
            else setResultFind("");

            const queries = {
                name_contains: keyword,
            };
            getProducts(queries);
        } else {
            const ubiposprod = JSON.parse(
                localStorage.getItem("placeholdersearch")
            );

            holder = JSON.parse(localStorage.getItem("eraseplaceholder"));

            if (ubiposprod && ubiposprod != "" && holder == 1)
                nombreres = ubiposprod;

            if (ubiposprod && holder == 1) setResultFind(ubiposprod);
            else setResultFind("");
        }
    }, [keyword, wordCambia, selectGrid]);

    let products = null;
    let productcategory = null;
    let productcategoryy = null;
    let productos = [];
    let productoscategoria = [];

    let prdfiltrados = [];

    if (dataFind && dataFind.length > 0) {
        controlcond = contCond;

        let selectedall = [];
        if (selected.length > 0) {
            selectedall = selected;
        } else {
            selectedall = allCity;
        }

        if (selectedall.length == 0) {
            itemciud = [];
            allprdciud = [];

            dataFind &&
                dataFind.map((row, index) => {
                    //console.log("CITY 11111 : ", row.ciudad);

                    let ciud = {
                        id: index,
                        idciu: row.ciudad,
                        nombreciu: row.nombreciu,
                    };
                    allprdciud.push(row.ciudad);
                    let validar;
                    validar = itemciud.includes(row.ciudad);
                    if (!validar) {
                        itemciud.push(row.ciudad);
                        selectedall.push(ciud);
                    }
                });
        }

        if (citySelected && activaCiudad && filtroCond == 0) {
            productos = [];
            productoscategoria = [];
            controlcond = false;
            dataProd = [];

            citySelected &&
                citySelected.map((item, index) => {
                    dataFind &&
                        dataFind.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                //console.log("CITY 11111 : ", row);
                                if (row.genericos != "productosgenericos") {
                                    productos.push(row);
                                    dataProd.push(row);
                                } else {
                                    productoscategoria.push(row);
                                    dataProd.push(row);
                                }
                            }
                        });
                });
        } else if (
            selectedall &&
            !activaCiudad &&
            filtroCond == 0
            //&& controlcond
        ) {
            productos = [];
            productoscategoria = [];
            filtrarciud = [];

            let dat = null;
            //controlcond = true;
            selectedall &&
                selectedall.map((item, ind) => {
                    let contador = 0;

                    dataProd &&
                        dataProd.map((row, index) => {
                            if (row.ciudad == item.idciu) {
                                //console.log("CITY 2222222 : ", row);
                                //console.log("ENTRE : ", row.ciudad, ' = ',item.idciu)
                                if (row.genericos != "productosgenericos") {
                                    productos.push(row);
                                } else {
                                    productoscategoria.push(row);
                                }

                                contador = parseInt(contador) + 1;
                                dat = {
                                    id: index,
                                    idciu: row.ciudad,
                                    ciudad: row.ciudad,
                                    nombreciu: row.nombreciudad,
                                    nombre_ciu: row.nombreciudad,
                                    productosciudad: contador,
                                };
                            }
                        });
                    if (contador > 0) allprdciud2.push(dat);
                });
        }

        if (
            condition &&
            (filtroCond == 1 || filtroCond == 2) &&
            !controlcond &&
            citySelected.length == 0
        ) {
            productos = [];
            productoscategoria = [];
            dataProd = [];

            dataFind &&
                dataFind.map((row, index) => {
                    if (row.condition == condition) {
                        if (row.genericos != "productosgenericos") {
                            productos.push(row);
                            dataProd.push(row);
                        } else {
                            productoscategoria.push(row);
                            dataProd.push(row);
                        }
                    }
                });
        } else if (
            condition &&
            (filtroCond == 1 || filtroCond == 2) &&
            citySelected.length > 0
        ) {
            productos = [];
            productoscategoria = [];

            citySelected &&
                citySelected.map((item, index) => {
                    dataFind &&
                        dataFind.map((row, index) => {
                            if (
                                row.condition == condition &&
                                row.ciudad == item.idciu
                            ) {
                                if (row.genericos != "productosgenericos") {
                                    productos.push(row);
                                    //dataProd.push(row);
                                } else {
                                    productoscategoria.push(row);
                                    //dataProd.push(row);
                                }
                            }
                        });
                });
        }

        let arraypag = productos;
        let arraypagcat = productoscategoria;
        productoscategoria = [];
        productos = [];

        let contador = 0;
        arraypag &&
            arraypag.map((row, index) => {
                contador = index + 1;
                if (
                    parseInt(contador) >= parseInt(itemIni) &&
                    parseInt(contador) <= parseInt(itemFin)
                ) {
                    productos.push(row);
                }
            });

        if (contador < itemFin) {
            let itemcontinua = contador;
            arraypagcat &&
                arraypagcat.map((row, index) => {
                    contador = itemcontinua + index + 1;
                    if (
                        parseInt(contador) >= parseInt(itemIni) &&
                        parseInt(contador) <= parseInt(itemFin)
                    ) {
                        productoscategoria.push(row);
                    }
                });
        }

        if (ordenarPor == 1) {
            const compare = (a, b) => {
                if (a.fechacreacion > b.fechacreacion) {
                    return -1;
                }
                if (a.fechacreacion < b.fechacreacion) {
                    return 1;
                }
                return 0;
            };
            if (productos.length > 0) productos.sort(compare);
        } else if (ordenarPor == 2) {
            const compare = (a, b) => {
                if (a.price > b.price) {
                    return -1;
                }
                if (a.price < b.price) {
                    return 1;
                }
                return 0;
            };
            if (productos.length > 0) productos.sort(compare);
            //console.log("DATYYYY : ", productos);
        } else if (ordenarPor == 3) {
            const compare = (a, b) => {
                if (a.price < b.price) {
                    return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                return 0;
            };
            if (productos.length > 0) productos.sort(compare);
        } else if (ordenarPor == 0) {
            /*
            const compare = (a, b) => {
                if (a.fechacreacion > b.fechacreacion) {
                    return -1;
                }
                if (a.fechacreacion < b.fechacreacion) {
                    return 1;
                }
                return 0;
            };
            if (productos.length > 0) productos.sort(compare);
            */
        }

        let filtprecio = [];
        for (var i = 0; i < productos.length; i++) {
            if (
                productos[i].price >= precioFiltroMinimo &&
                productos[i].price <= precioFiltroMaximo
            ) {
                if (productos[i].genericos != "productosgenericos") {
                    filtprecio.push(productos[i]);
                } else {
                    filtprecio.push(productos[i]);
                    longitud = 10;
                }
            }
        }

        let filtpreciodos = [];

        for (var i = 0; i < productoscategoria.length; i++) {
            if (
                productoscategoria[i].price >= precioFiltroMinimo &&
                productoscategoria[i].price <= precioFiltroMaximo
            ) {
                if (productoscategoria[i].genericos != "productosgenericos") {
                    filtpreciodos.push(productoscategoria[i]);
                } else {
                    filtpreciodos.push(productoscategoria[i]);
                    longitud = 10;
                }
            }
        }

        productos = filtprecio;
        productcategoryy = filtpreciodos;

        const inicio = (pagina - 1) * itemsPorPagina;
        const fin = inicio + itemsPorPagina;
        const arrayUnido = [...productos, ...productcategoryy];
        //console.log("arrayUnido", arrayUnido);

        //console.log("CITY2222222 : ", allprdciud2);
        let single = [];
        arrayUnido &&
            arrayUnido.map((row, index) => {
                allprdciud2 &&
                    allprdciud2.map((item, index) => {
                        if (row.ciudad == item.ciudad) {
                            let validar;
                            validar = single.includes(row.ciudad);
                            if (!validar) {
                                single.push(row.ciudad);
                                filtrarciud.push(item);
                            }
                        }
                    });
            });

        const totalItems = arrayUnido.length;
        totalPaginas = Math.ceil(totalItems / itemsPorPagina);

        const productosPagina = arrayUnido.slice(inicio, fin);

        const productosNormales = productosPagina.filter(
            (p) => p.productogenerico == "No"
        );
        const productosRecomendados = productosPagina.filter(
            (p) => p.productogenerico == "Si"
        );

        console.log("productosnormales", productosNormales);
        console.log("productosrecomendados", productosRecomendados);

        const esUltimoProductoNormal =
            inicio + productosNormales.length - 1 >= productos.length - 1;

        if (selectGrid == 1) {
            basePrecios = productos;
            if (esUltimoProductoNormal && productosRecomendados.length > 0) {
                console.log("productosRecomendados", productosRecomendados);
                productcategory = withGrid(productosRecomendados, loading, 4);
            }
            products = withGrid(productosNormales, loading, 4);
            let numreg = filtpreciodos.length;
            //console.log("PRODRC : ", prproductosRecomendadosPagina
            //console.log("CATEGOR : ", productcategory)
            controlItem = numreg;
            //console.log("CONTROLITEM : ", numreg)
        } else if (selectGrid == 2) {
            basePrecios = productosPagina;
            if (esUltimoProductoNormal && productosRecomendados.length > 0) {
                productcategory = withListMaximize(
                    productosRecomendados,
                    loading,
                    4
                );
            }
            products = withListMaximize(productosNormales, loading, 4);
            let numreg = filtpreciodos.length;
            //console.log("CONTROLITEM : ", numreg)
            controlItem = numreg;
        } else if (selectGrid == 3) {
            basePrecios = productosPagina;
            if (esUltimoProductoNormal && productosRecomendados.length > 0) {
                productcategory = withList(productosRecomendados, loading, 4);
            }
            products = withList(productosNormales, loading, 4);
            let numreg = filtpreciodos.length;
            controlItem = numreg;
            //console.log("CONTROLITEM : ", numreg)
        } else {
            basePrecios = productosPagina;
            if (esUltimoProductoNormal && productosRecomendados.length > 0) {
                productcategory = withGrid(productosRecomendados, loading, 4);
            }
            products = withGrid(productosNormales, loading, 4);
            let numreg = filtpreciodos.length;
            controlItem = numreg;
            //console.log("CONTROLITEM : ", numreg)
        }
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    useEffect(() => {
        setOk(true);
    }, [itemsPaginas]);

    useEffect(() => {
        if (dataProd.length > 0) {
            let numpag = dataProd.length / itemsPaginas + 0.9;
            let numpaginas = Math.trunc(numpag);

            let array = [];
            for (var i = 1; i <= numpaginas; i++) {
                array.push(i);
            }
            setNumeroPaginas(array);
            arraypag = array;
        }
    }, [citySelected, condition]);

    useEffect(() => {
        if (dataProd.length == 0) {
            setNumProdRel(1);
        } else if (controlItem >= 1 && controlItem <= 4 && selectGrid == 2) {
            setNumProdRel(1);
        } else if (controlItem >= 1 && controlItem <= 8 && selectGrid == 2) {
            setNumProdRel(2);
        } else if (controlItem > 8 && controlItem <= 16 && selectGrid == 2) {
            setNumProdRel(2);
        } else if (controlItem > 16 && controlItem <= 24 && selectGrid == 2) {
            setNumProdRel(2);
        } else if (controlItem > 24 && controlItem <= 34 && selectGrid == 2) {
            setNumProdRel(2);
        } else if (controlItem > 34 && controlItem <= 44 && selectGrid == 2) {
            setNumProdRel(3);
        } else if (controlItem > 40 && selectGrid == 2) {
            setNumProdRel(3);
        } else if (controlItem >= 1 && controlItem <= 3 && selectGrid == 2) {
            setNumProdRel(3);
        } else if (controlItem >= 4 && controlItem <= 7 && selectGrid == 3) {
            setNumProdRel(4);
        } else if (controlItem >= 7 && controlItem <= 10 && selectGrid == 3) {
            setNumProdRel(6);
        } else if (controlItem >= 10 && controlItem <= 13 && selectGrid == 3) {
            setNumProdRel(8);
        } else if (controlItem > 13 && controlItem <= 16 && selectGrid == 3) {
            setNumProdRel(10);
        } else if (controlItem > 16 && controlItem <= 24 && selectGrid == 3) {
            setNumProdRel(13);
        } else if (controlItem > 24 && controlItem <= 34 && selectGrid == 3) {
            setNumProdRel(17);
        } else if (controlItem > 34 && controlItem <= 44 && selectGrid == 3) {
            setNumProdRel(19);
        } else if (controlItem > 40 && selectGrid == 3) {
            setNumProdRel(21);
        } else if (controlItem >= 1 && controlItem <= 2) {
            setNumProdRel(1);
        } else if (controlItem >= 3 && controlItem <= 4) {
            setNumProdRel(2);
        } else if (controlItem >= 5 && controlItem <= 6) {
            setNumProdRel(3);
        } else if (controlItem >= 7 && controlItem <= 9) {
            setNumProdRel(3);
        } else if (controlItem > 8 && controlItem <= 16) {
            setNumProdRel(5);
        } else if (controlItem > 16 && controlItem <= 24) {
            setNumProdRel(6);
        } else if (controlItem > 24 && controlItem <= 34) {
            setNumProdRel(7);
        } else if (controlItem > 34 && controlItem <= 44) {
            setNumProdRel(9);
        } else if (controlItem > 40) {
            setNumProdRel(11);
        }
    }, [basePrecios, dataFind, selectGrid]);

    const cerrarCity = (dato) => {
        let ciudades = citySelected;
        let citysel = [];
        let contcity = [];
        ciudades &&
            ciudades.map((item, index) => {
                if (dato != item.idciu) {
                    citysel.push(item);
                } else setEraseCitySel(dato);
            });
        setCitySelected(citysel);
    };

    const cerrarFiltros = () => {
        setPrecioFiltroMinimo(1);
        setPrecioFiltroMaximo(100000000);

        setMenorPrecio(1);
        setMayorPrecio(100000000);

        setCerrarFiltro(true);
        setCitySelected([]);
        setSelected([]);
        setmarcaSelected("");
        setCondition(null);
        setitemSel(0);
        setitemSelCond(0);
        setFiltroCond(0);
        setMarcarCondicion("");
        setOrdenarPor(0);
        setTextoOrdenar("Ordenar por");
    };

    const handleClickScroll = () => {
        const element = document.getElementById("section-1");
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIrInicio(false);
    };

    useEffect(() => {
        if (irInicio) {
            handleClickScroll();
        }
    }, [irInicio]);

    useEffect(() => {
        if (citySelected.length > 0 && filtroCond > 0) {
            setClassCity("colorxcerrarfiltro apuntador");
            setClassCondicion("mt-60 mlmenos35");
            setClassCitySel("");
        } else {
            setClassCondicion("mt-60 mlmenos230");
            setClassCity("colorxcerrarfiltrodos apuntador");
            setClassCitySel("mlmenos50");
        }
    }, [citySelected, filtroCond]);

    useEffect(() => {
        // Reiniciar todos los filtros por nueva busqueda //
        cerrarFiltros();
        if (dataFind) {
            if (dataFind.length != dataProd.length) dataProd = dataFind;
        }
    }, [dataFind]);

    const SelectCondition = (item) => {
        if (filtroCond == item) {
            localStorage.setItem("filtrocondicionprd", JSON.stringify(0));
        }
        if (item == 1) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(0);
            setMarcarCondicion("");
        } else if (item == 2) {
            setCondition(null);
            setitemSelCond(0);
            setFiltroCond(0);
            setMarcarCondicion("");
        }
    };

    const regresarContactanos = () => {
        setDataSearch(false);
    };
    const containerProduRef = useRef(null);

    const handleChange = (event, value) => {
        sessionStorage.setItem("paginaActualGeneral", value);
        dispatch(getLongPage(value));

        setPagina(value);
    };

    // Guardar la página cuando estamos en la vista de lista y cambiamos la página
    useEffect(() => {
        // Hacer scroll suave hacia el contenedor
        if (containerProduRef.current) {
            containerProduRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [pagina]);

    useEffect(() => {
        if (longpage == 1) {
            setPagina(longpage);
        }
    }, [longpage]);

    return (
        <div className="ps-page ps-page--shopping">
            <div className="container" id="section-1">
                <div className=" ">
                    <BreadCrumbSearchContact breacrumb={breadcrumb} />
                    <br />
                    {holder == 0 ? (
                        <div className="contNewResultContact">
                            <div className="show1260pxSearch">
                                <div className="divIconResultMobilee">
                                    <div
                                        className="iconoreturncontactresultMobile"
                                        onClick={() => regresarContactanos()}>
                                        <IoMdArrowRoundBack />
                                    </div>
                                </div>
                                <p>
                                    ({dataProd.length}) Resultado de la
                                    búsqueda: “{datafindcontact}”
                                </p>
                            </div>
                        </div>
                    ) : resultFind == "" ||
                      !resultFind ||
                      !keyword ||
                      activaCiudad ||
                      !activaCiudad ||
                      actCity ? (
                        <a className="textoresultprod ps-page__heading">
                            ({dataProd.length}) Resultado de la búsqueda: “
                            {nombreres}”
                        </a>
                    ) : keyword != resultFind ||
                      activaCiudad ||
                      !activaCiudad ||
                      actCity ? (
                        <a className="textoresultprod ps-page__heading">
                            ({dataProd.length}) Resultado de la búsqueda: “
                            {resultFind}”
                        </a>
                    ) : (
                        <a className="textoresultprod ps-page__heading">
                            ({dataProd.length}) Resultado de la búsqueda: “
                            {keyword}”
                        </a>
                    )}
                </div>

                <div className=" ">
                    <Grid container alignItems="center" spacing={1}>
                        <div className="contenedor-ciudades-search-contactanos">
                            <Grid container spacing={1} columns={12}>
                                {/* Condición (Nuevo / Usado) */}
                                {filtroCond > 0 && (
                                    <Grid item xs={6} sm={4} md={2.4}>
                                        <div className="contSelectedItemResultsMobile">
                                            <p>
                                                {filtroCond === 1
                                                    ? "Nuevo"
                                                    : "Usado"}
                                            </p>
                                            <IoClose
                                                onClick={() =>
                                                    SelectCondition(filtroCond)
                                                }
                                            />
                                        </div>
                                    </Grid>
                                )}

                                {/* Ciudades seleccionadas */}
                                {citySelected.map((ciudad) => (
                                    <Grid
                                        item
                                        xs={6}
                                        sm={4}
                                        md={2.4}
                                        key={ciudad.idciu}>
                                        <div className="contSelectedItemResultsMobile">
                                            <p>{ciudad.nombreciu}</p>
                                            <IoClose
                                                onClick={() =>
                                                    cerrarCity(ciudad.idciu)
                                                }
                                            />
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Grid>
                </div>
                <br />
                <div className="">
                    <div className="ps-layout--with-sidebar-contactanos">
                        <div className="ps-layout__left">
                            <SidebarShopResults
                                filtrarciud={filtrarciud}
                                prdfiltrados={prdfiltrados}
                                setCantidadPrdCiudad={setCantidadPrdCiudad}
                                setActivar={setActivar}
                                cantidadPrdCiudad={cantidadPrdCiudad}
                                PrdCiudadUno={PrdCiudadUno}
                                PrdCiudadDos={PrdCiudadDos}
                                menorprecio={menorprecio}
                                mayorprecio={mayorprecio}
                                setMenorPrecio={setMenorPrecio}
                                setMayorPrecio={setMayorPrecio}
                                precioFiltroMinimo={precioFiltroMinimo}
                                setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                                precioFiltroMaximo={precioFiltroMaximo}
                                setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                                setSelected={setSelected}
                                marcaSelected={marcaSelected}
                                setmarcaSelected={setmarcaSelected}
                                marcarCondicion={marcarCondicion}
                                setMarcarCondicion={setMarcarCondicion}
                                condition={condition}
                                setCondition={setCondition}
                                numProdRel={numProdRel}
                                setActivaCiudad={setActivaCiudad}
                                activaCiudad={activaCiudad}
                                itemSel={itemSel}
                                setitemSel={setitemSel}
                                itemSelCond={itemSelCond}
                                setitemSelCond={setitemSelCond}
                                setFiltroCond={setFiltroCond}
                                filtroCond={filtroCond}
                                cerrarFiltro={cerrarFiltro}
                                setCerrarFiltro={setCerrarFiltro}
                                setEraseCitySel={setEraseCitySel}
                                eraseCitySel={eraseCitySel}
                                setCitySelected={setCitySelected}
                                citySelected={citySelected}
                                setIrInicio={setIrInicio}
                                setActCiy={setActCiy}
                                actCity={actCity}
                                setPaginaSel={setPaginaSel}
                                setitemIni={setitemIni}
                                setItemFin={setItemFin}
                                setclearFiltroCity={setclearFiltroCity}
                                filtroPrecio={filtroPrecio}
                                setFiltroPrecio={setFiltroPrecio}
                            />
                        </div>
                        <div className="ps-layout__right tamañocontainerresultContactanos">
                            <ModuleShopResults
                                setSelectGrid={setSelectGrid}
                                itemsPaginas={itemsPaginas}
                                setItemsPaginas={setItemsPaginas}
                                ordenarPor={ordenarPor}
                                setOrdenarPor={setOrdenarPor}
                                textoOrdenar={textoOrdenar}
                                setTextoOrdenar={setTextoOrdenar}
                                marcarCondicion={marcarCondicion}
                                setMarcarCondicion={setMarcarCondicion}
                                condition={condition}
                                setCondition={setCondition}
                                setFiltroCond={setFiltroCond}
                                filtroCond={filtroCond}
                                setitemSelCond={setitemSelCond}
                                setActCiy={setActCiy}
                                actCity={actCity}
                                setPaginaSel={setPaginaSel}
                                setitemIni={setitemIni}
                                setItemFin={setItemFin}
                                setIrInicio={setIrInicio}
                                menorprecio={menorprecio}
                                mayorprecio={mayorprecio}
                                setMenorPrecio={setMenorPrecio}
                                setMayorPrecio={setMayorPrecio}
                                precioFiltroMinimo={precioFiltroMinimo}
                                setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                                precioFiltroMaximo={precioFiltroMaximo}
                                setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                                setFiltroPrecio={setFiltroPrecio}
                                dataPrd={dataProd}
                                productItems={dataProd}
                                filtrarciud={filtrarciud}
                                cantidadPrdCiudad={cantidadPrdCiudad}
                                PrdCiudadUno={PrdCiudadUno}
                                PrdCiudadDos={PrdCiudadDos}
                                setActivar={setActivar}
                                setSelected={setSelected}
                                marcaSelected={marcaSelected}
                                setmarcaSelected={setmarcaSelected}
                                setActivaCiudad={setActivaCiudad}
                                activaCiudad={activaCiudad}
                                itemSel={itemSel}
                                setitemSel={setitemSel}
                                cerrarFiltro={cerrarFiltro}
                                setCerrarFiltro={setCerrarFiltro}
                                setEraseCitySel={setEraseCitySel}
                                eraseCitySel={eraseCitySel}
                                setCitySelected={setCitySelected}
                                setclearFiltroCity={setclearFiltroCity}
                                citySelected={citySelected}
                            />

                            <div ref={containerProduRef}>
                                <div className="notFoundProductSearch">
                                    <div className="notFoundSearchText">
                                        {productos.length == 0 && !isLoading ? (
                                            <h2>Producto no encontrado</h2>
                                        ) : null}
                                    </div>

                                    <div
                                        onClick={() => regresarContactanos()}
                                        className="notFoundButtonSearch">
                                        <p>No encontré el producto que busco</p>
                                    </div>
                                </div>

                                <br />

                                {isLoading ? <LoadingSearchResult /> : null}

                                <div className="mtmenos20">
                                    {productos.length > 0 ? (
                                        <div className={activar}>
                                            <ShopSearch classes="ps-shop--grid">
                                                {products}
                                            </ShopSearch>
                                        </div>
                                    ) : null}
                                </div>

                                {productcategory ? (
                                    <div>
                                        <div className="infoprodgenericos">
                                            ** Estos productos son recomendados
                                            para ti, pero pueden no coincidir
                                            exactamente con tu búsqueda **{" "}
                                        </div>

                                        <div className="mt-20">
                                            <ShopSearch classes="ps-shop--grid">
                                                {productcategory}
                                            </ShopSearch>
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            {ok ? (
                                <Stack
                                    spacing={2}
                                    alignItems="center"
                                    className="mt-[20px]">
                                    <StyledPagination
                                        count={totalPaginas}
                                        page={pagina}
                                        onChange={handleChange}
                                        variant="outlined"
                                        shape="rounded"
                                    />
                                </Stack>
                            ) : (
                                <Stack
                                    spacing={2}
                                    alignItems="center"
                                    className="mt-[20px]">
                                    <StyledPagination
                                        count={totalPaginas}
                                        page={pagina}
                                        onChange={handleChange}
                                        variant="outlined"
                                        shape="rounded"
                                    />
                                </Stack>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StyledPagination = muiStyled(Pagination)(({ theme }) => ({
    "& .MuiPaginationItem-root": {
        border: "none",
        backgroundColor: "transparent", // Sin fondo por defecto
        color: "#2D2E83", // Color azul para los números no seleccionados
        borderRadius: "0", // Sin borde redondeado para los números no seleccionados
        width: "32px",
        height: "32px",
        minWidth: "32px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        "&.Mui-selected": {
            backgroundColor: "#2D2E83", // Fondo azul para el número seleccionado
            color: "white", // Texto blanco en el número seleccionado
            borderRadius: "50%", // Bordes redondeados en la página seleccionada
            fontWeight: "bold", // Hacerlo más destacado
        },
        [theme.breakpoints.down("sm")]: {
            width: "26px",
            height: "26px",
            minWidth: "26px",
            fontSize: "1rem",
        },
    },
    "& .MuiPaginationItem-ellipsis": {
        backgroundColor: "transparent", // Sin fondo en elipsis
        color: "#2D2E83", // Color azul para elipsis
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        [theme.breakpoints.down("sm")]: {
            width: "26px",
            height: "26px",
            fontSize: "0.75rem",
        },
    },
    // Estilos para los botones "previous" y "next"
    "& .MuiPaginationItem-previousNext": {
        backgroundColor: "transparent",
        color: "#2D2E83", // azul
        borderRadius: "0", // sin círculos
        fontSize: "1.7rem", // tamaño más grande
        minWidth: "auto",
        width: "auto",
        height: "auto",
        "&:hover": {
            backgroundColor: "transparent",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.4rem",
        },
    },
}));

export default SearchContact;
