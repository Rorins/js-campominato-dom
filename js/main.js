// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range (vedi immagine allegata):
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.

/// CAMPO MINATO PARTE 2 ///
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// Prendiamo bottone che setterà le dimensioni del grid e la grid
const setDimens = document.getElementById("set-dimensions");
const wrapGrid = document.querySelector(".wrap-grid")
// Prendiamo le nostre selezioni di dimensioni
const dimensLevel = document.getElementById("dimensions")

// Rendiamo setDimens cliccabile con un reset di impostazioni precedenti
setDimens.addEventListener("click", () =>{
    wrapGrid.innerHTML = "";
    //Creiamo una variabile per prendere il valore attuale del nostro dimensLevel
    const gridDimens = dimensLevel.value;

    //Facciamo un if statement per cambiare dimensioni nei vari casi
    let cellsNumber;
    let cellsPerSide;

    switch (gridDimens){
        case "1":
            cellsNumber =100;
            cellsPerSide = 10;
            break;
        case "2":
            cellsNumber =81;
            cellsPerSide = 9;
             break;  
        case "3":
            cellsNumber =49;
            cellsPerSide = 7;    
    }

    //Generiamo bombe
    const bombList = genBomb(cellsNumber,16)
    console.log("Bombe generate",bombList);

    //Lista tentativi
    const attempts = [];
    const maxAttempts = cellsNumber - bombList.length;
    console.log("tentativi possibili",maxAttempts)


    // Generiamo griglia generale creando un div con la classe grid
    const grid = document.createElement("div");
    grid.classList.add("grid");

   

    //Generiamo i nostri quadrati
    for(let i = 1; i <= cellsNumber; i++){
        
        // Generiamo i quadrati
        const square = squareGen(i,cellsPerSide);

        // Al click cambia colore
        square.addEventListener("click",function() {
            //invocazione funzione
        }
        )

        grid.append(square)
    }
    
     //Inseriamo il Grid nel wrap-grid
     wrapGrid.append(grid);
})



//Funzione per gestire gli square
function handleSquareClick(square,bombList,attempts,maxAttempts){
    //ottieni numero square
    const number = parseInt(square.innerHTML);
    
    //if statement se colpisci bomba
    if(bombList.includes(number)){
      endGame(bombList, attempts, maxAttempts)
    }else if (!attempts.includes(number))
// Aggiungo colore
    square.classList.add("safe");

    //Aggiungere numero a lista tentativi
    attempts.push(number)
    console.log("tentativi riusciti",attempts)
    //controllo se tentativi sono uguali a max tentativi
    if(attempts.length === maxAttempts){
        console.log("hai vinto")
    
    }
} 


/// Funzione per finale gioco
function endGame(bomblist,attempts,maxAttempts){
    //Ottenere tutte le square
    const squares = document.querySelectorAll(".square");
    console.log(squares);

    //mostra bombe
    for(let i= 0; i < squares.length; i++){
        const square = squares[i];
        const squareValue = parseInt(square.innerHTML);

        if(bombList.includes(squareValue)){
            square.classList.add("bomb");
        }
    }
}




//Funzione per generare le bombe (16 numeri casuali)
function genBomb(totCells,totBombs) {
    const bombs = [];
    // continuo finche la lunghezza di bombs non è minore al totale
    while(bombs.length <totBombs){
    //genero numero random con la mia funzione
    const bomb = randNum(1,totCells)

    //Controllo che il numero sia univoco
    if(!bombs.includes(bomb)){
        bombs.push(bomb);
    }
    }
    return bombs;
    }
    

//Funzione generatore di numeri random
function randNum(min,max){
    return Math.floor(Math.random() *( max-min + 1)) + min;
}    

//Funzione generatore di quadrati con numero
function squareGen(num,cells){
    const node = document.createElement("div");
    //aggiungo classe square e stili per dimensioni
    node.classList.add("square");
    node.style.width = ` calc(100% /${cells}` ;
    node.style.height = ` calc(100% /${cells}` ;

    //span per numero generato
    const span = document.createElement("div");
    span.append(num);
   

    //Inserisco lo span nello square
    node.append(span);

    return node;
}




