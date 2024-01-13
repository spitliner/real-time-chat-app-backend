import typia from 'typia';
export const isString = (input, _exceptionable = true) => {
    return "string" === typeof input;
};
export const isUserSettingsettings = (input, _exceptionable = true) => {
    const $io0 = (input, _exceptionable = true) => "string" === typeof input.theme && (1 === Object.keys(input).length || Object.keys(input).every(key => {
        if (["theme"].some(prop => key === prop))
            return true;
        const value = input[key];
        if (undefined === value)
            return true;
        return false;
    }));
    return "object" === typeof input && null !== input && $io0(input, true);
};
export const stringifyUserSettings = input => {
    const $string = typia.json.createStringify.string;
    return `{"theme":${$string(input.theme)}}`;
};
export const parseUserSettings = input => { const is = input => {
    return "object" === typeof input && null !== input && "string" === typeof input.theme;
}; input = JSON.parse(input); return is(input) ? input : null; };
