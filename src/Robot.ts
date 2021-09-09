import { Board, Location } from './Board';
import { Piece } from './Piece'

export enum MovingDirection {
  FORWARD,
  BACKWARD
}

export enum RotatingDirection {
  LEFT,
  RIGHT
}

export enum FacingDirection {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export enum Commands {
  WALK,
  REVERSE,
  ROTATE_LEFT,
  ROTATE_RIGHT
}

const directionLabels = {
  [FacingDirection.UP]: 'up',
  [FacingDirection.DOWN]: 'down',
  [FacingDirection.LEFT]: 'left',
  [FacingDirection.RIGHT]: 'right',
}

export class Robot extends Piece {
  private board: Board
  private facingDirection: FacingDirection

  constructor(board: Board, location: Location | undefined = undefined, facingDirection: FacingDirection = FacingDirection.DOWN) {
    super(board, location)
    this.board = board
    this.facingDirection = facingDirection
    if (this.location !== undefined) {
      this.shareLocation()
    }
  }

  private talk(speech: string) {
    console.log('Robot:', speech)
  }

  private move(direction: MovingDirection) {
    if (this.location === undefined) {
      this.talk(`Im currently not on the board.`);
      return
    }
    const location = this.location.slice();
    switch(this.facingDirection) {
      case FacingDirection.UP:
        switch(direction) {
          case MovingDirection.FORWARD:
            location[1]--
            break;
          case MovingDirection.BACKWARD:
            location[1]++
            break;
        }
        break;
      case FacingDirection.DOWN:
        switch(direction) {
          case MovingDirection.FORWARD:
            location[1]++
            break;
          case MovingDirection.BACKWARD:
            location[1]--
            break;
        }
        break;
      case FacingDirection.LEFT:
        switch(direction) {
          case MovingDirection.FORWARD:
            location[0]--
            break;
          case MovingDirection.BACKWARD:
            location[0]++
            break;
        }
        break;
      case FacingDirection.RIGHT:
        switch(direction) {
          case MovingDirection.FORWARD:
            location[0]++
            break;
          case MovingDirection.BACKWARD:
            location[0]--
            break;
        }
        break;
    }
    try {
      this.location = this.board.movePiece(this, location)
    } catch(e: any) {
      throw new Error(`I can't move there.`)
    }
  }

  public rotate(direction: RotatingDirection = RotatingDirection.RIGHT) {
    const order = [
      FacingDirection.UP,
      FacingDirection.RIGHT,
      FacingDirection.DOWN,
      FacingDirection.LEFT
    ]
    let newDirectionIndex = order.indexOf(this.facingDirection)
    switch(direction) {
      case RotatingDirection.LEFT:
        newDirectionIndex--
        break
      case RotatingDirection.RIGHT:
        newDirectionIndex++
        break
    }
    if (newDirectionIndex < 0) {
      newDirectionIndex = order.length - 1
    } else if (newDirectionIndex >= order.length) {
      newDirectionIndex = 0
    }
    this.facingDirection = order[newDirectionIndex]
    return this
  }

  public shareLocation() {
    if (this.location === undefined) {
      this.talk(`Im currently not on the board.`);
      return
    }
    this.talk(`Im now at x${this.location[0]}y${this.location[1]}, facing ${directionLabels[this.facingDirection]}.`)
    return this
  }

  public command(commands: Commands[]) {
    let _commands = commands.slice();
    try {
      while (_commands.length > 0) {
        switch(_commands.shift()) {
          case Commands.WALK:
            this.move(MovingDirection.FORWARD)
            break;
          case Commands.REVERSE:
            this.move(MovingDirection.BACKWARD)
            break;
          case Commands.ROTATE_LEFT:
            this.rotate(RotatingDirection.LEFT)
            break;
          case Commands.ROTATE_RIGHT:
            this.rotate(RotatingDirection.RIGHT)
            break;
        }
      }
    } catch (e: any) {
      this.talk(e.message)
      _commands = []
    }
    this.shareLocation()
  }
}