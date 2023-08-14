import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import ElectricEngine from './../artifacts/ElectricEngine.json' //import project contract
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from "@drizzle/store";
import { newContextComponents } from "@drizzle/react-components";
import { useState, useEffect } from 'react';
import { useDrizzle, useDrizzleState } from '@drizzle/react-plugin';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { DrizzleContextProvider } from '@drizzle/react-plugin';
import { DrizzleContextConsumer } from '@drizzle/react-plugin';
import Navbar from './Navbar';
import './../index.css';
import './../css/form.css';

//Set contract in drizzle option
const drizzleOptions = { contracts: [ElectricEngine], };
const { AccountData, ContractData, ContractForm } = newContextComponents;
const drizzle = new Drizzle(drizzleOptions);

//Function to add m1 and m2
function add_m(item) {
    var state = drizzle.store.getState();
    var lotto = document.getElementById(item + "_input");
    var lotto_input = lotto.value;
    var success = false;

    //Ripristino lo stato del form
    lotto.style.borderColor = "#393E46";

    // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
    if (lotto_input !== "" && lotto_input !== null && lotto_input !== undefined && state.drizzleStatus.initialized) {
        try {
            if (item == "m1") {
                drizzle.contracts.ElectricEngine.methods.addm1(lotto_input).send();
                success = true;
            }
            else if (item == "m2") {
                drizzle.contracts.ElectricEngine.methods.addm2(lotto_input).send();
                success = true;
            }

        } catch (error) {
            console.log(error);
        }
    }

    //Modifico la form in base al risultato
    if (success) {
        lotto.style.borderColor = "green";
    }
    else {
        lotto.style.borderColor = "red";
    }

    setTimeout(() => {
        //Ripristino lo stato del form
        lotto.style.borderColor = "#393E46";
    }, 5000);
}

function CreateMotor() {

    var isM1 = React.useState(false);
    var isM2 = React.useState(false);
    isM1 = true;
    isM2 = false;

    var state = drizzle.store.getState();

    // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
    if (state.drizzleStatus.initialized) {
        try {
            let prom_isM1 = drizzle.contracts.ElectricEngine.methods.isM1().call();
            let prom_isM2 = drizzle.contracts.ElectricEngine.methods.isM2().call();

            //Visualize the answer
            prom_isM1.then(value => {
                isM1 = value;
                console.log("Is M1: " + isM1);
            });

            prom_isM2.then(value => {
                isM2 = value;
                console.log("Is M2: " + isM2);
            });

        } catch (error) {
            console.log(error);
        }
    }

    /*}
    else
        alert("Drizzle not initialized");
    {*/

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
                            <p className="">Please insert the data of your engine and click on the button</p>
                            <p className="text-center font-bold" id="responce">&nbsp;</p>
                            {/* M1 */}
                            <div className="" style={{ display: isM1 ? 'block' : 'none' }}>
                                <p htmlFor="m1_input" class="indent-1 font-semibold mb-1">Add m1</p>
                                <div className="pb-4 space-x-4 hidden sm:flex">
                                    <input
                                        className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md w-1/2 focus:border-[#393E46] focus:ring-[#393E46] w-5/6"
                                        type="text" id="m1_input" placeholder="M1 number" />
                                    <button type="button" onClick={add_m.bind(this, "m1")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1">Go!</button>
                                </div>
                            </div>
                            {/* M2 */}
                            <div className="" style={{ display: isM2 ? 'block' : 'none' }}>
                                <p htmlFor="m2_input" class="indent-1 font-semibold mb-1">Add m2</p>
                                <div className="pb-4 space-x-4 hidden sm:flex">
                                    <input
                                        className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md w-1/2 focus:border-[#393E46] focus:ring-[#393E46] w-5/6"
                                        type="text" id="m2_input" placeholder="M2 number" />
                                    <button type="button" onClick={add_m.bind(this, "m2")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1">Go!</button>
                                </div>
                            </div>
                            <br></br>
                            <hr></hr>
                            <br></br>
                            {/* Certify threads */}
                            <div className="" style={{ display: isM1 ? 'block' : 'none' }}>
                                <p htmlFor="m2_input" class="indent-1 font-semibold mb-1">Certify threads</p>
                                <div className="pb-4 space-x-4 hidden sm:flex">
                                    <input
                                        className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md w-1/2 focus:border-[#393E46] focus:ring-[#393E46] w-5/6"
                                        type="text" id="m2_input" placeholder="M1 number" />
                                    <button type="button" onClick={add_m.bind(this, "m2")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1">Go!</button>
                                </div>
                            </div>
                            {/* Certify cages */}
                        </div>
                    </form>
                </div>
            </DrizzleContext.Provider>
        </div>
    );
}

export default CreateMotor;