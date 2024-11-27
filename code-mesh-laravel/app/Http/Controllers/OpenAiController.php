<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class OpenAiController extends Controller
{
    public function validateScript(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'language' => 'required|string', 
        ]);

        $code = $request->input('code');
        $language = $request->input('language');


        try {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer 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',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a code compiler.'],
                ['role' => 'user', 'content' => "without any information or explanation, return a json object that contains:
                    result: exectution output of the code,
                    status: successfuly executioned or error 
                    error: error type if there is.
                    [line nb, character nb] (i want to take them as an (x,y)),
                    solution: a brief steps to help the code runs(like if there is missing syntax just say add this character(and this character should be at the (x,y) you wrote before)),and most important dont give the user the code of solution, just what to do

                " . $code],
            ],
        ]);

        if ($response->failed()) {
            return response()->json([
                'error' => 'Unexpected response from OpenAI.',
                'details' => $response->json(),
            ], $response->status());
        }

        $data = $response->json();

        $content = $data['choices'][0]['message']['content'] ?? null;

        $analysis = json_decode($content, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return response()->json([
                'error' => 'Unable to parse OpenAI response as JSON.',
                'raw_response' => $content,
            ], 500);
        }
        return response()->json([
            'result' => $analysis['result'] ?? null,
            'status' => $analysis['status'] ?? null,
            'error' => $analysis['error'] ?? null,
            'coordinates' => $analysis['coordinates'] ?? null,
            'solution' => $analysis['solution'] ?? null,
        ]);
    } catch (\Exception $e) {

        return response()->json([
            'error' => 'An unexpected error occurred.',
            'details' => $e->getMessage(),
        ], 500);
    }
    }
}
