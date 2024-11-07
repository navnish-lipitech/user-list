import { customTheme } from "@lipihipi/rtc-ui-components/dist/components/Theme/types";

export const themeVars = {
  primaryFont: "'Inter', sans-serif",
  secondaryFont: "'Inter', sans- serif",
  chineseBlack: "#121212",
  charlestonGreen: "#282730",
  blackCoral: "#5A6474",
  philippineSilver: "#B8B8B8",
  rhythm: "#726E89",

  // TODO: REMOVE LATER
  primary: "#765847",
  primaryStrong: "#393836",
  primaryActive: "#0A4DFF",
  primaryActiveLight: "#EEF3FF",
  secondary: "#EEC13C",
  grey: "#F4F5F7",
  lightGrey: "#B8B8B8",
  white: "#fff",
};

const {
  chineseBlack,
  charlestonGreen,
  blackCoral,
  philippineSilver,
  rhythm,
  primaryFont,
  primaryActiveLight,
  grey,
  primary,
  secondary,
  white,
  secondaryFont,
  primaryStrong,
} = themeVars;

export const rtcTheme: customTheme = {
  primaryColor: {
    primary,
    secondary: "#FED500",
  },
  secondaryColor: {
    primary: "#BE0203",
    secondary: "#002F5F",
  },
  fontFamily: {
    primary: primaryFont,
    secondary: secondaryFont,
  },
  headings: {
    h1: {
      fontSize: "32px",
      fontWeight: 700,
      color: charlestonGreen,
    },
    h2: {
      fontSize: "24px",
      fontWeight: 400,
      color: chineseBlack,
    },
    h3: {
      fontSize: "24px",
      fontWeight: 600,
      color: '#000',
    },
    h4: {
      fontSize: "20px",
      fontWeight: 700,
      color: charlestonGreen,
    },
    h5: {
      fontSize: "18px",
      fontWeight: 700,
      color: chineseBlack,
    },
    h6: {
      fontSize: "16px",
      fontWeight: 700,
      color: rhythm,
    },
    body1: {
      fontSize: "16px",
      fontWeight: 500,
      color: chineseBlack,
    },
    body2: {
      fontSize: "16px",
      fontWeight: 400,
      color: rhythm,
    },
    subtitle1: {
      fontSize: "14px",
      fontWeight: 400,
      color: "#002F5F",
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 400,
      color: chineseBlack,
    },
    caption: {
      fontSize: "13px",
      fontWeight: 400,
      color: philippineSilver,
    },
    overline: {
      fontSize: "13px",
      fontWeight: 400,
      color: blackCoral,
    },
  },
  buttons: {
    fontWeight: 700,
    height: "48px",
    borderRadius: "8px",
    fontSize: "16px",
    padding: "0 26px",
    gap: 0.5,

    text: {
      color: "#5A6474",
    },

    textPrimary: {
      color: "#0A4DFF",
    },

    textSecondary: {
      color: "#0A4DFF",
    },

    outlinedError: {
      default: {
        borderColor: "#BE0203",
        color: "#BE0203",
      },
      hover: {
        borderColor: "#BE0203",
        color: "#BE0203",
        background: "#FFE6E6",
      },
    },

    containedError: {
      default: {
        background: "#BE0203",
        boxShadow: "none",
        color: white,
      },
      hover: {
        background: "#9F0405",
        boxShadow: "none",
      },
    },

    outlinedPrimary: {
      default: {
        borderColor: primary,
        color: primary,
      },
      hover: {
        borderColor: primary,
        color: primary,
        background: "#76584729",
      },
    },

    outlinedSecondary: {
      default: {
        borderColor: secondary,
        color: secondary,
      },
      hover: {
        borderColor: secondary,
        color: secondary,
        background: "#eec13c29",
      },
    },

    containedPrimary: {
      default: {
        background: primary,
        boxShadow: "none",
        color: white,
      },
      hover: {
        background: "#62493b",
        boxShadow: "none",
      },
    },

    containedSecondary: {
      default: {
        background: secondary,
        boxShadow: "none",
        color: "#39322E",
      },
      hover: {
        background: "#D8B036",
        boxShadow: "none",
      },
    },
  },
  table: {
    borderRadius: "8px",
    borderColor: "rgb(224, 224, 224)",
    background: "#fff",
    fontSize: "14px",
    lineHeight: "28px",
    head: {
      color: "#595858",
      background: "#e5e5e5",
    },
    body: {},
  },
  tabs: {
    fontSize: "14px",
    fontWeight: 500,
    padding: "6px 12px",
    lineHeight: "114.286%",
    minHeight: "32px",

    primary: {
      color: "#5A6474",
      background: "#fff",
      borderRadius: "4px",
    },

    primarySelected: {
      borderColor: "#002F5F",
      color: "#002F5F",
    },

    secondary: {
      borderColor: "#D2D2D2",
      color: "#5A6474",
    },

    secondarySelected: {
      color: "#5A6474",
    },

    indicator: {
      background: "#002F5F",
    },
  },
  drawer: {
    width: "800px",
    boxShadow:
      "0 8px 10px -5px rgba(0,0,0,0.2),0 16px 24px 2px rgba(0,0,0,0.14),0 6px 30px 5px rgba(0,0,0,0.12)",
  },
  backdrop: {
    background: "rgba(0, 0, 0, 0.15)",
  },
  searchbar: {
    background: "#fff",
    borderRadius: "8px",
    fontSize: "14px",
    height: "48px",
    color: "#765847",
  },
  input: {
    color: "#5A6474",
    fontSize: "16px",
    background: "#fff",
    borderColor: {
      default: "#DDE1EA",
      focus: primary,
      hover: "#DDE1EA",
    },
    inputAdornment: {
      color: "#5A6474",
      fontSize: "16px",
    },
  },
  menuItem: {
    color: "#5A6474",
    fontSize: "14px",
    fontWeight: 500,
    selected: {
      color: charlestonGreen,
      background: primaryActiveLight,
    },
    hover: {
      color: charlestonGreen,
      background: primaryActiveLight,
    },
  },
  formLabel: {
    asterisk: {
      color: "#ff0000",
    },
    default: {
      color: "#5A6474",
      fontSize: "14px",
      fontWeight: 400,
      marginBottom: "8px",
    },
    link: {
      color: "#002F5F",
      fontSize: "16px",
      fontWeight: 500,
    },
  },
  iconButton: {
    background: '#fff',
    borderRadius: "8px",
    width: "48px",
    height: "48px",

    primary: {
      background: charlestonGreen,
    },
  },
  sidebar: {
    background: primary,
    menuHeading: "#A3A5A9",
    menuHeadingWeight: 500,
    listItemText: {
      primary: {
        color: white,
        fontSize: "15px",
      },
    },
    selected: {
      color: secondary,
    },
    children: {
      borderRadius: 2,
    },
    childrenSelected: {
      backgroundColor: "#EEF3FF",
      fontWeight: 400,
    },
  },
  others: {
    mainBg: grey,
  },
};
