
var RecaptchaState = {
    site : '6Le5aAYAAAAAAGJHipT7penk-Bj1asXrRndZW0Rp',
    challenge : '03AHJ_Vuu3ogvvqZZp8s4YhakqxsVBxMY15_gfgpG-WgK-jOyNnQz7uPqAaH0OAiz41JiyK2rykPfXSsBbn6QahD2fviQqMaZ7ITwhXYQ5NAzioi2LuQKidB4D3bXJwpQmApm4UfiIYx_0RM1ikJ6shG96hElXIuRoUQ',
    is_incorrect : false,
    programming_error : '',
    error_message : '',
    server : 'http://www.google.com/recaptcha/api/',
    timeout : 18000
};

document.write('<scr'+'ipt type="text/javascript" s'+'rc="' + RecaptchaState.server + 'js/recaptcha.js"></scr'+'ipt>');
