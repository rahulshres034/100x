import {selector} from "recoil"
import { counterState } from "./atom"

// Define a selector that derives wheather the counter is even
export const isEvenState = selector<boolean>({
    key: "isEvenState",
    get: ({get}) => {
        const count = get(counterState)
        return count % 2 == 0
    }
})
// Define selector that provides a text representaiton
export const parityTextState = selector<string>({
    key: "parityTextState",
    get: ({get}) => {
        const isEven = get(isEvenState)
        return isEven ? "Even" : "Odd"
    }
})