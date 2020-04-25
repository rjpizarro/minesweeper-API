import calculateScore from '../calculate-score'

describe('calculateScore', () => {
    it('should return a number after calculate', () => {
        const score = calculateScore(10, 10, 10, 5)

        expect(score).toEqual(200)
    })
});