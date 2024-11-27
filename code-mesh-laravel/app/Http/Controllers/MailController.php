<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Mail\InvitationMail;


class MailController extends Controller
{
    public function sendInvitation(Request $request)
    {
        $request->validate([
            'email' => 'required|email', 
        ]);
        $details = [
            'title' => 'Welcome to Our Event!',
            'body' => 'We are thrilled to invite you to collaborate on our project. Please click on the following link.',
            'url' => 'http://localhost:5173/'
        ];

        Mail::to($request->input('email'))->send(new InvitationMail($details));

        return response()->json(['message' => 'Invitation email sent '. $request->input('email') . '!']);
    }
}
