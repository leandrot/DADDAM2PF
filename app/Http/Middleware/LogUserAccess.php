<?php

namespace App\Http\Middleware;

use App\Models\Log;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogUserAccess

{
    public function handle(Request $request, Closure $next): Response
    {
        // Excluir rutas específicas
        $excludedPaths = [
            'storage/*',
            'images/*',
            'css/*',
            'js/*',];

        $shouldLog = true;
        foreach ($excludedPaths as $pattern) {
            if ($request->is($pattern)) {
                $shouldLog = false;
                break;
            }
        }

        if ($shouldLog) {
            Log::create([
                'user_id' => auth()->id(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'url' => $request->fullUrl(),
                'method' => $request->method(),
            ]);
        }

        return $next($request);
    }
}
