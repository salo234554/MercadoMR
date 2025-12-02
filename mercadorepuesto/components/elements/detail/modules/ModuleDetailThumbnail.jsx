import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Lightbox from "react-image-lightbox";
import { baseUrl } from "~/repositories/Repository";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import Carousel from "react-bootstrap/Carousel";
import { Box, Grid, Button, useMediaQuery, useTheme } from "@mui/material";

let long = 5;
let itemindex = 0;
let ubicarImg = "";

const ModuleDetailThumbnail = ({ product, vertical = true }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [classArrow, setclassArrow] = useState("left-arrow");

    const imagesToShow = isMobile ? 3 : 4;

    const [current, setCurrent] = useState(0);
    const [imgInit, setImgInit] = useState(0);
    const [imgEnd, setImgEnd] = useState(imagesToShow - 1);
    const length = product?.images?.length || 0;

    // 🔁 Actualiza las ventanas visibles cuando cambia el índice actual o el tamaño de pantalla
    useEffect(() => {
        const group = Math.floor(current / imagesToShow);
        const imgInicia = group * imagesToShow;
        const imgFinal = Math.min(imgInicia + imagesToShow - 1, length - 1);

        setImgInit(imgInicia);
        setImgEnd(imgFinal);
    }, [current, imagesToShow, length]);

    const nextSlide = () => {
        setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
    };

    const nextSlideCarrusel = (index) => {
        setCurrent(index);
    };

    if (!Array.isArray(product?.images) || product.images.length <= 0) {
        return null;
    }

    /*
    useEffect(() => {
        let viewsearchinteractive = JSON.parse(
            localStorage.getItem("viewsearchinteractive")
        );

        if (viewsearchinteractive) {
            ubicarImg = "positionimgviewinteractive";
        } else {
            ubicarImg = "";
        }
    }, []);
*/

    return (
        <div className={ubicarImg}>
            <div>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs={1} md={1} lg={1}>
                        <FaAngleLeft
                            className="right-arrow-carrosuel"
                            onClick={prevSlide}
                        />
                    </Grid>
                    <Grid item xs={10} md={10} lg={10}>
                        <div>
                            {product &&
                                product.images &&
                                product &&
                                product.images.map((slide, index) => {
                                    let image = baseUrl + slide.url;
                                    itemindex = index;
                                    return (
                                        <div>
                                            {index == current && (
                                                <img
                                                    src={image}
                                                    alt="travel image"
                                                    className="imageFer sinborder "
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </Grid>
                    <Grid item xs={1} md={1} lg={1}>
                        <FaAngleRight
                            className="left-arrow-carrosuel"
                            onClick={() => nextSlide(0, 0)}
                        />
                    </Grid>
                </Grid>
            </div>
            <div
                className="flex justify-center items-center relative mt-5"
                style={{ width: "100%" }}>
                <FaAngleLeft className="right-arrow" onClick={prevSlide} />
                <FaAngleRight
                    className={"left-arrow"}
                    onClick={() => nextSlide(0, 0)}
                />
                <div></div>
                {product &&
                    product.images &&
                    product &&
                    product.images.map((slide, index) => {
                        let image = baseUrl + slide.url;

                        return (
                            <div key={index}>
                                {index >= imgInit &&
                                    index <= imgEnd &&
                                    (index == current ? (
                                        <img
                                            src={image}
                                            alt="travel imageall"
                                            className="imageallmarcada"
                                            onClick={() =>
                                                nextSlideCarrusel(index, 1)
                                            }
                                        />
                                    ) : (
                                        <img
                                            src={image}
                                            alt="travel imageall"
                                            className="imageall apuntador"
                                            onClick={() =>
                                                nextSlideCarrusel(index, 1)
                                            }
                                        />
                                    ))}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ModuleDetailThumbnail;
