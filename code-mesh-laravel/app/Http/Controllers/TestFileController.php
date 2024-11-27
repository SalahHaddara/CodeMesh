<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\EditFile;

class TestFileController extends Controller
{
    public function update_content(Request $request)
    {
        $content = $request->input('content');
        $file_path =$request->input('file_path');
        file_put_contents(public_path($file_path), $content);

        broadcast(new EditFile($file_path, $content,2));

        return response()->json(['success' => true]);
    }
    public function get_file_content(Request $request)
    {
        $file_path ='yousif_mohammed_dahabra398756639/file.txt';
        $content = file_get_contents(public_path($file_path));
        return response()->json(['success' => true,'content'=>$content ]);
    }

}
