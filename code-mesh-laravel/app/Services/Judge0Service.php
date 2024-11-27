<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class Judge0Service {
    protected $baseUrl;
    protected $apiKey;

    public function __construct() {
        $this->baseUrl = config('judge0.base_url', env('JUDGE0_BASE_URL'));
        $this->apiKey = env('JUDGE0_API_KEY');
    }

    public function submitCode($sourceCode, $languageId, $stdin = null) {
        $response = Http::withHeaders([
            'x-rapidapi-host' => 'judge0-ce.p.rapidapi.com',
            'x-rapidapi-key' => $this->apiKey,
        ])->post("{$this->baseUrl}/submissions", [
            'source_code' => $sourceCode,
            'language_id' => $languageId,
            'stdin' => $stdin,
        ]);

        return $response->json();
    }

    public function getSubmission($token) {
        $response = Http::withHeaders([
            'x-rapidapi-host' => 'judge0-ce.p.rapidapi.com',
            'x-rapidapi-key' => $this->apiKey,
        ])->get("{$this->baseUrl}/submissions/{$token}");

        return $response->json();
    }

}
