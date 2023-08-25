import React from 'react';
import ElectricEngine from './../artifacts/ElectricEngine.json'
import ElectricPump from './../artifacts/ElectricPump.json'
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from "@drizzle/store";
import Navbar from './Navbar';
import './../index.css';
import './../css/form.css';

//Set contract in drizzle option
const drizzleOptions = { contracts: [ElectricEngine, ElectricPump], };
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
                    drizzle.contracts.ElectricEngine.methods.addm1.cacheSend(lotto_input);
                    success = true;
                }
                else if (item === "m2") {
                    drizzle.contracts.ElectricEngine.methods.addm2.cacheSend(lotto_input);
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
        //title.textContent += " - Done!";
    }
    else {
        lotto.style.borderColor = "red";
        title.textContent += " - Error!";
    }

    setTimeout(() => {
        //Ripristino lo stato del form
        lotto.style.borderColor = "#393E46";
        button.disabled = false;
        if(item === "m1")
            title.textContent = "Add Producer";
        else if(item === "m2")
            title.textContent = "Add Tester";
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
                    drizzle.contracts.ElectricEngine.methods.certificateThreads.cacheSend(fatt_input, producer_input);
                    success = true;
                }
                else if (item === "cages") {
                    drizzle.contracts.ElectricEngine.methods.certificateCage.cacheSend(fatt_input, producer_input);
                    success = true;
                }
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

        //title.textContent += " - Done!";
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
                drizzle.contracts.ElectricEngine.methods.certificateEngines.cacheSend(cages.value, threads.value, temperature.value, voltage.value, frequency.value, y.value, object.value);
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
        //title.textContent += " - Done!";
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

//Roles
var isM1, updateM1, isM2, updateM2, isCertifier, updateCertifier;

function ResignRole(item) {
    var state = drizzle.store.getState();

    // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
    if (state.drizzleStatus.initialized) {
        try {
            if (item === "m1") {
                drizzle.contracts.ElectricEngine.methods.delm1.cacheSend();
            }
            else if (item === "m2") {
                drizzle.contracts.ElectricEngine.methods.delm2.cacheSend();
            }
        } catch (error) {
            console.log(error);
        }
    }
    else
        console.log("Drizzle not initialized");
}

function getRole() {
    console.log("Get role");
    var state = drizzle.store.getState();
    // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
    if (state.drizzleStatus.initialized) {
        try {
            let prom_isM1 = drizzle.contracts.ElectricEngine.methods.isM1().call();
            let prom_isM2 = drizzle.contracts.ElectricEngine.methods.isM2().call();
            let prom_isCertifier = drizzle.contracts.ElectricEngine.methods.isCertifier_().call();

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
    else
        console.log("Drizzle not initialized");
}

function CreateMotor() {

    [isM1, updateM1] = React.useState(false);
    [isM2, updateM2] = React.useState(false);
    [isCertifier, updateCertifier] = React.useState(false);

    //Get the role of the user
    getRole();

    return (
        <div>
            <Navbar />
            <DrizzleContext.Provider drizzle={drizzle}>
                <div className="items-center flex justify-center">
                    <form className="form flex rounded-lg w-1/2 my-8 min-w-[650px]" id="myform" onSubmit={(event) => { event.preventDefault(); }}>
                        <div className="flex-1 px-16 py-8">
                            <h1 className="text-4xl font-semibold pb-2 text-center">
                                Certificate Electric Engine
                            </h1>
                            <br></br>
                            <p className="">Please insert the data of your engine and click on the button</p>
                            <p className="text-center font-bold" id="responce">&nbsp;</p>
                            {/* Producer */}
                            <div className="" style={{ display: isCertifier ? 'block' : 'none' }}>
                                <p htmlFor="m1_input" className="indent-1 font-semibold mb-1" id="m1_title">Add Producer</p>
                                <div className="pb-4 space-x-4 hidden sm:flex">
                                    <input
                                        className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md w-1/2 focus:border-[#393E46] focus:ring-[#393E46] w-5/6"
                                        type="text" id="m1_input" placeholder="Producer address" />
                                    <button type="button" onClick={add_m.bind(this, "m1")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1 hover:bg-[#222831]" id="m1_button">Go!</button>
                                </div>
                            </div>
                            {/* Tester */}
                            <div className="" style={{ display: isCertifier ? 'block' : 'none' }}>
                                <p htmlFor="m2_input" className="indent-1 font-semibold mb-1" id="m2_title">Add Tester</p>
                                <div className="pb-4 space-x-4 hidden sm:flex">
                                    <input
                                        className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md w-1/2 focus:border-[#393E46] focus:ring-[#393E46] w-5/6"
                                        type="text" id="m2_input" placeholder="Tester address" />
                                    <button type="button" onClick={add_m.bind(this, "m2")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1 hover:bg-[#222831]" id="m2_button">Go!</button>
                                </div>
                            </div>
                            {/* Certify threads */}
                            <div className="" style={{ display: isM1 ? 'block' : 'none' }}>
                                <p className="indent-1 font-semibold mb-1" id="threads_title">Certify threads</p>
                                <div className="space-x-4 hidden sm:flex">
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] " type="number" id="threads_fatt" placeholder="Invoice" />
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46]" type="text" id="threads_producer" placeholder="Producer" />
                                    <button type="button" onClick={certify.bind(this, "threads")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1 hover:bg-[#222831]" id="threads_button">Go!</button>
                                </div>
                                <p className="indent-1" id="threads_text">&nbsp;</p>
                            </div>
                            {/* Certify cages */}
                            <div className="" style={{ display: isM1 ? 'block' : 'none' }}>
                                <p className="indent-1 font-semibold mb-1" id="cages_title">Certify cages</p>
                                <div className=" space-x-4 hidden sm:flex">
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] " type="number" id="cages_fatt" placeholder="Invoice" />
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46]" type="text" id="cages_producer" placeholder="Producer" />
                                    <button type="button" onClick={certify.bind(this, "cages")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1 hover:bg-[#222831]" id="cages_button">Go!</button>
                                </div>
                                <p className="indent-1" id="cages_text">&nbsp;</p>
                            </div>
                            {/* Certify engine */}
                            <div className="" style={{ display: isM2 ? 'block' : 'none' }}>
                                <p className="indent-1 font-semibold mb-1" id="engine_title">Certify engine</p>
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_threads" placeholder="Threads Invoice" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_cages" placeholder="Cages Invoice" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_temperature" placeholder="Max Temperature (°C)" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_voltage" placeholder="Nominal Voltage (V)" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_frequency" placeholder="Nominal Frequency (Hz)" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="engine_y" placeholder="Motor Configuration" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="text" id="engine_object" placeholder="Lot Serial Number" />
                                <div className="items-center flex justify-center">
                                    <button type="button" onClick={certifyEngine} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1 hover:bg-[#222831]" id="engine_button">Go!</button>
                                </div>
                                <p className="indent-1" id="engine_text">&nbsp;</p>
                            </div>
                        </div>
                    </form>
                    <div className="fixed bottom-0 right-0 my-4 mx-8">
                        <p style={{ display: isM1 ? 'block' : 'none' }} className="text-red-500 underline font-semibold cursor-pointer text-right" onClick={ResignRole.bind(this, "m1")}>Resign Producer Role</p>
                        <p style={{ display: isM2 ? 'block' : 'none' }} className="text-red-500 underline font-semibold cursor-pointer text-right" onClick={ResignRole.bind(this, "m2")}>Resign Tester Role</p>
                    </div>
                </div>
            </DrizzleContext.Provider>
        </div>
    );
}

export default CreateMotor;