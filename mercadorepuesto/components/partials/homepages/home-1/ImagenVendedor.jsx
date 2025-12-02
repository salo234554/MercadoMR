import React from "react";
import { useRouter } from "next/router";

const ImagenVendedor = () => {
    const router = useRouter();
    const registrarse = () => {
        let datauser = JSON.parse(localStorage.getItem("datauser"));
        if (datauser?.uid) {
            router.push("/CreateProduct/createproduct");
        } else {
            router.push("/my-account");
        }
    };

    return (
        <div className="mainContImgVendedor">
            <img
                src="https://i.postimg.cc/QMyLvxpc/6.png"
                alt=""
                onClick={() => registrarse()}
            />
        </div>
    );
};

export default ImagenVendedor;
