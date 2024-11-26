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
}

