<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EditFile implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $file_path;
    public $content;
    public $file_id;

    public function __construct($file_path, $content, $file_id = 398756639)
    {
        $this->file_path = $file_path;
        $this->content = $content;
        $this->file_id = $file_id;
    }


    public function broadcastOn()
    {
        return new Channel('file.' . $this->file_id);
    }
    
    public function broadcastAs()
    {
        return 'EditFile';
    }

}
