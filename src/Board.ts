import { Piece } from './Piece'

export type Location = Array<number>

export class Board {
  private width: number

  private height: number

  private _board: Piece[][]
  
  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this._board = Array(height).fill(undefined).map(() => Array(width).fill(undefined))
    console.log(`Created a ${width}x${height} board.`)
  }

  public addToBoard(item: Piece, location: Location | undefined = undefined): Location {
    if (location === undefined) {
      location = this.getFirstAvailableLocation()
    }
    if (!location) {
      throw new Error(`Cant add item to full board.`)
    }
    this._board[ location[1] ][ location[0] ] = item
    return location
  }

  public getFirstAvailableLocation(): Location | undefined {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        if (!this.isSpaceOccupied([x, y])) {
          return [x, y]
        }
      }
    }
    return undefined
  }

  public isSpaceOccupied([x, y]: Location): boolean {
    return this._board[y][x] !== undefined
  }

  public movePiece(piece: Piece, location: Location): Location {
    const currentLocation: Location | undefined = piece.location
    if (location[0] < 0 || location[0] > this.width || location[1] < 0 || location[1] > this.height) {
      throw new Error('Can only move on the board.')
    }
    if (this.isSpaceOccupied(location)) {
      throw new Error('Location is occupied.')
    }
    if (currentLocation !== undefined) {
      delete this._board[ currentLocation[1] ][ currentLocation[0] ]
    }
    this._board[ location[1] ][ location[0] ] = piece
    
    return location
  }

}