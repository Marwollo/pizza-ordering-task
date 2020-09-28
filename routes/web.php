<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PizzaController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('root'); // your start view
});
Route::get('/location', function () {
    return view('root'); // your start view
});
Route::group(['prefix' => 'admin'], function(){
    Auth::routes();
    Route::get('/', function () {
        return view("admin");
    });
});
Route::group(["prefix" => "action"], function() {
    Route::get("/id/{id?}", [PizzaController::class, "show"]);
    Route::post("/create", [PizzaController::class, "create"]);
    Route::post("/addsize", [PizzaController::class, "addSize"]);
    Route::post("/delete", [PizzaController::class, "delete"]);
});

/*
    Actions
*/


