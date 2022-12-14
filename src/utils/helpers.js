export const formatTimeDigits = (digits) => {
    if (digits < 0) digits = 0;
    let formattedDigits = digits.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
    return formattedDigits;
}

export const secondsToTime = (_seconds) => {
    const hours = Math.floor(_seconds / 3600);
    _seconds %= 3600;
    const minutes = Math.floor(_seconds / 60);
    const seconds = _seconds % 60;
    return {hours, minutes, seconds};
}