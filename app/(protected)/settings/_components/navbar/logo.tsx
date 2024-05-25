"use client"
import Link from "next/link";
import Image from "next/image";
import {Poppins} from "next/font/google";
import {useEffect, useState} from "react";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {

    return (
        <Link href="/">
            <div className="flex items-center marker:hover:opacity-75 transition">
                <div className="rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
                    <Image
                        src='/logo.svg'
                        alt="CorpNetCast"
                        height="23"
                        width="23"
                    />
                </div>
            </div>
        </Link>
    );
};