<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, $role)
    {
        $user = $request->user();

        // Kiểm tra vai trò của người dùng
        if (!$user || $user->ma_vai_tro != $role) {
            return response()->json([
                'message' => 'Bạn không có quyền truy cập!'
            ], 403);
        }

        return $next($request);
    }
}
