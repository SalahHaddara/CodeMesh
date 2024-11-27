<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Judge0Service;


class Judge0Controller extends Controller
{

    public function __construct(Judge0Service $judge0Service) {
        $this->judge0Service = $judge0Service;
    }

    public function index() {
        return view('index');
    }

    public function compile(Request $request) {
        $request->validate([
            'source_code' => 'required',
            'language_id' => 'required|integer',
            'stdin' => 'nullable',
        ]);

        $submission = $this->judge0Service->submitCode(
            $request->input('source_code'),
            $request->input('language_id'),
            $request->input('stdin')
        );

        if (isset($submission['token'])) {
            $token = $submission['token'];

            $result = null; 
            return response()->json('ew');
        }

    return response()->json(['error' => 'Failed to submit code'], 500);
    }

}
