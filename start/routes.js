'use strict'
const Helpers = use('Helpers')
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/','homeController.index')
Route.on('/login').render('login').middleware('guest')
Route.post('/login','userController.login')
Route.post('/signUp','userController.signUp')
Route.on('/signUp').render('signUp').middleware('guest')
Route.on('/panel').render('panel').middleware('auth')
Route.get('/logout','userController.logout').middleware('auth')
Route.get('/video/:id/:name','HomeController.videoDetails').as('videoDetails').middleware('auth')
Route.get('/order/:vId','HomeController.order').middleware('auth')
Route.on('/play').render('vplayer ')
Route.get('/download',({response})=>{
   return response.download(Helpers.publicPath('sample.mp4'))
})


