import React from 'react';
import ElectricEngine from './../artifacts/ElectricEngine.json'
import ElectricPump from './../artifacts/ElectricPump.json'
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from "@drizzle/store";
import { useState } from 'react';
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
                    drizzle.contracts.ElectricPump.methods.addm1.cacheSend(lotto_input);
                    success = true;
                }
                else if (item === "m2") {
                    drizzle.contracts.ElectricPump.methods.addm2.cacheSend(lotto_input);
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
        if (item === "m1")
            title.textContent = "Add Producer";
        else if (item === "m2")
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
                if (item === "body") {
                    console.log("Certify body " + fatt_input + " " + producer_input);
                    drizzle.contracts.ElectricPump.methods.certificateBody.cacheSend(fatt_input, producer_input);
                    success = true;
                }
                else if (item === "engine") {
                    console.log("Certify engine " + fatt_input + " " + producer_input);
                    drizzle.contracts.ElectricPump.methods.certificateEngine.cacheSend(fatt_input, producer_input);
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

function certifyPump(withEngine) {
    var state = drizzle.store.getState();
    var body = document.getElementById("pump_body");
    var engine = document.getElementById("pump_engine");
    var frequency = document.getElementById("pump_frequency");
    var speed = document.getElementById("pump_speed");
    var depth = document.getElementById("pump_depth");
    var temperature = document.getElementById("pump_temperature");
    var object = document.getElementById("pump_object");
    var button = document.getElementById("pump_button");
    //var text = document.getElementById("pump_text");
    var title = document.getElementById("pump_title");
    var success = false;

    //Ripristino lo stato del form
    body.style.borderColor = "#393E46";
    engine.style.borderColor = "#393E46";
    frequency.style.borderColor = "#393E46";
    speed.style.borderColor = "#393E46";
    depth.style.borderColor = "#393E46";
    temperature.style.borderColor = "#393E46";
    object.style.borderColor = "#393E46";

    //Controllo dell'input
    var inputOk = true;
    inputOk = inputOk && body.value !== "" && body.value !== null && body.value !== undefined;
    inputOk = inputOk && engine.value !== "" && engine.value !== null && engine.value !== undefined;
    inputOk = inputOk && frequency.value !== "" && frequency.value !== null && frequency.value !== undefined;
    inputOk = inputOk && speed.value !== "" && speed.value !== null && speed.value !== undefined;
    inputOk = inputOk && depth.value !== "" && depth.value !== null && depth.value !== undefined;
    inputOk = inputOk && temperature.value !== "" && temperature.value !== null && temperature.value !== undefined;
    inputOk = inputOk && object.value !== "" && object.value !== null && object.value !== undefined;

    if (inputOk) {
        // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
        if (state.drizzleStatus.initialized) {
            try {
                console.log("Certify pump " + body.value + " " + engine.value + " " + frequency.value + " " + speed.value + " " + depth.value + " " + temperature.value + " " + object.value);

                if (withEngine === "true") {
                    console.log("Certify pump with engine");
                    drizzle.contracts.ElectricPump.methods.certificatePumpT.cacheSend(body.value, engine.value, frequency.value, speed.value, depth.value, temperature.value, object.value);
                    success = true;
                }
                else {
                    console.log("Certify pump without engine");
                    drizzle.contracts.ElectricPump.methods.certificatePumpA.cacheSend(body.value, engine.value, frequency.value, speed.value, depth.value, temperature.value, object.value);
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
        body.style.borderColor = "green";
        engine.style.borderColor = "green";
        frequency.style.borderColor = "green";
        speed.style.borderColor = "green";
        depth.style.borderColor = "green";
        temperature.style.borderColor = "green";
        object.style.borderColor = "green";
        body.value = "";
        engine.value = "";
        frequency.value = "";
        speed.value = "";
        depth.value = "";
        temperature.value = "";
        object.value = "";
        button.disabled = true;
        //title.textContent += " - Done!";
    }
    else {
        body.style.borderColor = "red";
        engine.style.borderColor = "red";
        frequency.style.borderColor = "red";
        speed.style.borderColor = "red";
        depth.style.borderColor = "red";
        temperature.style.borderColor = "red";
        object.style.borderColor = "red";
        title.textContent += " - Error!";
    }

    setTimeout(() => {
        //Ripristino lo stato del form
        body.style.borderColor = "#393E46";
        engine.style.borderColor = "#393E46";
        frequency.style.borderColor = "#393E46";
        speed.style.borderColor = "#393E46";
        depth.style.borderColor = "#393E46";
        temperature.style.borderColor = "#393E46";
        object.style.borderColor = "#393E46";
        button.disabled = false;
        title.textContent = "Certify pump";
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
                drizzle.contracts.ElectricPump.methods.delm1.cacheSend();
            }
            else if (item === "m2") {
                drizzle.contracts.ElectricPump.methods.delm2.cacheSend();
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
            let prom_isM1 = drizzle.contracts.ElectricPump.methods.isM1().call();
            let prom_isM2 = drizzle.contracts.ElectricPump.methods.isM2().call();
            let prom_isCertifier = drizzle.contracts.ElectricPump.methods.isCertifier_().call();

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

function CreatePump() {
    //To manage the state of the radio buttons
    var [withEngine, setWithEngine] = useState("true");
    const onOptionChange = e => { setWithEngine(e.target.value) };
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
                            <h1 className="text-3xl pb-2 text-center font-bold">
                                Certificate Electric Pump here
                            </h1>
                            <br></br>
                            <p className="">Please insert the data of your pump and click on the button</p>
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
                            {/* M2 */}
                            <div className="" style={{ display: isCertifier ? 'block' : 'none' }}>
                                <p htmlFor="m2_input" className="indent-1 font-semibold mb-1" id="m2_title">Add Tester</p>
                                <div className="pb-4 space-x-4 hidden sm:flex">
                                    <input
                                        className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md w-1/2 focus:border-[#393E46] focus:ring-[#393E46] w-5/6"
                                        type="text" id="m2_input" placeholder="Tester address" />
                                    <button type="button" onClick={add_m.bind(this, "m2")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1 hover:bg-[#222831]" id="m2_button">Go!</button>
                                </div>
                            </div>
                            {/* Certify body */}
                            <div className="" style={{ display: isM1 ? 'block' : 'none' }}>
                                <p className="indent-1 font-semibold mb-1" id="body_title">Certify body</p>
                                <div className="space-x-4 hidden sm:flex">
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] " type="number" id="body_fatt" placeholder="Invoice" />
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46]" type="text" id="body_producer" placeholder="Producer" />
                                    <button type="button" onClick={certify.bind(this, "body")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1 hover:bg-[#222831]" id="body_button">Go!</button>
                                </div>
                                <p className="indent-1" id="body_text">&nbsp;</p>
                            </div>
                            {/* Certify engine */}
                            <div className="" style={{ display: isM1 ? 'block' : 'none' }}>
                                <p className="indent-1 font-semibold mb-1" id="engine_title">Certify engine</p>
                                <div className="space-x-4 hidden sm:flex">
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] " type="number" id="engine_fatt" placeholder="Invoice" />
                                    <input className="border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46]" type="text" id="engine_producer" placeholder="Producer" />
                                    <button type="button" onClick={certify.bind(this, "engine")} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1 hover:bg-[#222831]" id="engine_button">Go!</button>
                                </div>
                                <p className="indent-1" id="engine_text">&nbsp;</p>
                            </div>
                            {/* Certify pump */}
                            <div className="" style={{ display: isM2 ? 'block' : 'none' }}>
                                <p className="indent-1 font-semibold mb-1" id="pump_title">Certify pump</p>
                                {/* Radio buttons */}
                                <div className="flex pb-4">
                                    <div className="flex items-center mr-4">
                                        <input type="radio" name="type" id="type_engine" value="true" checked={withEngine === "true"} onChange={onOptionChange} className="w-4 h-4 text-[#222831] focus:ring-[#222831] dark:focus:ring-[#222831] cursor-pointer" />
                                        <label htmlFor="type_engine" className="ml-2 cursor-pointer">With Engine Lotto Serial Number</label>
                                    </div>
                                    <div className="flex items-center mr-4 cursor-pointer">
                                        <input type="radio" name="type" id="type_pump" value="false" checked={withEngine === "false"} onChange={onOptionChange} className="w-4 h-4 text-[#222831] focus:ring-[#222831] dark:focus:ring-[#222831] cursor-pointer" />
                                        <label htmlFor="type_pump" className="ml-2 cursor-pointer">With Engine Invoice</label>
                                    </div>
                                </div>
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="pump_body" placeholder="Body Invoice" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type={withEngine === "true" ? "text" : "number"} id="pump_engine" placeholder={withEngine === "true" ? 'Engine Lot Serial Number' : 'Engine Invoice'} />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="pump_frequency" placeholder="Nominal Frequency (Hz)" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="pump_speed" placeholder="Speed at full capacity (RPM)" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="pump_depth" placeholder="Max depth (m)" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="number" id="pump_temperature" placeholder="Temperature (°C)" />
                                <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="text" id="pump_object" placeholder="Lot Serial Number" />
                                <div className="items-center flex justify-center">
                                    <button type="button" onClick={certifyPump.bind(this, withEngine)} className="bg-teal text-sm rounded-lg px-4 py-3 text-[#EEEEEE] w-1/6 ml-1 hover:bg-[#222831]" id="pump_button">Go!</button>
                                </div>
                                <p className="indent-1" id="pump_text">&nbsp;</p>
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

export default CreatePump;