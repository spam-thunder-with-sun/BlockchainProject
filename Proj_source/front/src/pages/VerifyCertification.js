//This page is used to verify if a lot is certified or not
//The user insert the lot number and click on the verify button
//The system check if the lot is certified or not and show the result
//If the lot is certified the system create a pdf with the data of the lot
//The pdf is downloaded automatically

import React from 'react';
import ElectricEngine from './../artifacts/ElectricEngine.json' //import project contract
import ElectricPump from './../artifacts/ElectricPump.json' //import project contract
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from "@drizzle/store";
import { useState } from 'react';
import { pdf } from "@react-pdf/renderer";
import * as FileSaver from "file-saver";
import './../index.css';
import './../css/form.css';
import Navbar from './/Navbar';
import {EngineDataPDF, PumpDataPDF} from './../component/pdfCreator';

//Set contract in drizzle option
const drizzleOptions = { contracts: [ElectricEngine, ElectricPump], };
const drizzle = new Drizzle(drizzleOptions);

function VerifyCertification() {
    //To generate the pdf
    const generateEnginePdfDocument = async (data, fileName) => {
        const blob = await pdf(
            <EngineDataPDF data={data} />
        ).toBlob();

        FileSaver.saveAs(blob, fileName);
    };
    const generatePumpPdfDocument = async (data, fileName) => {
        const blob = await pdf(
            <PumpDataPDF data={data} />
        ).toBlob();

        FileSaver.saveAs(blob, fileName);
    };

    //To manage the state of the radio buttons
    var [_type, setType] = useState("engine");
    const onOptionChange = e => { setType(e.target.value) };

    //Function to ask if the engines lot is certified
    function verifyLotCert() {
        //Get the state of drizzle
        var state = drizzle.store.getState();
        //Get the lot number
        var lotto = document.getElementById('lotNumber').value;
        //Get the responce text
        var textResponce = document.getElementById('responce');
        //Get the form
        var form = document.getElementById('myform');

        try {
            //Check if the input field is empty
            if (lotto === "" || lotto == null || lotto === undefined)
                throw new Error('Input field is empty');

            //Check if drizzle is initialized
            if (!state.drizzleStatus.initialized)
                throw new Error('Drizzle is not initialized');

            //Check if the lot number is certified
            var checkCert;
            if (_type === "pump")
                checkCert = drizzle.contracts.ElectricPump.methods.isCertificatedPump(lotto).call();
            else
                checkCert = drizzle.contracts.ElectricEngine.methods.isCertificatedEngines(lotto).call();

            //Visualize the answer
            checkCert.then(value => {
                if (value === true) {
                    //Get the certification data
                    var lotInfo;
                    if (_type === "pump")
                        lotInfo = drizzle.contracts.ElectricPump.methods.getElectricPumpData(lotto).call();
                    else
                        lotInfo = drizzle.contracts.ElectricEngine.methods.getElectricEngineData(lotto).call();

                    lotInfo.then(value => {
                        let tmp = [];
                        tmp[0] = lotto;
                        tmp[1] = value[0];
                        tmp[2] = value[1];
                        tmp[3] = value[2];
                        tmp[4] = value[3];
                        tmp[5] = value[4];
                        tmp[6] = value[5];
                        tmp[7] = value[6];

                        if (_type === "pump")
                            generatePumpPdfDocument(tmp,"Pump-" + lotto + ".pdf");
                        else
                            generateEnginePdfDocument(tmp, "Engine-" + lotto + ".pdf");
                    });
                    

                    //Update the state of the form
                    textResponce.innerHTML = "Your " + _type + " is certified";
                    textResponce.style.color = "green";
                    form.style.borderColor = "green";
                }
                else {
                    //Update the state of the form
                    textResponce.innerHTML = "Your " + _type + " is NOT certified";
                    textResponce.style.color = "red";
                    form.style.borderColor = "red";
                }
            });

        } catch (e) {
            //Print the error
            console.log(e);
            //Update the state of the form to the error state
            form.style.borderColor = "#EEEEEE";
            textResponce.innerHTML = "Something went wrong";
            textResponce.style.color = "red";
        }
        finally {
            setTimeout(() => {
                //Update the state of the form to the initial state after 10 seconds
                form.style.borderColor = "#EEEEEE";
                textResponce.innerHTML = "&nbsp;";
                textResponce.style.color = "black";
            }, 10000);
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
                                <div className="flex pb-4">
                                    <div className="flex items-center mr-4">
                                        <input type="radio" name="type" id="type_engine" value="engine" checked={_type === "engine"} onChange={onOptionChange} className="w-4 h-4 text-[#222831] focus:ring-[#222831] dark:focus:ring-[#222831] cursor-pointer" />
                                        <label htmlFor="type_engine" className="ml-2 cursor-pointer">Electric engine</label>
                                    </div>
                                    <div className="flex items-center mr-4 cursor-pointer">
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