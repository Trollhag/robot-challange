import { Board, Location } from './Board'

export class Piece {
  public location: Location | undefined
  constructor(board: Board, location: Location | undefined = undefined) {
    try {
      this.location = board.addToBoard(this, location)
    } catch(e: any) {
      console.log(e.message)
      this.location = undefined
    }
  }
}