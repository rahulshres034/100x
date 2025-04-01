import { atom} from "recoil";

// Define the counter atom - basic unit of state
export const counterState = atom<number>({
    key: "counterState",
    default: 0
})