# BlockchainProject

Requirements:
- nodejs & npm.
- truffle.
- metamask plugin in the browser.
- ganache.

Configuration Ganache:
- create a ganache workspace with minimum 5 account.
- link the ganache workspace with the project writing  "path_to_project/truffle-config.js" in "TRUFFLE PROJECTS" in workspace settings.

Configuration Metamask:
- create a new network using network data of ganache, maintaining the network id suggested by Metamask. 
- import every ganache account to Metamask using the private key associated with the ganache account.

Configuration “Proj_source”:
- truffle-config.js:
	- insert the host, the port and the network id associated with ganache.

Setup to run the Dapp and/or tests (in directory Proj_source):
- run command “npm install” both in the directory “Proj_source” and in the directory “Proj_source/front”.
- run ganache.
- run command “truffle compile”.
- run command “truffle migrate”.

Test the code (in directory Proj_source):
- run the command “truffle test test/Engine_certification_test.js” for ElectricEngine contract tests.
- run the command “truffle test test/Pump_certification_test.js” for ElectricPump contract tests.
- run the command “truffle test test/General_test.js” for BaseCertContract contract tests.
- run the command “truffle test test/Engine_certification_test_two_factory.js” for ElectricEngine contract tests with two producers.

Run the Dapp (in the directory Proj_source/front):
- run the command “npm start run”.

Run electric engine certification (Disclaimer: any time you change Metamask account you must reload the page) :
connect, through Metamask, to the first account of Ganache.
go to “create motor” and insert in “Add Producer” and “Add Tester” the public address of other two accounts of Ganache and press “Go!”.
then connect to the account of the producer and insert, in the “create motor” page, the invoice and producer name both for threads and cages and press “Go!”.
then connect to the account of the tester and insert, in the “create motor” page, the data for the test and certification of a electric engine, that is invoices of the pieces, the threads and the cages, you have inserted before. For instance, if the invoices are 5 and 4 respectively of the threads and the cages, the data you can insert are, in this order:
4
5
130
230
55
-1
TRANSIX:1245856
	Finally, press “Go!”.
then you can check the certification of the lot of engines “lotto1” in the page “verify certification”. There you must check the box “Electric engine” and insert the identification code “lotto1” in the textbox and press “Verify”. On screen you must see a notification that the lot “lotto1” is certified.

Run electric pump certification with electric engine certificate (Disclaimer: any time you change Metamask account you must reload the page) :
it is supposed that a lot of engines are already certified through the service.
connect, through Metamask, to the first account of Ganache.
go to “create pump” and insert in “Add Producer” and “Add Tester” the public address of other two accounts of Ganache and press “Go!”.
then connect to the account of the producer and insert, in the “create pump” page, the invoice and producer name for bodies and press “Go!”.
then connect to the account of the tester and check, in the “create pump” page, the box “With Engine Lotto Serial Number”. Then insert the data for the test and certification of an electric pump, that is the invoice of the pieces, the bodies you have inserted before and the identification code of a lot of electric engines you have certified before. For instance, if the invoice is 5 and the code is “lotto1” respectively of the bodies and the electric engines, the data you can insert are, in this order:
5
“lotto1”
50
2850
15
135
"lotto3"
	Finally, press “Go!”.
then you can check the certification of the lot of pumps “lotto3” in the page “verify certification”. There you must check the box “Pump” and insert the identification code “lotto3” in the textbox and press “Verify”. On screen you must see a notification that the lot “lotto3” is certified.

Run electric pump certification with electric engine invoice (Disclaimer: any time you change Metamask account you must reload the page) :
connect, through Metamask, to the first account of Ganache.
go to “create pump” and insert in “Add Producer” and “Add Tester” the public address of other two accounts of Ganache and press “Go!”.
then connect to the account of the producer and insert, in the “create pump” page, the invoices and producer names both for bodies and engines and press “Go!”.
then connect to the account of the tester and check, in the “create pump” page, the box “With Engine Invoice”. Then insert the data for the test and certification of an electric pump, that is invoices of the pieces, bodies and engines, you have inserted before. For instance, if the invoices are 5 and 4 respectively of bodies and engines, the data you can insert are, in this order:
5
4
50
2850
15
135
“lotto6”
	Finally press “Go!”.
then you can check the certification of the lot of engines “lotto6” in the page “verify certification”. There you must check the box “Pump” and insert the identification code “lotto6” in the textbox and press “Verify”. On screen you must see a notification that the lot “lotto6” is certified.

Run a tester and producer sign out from electric engine or electric pump certification (Disclaimer: any time you change Metamask account you must reload the page) :
connect, through Metamask, to the first account of Ganache.
go to “create pump” and  “create motor” and insert in “Add Producer” and “Add Tester” the public address of the other four accounts of Ganache and press “ok”.
then connect to the account of a producer and click, in the “create pump” or “create motor”, on button “Resign Producer Role”. If you reload the page “create motor” or “create pump” with the same account then you must not be able to do anything.
then connect to the account of a tester and click, in the “create pump” or “create motor”, on button “Resign Tester Role”. If you reload the page “create motor” or “create pump” with the same account then you must not be able to do anything.
