<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra nếu user không phải admin
        if ($request->user()->ma_vai_tro !== 1) {
            return response()->json(['message' => 'Bạn không có quyền truy cập!'], 403);
        }

        return $next($request);
    }
}
