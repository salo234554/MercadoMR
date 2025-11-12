import React from "react";
import Link from "next/link";

const BreadViewPrdSearch = ({ breacrumb }) => {
    return (
        <ul className="breadcrumb box-breadcrumb-busqueda">
            {breacrumb.map((item) => {
                if (!item.url) {
                    return (
                        <li className="textlink3" key={item.id}>
                            {item.text}
                        </li>
                    );
                } else {
                    return (
                        <li key={item.text}>
                            <Link href={item.url}>
                                <div className="textlink">{item.text}</div>
                            </Link>
                        </li>
                    );
                }
            })}
        </ul>
    );
};

export default BreadViewPrdSearch;
