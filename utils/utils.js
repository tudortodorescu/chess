
export const $ = query => document.querySelector( query )
export const $$ = query => [ ...document.querySelectorAll( query ) ]

export const ucase = str => str[0].toUpperCase() + str.substr(1)