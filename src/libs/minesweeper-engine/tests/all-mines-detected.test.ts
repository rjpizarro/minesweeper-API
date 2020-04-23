import allMinesDetected from '../all-mines-detected'
import { BoardValuesEnum } from '../enums'

const mockBoard = [
    ["E", "M", "M", "E"],
    ["M", "E", "E", "E"],
    ["E", "M", "E", "M"],
    ["E", "M", "E", "E"],
]

describe('allMinesDetected', () => {
    it('should return true when all mines were detected', () => {
        const flagsPosition = [[0,1], [0,2], [1,0], [2,1], [2,3], [3,1]]
        const allMinesWereDetected = allMinesDetected(mockBoard, flagsPosition)

        expect(allMinesWereDetected).toEqual(true)
    })

    it('should return false when some mine was not detected', () => {
        const flagsPosition = [[0,1], [0,2], [1,0], [2,1], [2,3]]
        const allMinesWereDetected = allMinesDetected(mockBoard, flagsPosition)

        expect(allMinesWereDetected).toEqual(false)
    })

    it('should handle missing flagsPosition argument', () => {
        const allMinesWereDetected = allMinesDetected(mockBoard)

        expect(allMinesWereDetected).toEqual(false)
        expect(() => allMinesDetected(mockBoard)).not.toThrowError()
    })
});