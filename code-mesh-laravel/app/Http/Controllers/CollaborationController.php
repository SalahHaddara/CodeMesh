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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'role' => 'required|in:viewer,editor,admin'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $collaborator = User::where('email', $request->email)->first();

        if ($collaborator->id === Auth::id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'You cannot collaborate with yourself'
            ], 400);
        }

        $existing_collaboration = Collaboration::where('owner_id', Auth::id())
            ->where('collaborator_id', $collaborator->id)
            ->first();

        if ($existing_collaboration) {
            return response()->json([
                'status' => 'error',
                'message' => 'Collaboration already exists with this user'
            ], 400);
        }

        $collaboration = Collaboration::create([
            'owner_id' => Auth::id(),
            'collaborator_id' => $collaborator->id,
            'role' => $request->role
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Collaboration created successfully',
            'collaboration' => $collaboration
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|in:viewer,editor,admin'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $collaboration = Collaboration::findOrFail($id);

        if ($collaboration->owner_id !== Auth::id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access'
            ], 403);
        }

        $collaboration->update([
            'role' => $request->role
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Collaboration role updated successfully',
            'collaboration' => $collaboration
        ]);
    }

    public function destroy($id)
    {
        $collaboration = Collaboration::findOrFail($id);

        if ($collaboration->owner_id !== Auth::id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access'
            ], 403);
        }

        $collaboration->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Collaboration deleted successfully'
        ]);
    }
}