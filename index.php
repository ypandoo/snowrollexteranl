<?php 
    $url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    $host_name = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";
    $tmp = preg_match('/posts\/(\d+)/',$url,$matches);
    $id = $matches[1];
    $data = json_decode(file_get_contents('https://api-dev.snowroll.me/v1/getprevlink?id='.$id));
    $data = $data->data;
?>
<!DOCTYPE html>
<html>
    <head>
        <base href="/">
        <title>SnowRoll</title>

        <meta property="og:type" content="article"/>
        <meta property="og:title" content="Snowroll">
        <meta property="og:url" content="<?php echo $url?>">
        <meta property="og:site_name" content="<?php echo $host_name?>">
        <meta property="og:image" content="<?php echo $data->preview_link_fullsize?>">
        <meta property="og:image:type" content="image/jpeg">
        <meta property="og:image:width" content="520">
        <meta property="og:image:height" content="520">
        <meta property="og:description" content="<?php echo $data->description?>">

        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <link rel="icon" sizes="192x192" href="/assets/img/favicon.png">
        <link rel="stylesheet" href="assets/css/styles.min.css">
        <link rel="stylesheet" href="assets/css/animate.css">
        <script src="assets/js/audio.js" async></script>
        <script src="assets/js/slider.js" async></script>
        <script src="assets/js/siriwave.js" async></script>
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.en"></script>
        <script src="node_modules/core-js/client/shim.min.js"></script>
        <script src="node_modules/zone.js/dist/zone.js"></script>
        <script src="node_modules/reflect-metadata/Reflect.js"></script>
        <script src="node_modules/systemjs/dist/system.src.js"></script>
        <script src="systemjs.config.js"></script>
        <script>
          System.import('app').catch(function(err){ console.error(err); });
        </script>
        
    </head>
    <body>
        <snowroll-web-app></snowroll-web-app>
    </body>
</html>