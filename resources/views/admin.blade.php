@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            @guest
            <div class="card">
                <div class="card-header">{{ __('My administration dashboard') }}</div>
                
                    <div class="card-body">
                        <div class="alert alert-warning" role="alert">
                            <h4 class="alert-heading"><i class="fas fa-key mr-3"></i>You're not authenticated</h4>
                            <p>In order to access the administration dashboard, you'll have to log into our system using the administrator credentials provided in the readme file.</p>
                            <hr>
                        <p class="mb-0">Lost in the time and web continuum? Click <a href="{{ url('/') }}">here</a> to return to the homepage.</p>
                          </div>
                    </div>
                    
                
                
            </div>
            @endguest
            @auth
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading"><i class="fas fa-tachometer-alt mr-3"></i>Welcome to the Pizzify CMS</h4>
                <p>From here you'll be able to manage all pizzas on the server, all customer orders, reviews and messages from the contact form.</p>
                <hr>
            <p class="mb-0">Lost in the time and web continuum? Click <a href="{{ url('/') }}">here</a> to return to the homepage.</p>
            </div>
            <div class="row mt-4">
                
                    <div class="col-md-3">
                        <a href="#pizza-anchor" style="text-decoration: none">
                            <div class="card text-white bg-success mb-2 hvr-grow" >
                                
                                <div class="card-body align-self-center">
                                    <p style="font-size: 2em" class="card-text"><i class="fas fa-pizza-slice mr-3" ></i>Pizzas</p>
                                
                                </div>
                                <div class="card-header"><i class="fas fa-tasks mr-3"></i>Manage pizza database</div>
                            </div>
                        </a>
                    </div>
                
                <div class="col-md-3">
                    <div class="card text-white bg-info mb-2" >
                        
                        <div class="card-body align-self-center">
                            <p style="font-size: 2em" class="card-text"><i class="fas fa-shopping-cart mr-3"></i>Orders</p>
                        
                        </div>
                        <div class="card-header"><i class="fas fa-tasks mr-3"></i>Manage orders database</div>
                      </div>
                </div>
                <div class="col-md-3">
                    <div class="card text-white bg-dark mb-2" >
                        
                        <div class="card-body align-self-center">
                            <p style="font-size: 2em" class="card-text"><i class="fas fa-chart-area mr-3"></i>Stats</p>
                        
                        </div>
                        <div class="card-header"><i class="fas fa-tasks mr-3"></i>See views, clicks and popularity</div>
                      </div>
                </div>
                <div class="col-md-3">
                    <div class="card text-white bg-secondary mb-2" >
                        
                        <div class="card-body align-self-center">
                            <p style="font-size: 2em" class="card-text"><i class="fas fa-envelope-open-text mr-3"></i>Inbox</p>
                        
                        </div>
                        <div class="card-header"><i class="fas fa-tasks mr-3"></i>View messages from customers</div>
                      </div>
                </div>
            </div>
            <h3 class="mt-4 mb-3">Pizza management</h3>
            <div id="pizza-dashboard-controller"></div>
            <div id="pizza-anchor"></div>
            @endauth
        </div>
    </div>
</div>
@endsection
