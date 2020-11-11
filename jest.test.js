test('test common matcher',()=>{
  expect(2+2).toBe(4)
  expect(1+2).not.toBe(3)
})


test('test to be true or false',()=>{
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})


test('test Object',()=>{
  expect({name: 'test'}).toBe({name: 'test'})
  expect({name: 'test'}).toEqual({name: 'test'})
})
