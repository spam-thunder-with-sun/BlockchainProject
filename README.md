# BlockchainProject

requisti:
 -nodejs & npm
   -truffle
 -metamask plugin nel browser
 -ganache

ganache:
-crea un workspace
-minimo 4 account
-collegare il workspace con il progetto indicando "path_to/truffle-config.js" in "TRUFFLE PROJECTS" nelle impostazioni del workspace

metamask:
 -crea una nuova network indicando i dati di rete di ganache
 -collega 3 account ganache a metamask utilizando la chiave privata che vedi associata all'account in ganache
 -aggiungi un account a metamask utilizando la chiave privata che vedi associata su ganache

proj_source:
-truffle-config.js:
 -metti l'host, la porta e il network id indicato in ganache
 
il contratto del progetto è: "Proj_contract.sol"
il frontend del progetto è: "front/src/App.js"
 
testare funziomento contratto (in Proj_source):
 -ganache deve runnare
 -truffle compile
 -truffle migrate
 -truffle test test/Proj_test_cerification.js
 


 
testare frontend (in Proj_source/front):
 -ganache deve runnare e il contratto deve essere già deployato
 -npm start (utile anche un npm install prima)
 -Appare una pagina dal browser
 -Associanti con metamask con il tuo account
 -inserisci 6 nella casella di testo per aggiungerti come certifier
 -poi metti due indirizzi diversi nel successive due caselle
 -poi metti i dari per threads and cages con l'account m1 (devi connettere l'account m1 alla pagina e poi ricaricare la pagina)
 -poi metti i dati per engine con account m2 (stessa cosa di sopra)
 -conferma tutte le op con metamask
 -poi submita per chiedere se quel lotto di engines con il nome che gli hai dato (object) è cerificato