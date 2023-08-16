import React from 'react';
import ElectricEngine from './../artifacts/ElectricEngine.json' //import project contract
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from "@drizzle/store";
/*
import { useForm, SubmitHandler } from "react-hook-form";
import { newContextComponents } from "@drizzle/react-components";
import { useState, useEffect } from 'react';
import { useDrizzle, useDrizzleState } from '@drizzle/react-plugin';
import { DrizzleProvider } from '@drizzle/react-plugin';
import { DrizzleContextProvider } from '@drizzle/react-plugin';
import { DrizzleContextConsumer } from '@drizzle/react-plugin';
*/
import Navbar from './Navbar';
import './../index.css';
import './../css/form.css';

//Set contract in drizzle option
const drizzleOptions = { contracts: [ElectricEngine], };
//const { AccountData, ContractData, ContractForm } = newContextComponents;
const drizzle = new Drizzle(drizzleOptions);

//Function to add m1 and m2
function add_m(item) {
    var state = drizzle.store.getState();
    var lotto = document.getElementById(item + "_input");
    var lotto_input = lotto.value;
    var button = document.getElementById(item + "_button");
    var title = document.getElementById(item + "_title");
    var success = false;

    //Ripristino lo stato del form
    lotto.style.borderColor = "#393E46";

    var inputOk = lotto_input !== "" && lotto_input !== null && lotto_input !== undefined;

    if (inputOk) {
        // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
        if (state.drizzleStatus.initialized) {
            try {
                if (item === "m1") {
                    drizzle.contracts.ElectricEngine.methods.addm1(lotto_input).send();
                    success = true;
                }
                else if (item === "m2") {
                    drizzle.contracts.ElectricEngine.methods.addm2(lotto_input).send();
                    success = true;
                }

            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("Drizzle not initialized");
        }
    }

    else {
        console.log("Input not ok");
    }

    //Modifico la form in base al risultato
    if (success) {
        lotto.style.borderColor = "green";
        lotto.value = "";
        button.disabled = true;
        title.textContent += " - Done!";
    }
    else {
        lotto.style.borderColor = "red";
        title.textContent += " - Error!";
    }

    setTimeout(() => {
        //Ripristino lo stato del form
        lotto.style.borderColor = "#393E46";
        button.disabled = false;
        title.textContent = "Add " + item;
    }, 5000);
}

//Function to certify Threads and Cages
function certify(item) {
    var state = drizzle.store.getState();
    var fatt = document.getElementById(item + "_fatt");
    var producer = document.getElementById(item + "_producer");
    var button = document.getElementById(item + "_button");
    //var text = document.getElementById(item + "_text");
    var title = document.getElementById(item + "_title");
    var fatt_input = fatt.value;
    var producer_input = producer.value;
    var success = false;

    //Ripristino lo stato del form
    fatt.style.borderColor = "#393E46";
    producer.style.borderColor = "#393E46";

    //Controllo dell'input
    var inputOk = true;
    inputOk = inputOk && fatt_input !== "" && fatt_input !== null && fatt_input !== undefined;
    inputOk = inputOk && producer_input !== "" && producer_input !== null && producer_input !== undefined;

    if (inputOk) {
        // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
        if (state.drizzleStatus.initialized) {
            try {
                if (item === "threads") {
                    console.log("Certify threads " + fatt_input + " " + producer_input);
                    drizzle.contracts.ElectricEngine.methods.certificateThreads(fatt_input, producer_input).send();
                    success = true;
                }
                else if (item === "cages") {
                    console.log("Certify cages " + fatt_input + " " + producer_input);
                    drizzle.contracts.ElectricEngine.methods.certificateCage(fatt_input, producer_input).send();
                    success = true;
                }

                //drizzle.contracts.ElectricEngine.methods.

            } catch (error) {
                console.log(error);
            }
        }
        else
            console.log("Drizzle not initialized");
    }
    else {
        console.log("Input not ok");
    }

    //Modifico la form in base al risultato
    if (success) {
        fatt.style.borderColor = "green";
        producer.style.borderColor = "green";
        fatt.value = "";
        producer.value = "";
        button.disabled = true;
        title.textContent += " - Done!";
    }
    else {
        fatt.style.borderColor = "red";
        producer.style.borderColor = "red";
        title.textContent += " - Error!";
    }

    setTimeout(() => {
        //Ripristino lo stato del form
        fatt.style.borderColor = "#393E46";
        producer.style.borderColor = "#393E46";
        button.disabled = false;
        title.textContent = "Certify " + item;
    }, 5000);
}

function certifyEngine() {
    var state = drizzle.store.getState();
    var threads = document.getElementById("engine_threads");
    var cages = document.getElementById("engine_cages");
    var temperature = document.getElementById("engine_temperature");
    var voltage = document.getElementById("engine_voltage");
    var frequency = document.getElementById("engine_frequency");
    var y = document.getElementById("engine_y");
    var object = document.getElementById("engine_object");
    var button = document.getElementById("engine_button");
    //var text = document.getElementById("engine_text");
    var title = document.getElementById("engine_title");
    var success = false;

    //Ripristino lo stato del form
    threads.style.borderColor = "#393E46";
    cages.style.borderColor = "#393E46";
    temperature.style.borderColor = "#393E46";
    voltage.style.borderColor = "#393E46";
    frequency.style.borderColor = "#393E46";
    y.style.borderColor = "#393E46";
    object.style.borderColor = "#393E46";

    //Controllo dell'input
    var inputOk = true;
    inputOk = inputOk && threads.value !== "" && threads.value !== null && threads.value !== undefined;
    inputOk = inputOk && cages.value !== "" && cages.value !== null && cages.value !== undefined;
    inputOk = inputOk && temperature.value !== "" && temperature.value !== null && temperature.value !== undefined;
    inputOk = inputOk && voltage.value !== "" && voltage.value !== null && voltage.value !== undefined;
    inputOk = inputOk && frequency.value !== "" && frequency.value !== null && frequency.value !== undefined;
    inputOk = inputOk && y.value !== "" && y.value !== null && y.value !== undefined;
    inputOk = inputOk && object.value !== "" && object.value !== null && object.value !== undefined;

    if (inputOk) {
        // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
        if (state.drizzleStatus.initialized) {
            try {
                console.log("Certify engine " + threads.value + " " + cages.value + " " + temperature.value + " " + voltage.value + " " + frequency.value + " " + y.value + " " + object.value);
                drizzle.contracts.ElectricEngine.methods.certificateEngines(cages.value, threads.value, temperature.value, voltage.value, frequency.value, y.value, object.value).send();
                success = true;

            } catch (error) {
                console.log(error);
            }
        }
        else
            console.log("Drizzle not initialized");
    }
    else {
        console.log("Input not ok");
    }

    //Modifico la form in base al risultato
    if (success) {
        threads.style.borderColor = "green";
        cages.style.borderColor = "green";
        temperature.style.borderColor = "green";
        voltage.style.borderColor = "green";
        frequency.style.borderColor = "green";
        y.style.borderColor = "green";
        object.style.borderColor = "green";
        threads.value = "";
        cages.value = "";
        temperature.value = "";
        voltage.value = "";
        frequency.value = "";
        y.value = "";
        object.value = "";
        button.disabled = true;
        title.textContent += " - Done!";
    }
    else {
        threads.style.borderColor = "red";
        cages.style.borderColor = "red";
        temperature.style.borderColor = "red";
        voltage.style.borderColor = "red";
        frequency.style.borderColor = "red";
        y.style.borderColor = "red";
        object.style.borderColor = "red";
        title.textContent += " - Error!";
    }

    setTimeout(() => {
        //Ripristino lo stato del form
        threads.style.borderColor = "#393E46";
        cages.style.borderColor = "#393E46";
        temperature.style.borderColor = "#393E46";
        voltage.style.borderColor = "#393E46";
        frequency.style.borderColor = "#393E46";
        y.style.borderColor = "#393E46";
        object.style.borderColor = "#393E46";
        button.disabled = false;
        title.textContent = "Certify engine";
    }, 5000);
}

function CreateMotor() {

    var [isM1, updateM1] = React.useState(false);
    var [isM2, updateM2] = React.useState(false);
    var [isCertifier, updateCertifier] = React.useState(false);

    var state = drizzle.store.getState();

    // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
    if (state.drizzleStatus.initialized) {
        try {
            let prom_isM1 = drizzle.contracts.ElectricEngine.methods.isM1().call();
            let prom_isM2 = drizzle.contracts.ElectricEngine.methods.isM2().call();
            let prom_isCertifier = drizzle.contracts.ElectricEngine.methods.isCertifier().call();

            //Visualize the answer
            prom_isM1.then(value => {
                updateM1(value);
                //console.log("Is M1: " + isM1);
            });

            prom_isM2.then(value => {
                updateM2(value);
                //console.log("Is M2: " + isM2);
            });            
            
            prom_isCertifier.then(value => {
                updateCertifier(value);
                //console.log("Is Certifier: " + isCertifier);
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
                    <form className="form flex rounded-lg w-1/2 my-8 min-w-[650px]" id="myform" onSubmit={(event) => { event.preventDefault(); }}>
                        <div className="flex-1 px-16 py-8">
                            <h1 className="text-3xl pb-2 text-center font-bold">
                                Create Motor here
                            </h1>
                            <br></br>
                            <p className="">Please insert the data of your engine and click on the button</p>
                            <p className="text-center font-bold" id="responce">&nbsp;</p>
                            {/* M1 */}
                            <div className="" style={{ display: isCertifier ? 'block' : 'none' }}>
                                <p htmlFor="m1_input" className="indent-1 font-semibold mb-1" id="m1_title">Add m1</p>
                                <div className="pb-4 space-x-4 hidden sm:flex">
                                    <input
                                        className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md w-1/2 focus:border-[#393E46] focus:ring-[#393E46] w-5/6"
                                        type="number" id="m1_input" placeholder="M1 number" />
                                    <button type="button" onClick={add_m.bind(this, "m1")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1" id="m1_button">Go!</button>
                                </div>
                            </div>
                            {/* M2 */}
                            <div className="" style={{ display: isCertifier ? 'block' : 'none' }}>
                                <p htmlFor="m2_input" className="indent-1 font-semibold mb-1" id="m2_title">Add m2</p>
                                <div className="pb-4 space-x-4 hidden sm:flex">
                                    <input
                                        className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md w-1/2 focus:border-[#393E46] focus:ring-[#393E46] w-5/6"
                                        type="number" id="m2_input" placeholder="M2 number" />
                                    <button type="button" onClick={add_m.bind(this, "m2")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1" id="m2_button">Go!</button>
                                </div>
                            </div>
                            {/* Certify threads */}
                            <div className="" style={{ display: isM1 ? 'block' : 'none' }}>
                                <p className="indent-1 font-semibold mb-1" id="threads_title">Certify threads</p>
                                <div className="space-x-4 hidden sm:flex">
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] " type="number" id="threads_fatt" placeholder="Invoice" />
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46]" type="text" id="threads_producer" placeholder="Producer" />
                                    <button type="button" onClick={certify.bind(this, "threads")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1" id="threads_button">Go!</button>
                                </div>
                                <p className="indent-1" id="threads_text">&nbsp;</p>
                            </div>
                            {/* Certify cages */}
                            <div className="" style={{ display: isM1 ? 'block' : 'none' }}>
                                <p className="indent-1 font-semibold mb-1" id="cages_title">Certify cages</p>
                                <div className=" space-x-4 hidden sm:flex">
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] " type="number" id="cages_fatt" placeholder="Invoice" />
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46]" type="text" id="cages_producer" placeholder="Producer" />
                                    <button type="button" onClick={certify.bind(this, "cages")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1" id="cages_button">Go!</button>
                                </div>
                                <p className="indent-1" id="cages_text">&nbsp;</p>
                            </div>
                            {/* Certify engine */}
                            <div className="" style={{ display: isM2 ? 'block' : 'none' }}>
                                <p className="indent-1 font-semibold mb-1" id="engine_title">Certify engine</p>
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_threads" placeholder="Threads Invoice" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_cages" placeholder="Cages Invoice" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_temperature" placeholder="Temperature" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_voltage" placeholder="Voltage" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_frequency" placeholder="Frequency" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_y" placeholder="Y" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="text" id="engine_object" placeholder="Object" />
                                <div className="items-center flex justify-center">
                                    <button type="button" onClick={certifyEngine} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1" id="engine_button">Go!</button>
                                </div>
                                <p className="indent-1" id="engine_text">&nbsp;</p>
                            </div>
                        </div>
                    </form>
                </div>
            </DrizzleContext.Provider>
        </div>
    );
}

export default CreateMotor;