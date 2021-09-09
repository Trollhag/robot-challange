import { Board } from '../src/Board'
import { Piece } from '../src/Piece'
import { Robot, FacingDirection, Commands } from '../src/Robot'

describe('Robot tests', () => {
  test('Test case 1', () => {
    const board = new Board(100, 100)
    const robot = new Robot(board, [0, 0], FacingDirection.DOWN)
    robot.command([Commands.WALK, Commands.WALK, Commands.ROTATE_LEFT, Commands.WALK, Commands.WALK])
    expect(robot.location).toEqual([2, 2])
  })
  test('Test case 2', () => {
    const board = new Board(50, 50)
    const robot = new Robot(board, [1, 1], FacingDirection.UP)
    robot.command([Commands.WALK, Commands.WALK, Commands.ROTATE_LEFT, Commands.WALK, Commands.WALK])
    expect(robot.location).toEqual([1, 0])
  })
  test('Test case 3', () => {
    const board = new Board(100, 100)
    new Piece(board, [48, 50])
    const robot = new Robot(board, [50, 50], FacingDirection.UP)
    robot.command([Commands.WALK, Commands.WALK, Commands.ROTATE_LEFT, Commands.WALK, Commands.WALK, Commands.ROTATE_RIGHT, Commands.REVERSE, Commands.REVERSE])
    expect(robot.location).toEqual([48, 49])
  })
})