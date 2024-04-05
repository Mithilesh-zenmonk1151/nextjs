"use client"

import { useRouter } from "next/router";
import React, { MouseEventHandler, useCallback, useReducer, useRef } from "react";

export default function({children}:{children: React.ReactNode}){
    const overlay= useRef(null);
    const wrapper= useRef(null);
    const router = useRouter();
    const onDismiss= useCallback(()=>{
        router.back();
    },[router])

    const onClick: MouseEventHandler=useCallback(
        (e)=>{
            if(e.target===overlay.current || e.target===wrapper.current){
                if(onDismiss){
                    onDismiss();
                }
            }
        },
        [onDismiss,overlay,wrapper]
    );

}