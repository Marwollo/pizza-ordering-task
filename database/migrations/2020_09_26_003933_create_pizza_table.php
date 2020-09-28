<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePizzaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pizzas', function (Blueprint $table) {
            $table->id();
            $table->string("name")->default("An untitled pizza");
            $table->string("description")->default("This beautiful pizza has no description, and the taste was probably so good, that developers had to encrypt it (by eating).");
            $table->string("picture")->default("default.jpg");
            $table->integer("popularity")->default(0);
            $table->boolean("availability")->default(false);
            $table->json("ingredients");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pizzas');
    }
}
/*
INSERT INTO `pizza_ordering_task`.`users`(`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES (1, 'administrator', 'root@admin', '2020-09-26 18:18:40', '$2y$10$te5JnO6dqnrgzw.zIjTBneY0ROXlAZwt5aFRGzgim5hBKZoU.YaBi', NULL, '2020-09-26 18:18:53', '2020-09-26 18:18:56');
*/