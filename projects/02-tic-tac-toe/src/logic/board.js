import { WINNER_COMBOS } from '../constants'

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const comboResults = combo
      .map((index) => boardToCheck[index]) // mapear index combo => resultados reales
    const isCorrect = comboResults
      .every((value) => comboResults[0] === value) // si todo el contenido del combo es igual
    if (isCorrect === true) return comboResults[0]
  }
  return null
}

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== undefined)
}
