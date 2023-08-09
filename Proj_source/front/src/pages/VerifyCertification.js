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
            <div className="items-center flex justify-center">
                <form className="form flex rounded-lg w-1/2 my-8">
                    <div className="flex-1 p-16">
                        <h1 className="text-3xl pb-2 text-center font-bold">
                            Verify if your engine is certified
                        </h1>
                        <br></br>
                        <p className="">
                            Please insert the lot number of your engine and click on the button
                        </p>
                        <div className="">
                            {/* Lot input field */}
                            <div className="pb-4">
                                <label
                                    htmlFor="lotNumber"
                                    className={`block font-latoBold text-sm pb-2`}
                                >
                                </label>
                                <p className="text-sm font-latoBold text-red-400 "></p>
                                <input
                                    className="border-2 border-gray-500 p-2 w-full rounded-md w-1/2 focus:border-black focus:ring-black "
                                    type="text"
                                    name="lotNumber"
                                    placeholder="Lot number"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-teal font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
                            >
                                Start learning today!
                            </button>
                        </div>
                    </div>
                </form>
            </div>
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
function lotCert() {
    var state = drizzle.store.getState();
    var lotto = document.getElementById('lot').value;

    // If Drizzle is initialized (and therefore web3, accounts and contracts), continue.
    if (state.drizzleStatus.initialized) {
        //Call contract's method
        const dataKey = drizzle.contracts.ElectricEngine.methods.isCertificatedEngines(lotto).call();
        //Visualize the answer
        dataKey.then(value => { document.getElementById('risp').innerHTML = value; })
    }
}
