export const {uiSpacing, colors, spacing} = {
  uiSpacing: {
    sideBarWidth: "150px",
    topBarHeight: "50px",
    noteWidth: "176px",
    noteMinHeight: "50px",
    noteMaxHeight: "160px",
  },
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
      overflowY: "auto",
    },

    liStyle: {
      marginLeft: spacing["3"],
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
      width: "400px",
      position: "fixed",
      zIndex: 2,
    },
    textFormStyle: {
      margin: spacing["2"],
      marginBottom: spacing["4"],
    },
    textFieldStyle: {
      maxHeight: "120px",
      overflow: "auto",
    },
    elementStyle: {
      margin: spacing["2"]
    },
    tabStyle: {
      borderRadius: 1,
      borderBottom: "3px solid #e0e0e0",
      marginBottom: spacing["3"],
      backgroundColor: "#e0e0e0",
      fontSize: "1.2em",
      textAlign: "center",
      lineHeight: "2",
      cursor: "pointer",
    },
    activeTabStyle: {
      borderRadius: 0,
      borderBottom: "3px solid #26a69a",
      marginBottom: spacing["3"],
      fontSize: "1.2em",
      textAlign: "center",
      lineHeight: "2",
      cursor: "pointer",
    },
    labelContainerStyle: {
      margin: spacing["2"],
      marginBottom: spacing["6"],
    },
    labelGridStyle: {
      display: "grid",
      gridGap: "8px",
      paddingTop: "8px",
      gridTemplateColumns: "115px 115px 115px",
      maxHeight: "128px",
      overflow: "auto",
    },
    labelItemStyle: {
      borderBottom: "3px solid #f5f5f5",
      backgroundColor: "#eee",
      borderRadius:2,
      cursor: "pointer"
    },
    labelItemActiveStyle: {
      borderBottom: "3px solid #26a69a",
      backgroundColor: "#e0e0e0",
      borderRadius: 2,
      cursor: "pointer"
    },
    textStyle: {
      marginTop: 0,
      maxHeight: "120px",
      overflow: "auto",
    }
  },

  noteStyle: {
    elementStyle: {
      width: uiSpacing.noteWidth,
      margin: spacing["2"],
      position: "absolute",
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
      marginTop: "19px",
      lineHeight: "15px",
    },
    iconStyle: {
      marginRight: spacing["2"],
      marginLeft: spacing["2"],
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
    position:{
      x: 0,
      y: 65,
    }
  },

  detailStyle: {
    backgroundStyle: {
      margin: spacing["2"],
      width: "400px",
      zIndex: 1,
      position: "absolute",
    },
  }
}