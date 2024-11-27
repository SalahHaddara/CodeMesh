<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
  
    public function register(): void {
        $this->app->singleton(Judge0Service::class, function ($app) {
            return new Judge0Service();
        });
    }

    
    public function boot(): void
    {
        //
    }
}
