<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Size extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create("sizes", function (Blueprint $table) {
            $table->id();
            $table->foreignId("pizza_id");
            $table->string("name")->default("Untitled size");
            $table->integer("value")->default(0);
            $table->decimal("price", 8, 2)->default(0.00);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
