export const {uiSpacing, colors, spacing} = {
  uiSpacing: {
    sideBarWidth: "150px",
    topBarHeight: "50px",
    noteWidth: "170px",
    noteMinHeight: "80px",
    noteMaxHeight: "160px",
  },
  colors: {
    background: " grey lighten-4",
    canvasBackground: " grey darken-3",
    text: " grey-text text-darken-4",
    accent: " teal lighten-1" //#26a69a
  },
  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
  }
}

export const {headerStyle, sideBarStyle, addButtonStyle, addMenuStyle, detailStyle} = {
  headerStyle: {
    lineHeight: uiSpacing.topBarHeight,
    height: uiSpacing.topBarHeight,
    zIndex: 3,
  },

  sideBarStyle: {
    width: uiSpacing.sideBarWidth,
    paddingTop: uiSpacing.topBarHeight,
    height: "100%",
    position: "fixed",
    top: 0,
    zIndex: 2,
  },

  addButtonStyle: {
    buttonStyle: {
      position: "fixed",
      borderRadius: 30,
      margin: spacing["3"],
      lineHeight: 0,
      zIndex: 2,
    },
    symbolStyle: {
      fontSize: 40,
      padding: spacing["1"],
    }
  },

  addMenuStyle: {
    backgroundStyle: {
      margin: spacing["3"],
      paddingTop: spacing["3"],
      width: "300px",
      position: "fixed",
      zIndex: 2,
    },
    textFieldStyle: {
      margin: spacing["2"],
      marginTop: spacing["5"],
    },
    elementStyle: {
      margin: spacing["2"]
    },
  },

  noteStyle: {

  },

  detailStyle: {
    backgroundStyle: {
      margin: spacing["3"],
      paddingTop: spacing["3"],
      width: "300px",
      zIndex: 1,
    },
    labelStyle: {
      margin: spacing["2"],
      fontWeight: "bold",
    },
    textStyle: {
      margin: spacing["4"],
      marginTop: 0,
    },
  }
}