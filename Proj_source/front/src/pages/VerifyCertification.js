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

function VerifyCertification() {
    return (
        <div>
            <Navbar />
            <DrizzleContext.Provider drizzle={drizzle}>
            <div className="items-center flex justify-center">
                <form className="form flex rounded-lg w-1/2 mt-8" id="myform" onSubmit={(event) => {event.preventDefault();}}>
                    <div className="flex-1 px-16 py-8">
                        <h1 className="text-3xl pb-2 text-center font-bold">
                            Verify here if your engine is certified
                        </h1>
                        <br></br>
                        <p className="">Please insert the lot number of your engine and click on the button</p>
                        <p className="text-center font-bold" id="responce">&nbsp;</p>
                        <div className="">
                            {/* Lot input field */}
                            <div className="pb-4">
                                <label htmlFor="lotNumber" className={`block font-latoBold text-sm pb-2`}></label>
                                <input
                                    className="border-2 border-gray-500 p-2 w-full rounded-md w-1/2 focus:border-[#393E46] focus:ring-[#393E46] "
                                    type="text"
                                    id="lotNumber"
                                    name="lotNumber"
                                    placeholder="Lot number"
                                />
                            </div>
                            <div className="items-center flex justify-center">
                                <button type="button" onClick={verifyLotCert} className="bg-teal text-sm rounded-lg px-8 py-4 text-[#EEEEEE]">Verify</button>
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

//Set contract in drizzle option
const drizzleOptions =
{
    contracts: [ElectricEngine],
};

const { AccountData, ContractData, ContractForm } = newContextComponents;

const drizzle = new Drizzle(drizzleOptions);

//Function to ask if the engines lot is certified
function verifyLotCert()
{
    var state = drizzle.store.getState();
    var lotto = document.getElementById('lotNumber').value;

    var textResponce = document.getElementById('responce');
    var form = document.getElementById('myform');

    // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
    if(lotto !== "" && lotto !== null && lotto !== undefined && state.drizzleStatus.initialized)
    {
        //Call contract's method
        const dataKey = drizzle.contracts.ElectricEngine.methods.isCertificatedEngines(lotto).call();
        //Visualize the answer
        dataKey.then(value => 
            { 
                if(value == true)
                {
                    textResponce.innerHTML = "Your engine is certified";
                    textResponce.style.color = "green";
                    form.style.borderColor = "green";
                }
                else
                {
                    textResponce.innerHTML = "Your engine is NOT certified";
                    textResponce.style.color = "red";
                    form.style.borderColor = "red";
                }
            })
    }
    else
    {
        form.style.borderColor = "#EEEEEE";
        textResponce.innerHTML = "Generic error";
        textResponce.style.color = "red";

        console.log("Generic error");
    }

    
}
