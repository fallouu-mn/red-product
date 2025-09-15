<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:5173',  // Développement local
        'https://frontend-redproduct-production.up.railway.app',  // Frontend déployé
        'https://red-product-frontend.up.railway.app',  // Alternative si différent
    ],
    'allowed_origins_patterns' => [
        '/^https:\/\/.*\.up\.railway\.app$/',  // Tous les sous-domaines Railway
    ],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,  // Important pour l'authentification
];
