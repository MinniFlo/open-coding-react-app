import {customAlphabet} from "nanoid";

export const {spacing} = {

  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "20px",
  }
}

export const {addMenuStyle} = {

  addMenuStyle: {
    textFormStyle: {
      marginBottom: spacing["4"],
    },
    textFieldStyle: {
      maxHeight: "120px",
      overflow: "auto",
    },
  },
}

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 21)
export const customId = () => nanoid();
const hexColor = customAlphabet("23456789abcd", 6);
export const genColor = () => "#" + hexColor();
