

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href={{ asset("css/app.css") }} rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
       
        <!-- JS, Popper.js, and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <title>Pizza Delivery</title>
        <style>
            .jumbotron{
                background: url("https://wallpaperaccess.com/full/424487.jpg") no-repeat center center; 
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-position-y: 0%; 
                border-radius: 0px !important;
                background-size: cover;
                background-attachment: fixed;
                box-shadow: 0px 0px 200px 200px #00000088 inset;
            }
            .position-top {
                position: fixed;
                top: 0px;
                z-index: 9999;
                left: 0px;
                width: 100%;
            }
            .jumbotron h1 {
                padding-top: 130px;
                font-family: "Pacifico";
                text-align: center;
                font-size: 4.6em;
            }
            .jumbotron p {
                margin-top: 10px;
                text-align: center;
                font-size: 2em;
                font-family: "Pacifico";
            }
            .push-spaces {
               
                height: 370px;
                color: white;
            }
            .card-img-top {
                transform: scale(1.004);
            }
        </style>
    </head>
    <body style="font-family: 'Montserrat', sans-serif">
        <div id="root"></div>
    </body>
    <script src="js/app.js"></script>
</html>
