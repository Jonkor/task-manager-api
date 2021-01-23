const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)

module.exports = {
  calculateTip
}

test('Should calculate total with default tip', ()=>{
  const total = calculateTip(10)
  expect(total).toBe(12.5)
})
