import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { HiChevronLeft } from "react-icons/hi2";
import { HiChevronRight } from "react-icons/hi2";
import { RiSettings5Fill } from "react-icons/ri";
import axios from "axios";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../../helpers/Constants";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";

const RecomendadosParaTi = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);

    useEffect(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            let datauser = JSON.parse(localStorage.getItem("datauser"));
            let params = {
                usuario: datauser?.uid,
            };

            const response = await axios({
                method: "post",
                url: URL_BD_MR + "88",
                params,
            });

            if (response?.data?.type === 1) {
                // Selecciona 10 productos aleatorios de la respuesta
                let datahist = response?.data?.listarallhistoryvisitprd;
                let data = [];

                datahist &&
                    datahist.map((row, index) => {
                        if (index <= 99) {
                            data = [...data, row];
                        } else {
                            let params = {
                                usuario: datauser?.uid,
                                idproducto: row?.idproducto,
                            };

                            const deleteHistoryVeh = async () => {
                                const rest = await axios({
                                    method: "post",
                                    url: URL_BD_MR + "91",
                                    params,
                                });

                                if (rest?.data?.type === 1) {
                                    console.log(
                                        "Producto Eliminado del Historial : ",
                                        row?.idproducto
                                    );
                                } else {
                                    console.log(
                                        "Error al Eliminar Producto del Historial : ",
                                        row?.idproducto
                                    );
                                }
                            };

                            deleteHistoryVeh();
                        }
                    });

                let dataview = data;

                const mayoramenor = (b, a) => {
                    if (a.fechacreacion < b.fechacreacion) {
                        return -1;
                    }
                    if (a.fechacreacion > b.fechacreacion) {
                        return 1;
                    }
                    return 0;
                };

                //console.log("Datos mapeados: ", clientsData);
                dataview && dataview?.sort(mayoramenor);

                console.log("RESPONSEXXX : ", dataview);

                const randomProducts = dataview
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 10);
                setProducts(randomProducts);
                setLoaded(true);

                return;
            } else {
                console.error("Error al leer los datos del producto");
            }
        };

        fetchProducts();
    }, []);

    const addItemHistoryPrd = async (product) => {
        let datauser = JSON.parse(localStorage.getItem("datauser"));

        let params = {
            idproducto: product?.id,
            usuario: datauser?.uid,
            compatible: product?.compatible,
        };

        //console.log("PARMASSS: ", params)
        //return

        await axios({
            method: "post",
            url: URL_BD_MR + "87",
            params,
        })
            .then((res) => {
                console.log("EROR R RLEER : ", res.data);

                if (res.data > 0) {
                    console.log("LEER : ", res.data);
                } else console.log("ERROR : ", res.data);
            })
            .catch(function (error) {
                console.log("ERROR : ", res.data);
                return;
            });
    };

    return (
        <div className="mainProductosMasVendidos">
            <Grid container style={{ width: "100%" }}>
                <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ padding: 0, height: "60px" }}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-end"}>
                    <div className="TitleRecomendados">
                        <p>Recomendados para ti</p>
                    </div>
                </Grid>
                {/* <Grid item xs={12} style={{ padding: 0, marginTop: '2rem' }} /> */}
                <div className="mainMasVendidos">
                    <div
                        ref={navigationPrevRef}
                        className="my-custom-prev-button">
                        <HiChevronLeft />
                    </div>
                    <div
                        ref={navigationNextRef}
                        className="my-custom-next-button">
                        <HiChevronRight />
                    </div>
                    <div className="SubMainMasVendidos">
                        {loaded ? (
                            <Swiper
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    600: { slidesPerView: 2 }, // 📱 Móviles (1 slide por fila)
                                    768: { slidesPerView: 3 }, // 📱 Tablets (2 slides por fila)
                                    1024: { slidesPerView: 5 }, // 🖥️ Escritorio (3 slides por fila)
                                }}
                                slidesPerView={5}
                                navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}>
                                {console.log("PRODUCTS : ", products)}

                                {products.map((product, index) => (
                                    <SwiperSlide
                                        key={index}
                                        slidesPerView={3}
                                        style={{
                                            borderRight:
                                                "0.5px solid rgba(128, 128, 128, 0.1)",
                                        }}>
                                        <div
                                            className="SlideSwiper"
                                            onClick={() =>
                                                addItemHistoryPrd(product)
                                            }>
                                            <div className="SlideSwiperImgDescuento">
                                                <div className="subSlideSwiperImgDescuento">
                                                    <img
                                                        src={`${URL_IMAGES_RESULTS}${product?.nombreimagen1}`}
                                                        alt=""
                                                        onClick={() =>
                                                            router.push(
                                                                `/product/${product?.idproducto}`
                                                            )
                                                        }
                                                    />
                                                    <div className="circleDescuento">
                                                        -22%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="SlideSwiperPrecioyTexto">
                                                <div className="NombreProductoSwiper">
                                                    <p
                                                        onClick={() =>
                                                            router.push(
                                                                `/product/${product?.idproducto}`
                                                            )
                                                        }>
                                                        {product?.titulonombre}
                                                    </p>
                                                </div>
                                                <div className="precio2ProductoSwiper">
                                                    <p>
                                                        $
                                                        {product?.precio.toLocaleString(
                                                            "en-US"
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : null}
                    </div>
                </div>
            </Grid>
        </div>
    );
};

export default RecomendadosParaTi;
