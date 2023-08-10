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

function CreateMotor() {
    return (
        <div>
            <Navbar />
            <DrizzleContext.Provider drizzle={drizzle}>
                <div className="items-center flex justify-center">
                    <form className="form flex rounded-lg w-1/2 mt-8" id="myform" onSubmit={(event) => { event.preventDefault(); }}>
                        <div className="flex-1 px-16 py-8">
                            <h1 className="text-3xl pb-2 text-center font-bold">
                                Create Motor here
                            </h1>
                            <br></br>
                            <p className="">Todo</p>
                            <p className="text-center font-bold" id="responce">&nbsp;</p>
                            <div className="">
                                <h2>Add m1</h2>
                                <DrizzleContext.Consumer>

                                    {drizzleContext => {

                                        //console.log(drizzleContext)
                                        const { drizzle, drizzleState, initialized } = drizzleContext;


                                        if (!initialized) {
                                            return "Loading..."
                                        }

                                        return (
                                            //Call contract's method
                                            <ContractForm drizzle={drizzle} contract='ElectricEngine' method='addm1' />
                                        )
                                    }}
                                </DrizzleContext.Consumer>

                                <h2>Add m2</h2>
                                <DrizzleContext.Consumer>

                                    {drizzleContext => {

                                        //console.log(drizzleContext)
                                        const { drizzle, drizzleState, initialized } = drizzleContext;


                                        if (!initialized) {
                                            return "Loading..."
                                        }

                                        //const myEvent = drizzle.contracts.ElectricEngine.events.addedm1()
                                        //.on("change", (event) => {
                                        // console.log("Event Data:", event.returnValues);

                                        // Perform further actions with the event data
                                        // })
                                        //.on("error", (error) => {
                                        //console.error("Event Error:", error);
                                        // Handle event error
                                        //});
                                        //console.log(myEvent);
                                        //const events = drizzleState.events[myEvent];
                                        //if (events) {
                                        //events.forEach((event) => {
                                        //console.log("Event Data:", event.returnValues);
                                        // Perform further actions with the event data
                                        //});
                                        // }

                                        return (
                                            //Call contract's method
                                            <ContractForm drizzle={drizzle} contract='ElectricEngine' method='addm2' />
                                        )
                                    }}
                                </DrizzleContext.Consumer>
                                <h2>Certify threads</h2>
                                <DrizzleContext.Consumer>

                                    {drizzleContext => {

                                        //console.log(drizzleContext)
                                        const { drizzle, drizzleState, initialized } = drizzleContext;


                                        if (!initialized) {
                                            return "Loading..."
                                        }

                                        return (

                                            <ContractForm drizzle={drizzle} contract='ElectricEngine' method='certificateThreads' />
                                        )
                                    }}
                                </DrizzleContext.Consumer>
                                <h2>Certify cages</h2>
                                <DrizzleContext.Consumer>

                                    {drizzleContext => {

                                        //console.log(drizzleContext)
                                        const { drizzle, drizzleState, initialized } = drizzleContext;


                                        if (!initialized) {
                                            return "Loading..."
                                        }

                                        return (
                                            //Call contract's method
                                            <ContractForm drizzle={drizzle} contract='ElectricEngine' method='certificateCage' />
                                        )
                                    }}
                                </DrizzleContext.Consumer>

                                <h2>Test engine</h2>
                                <DrizzleContext.Consumer>

                                    {drizzleContext => {

                                        //console.log(drizzleContext)
                                        const { drizzle, drizzleState, initialized } = drizzleContext;


                                        if (!initialized) {
                                            return "Loading..."
                                        }

                                        return (
                                            //Call contract's method
                                            <ContractForm drizzle={drizzle} contract='ElectricEngine' method='certificateEngines' />
                                        )
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

export default CreateMotor;

//Set contract in drizzle option
const drizzleOptions = { contracts: [ElectricEngine], };
const { AccountData, ContractData, ContractForm } = newContextComponents;
const drizzle = new Drizzle(drizzleOptions);