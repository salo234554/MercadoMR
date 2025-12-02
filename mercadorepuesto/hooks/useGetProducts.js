import { useState, useEffect } from "react";
import axios from "axios";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";
import ProductRepository from "~/repositories/ProductRepository";
import { getUpdateData } from "~/store/updatedata/action"
//export const baseDomain = "https://api.aal-estate.com/mrp/api";
export const baseDomain = "https://mercadorepuesto.gimcloud.com/mrp/api/";
import { useRouter } from "next/router";
import { URL_BD_MR } from "../helpers/Constants";
import { useDispatch, useSelector } from "react-redux";

let tiposgenericos = [
    { value: -1, name: "Estéticos y cuidados del vehículo" },
    { value: -2, name: "Accesorios interior" },
    { value: -3, name: "Accesorios exterior" },
    { value: -4, name: "Sistemas de sonido y entretenimiento" },
    { value: -5, name: "Iluminación, exploradoras y partes eléctricas" },
    { value: -6, name: "Lubricantes y fluidos" },
    { value: -7, name: "Llantas y rines" },
    { value: -8, name: "Baterías" },
    { value: -9, name: "Plumillas" },
    { value: -10, name: "Herramientas y kit de carreteras" },
]

export default function useGetProducts() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [restData, setRestData] = useState([]);
    const [dataPayload, setDataPayload] = useState(null);
    const [subCateGenericos, setSubCateGenericos] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let subcategenericos = JSON.parse(localStorage.getItem("subcategenericos"));
        setSubCateGenericos(subcategenericos);
    }, [])

    return {
        loading,
        product,
        productItems,
        category,
        dataPayload,
        setLoading: (payload) => {
            setLoading(payload);
        },

        getProductsByCollection: async (payload, pageSize = 8) => {
            setLoading(true);
            const responseData = await getProductsByCollectionHelper(
                payload,
                pageSize
            );
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getUsers: async (payload) => {

            setLoading(true);
            let responseData;
            let url = URL_BD_MR + '4'

            if (payload) {
                responseData = await axios(
                    {
                        method: 'post',
                        url: url,
                        params: payload
                    })
            } else {
                console.log("ERROR CREANDO USUARIO")
            }
        },

        getProducts: async (payload) => {
            //console.log("PAYLOADX : ", payload.name_contains)
            let esgenerico = JSON.parse(localStorage.getItem("esgenerico"));
            let posicionprd = JSON.parse(localStorage.getItem("posicionprd"));

            setLoading(true);
            let responseData;
            let cadena = "";
            let palabrasseparadas = 0;
            let separatewords = [];
            let datfind = "0";
            let wordcomplete;
            let conectores = JSON.parse(localStorage.getItem("dataconectores"));

            if (payload) {

                if (payload.name_contains)
                    cadena = payload.name_contains;

                setDataPayload(payload.name_contains);

                datfind = JSON.parse(localStorage.getItem("placeholdersearch"));
                wordcomplete = JSON.parse(localStorage.getItem("placeholdersearch"));

                if (!datfind)
                    datfind = "";

                palabrasseparadas = cadena.split(' ')

                let longconectors = [];

                if (conectores)
                    longconectors = conectores.length;

                palabrasseparadas &&
                    palabrasseparadas.map((row) => {
                        let continuar = true;
                        for (var i = 0; i < longconectors; i++) {
                            let item = conectores[i].conector.toLowerCase()
                            if (item == row.toLowerCase() || "" == row.toLowerCase()) {
                                continuar = false;
                                break;
                            }
                        }
                        if (continuar)
                            separatewords.push(row.toLowerCase());
                    });

                let selectvehgarage = JSON.parse(localStorage.getItem("selectvehgarage"));
                let carroceriaselect = JSON.parse(localStorage.getItem("carroceriaselect"));
                let datasearchinteractive = JSON.parse(localStorage.getItem("datasearchinteractive"));

                if (selectvehgarage) {
                    //let dataResponse = await ProductRepository?.getProducts(payload);
                    let marcasselectsearch = JSON.parse(localStorage.getItem("marcasselectsearch"));
                    let selectvehgarage = JSON.parse(
                        localStorage.getItem("selectvehgarage")
                    );

                    let params = {
                        tipovehiculo: selectvehgarage?.ids.type,
                        payload: payload
                    }

                    //datasearchinteractive
                    let datafind = await ProductRepository?.getProductsSearch(params);

                    let resultarray = [];

                    marcasselectsearch &&
                        marcasselectsearch.map((item) => {
                            datafind &&
                                datafind.map((row) => {
                                    if (parseInt(item.tipovehiculo) === parseInt(row.idtipovehiculo) &&
                                        item.value == row.idmarca) {
                                        resultarray?.push(row);
                                    }
                                });
                        });

                    marcasselectsearch &&
                        marcasselectsearch.map((item) => {
                            datafind &&
                                datafind.map((row) => {
                                    if (parseInt(item.tipovehiculo) === parseInt(row.idtipovehiculo) &&
                                        item.value == row.idmarcacompatible) {
                                        resultarray?.push(row);
                                    }
                                });
                        });


                    //console.log("RESPDATA1111 :", resultarray);
                    sessionStorage.setItem("dataprdrela", JSON.stringify(resultarray));
                    responseData = resultarray;
                    //console.log("RESPDATA1111FFFFF :", responseData, " - ", carroceriaselect, " - ", payload);

                } else
                    if (carroceriaselect) {

                        let marcasselectsearch = JSON.parse(localStorage.getItem("marcasselectsearch"));
                        let tipovehiculo = JSON.parse(localStorage.getItem("tipovehiculo"));
                        let data = datasearchinteractive;

                        console.log("RESPDATA22222307XXXXX :", marcasselectsearch, " - ", data);
                        let params = {
                            tipovehiculo: marcasselectsearch[0]?.tipovehiculo ? marcasselectsearch[0]?.tipovehiculo
                                : tipovehiculo,
                            payload: payload
                        }

                        //datasearchinteractive
                        let datafind = await ProductRepository?.getProductsSearch(params);

                        console.log("RESPDATA22222111 :", datafind, " - ", params);

                        //console.log("RESPDATA0005555 :", datafind, " - ", params);
                        let resultarray = [];

                        marcasselectsearch &&
                            marcasselectsearch.map((item) => {
                                datafind &&
                                    datafind.map((row) => {
                                        if (parseInt(item.tipovehiculo) === parseInt(row.idtipovehiculo) &&
                                            item.value == row.idmarca) {
                                            resultarray?.push(row);
                                        }
                                    });
                            });

                        console.log("RESPDATA22222307 :", resultarray);

                        marcasselectsearch &&
                            marcasselectsearch.map((item) => {
                                datafind &&
                                    datafind.map((row) => {
                                        if (parseInt(item.tipovehiculo) === parseInt(row.idtipovehiculo) &&
                                            item.value == row.idmarcacompatible) {
                                            resultarray?.push(row);
                                        }
                                    });
                            });

                        console.log("RESPDATA22222111 :", resultarray);
                        responseData = resultarray;
                        sessionStorage.setItem("dataprdrela", JSON.stringify(resultarray));
                        //console.log("RESPDATA22222FFFFF :", responseData, " - ", carroceriaselect, " - ", payload);
                    } else
                        if (posicionprd == 99999) {

                            let datagarage = JSON.parse(localStorage.getItem("datagarage"));

                            let responseData9 = await ProductRepository?.getProductGaraje9(datagarage);
                            //console.log("PAYLOCATEGORNUEVE : ", responseData9);

                            let responseData8 = await ProductRepository?.getProductGaraje8(datagarage);
                            //console.log("PAYLOCATEGOROCHO : ", responseData8);

                            let responseData7 = await ProductRepository?.getProductGaraje7(datagarage);
                            //console.log("PAYLOCATEGORSIETE : ", responseData7);

                            let responseData6 = await ProductRepository?.getProductGaraje6(datagarage);
                            //console.log("PAYLOCATEGORSEIS : ", responseData6);

                            let responseData5 = await ProductRepository?.getProductGaraje5(datagarage);
                            //console.log("PAYLOCATEGORCINCO : ", responseData5);

                            let resultarray = [];

                            if (responseData9?.length > 0)
                                resultarray?.push(...responseData9)

                            if (responseData8?.length > 0)
                                resultarray?.push(...responseData8)

                            if (responseData7?.length > 0)
                                resultarray?.push(...responseData7)

                            if (responseData6?.length > 0)
                                resultarray?.push(...responseData6)

                            if (responseData5?.length > 0)
                                resultarray?.push(...responseData5)

                            //console.log("RESPDATA3333 :", resultarray);
                            sessionStorage.setItem("dataprdrela", JSON.stringify(resultarray));
                            responseData = resultarray;

                        } else
                            if (posicionprd == 0) {

                                //console.log("RESPDATA444PAYLOAD : ", payload)
                                responseData = await ProductRepository?.getProducts(payload);
                                //console.log("RESPDATA44444 :", responseData);
                            } else {

                                let params = {
                                    name_contains: payload.name_contains,
                                    posicionprd: posicionprd
                                };
                                //console.log("posicionprd : ", params);
                                responseData = await ProductRepository?.getProductCategories(params);
                                //console.log("posicionprd : ", posicionprd)
                                //console.log("RESPDATA00000 :", params)
                                //console.log("RESPDATA55555 :", responseData)
                            }

                //console.log("RESPDATAUNO : ", responseData);
                if (responseData && responseData?.length > 0)
                    sessionStorage.setItem("dataprdrela", JSON.stringify(responseData));
                setRestData(responseData);
            } else {

                const queries = {
                    _limit: 12,
                };
                
                responseData = await ProductRepository?.getProducts(queries);
                sessionStorage.setItem("dataprdrela", JSON.stringify(responseData));
                //console.log("RESPDATADOS : ", responseData);
                setRestData(responseData);
                //console.log("RESPDATA66666 :", responseData)
            }

            let datafiltrar = responseData;
            let itemsel = [];

            //DESDE AQUI

            /* Eliminar registro que no estan activos */
            datafiltrar &&
                datafiltrar?.map((row) => {
                    if (row?.estadopublicacion == 11 ||
                        row?.estadopublicacion == 31)
                        itemsel?.push(row)

                });
            //console.log("responseData : ", responseData)
            responseData = itemsel;

            //console.log("responseDataXXX : ", responseData);

            if (responseData) {
                //console.log("CARROFFFFF :", responseData)
                let control = [];
                let arrayuno = [];

                //console.log("PALABRASSEPARADAS : ", separatewords)
                separatewords &&
                    separatewords.map((row) => {
                        responseData &&
                            responseData.map((item, index) => {
                                let una = item?.name.toLowerCase() + " " + item?.condicion.toLowerCase() + " " +
                                    item?.descripcionproducto.toLowerCase() + " " + item?.marca.toLowerCase();

                                let validaracento;
                                let sinacento = "";
                                if (una.length > 0) {
                                    for (var i = 0; i < una.length; i++) {
                                        validaracento = una.substr(i, 1);
                                        if (validaracento == 'á')
                                            sinacento = sinacento + 'a';
                                        else
                                            if (validaracento == 'é')
                                                sinacento = sinacento + 'e';
                                            else
                                                if (validaracento == 'í')
                                                    sinacento = sinacento + 'i';
                                                else
                                                    if (validaracento == 'ó')
                                                        sinacento = sinacento + 'o';
                                                    else
                                                        if (validaracento == 'ú')
                                                            sinacento = sinacento + 'u';
                                                        else
                                                            sinacento = sinacento + validaracento;
                                    }
                                }

                                //console.log("ACENTO : ", sinacento, " - ", una)

                                let dos = row?.toLowerCase();
                                let tres = dos?.replace(",", "");
                                let cuatro = tres?.replace(" ", "");
                                let respuesta = sinacento?.includes(cuatro);

                                //if (respuesta) {
                                let it = {
                                    index: index,
                                    id: item?.id
                                }
                                control?.push(it);
                                arrayuno?.push(item);
                                //console.log("RESPDATYYYY : ", arrayuno);
                                //}
                            });
                    });

                //console.log("responseDataXXX : ", responseData);

                let resprod = [];
                let unico = [];
                let validar;
                //console.log("responseData : ", responseData);
                //console.log("RESULTADOS : ", resultado)
                let resultado = [];
                let arrayposprd = [];

                if (posicionprd > 0) {
                    responseData &&
                        responseData.map((item, index) => {
                            if (item?.posicionproducto == posicionprd) {
                                arrayposprd.push(item);
                            }
                        });
                }

                arrayuno &&
                    arrayuno.map((item, index) => {
                        resultado.push(item);
                    });

                arrayposprd &&
                    arrayposprd.map((item, index) => {
                        resultado.push(item);
                    });

                resultado &&
                    resultado.map((item, index) => {
                        let compara = item?.id + item?.name;
                        validar = unico.includes(compara);
                        if (!validar) {
                            unico.push(compara);
                            resprod.push(item);
                        }
                    });

                //console.log("RESPDATZZZZ : ", resprod);

                let validapalabras = [];
                let contarpalabras = [];
                let datosbase = [];
                let datosordenados = [];

                let long = [];

                if (conectores)
                    long = conectores.length;

                if (resprod.length > 0) {

                    datosbase = resprod;
                    resprod &&
                        resprod.map((item) => {
                            let contador = 0;

                            separatewords &&
                                separatewords.map((palabra) => {
                                    let compara = item?.marca.toLowerCase() + " " + item?.modelos.toLowerCase() +
                                        " " + item?.name.toLowerCase() + " " + item?.condicion.toLowerCase() +
                                        " " + item?.descripcionproducto.toLowerCase();
                                    validapalabras = compara.split(' ');

                                    let wordunique = [];
                                    let wordselect = [];

                                    let valid;
                                    validapalabras &&
                                        validapalabras.map((row) => {
                                            let palabraunique = item?.id + row;
                                            valid = wordunique.includes(palabraunique);
                                            if (!valid) {
                                                wordunique.push(palabraunique);
                                                wordselect.push(row);
                                            }
                                        });

                                    wordselect &&
                                        wordselect.map((row) => {
                                            let continuar = true;
                                            for (var i = 0; i < long; i++) {
                                                if (conectores[i].conector == row.toLowerCase()) {
                                                    continuar = false;
                                                    break;
                                                }
                                            }

                                            if (continuar) {
                                                if (row.toLowerCase().includes(palabra.toLowerCase()))
                                                    contador = contador + 1;
                                            }
                                        });
                                });

                            let cont = {
                                id: item?.id,
                                cantidad: contador
                            }
                            contarpalabras.push(cont);
                        });
                } else {

                    datosbase = responseData;
                    console.log("responseData0000 : ", responseData);

                    responseData &&
                        responseData.map((item) => {
                            let contador = 0;
                            separatewords &&
                                separatewords.map((palabra) => {
                                    validapalabras = item?.name.split(' ');
                                    validapalabras &&
                                        validapalabras.map((row) => {
                                            let continuar = true;
                                            for (var i = 0; i < long; i++) {
                                                let item = conectores[i].conector.toLowerCase();
                                                if (item == row.toLowerCase()) {
                                                    continuar = false;
                                                    break;
                                                }
                                            }

                                            if (continuar) {
                                                if (palabra.toLowerCase() == row.toLowerCase())
                                                    contador = contador + 1;
                                            }
                                        });
                                });
                            let cont = {
                                id: item?.id,
                                cantidad: contador
                            }
                            contarpalabras.push(cont);
                        });
                }

                let wordapart = datfind.split(' ')
                let equal = wordapart[0];

                let result = [];
                let norepeat = [];
                let contnorepeat = [];

                if (wordcomplete) {
                    datosbase &&
                        datosbase.map((item) => {
                            let texto = item?.name.toLowerCase() + " " + item?.descripcionproducto.toLowerCase() + " " +
                                item?.condicion.toLowerCase() + " " + item?.marca.toLowerCase() + " " +
                                item?.modelos.toLowerCase()
                            let partword = texto.split(' ');
                            let temdos = wordcomplete.split(' ');
                            let contador = 0;

                            partword &&
                                partword.map((row) => {
                                    temdos &&
                                        temdos.map((comp) => {
                                            if (row == comp) {
                                                contador = contador + 1;

                                                let rep = {
                                                    id: item?.id,
                                                    word: comp,
                                                    reg: contador
                                                }

                                                let repuno = item?.id + comp;

                                                let valid = contnorepeat.includes(repuno);
                                                if (!valid) {
                                                    norepeat.push(rep);
                                                    contnorepeat.push(repuno);
                                                }
                                            }
                                        });
                                });
                        });

                    let ordena = norepeat.sort((b, a) => {
                        return a.reg - b.reg;
                    });

                    //Se reemplaza por el array de ordena, para tomar la primera palabra de todos los productos
                    // y se ordena por la primera palabra en orden alfabetico.
                    let arrayordenar = [];
                    datosbase &&
                        datosbase.map((item) => {
                            let palabra = item?.name.split(" ");
                            let dat = {
                                idprd: item?.id,
                                nameprd: palabra[0]
                            }
                            arrayordenar.push(dat);
                        });

                    const mayoramenor = (a, b) => {
                        if (a.nameprd.toLowerCase() < b.nameprd.toLowerCase()) {
                            return -1;
                        }
                        if (a.nameprd.toLowerCase() > b.nameprd.toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    };

                    //console.log("Datos mapeados: ", clientsData);
                    arrayordenar && arrayordenar?.sort(mayoramenor);

                    //console.log("RESPDATIIIII : ", arrayordenar);

                    contnorepeat = [];

                    arrayordenar &&
                        arrayordenar.map((ord) => {
                            datosbase &&
                                datosbase.map((item) => {
                                    if (item?.id == ord.idprd) {
                                        if (isNaN(ord.nameprd)) {
                                            let valid = contnorepeat.includes(item?.id);
                                            if (!valid) {
                                                result.push(item);
                                                contnorepeat.push(item?.id);
                                            }
                                        }
                                    }
                                });
                        });

                    //console.log("RESPDATADOS : ", contnorepeat);
                    datosbase &&
                        datosbase.map((item) => {
                            let valid = contnorepeat.includes(item?.id);
                            if (!valid) {
                                result.push(item);
                            }
                        });
                } else {
                    datosbase &&
                        datosbase.map((item) => {
                            result.push(item);
                        });
                }

                //console.log("RESPDATAAAAA : ", result);
                const datagenericos = JSON.parse(localStorage.getItem("datagenericos"));

                if (payload.name_contains) {
                    subCateGenericos &&
                        subCateGenericos.map((row) => {
                            datagenericos &&
                                datagenericos.map((item) => {
                                    if (row.value == item?.posicionproducto) {
                                        let valid = contnorepeat.includes(item?.id);
                                        if (!valid) {
                                            result.push(item);
                                        }
                                    }
                                });
                        });
                }



                //Si selecciono categoria genericos filtra o elimina los no genericos
                let filtraresult = [];

                if (esgenerico) {
                    result &&
                        result.map((item) => {
                            //console.log("RESULT : ", item);
                            if (item?.productogenerico == "Si") {
                                filtraresult.push(item);
                            }
                        });
                } else
                    filtraresult = result;

                let prdid = [];
                let prdunicos = [];

                if (filtraresult.length === 0) {
                    filtraresult = result;
                }

                //console.log("responseData0000 : ", filtraresult);
                //AQUI
                filtraresult &&
                    filtraresult.map((item) => {
                        let valid = prdid.includes(item?.id);
                        if (!valid) {
                            prdid.push(item?.id);
                            prdunicos.push(item);
                        }
                    });

                //console.log("responseData1111 : ", prdunicos);
                datagenericos &&
                    datagenericos.map((item) => {
                        let valid = prdid.includes(item?.id);
                        if (!valid) {
                            prdid.push(item?.id);
                            prdunicos.push(item);
                        }
                    });

                setProductItems(prdunicos);
                dispatch(getUpdateData(true));
                console.log("responseData3333 : ", prdunicos);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            } else {
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );

                const datagenericos = JSON.parse(localStorage.getItem("datagenericos"));
                //localStorage.setItem("placeholdersearch", JSON.stringify(null));
                localStorage.setItem("eraseplaceholder", JSON.stringify(null));

                let result = [];
                let contnorepeat = [];

                subCateGenericos &&
                    subCateGenericos.map((row) => {
                        datagenericos &&
                            datagenericos.map((item) => {
                                if (row.value == item?.posicionproducto) {
                                    let valid = contnorepeat.includes(item?.id);
                                    if (!valid) {
                                        result.push(item);
                                    }
                                }
                            });
                    });

                let prdid = [];
                let prdunicos = [];

                result &&
                    result.map((item) => {
                        let valid = prdid.includes(item?.id);
                        if (!valid) {
                            prdid.push(item?.id);
                            prdunicos.push(item);
                        }
                    });

                //localStorage.setItem("selectvehgarage", JSON.stringify(newVehicle));
                let selectvehgarage = JSON.parse(localStorage.getItem("selectvehgarage"));

                console.log("PRDUNICOZZZZZ : ", prdunicos)
                setProductItems(prdunicos);
            }

            //CIERRA
        },

        getProductById: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository?.getProductsById(
                payload
            );

            if (responseData) {
                setProduct(responseData[0]);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getPublicatById: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository?.getPublicationById(
                payload
            );

            if (responseData) {
                setProduct(responseData[0]);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getCategoryBySlug: async (payload) => {
            setLoading(true);
            const response = await ProductRepository?.getPrductCategoryBySlug(
                payload
            );
            if (response) {
                setCategory(response);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },
    };
}
