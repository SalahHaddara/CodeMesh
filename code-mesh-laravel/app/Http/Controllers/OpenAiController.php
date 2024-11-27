<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class OpenAiController extends Controller
{
    public function validateScript(Request $request)
    {
        $code = $request->input('code');

        if (!$code) {
            return response()->json(['error' => 'Code is required.'], 400);
        }

        $response = Http::withHeaders([
            'Authorization' => 'Bearer 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',
        ])->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a code compiler.'],
                ['role' => 'user', 'content' => "without any information or explanation, return a json object that contains:
                    result: exectution output of the code,
                    status: successfuly executioned or error (with it's type, be brief),
                    (if there was an error):
                        [line nb, character nb] (i want to take them as an (x,y)),
                        solution: a brief steps to help the code runs(like if there is missing syntax just say add this character(and this character should be at the (x,y) you wrote before),

                
                
                
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

        $output = $data['choices'][0]['message']['content'] ?? 'No response';

        return response()->json([
            'analysis' => $output,
        ]);
    }
}
