<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
    public function index()
    {
        $files = File::where('user_id', Auth::id())->get();
        return response()->json(['files' => $files]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'language' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = Auth::user();
        $file_path = $user->base_folder . '/' . $request->name;

        Storage::put($file_path, $request->content);

        $file = File::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'file_path' => $file_path,
            'language' => $request->language,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'File created successfully',
            'file' => $file
        ], 201);
    }

    public function show($id)
    {
        $file = File::findOrFail($id);

        if ($file->user_id !== Auth::id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access'
            ], 403);
        }

        $content = Storage::get($file->file_path);
        return response()->json([
            'status' => 'success',
            'file' => $file,
            'content' => $content
        ]);
    }

    public function update(Request $request, $id)
    {
        $file = File::findOrFail($id);

        if ($file->user_id !== Auth::id()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized access'
            ], 403);
        }
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        Storage::put($file->file_path, $request->content);

        return response()->json([
            'status' => 'success',
            'message' => 'File updated successfully'
        ]);
    }
}

