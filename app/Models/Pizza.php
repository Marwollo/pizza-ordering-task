<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pizza extends Model
{
    use HasFactory;

    public function sizes()
    {
        return $this->hasMany('App\Models\Size');
    }

    protected $casts = [
        'ingredients' => 'json'
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'ingredients' => '[]'
    ];
    
    protected $fillable = [ 
        "name", 
        "description", 
        "picture", 
        "price"
    ];
}
