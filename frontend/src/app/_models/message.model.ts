export interface Message {
    id: number;
    senderId: number;
    senderUsername: string;
    senderPhotoUrl: string;
    content: string;
    recipientId: number;
    recipientUsername: string;
    recipientPhotoUrl: string;
    dateRead?: Date;
    messageSent: Date;
}
