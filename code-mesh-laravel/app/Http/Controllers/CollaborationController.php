<?php

namespace App\Http\Controllers;

use App\Models\Collaboration;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CollaborationController extends Controller
{
    public function index()
    {
        $user_id = Auth::id();

        $owned_collaborations = Collaboration::where('owner_id', $user_id)->get();

        $collaborating = Collaboration::where('collaborator_id', $user_id)->get();

        return response()->json([
            'owned_collaborations' => $owned_collaborations,
            'collaborating' => $collaborating
        ]);
    }
}