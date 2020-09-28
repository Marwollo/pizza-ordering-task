<?php

namespace App\Http\Controllers;
use App\Models\Pizza;
use App\Models\Size;
use Illuminate\Http\Request;

class PizzaController extends Controller
{

    /*
        PizzaController - (GET) /action/id/{id?}
        Request should accept:
            - ID - of type: Integer
        Return cases:
            - List of all pizzas in the database. (No ID provided).
            - Pizza from the database with the given ID. (ID provided and exists).
            - Empty array (ID provided but doesn't exist).
        Return type:
            - application/json
    */
    public function show(Request $request)
    {
        /*
            If you don't pass the ID parameter to the route, all pizzas will be shown.
            Passing the ID parameter would return the specific pizza from the database.
            If such pizza doesn't exist, an empty array is returned.
        */
        if (is_null($request->id)) {
            $pizza = Pizza::all();
            for ($i = 0; $i < sizeof($pizza); $i++) {
                $pizza[$i]->sizes = Pizza::find($pizza[$i]->id)->sizes;
            }
            return $pizza;
        }
            
        $pizza = Pizza::find($request->id);
        $pizza->sizes = Pizza::find($request->id)->sizes;
        if (is_null($pizza))
            return [];
        return $pizza;    
    }

    /*
        PizzaController - (POST) /action/create
        Request should accept:
            - Name - of type: String
            - Description - of type: String
            - Picture - of type: String
        Return cases:
            - Number 0 - in case the creation was successful.
            - Number 1 - otherwise. 
        Return type:
            - text/html
    */
    public function create(Request $request) {
        try {
            /*
                Using mass assignments will prevent us from using default values from migration
                when null is passed, because of the middleware that Laravel is using, which
                converts empty strings to nulls. Of course, we can set ->nullable() in the
                migrations file for the corresponding fields, but it's always better to just
                prevent nulls from happening right from the start.
            */
            
            if ($request->hasFile("picture")) {
                $request->validate([
                    "picture" => "file|image"
                ]);
            } else return;

            $pizza = new Pizza;
            if (!is_null($request->name)) 
                $pizza->name = $request->name;
            if (!is_null($request->description))
                $pizza->description = $request->description;
            if (!is_null($request->ingredients))
                $pizza->ingredients = json_decode($request->ingredients);
            if (!is_null($request->availability))
                $pizza->availability = $request->availability == "true"? 1 : 0;
            $pizza->picture = $request->picture->store("uploads", "public");
            $pizza->save();
            if (!is_null($request->sizes)) {
                $sizeArr = json_decode($request->sizes);
                $pizza->sizes()->delete();
                for ($i = 0; $i < sizeof($sizeArr); $i++) {
                    $this->addSize($sizeArr[$i], $pizza->id);
                }
            }
            return 0;
        } catch (Exception $ex) {
            /*
                Track all exceptions that happened on the server from logs.log file.
            */
            $fp = fopen("logs.log", "a");
            fwrite($fp, $ex->getMessage()."\n");
            fclose($fp);
            return 1;
        }
    }

    /*
        PizzaController - /action/delete
        Request should accept:
            - ID - of type: Number
        Return cases:
            - Number 0 - in case the deletion was successful.
            - Number 1 - an unknown exception happened on the server. Check logs.log
            - Number 2 - in case the ID is null (we can also use validators, but this is ok)
            - Number 3 - in case there are no pizzas with the given ID.
        Return type:
            - text/html
    */
    public function delete(Request $request) {
        try {
            if (is_null($request->id)) {
                return 2;
            }
            $pizza = Pizza::find($request->id);
            if (is_null($pizza)) {
                return 3;
            }
            $pizza->sizes()->delete();
            $pizza->delete();
            return 0;
        } catch (Exception $ex) {
            /*
                Track all exceptions that happened on the server from logs.log file.
            */
            $fp = fopen("logs.log", "a");
            fwrite($fp, $ex->getMessage()."\n");
            fclose($fp);
            return 1;
        }
    }

    /*
        PizzaController - /action/addsize
        Request should accept:
            - ID - of type: Number
            - Name - of type: String
            - Price - of type: Decimal
            - Value - of type: Integer
        Return cases:
            - Number 0 - in case the deletion was successful.
            - Number 1 - an unknown exception happened on the server. Check logs.log
            - Number 2 - in case the ID is null (we can also use validators, but this is ok)
            - Number 3 - in case there are no pizzas with the given ID.
        Return type:
            - text/html
    */
    public function addSize($obj, $pizzaID) {
        try {
            if (is_null($pizzaID)) {
                return 2;
            }
            $size = new Size;
            if (!is_null($obj->name))
                $size->name = $obj->name;
            if (!is_null($obj->price))
                $size->price = $obj->price;
            if (!is_null($obj->size))
                $size->value = $obj->size;

            $pizza = Pizza::find($pizzaID);
            if (is_null($pizza)) {
                return 3;
            }
            $pizza->sizes()->save($size);
            return 0;
        } catch (Exception $ex) {
            /*
                Track all exceptions that happened on the server from logs.log file.
            */
            $fp = fopen("logs.log", "a");
            fwrite($fp, $ex->getMessage()."\n");
            fclose($fp);
            return 1;
        }
    }
}
