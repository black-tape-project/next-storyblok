export const truncateString = (inputStr, length) => {
    return inputStr.length <= length
        ? inputStr
        : `${inputStr.substr(
              0,
              inputStr.lastIndexOf(" ", length - 3)
          )} + '...'`;
};
