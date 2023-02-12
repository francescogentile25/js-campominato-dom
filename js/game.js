const platBtnElement = document.getElementById('play-btn')
const grigliaElement = document.querySelector('.griglia')
let score =0

platBtnElement.addEventListener('click', startGame) //senza  le tonde altrimenti viene invocata subito
let bombe = []
console.log(bombe)
while (bombe.length < 16) {
    const randomNumber = Math.floor(Math.random() * (64 - 1 + 1) + 1)
    if (bombe.indexOf(randomNumber) ===  -1) { // indexOf restituisce l'indice del primo elemento di un array che soddisfa una condizione  restituisce -1 se l'elemento non è presente avrei potuto usare includes
        bombe.push(randomNumber)
    }
}
// console.log(bombe)

function resetGame() {
	score =0
	// svuotare la griglia
	grigliaElement.innerHTML = ''
	
	// eliminare eventuali messaggi di game over...
}

function generaGriglia(latoGriglia) {
	let numeroCelle = latoGriglia * latoGriglia
	for (let i = 0; i < numeroCelle; i++) {
		let num = i + 1
		// console.log(num)
		let divString = `<div class="cella" style="width: calc(100% / ${latoGriglia});" >${num}</div>` // <div> + num + </div>
		grigliaElement.innerHTML += divString
	}
}

function startGame() {
	console.log('start game')
	// eseguire tutte le operazioni di reset
	resetGame()
	let lato = 8 //potrei inserirlo  con un select in num 8 
	generaGriglia(lato)
	const celleElements = document.querySelectorAll('.cella')
	// console.log(celleElements)
	for (let i = 0; i < celleElements.length; i++) {
		const cella = celleElements[i]
		cella.addEventListener('click', onClick)
	}
	
}

function onClick(event) {
	const cella = this
	const numCella = parseInt(cella.innerHTML);
	// console.log(numCella)
	if (bombe.includes(numCella)) {
		console.log("Hai perso!");
		cella.classList.add('bg-red')
		cella.innerHTML= `<i class="fa-solid fa-bomb fs-1"></i>`
		alert('hai perso')
		const celleElements = document.querySelectorAll('.cella')
		for (let i = 0; i < celleElements.length; i++) {
			celleElements[i].removeEventListener('click', onClick)
		}
	}else{
		cella.classList.add('bg-gray')
		cella.removeEventListener('click', onClick)
		score++
		const punteggio = document.getElementById('score')
		punteggio.innerHTML = score
		if (score === 48){
			alert('hai vinto')
		}
	}
}
