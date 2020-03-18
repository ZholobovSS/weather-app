export default function (state, action) {
    switch (action.type) {
        case 'setCorrectCity':

            if (state.correctCity !== true) {
                return { ...state, ...action.payload };
            }
            return state;
        case 'setWeatherInfo':

            return { ...state, ...action.payload }

        default:
            return state;
    }
}