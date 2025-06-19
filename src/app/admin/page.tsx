
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'; // For image/video URL
import { Label } from '@/components/ui/label';
import { ShieldAlert, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [messageType, setMessageType] = useState<'text' | 'image' | 'video'>('text');
  const [messageContent, setMessageContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      toast({ title: "Access Denied", description: "You do not have permission to view this page.", variant: "destructive" });
      router.replace('/home');
    }
  }, [user, loading, router, toast]);

  const handleBroadcast = async () => {
    if (!messageContent && messageType === 'text') {
      toast({ title: "Error", description: "Message content cannot be empty for text messages.", variant: "destructive"});
      return;
    }
    if (!mediaUrl && (messageType === 'image' || messageType === 'video')) {
      toast({ title: "Error", description: "Media URL cannot be empty for image/video messages.", variant: "destructive"});
      return;
    }

    setIsBroadcasting(true);
    // Simulate broadcasting
    console.log("Broadcasting message:", { type: messageType, content: messageType === 'text' ? messageContent : mediaUrl, textForMedia: messageType !== 'text' ? messageContent : undefined });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({ title: "Broadcast Sent!", description: "Your message has been notionally broadcast to all users." });
    setMessageContent('');
    setMediaUrl('');
    setIsBroadcasting(false);
  };

  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto shadow-xl animate-bounce-in-from-bottom">
        <CardHeader className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-3xl font-bold">Admin Broadcast Panel</CardTitle>
          <CardDescription className="text-lg mt-1">
            Send important messages, images, or videos to all app users.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="messageType">Message Type</Label>
            <div className="flex gap-2 mt-1">
              {(['text', 'image', 'video'] as const).map(type => (
                <Button 
                  key={type} 
                  variant={messageType === type ? "default" : "outline"}
                  onClick={() => setMessageType(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {messageType === 'text' && (
            <div>
              <Label htmlFor="messageContent">Text Message</Label>
              <Textarea
                id="messageContent"
                placeholder="Enter your text message here..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={5}
                className="mt-1"
              />
            </div>
          )}

          {(messageType === 'image' || messageType === 'video') && (
            <>
              <div>
                <Label htmlFor="mediaUrl">{messageType === 'image' ? "Image" : "Video"} URL</Label>
                <Input
                  id="mediaUrl"
                  type="url"
                  placeholder={`Enter direct URL for the ${messageType}...`}
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">Ensure this is a direct link to the {messageType} file (e.g., .jpg, .png, .mp4).</p>
              </div>
              <div>
                <Label htmlFor="mediaCaption">Optional Caption/Text</Label>
                <Textarea
                  id="mediaCaption"
                  placeholder="Enter any accompanying text for the media..."
                  value={messageContent} // Re-using messageContent for caption
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
            </>
          )}
          
          <Button onClick={handleBroadcast} className="w-full text-lg py-3" disabled={isBroadcasting}>
            {isBroadcasting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Broadcasting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" /> Broadcast Message
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            This is a simulation. Messages will appear in console and not actually send notifications.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
