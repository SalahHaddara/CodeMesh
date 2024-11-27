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
                ['role' => 'system', 'content' => 'You are a code compiler assistant.'],
                ['role' => 'user', 'content' => "the result must be so brief and summarized, like 
                        [line nb, word nb] 
                        Error nb 1:...
                        Summary:...(small summary about the error)
                        Soultion:(small solution to fix the code            
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
