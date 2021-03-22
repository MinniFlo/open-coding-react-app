import {customAlphabet} from "nanoid";

export const {uiSpacing, colors, spacing} = {
  colors: {
    background: " grey lighten-4",
    backgroundDark: "grey darken-2",
    text: " grey-text text-darken-4",
    accent: " teal lighten-1" //#26a69a
  },
  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "20px",
  }
}

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 21)
export const customId = () => nanoid();

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