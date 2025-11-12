import React, { useEffect, useState } from "react";
import { getCtlrLongCadena } from "~/store/ctlrlongcadena/action";
import { useDispatch, useSelector } from "react-redux";

const CtlrInputData = ({ datainput }) => {
    const dispatch = useDispatch();

    const ctlrlongcadena = useSelector((state) => state.ctlrlongcadena.ctlrlongcadena);

    useEffect(() => {
        if (datainput?.length > 0) {
            let validar = String(datainput).split(' ');

            validar &&
                validar.map((item) => {
                    if (item.length > 23) {
                        dispatch(getCtlrLongCadena(true));
                    }
                });
        }

    }, [datainput])

    return (
        <div>
            
        </div>
    );
};

export default CtlrInputData;