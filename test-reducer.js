var deepFreeze = require('deep-freeze');
var expect = require('expect')
var reducer = require('./reducers')

const testAddCat = () => {
    const stateBefore = []
    const action = {
        type: "ADD_CAT",
        cat: {id: 0, name: '', image: '', counter: 1, active: false}
    }
    const stateAfter = [
        {id: 0, name: '', image: '', counter: 1, active: false}
    ]

    deepFreeze(stateBefore)

    expect(
        reducer(stateBefore, action)
    ).toEqual(stateAfter)
}
const testIncrementCat = () => {
    const stateBefore = [
        {id: 0, name: '', image: '', counter: 1, active: false},
        {id: 1, name: '', image: '', counter: 1, active: true}
    ]
    const action = {type: "INCREMENT"}
    const stateAfter = [
        {id: 0, name: '', image: '', counter: 1, active: false},
        {id: 1, name: '', image: '', counter: 2, active: true}
    ]

    deepFreeze(stateBefore)

    expect(
        reducer(stateBefore, action)
    ).toEqual(stateAfter)
}

const testActivateCat = () => {
    const stateBefore = [
        {id: 0, name: '', image: '', counter: 1, active: false}
    ]
    const action = {
        type: "ACTIVATE_CAT",
        id: 0
    }
    const stateAfter = [
        {id: 0, name: '', image: '', counter: 1, active: true}
    ]

    deepFreeze(stateBefore)

    expect(
        reducer(stateBefore, action)
    ).toEqual(stateAfter)
}

const testActivateOneCatDeactiveOthers = () => {
    const stateBefore = [
        {id: 0, name: '', image: '', counter: 1, active: false},
        {id: 1, name: '', image: '', counter: 1, active: true},
        {id: 2, name: '', image: '', counter: 1, active: false}
    ]
    const action = {
        type: "ACTIVATE_CAT",
        id: 0
    }
    const stateAfter = [
        {id: 0, name: '', image: '', counter: 1, active: true},
        {id: 1, name: '', image: '', counter: 1, active: false},
        {id: 2, name: '', image: '', counter: 1, active: false}
    ]

    deepFreeze(stateBefore)

    expect(
        reducer(stateBefore, action)
    ).toEqual(stateAfter)
}
function executeTests() {
    testAddCat()
    testIncrementCat()
    testActivateCat()
    testActivateOneCatDeactiveOthers()
    console.log('All tests passed.')
}

module.exports = executeTests
