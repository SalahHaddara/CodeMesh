<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MailController extends Controller
{
    public function sendInvitation()
    {
        $details = [
            'title' => 'Welcome to Our Event!',
            'body' => 'We are thrilled to invite you to collaborate on our project. Please click on the following link.',
            'url' => ''
        ];

        Mail::to('mohamaddmortada@gmail.com')->send(new InvitationMail($details));

        return response()->json(['message' => 'Invitation email sent!']);
    }
}
