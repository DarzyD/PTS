'use client';
import react, {useState, useEffect} from 'react';
import {Card, Input} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon.jsx";

export const SearchPatient = () => {

    return (
        <div style={{display:"flex", justifyContent: "center"}}>
        <Input
                classNames={{
                    base: "max-w-full sm:max-w-[10rem] h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder="Type to search for patients.."
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
            />
        <Button
             disableRipple
             className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
             size="lg">
            Search
        </Button>
        </div>
    )
}