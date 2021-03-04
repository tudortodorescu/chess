
export const $ = query => document.querySelector( query )
export const $$ = query => [ ...document.querySelectorAll( query ) ]
export const $$$ = (element, query) => element.querySelector( query )
export const deepclone = obj => JSON.parse( JSON.stringify( obj ) )

window.$ = $
window.$$ = $$