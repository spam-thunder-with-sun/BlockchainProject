import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import ElectricEngine from './../artifacts/ElectricEngine.json' //import project contract
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from "@drizzle/store";
import { newContextComponents } from "@drizzle/react-components";
import { useState } from 'react';
import { useEffect } from 'react';
import { useDrizzle, useDrizzleState } from '@drizzle/react-plugin';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { DrizzleContextProvider } from '@drizzle/react-plugin';
import { DrizzleContextConsumer } from '@drizzle/react-plugin';
import Navbar from './Navbar';
import './../index.css';
import './../css/form.css';

function Admin() {
    return (
        <div>
            <Navbar />
            <DrizzleContext.Provider drizzle={drizzle}>
                <div className="items-center flex justify-center">
                    <form className="form flex rounded-lg w-1/2 mt-8" id="myform" onSubmit={(event) => { event.preventDefault(); }}>
                        <div className="flex-1 px-16 py-8">
                            <h1 className="text-3xl pb-2 text-center font-bold">
                                Set your account as a certifier
                            </h1>
                            <br></br>
                            <p className="">Please insert the key of your account and click on the button - Da rimuovere</p>
                            <p className="text-center font-bold" id="responce">&nbsp;</p>
                            <div className="">
                                <DrizzleContext.Consumer>
                                    {drizzleContext => {
                                        const { drizzle, drizzleState, initialized } = drizzleContext;
                                        if (!initialized) { return "Loading..." }
                                        return (<ContractForm drizzle={drizzle} contract='ElectricEngine' method='addcertifier' />)
                                    }}
                                </DrizzleContext.Consumer>
                            </div>
                        </div>
                    </form>
                </div>
            </DrizzleContext.Provider>
        </div>
    );
}

export default Admin;

//Set contract in drizzle option
const drizzleOptions = { contracts: [ElectricEngine], };
const { AccountData, ContractData, ContractForm } = newContextComponents;
const drizzle = new Drizzle(drizzleOptions);