'use client'
import React, { useEffect, useState } from "react";
import LabelInfo from "../common/LabelInfo";
import { LabelInfoInterface } from "@/types/interfacesElement";
import axios from "axios";

interface paramsInterface {
    params: {
        userId: string;
    }
}

export default async function CapitalInfoSection({params}: paramsInterface) {

    const[ info , setInfo ] = useState<LabelInfoInterface[] | null>(null);

    useEffect(() => {
        const fetchMovements = async () => { 
            const { data }  = await axios.get( `/api/stockMovement?user_id=${params.userId}`);

            

        }
    }, []);

    return (
        <div className="container  mx-auto px-4 py-8">
            <LabelInfo params={{titleMoney:"US 100.000", titleText: "CAPITAL"}}/>
            <LabelInfo params={{titleMoney:"US 100.000", titleText: "PROFITS/LOSSES"}}/>
        </div>
    )
}