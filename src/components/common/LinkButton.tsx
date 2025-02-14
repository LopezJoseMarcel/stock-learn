import React from "react";
import Link from "next/link";

interface LinkParams {
    params: {
        text: string,
        href: string,
    }
}

export default function LinkButton( {params} : LinkParams ){

    return(
        <Link href={ params.href }>
          <p className="text-center text-customOrange_dark mt-4">{ params.text }</p>    
        </Link>
    )

}