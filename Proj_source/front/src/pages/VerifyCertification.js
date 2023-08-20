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
import './../index.css';
import './../css/form.css';
import Navbar from './/Navbar';

//Set contract in drizzle option
const drizzleOptions = { contracts: [ElectricEngine], };
const { AccountData, ContractData, ContractForm } = newContextComponents;
const drizzle = new Drizzle(drizzleOptions);

function VerifyCertification() {

    //Permette di gestire i radio button
    var [_type, setType] = useState("engine");
    const onOptionChange = e => { setType(e.target.value) };

    //Function to ask if the engines lot is certified
    function verifyLotCert() {
        var state = drizzle.store.getState();
        var lotto = document.getElementById('lotNumber').value;

        var textResponce = document.getElementById('responce');
        var form = document.getElementById('myform');

        // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
        if (lotto !== "" && lotto !== null && lotto !== undefined && state.drizzleStatus.initialized) {
            var dataKey;

            //Call contract's method
            if (_type === "pump")
                dataKey = drizzle.contracts.Pump.methods.isCertificatedPumps(lotto).call();
            else
                dataKey = drizzle.contracts.ElectricEngine.methods.isCertificatedEngines(lotto).call();

            //Visualize the answer
            dataKey.then(value => {
                if (value == true) {
                    textResponce.innerHTML = "Your " + _type + " is certified";
                    textResponce.style.color = "green";
                    form.style.borderColor = "green";
                }
                else {
                    textResponce.innerHTML = "Your " + _type + " is NOT certified";
                    textResponce.style.color = "red";
                    form.style.borderColor = "red";
                }
            })
        }
        else {
            form.style.borderColor = "#EEEEEE";
            textResponce.innerHTML = "Generic error";
            textResponce.style.color = "red";

            console.log("Generic error");
        }
    }


    return (
        <div>
            <Navbar />
            <DrizzleContext.Provider drizzle={drizzle}>
                <div className="items-center flex justify-center">
                    <form className="form flex rounded-lg w-1/2 mt-8 min-w-[650px]" id="myform" onSubmit={(event) => { event.preventDefault(); }}>
                        <div className="flex-1 px-16 py-8">
                            <h1 className="text-3xl pb-2 text-center font-bold">
                                Verify here if your engine or your pump is certified
                            </h1>
                            <br></br>
                            <p className="">Please insert the lot number and click on the "Verify" button</p>
                            <p className="text-center font-bold" id="responce">&nbsp;</p>
                            <div className="">
                                {/* Lot input field */}
                                <div className="">
                                    <label htmlFor="lotNumber" className={`block font-latoBold text-sm pb-2`}></label>
                                    <input className="mb-4 border-x-4 border-y-2 border-[#393E46] p-2 rounded-md focus:border-[#393E46] focus:ring-[#393E46] w-full" type="text" id="lotNumber" name="lotNumber" placeholder="Lot number" />
                                </div>
                                {/* Radio buttons */}
                                <div class="flex pb-4">
                                    <div class="flex items-center mr-4">
                                        <input type="radio" name="type" id="type_engine" value="engine" checked={_type === "engine"} onChange={onOptionChange} className="w-4 h-4 text-[#222831] focus:ring-[#222831] dark:focus:ring-[#222831] cursor-pointer" />
                                        <label htmlFor="type_engine" className="ml-2 cursor-pointer">Electric engine</label>
                                    </div>
                                    <div class="flex items-center mr-4 cursor-pointer">
                                        <input type="radio" name="type" id="type_pump" value="pump" checked={_type === "pump"} onChange={onOptionChange} className="w-4 h-4 text-[#222831] focus:ring-[#222831] dark:focus:ring-[#222831] cursor-pointer" />
                                        <label htmlFor="type_pump" className="ml-2 cursor-pointer">Pump</label>
                                    </div>
                                </div>
                                {/* Verify button */}
                                <div className="items-center flex justify-center">
                                    <button type="button" onClick={verifyLotCert} className="bg-teal text-sm rounded-lg px-8 py-4 text-[#EEEEEE] hover:bg-[#222831]">Verify</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </DrizzleContext.Provider>
        </div>
    );
}

export default VerifyCertification;