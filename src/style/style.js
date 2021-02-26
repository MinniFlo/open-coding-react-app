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

export const {headerStyle, sideBarStyle, workSpaceStyle, addButtonStyle, addMenuStyle, noteStyle, detailStyle} = {
  headerStyle: {
    lineHeight: uiSpacing.topBarHeight,
    height: uiSpacing.topBarHeight,
    zIndex: 3,
  },

  sideBarStyle: {
    backgroundStyle: {
      width: uiSpacing.sideBarWidth,
      paddingTop: uiSpacing.topBarHeight,
      height: "100%",
      position: "fixed",
      top: 0,
      zIndex: 2,
    },

    liStyle: {
      marginLeft: spacing["5"],
      marginBottom: spacing["2"],
    },

  },

  workSpaceStyle: {
    canvasStyle: {
      height: "2000px",
      width: "2000px",
      position: "absolute",
      top: uiSpacing.topBarHeight,
      left: uiSpacing.sideBarWidth,
    },
    noteWrapperStyle: {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: "65px",
    }
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
    tabStyle: {
      borderRadius: 0,
    },
    activeTabStyle: {
      borderRadius: 0,
      borderBottom: "2px solid #26a69a",
    },
  },

  noteStyle: {
    elementStyle: {
      width: uiSpacing.noteWidth,
      margin: spacing["2"],
    },
    backgroundStyle: {
      minHeight: uiSpacing.noteMinHeight,
      maxHeight: uiSpacing.noteMaxHeight,
      width: uiSpacing.noteWidth,
      margin: 0,
      zIndex: 0,
      overflow: "hidden",
      cursor: "pointer",
    },
    contentStyle: {
      margin: 0,
      fontSize: 12,
      padding: spacing["2"],
      paddingTop: spacing["4"],
      lineHeight: "15px",
    },
    iconStyle: {
      margin: spacing["1"],
    },
    tagUlStyle: {
      margin: 0,
      marginLeft: spacing["2"],
    },
    tagLiStyle: {
      display: "inline-block",
      listStyleType: "none",
      marginRight: spacing["2"],
    },
    tagStyle: {
      height: spacing["4"],
      width: spacing["4"],
      padding: 0,
      margin: 0,
      borderRadius: 1,
      boxShadow: "0 1px 2px rgba(20, 20, 20, 0.5)",
    },
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